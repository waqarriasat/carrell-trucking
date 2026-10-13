import "server-only"
import { getContent } from "./content"
import { sendMail, isMailConfigured } from "./mailer"
import { buildLeadEmail, buildConfirmationEmail } from "./lead-email"
import { spamCheck, validate, isEmail } from "./lead-guard"
import { saveLead } from "./leads"

// ─────────────────────────────────────────────
//  What happens when a Contact or Quote form is sent:
//  1. spam checks  2. field checks  3. email to the
//  team  4. saved in Admin → Leads (even if the email
//  failed)  5. confirmation email to the customer.
// ─────────────────────────────────────────────

const str = (v) => String(v ?? "").trim()

/**
 * @param {object} o
 * @param {string} o.kind      "Quote request" | "Contact message"
 * @param {FormData} o.formData
 * @param {object} o.customer  { name, phone, email, company }
 * @param {Array}  o.fields    [{ label, value, list?, block? }]
 * @param {Array}  o.rules     field checks (see lead-guard validate)
 * @param {string} [o.tag]     short label for the email subject
 * @param {object} [o.checks]  extra values that are checked by `rules` but not sent as their own rows
 */
export async function handleLead({ kind, formData, customer, fields, rules, tag, checks = {} }) {
  const { site, contact } = await getContent()
  const callUs = `Please call us at ${site.phone}.`

  const spam = await spamCheck(formData)
  if (spam === "bot") return { success: true }
  if (spam === "fast") return { success: false, error: "Please check your details, then press the button again to send." }
  if (spam === "limit") return { success: false, error: `You've sent several messages in a short time. ${callUs}` }

  const fieldErrors = validate({ ...customer, ...Object.fromEntries(fields.map((f) => [f.key, f.value])), ...checks }, rules)
  if (Object.keys(fieldErrors).length) {
    return { success: false, fieldErrors, error: "Please check the highlighted fields." }
  }

  const clean = {
    name: str(customer.name),
    phone: str(customer.phone),
    email: str(customer.email),
    company: str(customer.company),
  }

  let emailed = false
  if (!isMailConfigured()) {
    console.error(`[leads] Email is not set up (EMAIL_USER / EMAIL_PASS) — ${kind} saved to Admin → Leads only.`)
  } else {
    try {
      const mail = buildLeadEmail({ kind, site, customer: clean, fields, tag })
      await sendMail({ to: site.formRecipient, fromName: `${site.name} Website`, ...mail })
      emailed = true
    } catch (err) {
      console.error(`[leads] ${kind} email failed:`, err)
    }
  }

  let saved = false
  try {
    await saveLead({
      kind,
      emailed,
      customer: clean,
      details: fields.map((f) => ({ label: f.label, value: f.list ? (f.value || []).map(str).filter(Boolean) : str(f.value) })),
    })
    saved = true
  } catch (err) {
    console.error(`[leads] ${kind} could not be saved:`, err)
  }

  if (!emailed && !saved) return { success: false, error: `Sorry, your ${kind.toLowerCase()} could not be sent. ${callUs}` }

  if (emailed && site.confirmEmail !== "no" && isEmail(clean.email)) {
    try {
      const mail = buildConfirmationEmail({ kind, site, customer: clean, fields, intro: site.confirmIntro, hours: contact.hours })
      await sendMail({ to: clean.email, fromName: site.name, replyTo: site.formRecipient, ...mail })
    } catch (err) {
      console.error(`[leads] ${kind} confirmation email failed:`, err)
    }
  }

  return { success: true }
}
