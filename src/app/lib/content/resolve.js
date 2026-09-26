// ─────────────────────────────────────────────
//  Content helpers shared by server + admin UI.
//
//  Placeholders usable in ANY text field:
//    {company} {phone} {phoneLink} {cell} {cellLink}
//    {email} {emailLink} {address} {street} {city}
//    {state} {zip} {mapsLink} {year}
//  Some fields also accept {count} / {service}.
// ─────────────────────────────────────────────
import { DEFAULT_CONTENT } from "./defaults"

export const PLACEHOLDERS = [
  ["{company}", "Company name"],
  ["{phone}", "Main phone"],
  ["{phoneLink}", "Main phone as a link (tel:)"],
  ["{cell}", "Cell phone"],
  ["{cellLink}", "Cell phone as a link (tel:)"],
  ["{email}", "Email address"],
  ["{emailLink}", "Email as a link (mailto:)"],
  ["{address}", "Full street address"],
  ["{street}", "Street"],
  ["{city}", "City"],
  ["{state}", "State"],
  ["{zip}", "ZIP code"],
  ["{mapsLink}", "Google Maps link to the address"],
  ["{year}", "Current year"],
]

const isPlainObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v)

// Merge saved content over defaults so fields added later always exist.
// Arrays are taken as a whole from the saved copy (items can be added/removed).
export function mergeWithDefaults(saved, defaults = DEFAULT_CONTENT) {
  if (!isPlainObject(saved)) return structuredClone(defaults)
  const out = {}
  for (const key of Object.keys(defaults)) {
    const d = defaults[key]
    const s = saved[key]
    if (s === undefined || s === null) out[key] = structuredClone(d)
    else if (isPlainObject(d)) out[key] = mergeWithDefaults(s, d)
    else if (Array.isArray(d)) out[key] = Array.isArray(s) ? s : structuredClone(d)
    else if (typeof d === "number") out[key] = Number.isFinite(Number(s)) ? Number(s) : d
    else out[key] = typeof s === "string" ? s : String(s)
  }
  return out
}

const digits = (s = "") => String(s).replace(/[^\d+]/g, "")

export function buildTokens(site) {
  const address = `${site.street}, ${site.city}, ${site.state} ${site.zip}`
  const mapsQuery = `${site.street} ${site.city} ${site.state} ${site.zip}`.trim().replace(/\s+/g, "+")
  return {
    company: site.name,
    phone: site.phone,
    phoneLink: `tel:${digits(site.phone)}`,
    cell: site.cell,
    cellLink: `tel:${digits(site.cell)}`,
    email: site.email,
    emailLink: `mailto:${site.email}`,
    address,
    street: site.street,
    city: site.city,
    state: site.state,
    zip: site.zip,
    mapsLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery).replace(/%2B/g, "+")}`,
    year: String(new Date().getFullYear()),
  }
}

export function fill(str, tokens) {
  if (typeof str !== "string" || !str.includes("{")) return str
  return str.replace(/\{(\w+)\}/g, (m, k) => (tokens[k] !== undefined ? tokens[k] : m))
}

function deepFill(value, tokens) {
  if (typeof value === "string") return fill(value, tokens)
  if (Array.isArray(value)) return value.map((v) => deepFill(v, tokens))
  if (isPlainObject(value)) {
    const out = {}
    for (const k of Object.keys(value)) out[k] = deepFill(value[k], tokens)
    return out
  }
  return value
}

// Resolve placeholders everywhere and add a few derived site values.
export function resolveContent(raw) {
  const content = mergeWithDefaults(raw)
  const tokens = buildTokens(content.site)
  const resolved = deepFill(content, tokens)
  resolved.site = {
    ...resolved.site,
    phoneHref: tokens.phoneLink,
    cellHref: tokens.cellLink,
    emailHref: tokens.emailLink,
    address: tokens.address,
    mapsHref: tokens.mapsLink,
  }
  return resolved
}
