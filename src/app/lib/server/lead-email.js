import "server-only"

// ─────────────────────────────────────────────
//  Lead emails (Get a Quote + Contact forms)
//  Builds the email Rick receives: a branded,
//  mobile-friendly HTML version (tables + inline
//  styles, which every email client supports)
//  plus a plain-text version.
//  Everything the visitor typed is escaped.
// ─────────────────────────────────────────────

const C = {
  navy: "#0f2d4a",
  navy2: "#1e4d7b",
  gold: "#c9a84c",
  text: "#33475b",
  muted: "#7a9bb5",
  light: "#f0f6fb",
  border: "#d6e8f5",
  green: "#25D366",
}
const FONT = "Arial, Helvetica, sans-serif"

const esc = (v) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")

const clean = (v) => String(v ?? "").trim()
const digits = (v) => clean(v).replace(/[^\d+]/g, "")
const isEmail = (v) => /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(clean(v))

// US numbers typed without a country code get +1 for WhatsApp.
function whatsappDigits(phone) {
  const d = clean(phone).replace(/\D/g, "")
  if (d.length === 10) return "1" + d
  return d.length >= 11 ? d : ""
}

function formatWhen(date) {
  try {
    return date.toLocaleString("en-US", {
      timeZone: "America/Chicago",
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    })
  } catch {
    return date.toISOString()
  }
}

function button(href, label, bg, color) {
  return `<a href="${esc(href)}" style="display:inline-block;margin:4px 6px 4px 0;padding:11px 18px;border-radius:6px;background:${bg};color:${color};font-family:${FONT};font-size:14px;font-weight:bold;text-decoration:none">${esc(label)}</a>`
}

function row(label, valueHtml, last) {
  const border = last ? "" : `border-bottom:1px solid ${C.border};`
  return `<tr>
    <td valign="top" style="${border}padding:12px 14px;width:34%;font-family:${FONT};font-size:12px;font-weight:bold;letter-spacing:.5px;text-transform:uppercase;color:${C.muted}">${esc(label)}</td>
    <td valign="top" style="${border}padding:12px 14px;font-family:${FONT};font-size:15px;line-height:1.5;color:${C.text}">${valueHtml}</td>
  </tr>`
}

/**
 * @param {object} o
 * @param {string} o.kind      "Quote request" | "Contact message"
 * @param {object} o.site      resolved site content (name, logo, phone…)
 * @param {object} o.customer  { name, phone, email, company }
 * @param {Array}  o.fields    [{ label, value, list?, block? }] — the request details
 * @param {string} [o.siteUrl] link back to the website
 * @param {string} [o.tag]     short label for the subject, e.g. "Rental"
 */
