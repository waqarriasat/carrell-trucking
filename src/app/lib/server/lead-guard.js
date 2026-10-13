import "server-only"
import { headers } from "next/headers"
import { TRAP_FIELD, STARTED_FIELD } from "@/app/lib/lead-fields"

// ─────────────────────────────────────────────
//  Form safety for the Contact and Quote forms
//  • Spam: a hidden "trap" field people never see
//    (bots fill it), a minimum time to fill the
//    form, and a limit on sends per visitor.
//  • Checks: name, phone, email and text lengths,
//    with a message per field.
//  Bots get a normal "sent" answer, so they don't
//  learn they were blocked.
// ─────────────────────────────────────────────

const MIN_FILL_MS = 3000
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5

// Per server instance — a best-effort limit, not a hard guarantee.
const recent = new Map()

async function visitorKey() {
  const h = await headers()
  return (h.get("x-forwarded-for") || "").split(",")[0].trim() || h.get("x-real-ip") || "unknown"
}

function tooMany(key) {
  const now = Date.now()
  const times = (recent.get(key) || []).filter((t) => now - t < WINDOW_MS)
  times.push(now)
  recent.set(key, times)
  if (recent.size > 5000) recent.clear()
  return times.length > MAX_PER_WINDOW
}

// "bot" → pretend success, "fast" → ask to send again,
// "limit" → ask them to call, null → fine.
export async function spamCheck(formData) {
  if (String(formData.get(TRAP_FIELD) || "").trim()) return "bot"
  const started = Number(formData.get(STARTED_FIELD))
  if (!started) return "bot"
  // A real person using autofill can be quick — they just press Send again.
  if (Date.now() - started < MIN_FILL_MS) return "fast"
  if (tooMany(await visitorKey())) return "limit"
  return null
}

const clean = (v) => String(v ?? "").trim()
export const isEmail = (v) => /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/.test(clean(v))
const phoneDigits = (v) => clean(v).replace(/\D/g, "")

/**
 * @param {object} data   form values
 * @param {Array}  rules  [{ field, label, required?, max?, min?, type?: "phone" | "email", message? }]
 * @returns {object}      { field: "message" } — empty when everything is fine
 */
export function validate(data, rules) {
  const errors = {}
  for (const r of rules) {
    const value = clean(data[r.field])
    if (!value) {
      if (r.required) errors[r.field] = r.message || `Please enter your ${r.label}.`
      continue
    }
    if (r.type === "phone") {
      const d = phoneDigits(value)
      if (d.length < 10 || d.length > 15) errors[r.field] = "Please enter a phone number with area code, e.g. 580-555-0123."
    } else if (r.type === "email") {
      if (!isEmail(value)) errors[r.field] = "Please enter a valid email address, e.g. name@company.com."
    } else if (r.min && value.length < r.min) {
      errors[r.field] = `Please add a little more detail to your ${r.label}.`
    }
    if (!errors[r.field] && r.max && value.length > r.max) {
      errors[r.field] = `Please keep your ${r.label} under ${r.max} characters.`
    }
  }
  return errors
}
