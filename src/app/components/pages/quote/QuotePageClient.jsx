"use client"

import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { getIcon } from "@/app/lib/content/icons"
import Breadcrumb from "@/app/components/common/Breadcrumb"
import { submitQuote } from "@/app/actions/submitQuote"

const C = {
  dark:   "#0f2d4a",
  navy:   "#1e4d7b",
  gold:   "#c9a84c",
  goldText: "#86671e", // gold for text on white/light backgrounds (readable)
  muted:  "#a9c1d4",
  light:  "#f0f6fb",
  border: "#d6e8f5",
  text:   "#4a6b85",
}

export default function QuotePageClient({ page, site, fleetOptions, serviceOptions }) {
  const FLEET_OPTIONS = fleetOptions
  const SERVICES = serviceOptions
  const WHY_QUOTE = page.whyItems.map((text) => ({ text }))
  const form = page.form

  const [status, setStatus] = useState(null) // null | "loading" | "success" | "error"
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus("loading")
    const formData = new FormData(e.target)
    const result = await submitQuote(formData)
    if (result.success) {
      setStatus("success")
      e.target.reset()
    } else {
      setStatus("error")
      setErrorMsg(result.error)
    }
  }

  return (
    <>
      <style>{`
        .quote-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 32px;
          align-items: start;
        }
        .quote-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .quote-fleet-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        /* odd number of equipment types: last one spans the row */
        .quote-fleet-grid > label:last-child:nth-child(odd) { grid-column: 1 / -1; }
        .quote-interest-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .quote-interest {
          position: relative; display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 11px 10px; border-radius: 8px; cursor: pointer; text-align: center;
          border: 1.5px solid ${C.border}; background: ${C.light};
          font-size: 13px; font-weight: 700; color: ${C.text};
          transition: border-color .15s, background .15s, color .15s;
        }
        .quote-interest input { accent-color: ${C.gold}; margin: 0; }
        .quote-interest:has(input:checked) { border-color: ${C.gold}; background: #c9a84c1f; color: ${C.dark}; }
        .quote-interest:focus-within { outline: 2px solid ${C.gold}; outline-offset: 2px; }
        @media (max-width: 768px) {
          .quote-grid { grid-template-columns: 1fr; gap: 24px; }
          .quote-form-grid { grid-template-columns: 1fr; }
          .quote-fleet-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      {/* Hero */}
      <div style={{ background: C.dark, padding: "20px var(--gutter) 40px" }}>
        <div style={{ width: "100%" }}>
          <Breadcrumb crumbs={[{ label: page.breadcrumbHome, href: "/" }, { label: page.breadcrumbCurrent }]} />
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 28, height: 2, background: C.gold }} />
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>
              {page.eyebrow}
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 900, color: "#fff", margin: "0 0 10px", lineHeight: 1.15 }}>
            {`${page.titleStart} `}<span style={{ color: C.gold }}>{page.titleAccent}</span>
          </h1>
          <p style={{ fontSize: 13, color: C.muted, maxWidth: 480, lineHeight: 1.7, margin: 0 }}>
            {page.text}
          </p>
        </div>
      </div>

      {/* Main */}
      <div style={{ background: C.light, padding: "40px var(--gutter)" }}>
        <div style={{ width: "100%" }}>
          <div className="quote-grid">

            {/* Form */}
            <div style={{ background: "#fff", borderRadius: 16, padding: "28px 24px", border: `1.5px solid ${C.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div style={{ width: 28, height: 2, background: C.gold }} />
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.goldText }}>
                  {page.formEyebrow}
                </span>
              </div>
              <h2 style={{ fontSize: "clamp(18px, 3vw, 22px)", fontWeight: 900, color: C.dark, margin: "0 0 20px" }}>
                {page.formTitle}
              </h2>

              {/* Success message */}
              {status === "success" && (
                <div style={{
                  background: "#f0fdf4", border: "1.5px solid #86efac",
                  borderRadius: 10, padding: "14px 16px", marginBottom: 20,
                  display: "flex", alignItems: "center", gap: 10
                }}>
                  <FaCheck size={14} style={{ color: "#16a34a", flexShrink: 0 }} />
                  <p style={{ fontSize: 13, color: "#16a34a", fontWeight: 600, margin: 0 }}>
                    {form.successMessage}
                  </p>
                </div>
              )}

              {/* Error message */}
              {status === "error" && (
                <div style={{
                  background: "#fef2f2", border: "1.5px solid #fca5a5",
                  borderRadius: 10, padding: "14px 16px", marginBottom: 20
                }}>
                  <p style={{ fontSize: 13, color: "#dc2626", fontWeight: 600, margin: 0 }}>
                    {errorMsg}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Name + Phone */}
                <div className="quote-form-grid">
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 5 }}>{form.nameLabel}</label>
                    <input name="name" type="text" placeholder={form.namePlaceholder} required
                      style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${C.border}`, fontSize: 13, color: C.dark, background: C.light, outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 5 }}>{form.phoneLabel}</label>
                    <input name="phone" type="tel" placeholder={form.phonePlaceholder} required
                      style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${C.border}`, fontSize: 13, color: C.dark, background: C.light, outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                </div>

                {/* Email + Company */}
                <div className="quote-form-grid" style={{ marginTop: 14 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 5 }}>{form.emailLabel}</label>
                    <input name="email" type="email" placeholder={form.emailPlaceholder}
                      style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${C.border}`, fontSize: 13, color: C.dark, background: C.light, outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 5 }}>{form.companyLabel}</label>
                    <input name="company" type="text" placeholder={form.companyPlaceholder}
                      style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${C.border}`, fontSize: 13, color: C.dark, background: C.light, outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                </div>

                {/* Rental / Purchase / Rent to Own */}
                {form.interests?.length ? (
                  <div style={{ marginTop: 20 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 10 }}>{form.interestLabel}</label>
                    <div className="quote-interest-grid">
                      {form.interests.map((option, i) => (
                        <label key={i} className="quote-interest">
                          <input type="radio" name="interest" value={option} defaultChecked={i === 0} />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Equipment */}
                <div style={{ marginTop: 20 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 10 }}>{form.equipmentLabel}</label>
                  <div className="quote-fleet-grid">
                    {FLEET_OPTIONS.map((option, i) => (
                      <label key={i} style={{
                        display: "flex", alignItems: "center", gap: 8,
                        padding: "8px 12px", borderRadius: 8,
                        border: `1.5px solid ${C.border}`,
                        background: C.light, cursor: "pointer",
                        fontSize: 12, fontWeight: 600, color: C.text
                      }}>
                        <input type="checkbox" name="equipment" value={option} style={{ accentColor: C.gold }} />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Service Type */}
                <div style={{ marginTop: 20 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 10 }}>{form.serviceLabel}</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {SERVICES.map((service, i) => (
                      <label key={i} style={{
                        display: "flex", alignItems: "center", gap: 8,
                        padding: "8px 14px", borderRadius: 8,
                        border: `1.5px solid ${C.border}`,
                        background: C.light, cursor: "pointer",
                        fontSize: 12, fontWeight: 600, color: C.text
                      }}>
                        <input type="radio" name="service" value={service} style={{ accentColor: C.gold }} />
                        {service}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div style={{ marginTop: 20 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 5 }}>{form.durationLabel}</label>
                  <select name="duration"
                    style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${C.border}`, fontSize: 13, color: C.dark, background: C.light, outline: "none", boxSizing: "border-box" }}
                  >
                    <option value="">{form.durationPlaceholder}</option>
                    {form.durations.map((d, i) => (
                      <option key={i}>{d}</option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div style={{ marginTop: 14 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 5 }}>{form.locationLabel}</label>
                  <input name="location" type="text" placeholder={form.locationPlaceholder} required
                    style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${C.border}`, fontSize: 13, color: C.dark, background: C.light, outline: "none", boxSizing: "border-box" }}
                  />
                </div>

                {/* Notes */}
                <div style={{ marginTop: 14 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 5 }}>{form.notesLabel}</label>
                  <textarea name="notes" placeholder={form.notesPlaceholder} rows={4}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${C.border}`, fontSize: 13, color: C.dark, background: C.light, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{
                    width: "100%", padding: "13px",
                    borderRadius: 8, border: "none",
                    background: status === "loading" ? "#d4b86a" : C.gold,
                    color: C.dark, fontSize: 14, fontWeight: 800,
                    cursor: status === "loading" ? "not-allowed" : "pointer",
                    marginTop: 20, letterSpacing: 0.5
                  }}
                >
                  {status === "loading" ? form.sendingLabel : form.submitLabel}
                </button>

                <p style={{ fontSize: 11, color: C.text, textAlign: "center", marginTop: 10, marginBottom: 0 }}>
                  {form.callText}{" "}
                  <a href={site.phoneHref} style={{ color: C.goldText, fontWeight: 700, textDecoration: "none" }}>{site.phone}</a>
                </p>
              </form>
            </div>

            {/* Right panel */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ background: C.dark, borderRadius: 14, padding: "24px 20px", border: `1.5px solid ${C.navy}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <div style={{ width: 24, height: 2, background: C.gold }} />
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>{page.whyEyebrow}</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 900, color: "#fff", margin: "0 0 16px" }}>{page.whyTitle}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {WHY_QUOTE.map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: C.gold + "20", border: `1px solid ${C.gold}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <FaCheck size={9} style={{ color: C.gold }} />
                      </div>
                      <span style={{ fontSize: 13, color: C.muted }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: "#fff", borderRadius: 14, padding: "24px 20px", border: `1.5px solid ${C.border}` }}>
                <h3 style={{ fontSize: 15, fontWeight: 900, color: C.dark, margin: "0 0 16px" }}>{page.callTitle}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {page.contacts.map((c) => ({ ...c, icon: getIcon(c.icon, "fa/FaPhone") })).map((contact, i) => (
                    <a key={i} href={contact.href} style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: contact.color + "18", border: `1px solid ${contact.color}33`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <contact.icon size={14} style={{ color: contact.color }} />
                      </div>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: C.text }}>{contact.label}</div>
                        <div style={{ fontSize: 13, fontWeight: 800, color: C.dark }}>{contact.value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div style={{ background: C.gold + "15", borderRadius: 12, padding: "16px 18px", border: `1.5px solid ${C.gold}44` }}>
                <p style={{ fontSize: 12, color: C.dark, margin: 0, lineHeight: 1.6, fontWeight: 600 }}>
                  📋 <strong>{page.noteBold}</strong> {page.noteText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}