export function buildLeadEmail({ kind, site, customer, fields, siteUrl, tag }) {
  const name = clean(customer.name) || "Website visitor"
  const phone = clean(customer.phone)
  const email = clean(customer.email)
  const company = clean(customer.company)
  const when = formatWhen(new Date())
  const firstItem = fields.find((f) => f.list && f.value?.length)?.value?.[0]

  const what = [clean(tag), firstItem].filter(Boolean).join(": ")
  const subject = `New ${kind.toLowerCase()} from ${name}${company ? ` (${company})` : ""}${what ? ` — ${what}` : ""}`

  // ── Quick actions ──
  const wa = whatsappDigits(phone)
  const actions = [
    phone && button(`tel:${digits(phone)}`, `Call ${phone}`, C.gold, C.navy),
    wa && button(`https://wa.me/${wa}`, "WhatsApp", C.green, "#ffffff"),
    isEmail(email) && button(`mailto:${email}?subject=${encodeURIComponent(`Re: your ${kind.toLowerCase()} — ${site.name}`)}`, "Reply by email", C.navy2, "#ffffff"),
  ].filter(Boolean).join("")

  // ── Customer rows ──
  const customerRows = [
    ["Name", esc(name)],
    company && ["Company", esc(company)],
    phone && ["Phone", `<a href="tel:${esc(digits(phone))}" style="color:${C.navy2};text-decoration:none;font-weight:bold">${esc(phone)}</a>`],
    ["Email", isEmail(email) ? `<a href="mailto:${esc(email)}" style="color:${C.navy2};text-decoration:none">${esc(email)}</a>` : `<span style="color:${C.muted}">Not provided</span>`],
  ].filter(Boolean)

  // ── Request rows ──
  const detailRows = fields.map((f) => {
    const empty = f.list ? !f.value?.length : !clean(f.value)
    if (empty) return [f.label, `<span style="color:${C.muted}">Not specified</span>`]
    if (f.list) {
      return [f.label, f.value.map((v) =>
        `<span style="display:inline-block;margin:0 6px 6px 0;padding:4px 10px;border-radius:4px;background:${C.light};border:1px solid ${C.border};color:${C.navy};font-size:13px;font-weight:bold">${esc(v)}</span>`
      ).join("")]
    }
    if (f.block) return [f.label, esc(clean(f.value)).replace(/\r?\n/g, "<br>")]
    return [f.label, esc(clean(f.value))]
  })

  const table = (title, rows) => `
    <tr><td style="padding:22px 24px 8px;font-family:${FONT};font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:${C.gold}">${esc(title)}</td></tr>
    <tr><td style="padding:0 24px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${C.border};border-radius:8px;border-collapse:separate">
        ${rows.map(([l, v], i) => row(l, v, i === rows.length - 1)).join("")}
      </table>
    </td></tr>`

  const html = `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:0;background:${C.light}">
  <div style="display:none;max-height:0;overflow:hidden">${esc(`${name}${phone ? ` · ${phone}` : ""}${firstItem ? ` · ${firstItem}` : ""}`)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.light}">
    <tr><td align="center" style="padding:24px 12px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid ${C.border}">
        <tr><td style="background:${C.navy};padding:22px 24px;border-bottom:3px solid ${C.gold}">
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:bold;color:#ffffff;letter-spacing:.5px">${esc(site.logoTop || site.name)}</div>
          <div style="font-family:${FONT};font-size:10px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;color:${C.gold}">${esc(site.logoBottom || "")}</div>
        </td></tr>
        <tr><td style="padding:24px 24px 4px">
          <div style="font-family:${FONT};font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:${C.gold}">New ${esc(kind.toLowerCase())}</div>
          <div style="margin-top:6px;font-family:${FONT};font-size:22px;font-weight:bold;color:${C.navy}">${esc(name)}${company ? ` <span style="font-weight:normal;color:${C.muted}">· ${esc(company)}</span>` : ""}</div>
          <div style="margin-top:4px;font-family:${FONT};font-size:13px;color:${C.muted}">Received ${esc(when)} from the website</div>
        </td></tr>
        ${actions ? `<tr><td style="padding:14px 24px 0">${actions}</td></tr>` : ""}
        ${table("Customer", customerRows)}
        ${table(kind === "Quote request" ? "Request details" : "Details", detailRows)}
        <tr><td style="padding:24px;font-family:${FONT};font-size:12px;line-height:1.6;color:${C.muted}">
          ${isEmail(email) ? "Tip: just hit <strong>Reply</strong> — your answer goes straight to the customer.<br>" : ""}
          Sent by the ${esc(kind.toLowerCase())} form on ${siteUrl ? `<a href="${esc(siteUrl)}" style="color:${C.navy2}">${esc(siteUrl.replace(/^https?:\/\//, ""))}</a>` : "your website"}.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`

  // ── Plain-text version ──
  const line = (l, v) => `${l}: ${v}`
  const text = [
    `NEW ${kind.toUpperCase()} — ${site.name}`,
    `Received ${when}`,
    "",
    "CUSTOMER",
    ...customerRows.map(([l]) => line(l, l === "Name" ? name : l === "Company" ? company : l === "Phone" ? phone : email || "Not provided")),
    "",
    kind === "Quote request" ? "REQUEST DETAILS" : "DETAILS",
    ...fields.map((f) => line(f.label, f.list ? (f.value?.length ? f.value.join(", ") : "Not specified") : clean(f.value) || "Not specified")),
    "",
    isEmail(email) ? "Reply to this email to answer the customer directly." : "",
  ].join("\n").trim()

  return { subject, html, text, replyTo: isEmail(email) ? `"${name.replace(/"/g, "")}" <${email}>` : undefined }
}
