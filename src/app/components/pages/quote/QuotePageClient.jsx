"use client"

import { useEffect, useRef, useState } from "react"
import { FaCheck } from "react-icons/fa"
import { getIcon } from "@/app/lib/content/icons"
import Breadcrumb from "@/app/components/common/Breadcrumb"
import { submitQuote } from "@/app/actions/submitQuote"
import { useLeadForm, SpamTrap, FieldError, FormNote, LocateButton, setFieldValue } from "@/app/components/common/LeadFormParts"
import { readDelivery, deliveryLabel } from "@/app/components/common/DeliveryBar"

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

  const { status, errorMsg, fieldErrors, onSubmit, onInput, fieldProps } = useLeadForm(submitQuote)

  // Chosen option and units. With "Modification" chosen, only units that offer
  // modifications are listed (Admin → Equipment → Offer modifications).
  const firstInterest = form.interests?.[0] || ""
  const [interest, setInterest] = useState(firstInterest)
  const [picked, setPicked] = useState([])
  const isModify = /modif/i.test(interest)
  const modUnits = new Set(FLEET_OPTIONS.filter((u) => u.mods).map((u) => u.name))
  const units = isModify ? FLEET_OPTIONS.filter((u) => u.mods) : FLEET_OPTIONS
  const showMods = isModify || picked.some((name) => modUnits.has(name))

  function chooseInterest(option) {
    setInterest(option)
    if (/modif/i.test(option)) setPicked((list) => list.filter((name) => modUnits.has(name)))
  }
  const toggleUnit = (name) => setPicked((list) => (list.includes(name) ? list.filter((n) => n !== name) : [...list, name]))

  // Links from the equipment pages (/quote?unit=…&interest=…) pre-select the unit and the
  // choice. Done in the browser so this page stays static (fast and cached).
  const formRef = useRef(null)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const find = (list, value) => {
      const v = String(value || "").trim().toLowerCase()
      return v ? list.find((x) => x.toLowerCase() === v) : undefined
    }
    const wanted = find(form.interests || [], params.get("interest"))
    const unit = find(FLEET_OPTIONS.map((u) => u.name), params.get("unit"))
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read once from the URL after load
    if (wanted) setInterest(wanted)
    if (unit && (!/modif/i.test(wanted || "") || modUnits.has(unit))) setPicked([unit])
    // Town pages link here with ?location=Town, ST — fill it in if the field is empty.
    const location = String(params.get("location") || "").trim().slice(0, 200)
    const field = formRef.current?.querySelector('[name="location"]')
    // Otherwise use the town from the "Delivering to" bar, if the visitor set one.
    const saved = location ? "" : deliveryLabel(readDelivery())
    if ((location || saved) && field && !field.value) setFieldValue(formRef.current, "location", location || saved)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        .quote-interest-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
        @media (max-width: 1100px) { .quote-interest-grid { grid-template-columns: 1fr 1fr; } }
        .quote-mods-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        @media (max-width: 1100px) { .quote-mods-grid { grid-template-columns: 1fr 1fr; } }
        .quote-interest {
          position: relative; display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 11px 10px; border-radius: 4px; cursor: pointer; text-align: center;
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
      <div className="page-section wrap">
        <div style={{ width: "100%" }}>
          <Breadcrumb crumbs={[{ label: page.breadcrumbHome, href: "/" }, { label: page.breadcrumbCurrent }]} />
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 28, height: 2, background: C.gold }} />
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.goldText }}>
              {page.eyebrow}
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 900, color: C.dark, margin: "0 0 10px", lineHeight: 1.15 }}>
            {`${page.titleStart} `}<span style={{ color: C.goldText }}>{page.titleAccent}</span>
          </h1>
          <p style={{ fontSize: 13, color: C.text, maxWidth: 480, lineHeight: 1.7, margin: 0 }}>
            {page.text}
          </p>
        </div>
      </div>

      {/* Main */}
      <div className="page-section wrap">
        <div style={{ width: "100%" }}>
          <div className="quote-grid">

            {/* Form */}
            <div data-lead-form style={{ position: "relative", scrollMarginTop: 120, background: "#fff", borderRadius: 4, padding: "28px 24px", border: `1.5px solid ${C.border}` }}>
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
                <div role="status" style={{
                  background: "#f0fdf4", border: "1.5px solid #86efac",
                  borderRadius: 4, padding: "14px 16px", marginBottom: 20,
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
                <div role="alert" style={{
                  background: "#fef2f2", border: "1.5px solid #fca5a5",
                  borderRadius: 4, padding: "14px 16px", marginBottom: 20
                }}>
                  <p style={{ fontSize: 13, color: "#dc2626", fontWeight: 600, margin: 0 }}>
                    {errorMsg}
                  </p>
                </div>
              )}

              <form ref={formRef} onSubmit={onSubmit} onInput={onInput} onReset={() => { setInterest(firstInterest); setPicked([]) }} noValidate>
                <SpamTrap />
                {/* Name + Phone */}
                <div className="quote-form-grid">
                  <div>
                    <label htmlFor="quote-name" style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 5 }}>{form.nameLabel}</label>
                    <input id="quote-name" type="text" placeholder={form.namePlaceholder} required autoComplete="name"
                      {...fieldProps("name", { width: "100%", padding: "9px 12px", borderRadius: 4, border: `1.5px solid ${C.border}`, fontSize: 13, color: C.dark, background: C.light, outline: "none", boxSizing: "border-box" })}
                    />
                  <FieldError name="name" errors={fieldErrors} />
                  </div>
                  <div>
                    <label htmlFor="quote-phone" style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 5 }}>{form.phoneLabel}</label>
                    <input id="quote-phone" type="tel" placeholder={form.phonePlaceholder} required autoComplete="tel"
                      {...fieldProps("phone", { width: "100%", padding: "9px 12px", borderRadius: 4, border: `1.5px solid ${C.border}`, fontSize: 13, color: C.dark, background: C.light, outline: "none", boxSizing: "border-box" })}
                    />
                  <FieldError name="phone" errors={fieldErrors} />
                  </div>
                </div>

                {/* Email + Company */}
                <div className="quote-form-grid" style={{ marginTop: 14 }}>
                  <div>
                    <label htmlFor="quote-email" style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 5 }}>{form.emailLabel}</label>
                    <input id="quote-email" type="email" placeholder={form.emailPlaceholder} autoComplete="email"
                      {...fieldProps("email", { width: "100%", padding: "9px 12px", borderRadius: 4, border: `1.5px solid ${C.border}`, fontSize: 13, color: C.dark, background: C.light, outline: "none", boxSizing: "border-box" })}
                    />
                  <FieldError name="email" errors={fieldErrors} />
                  </div>
                  <div>
                    <label htmlFor="quote-company" style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 5 }}>{form.companyLabel}</label>
                    <input id="quote-company" type="text" placeholder={form.companyPlaceholder} autoComplete="organization"
                      {...fieldProps("company", { width: "100%", padding: "9px 12px", borderRadius: 4, border: `1.5px solid ${C.border}`, fontSize: 13, color: C.dark, background: C.light, outline: "none", boxSizing: "border-box" })}
                    />
                  <FieldError name="company" errors={fieldErrors} />
                  </div>
                </div>

                {/* Rental / Purchase / Rent to Own / Modification */}
                {form.interests?.length ? (
                  <div style={{ marginTop: 20 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 10 }}>{form.interestLabel}</label>
                    <div className="quote-interest-grid">
                      {form.interests.map((option, i) => (
                        <label key={i} className="quote-interest">
                          <input type="radio" name="interest" value={option} checked={interest === option} onChange={() => chooseInterest(option)} />
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
                    {units.map(({ name: option }) => (
                      <label key={option} style={{
                        display: "flex", alignItems: "center", gap: 8,
                        padding: "8px 12px", borderRadius: 4,
                        border: `1.5px solid ${C.border}`,
                        background: C.light, cursor: "pointer",
                        fontSize: 12, fontWeight: 600, color: C.text
                      }}>
                        <input type="checkbox" name="equipment" value={option} checked={picked.includes(option)} onChange={() => toggleUnit(option)} style={{ accentColor: C.gold }} />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Modifications — when "Modification" is chosen or a unit that offers it is ticked */}
                {showMods && form.mods?.length ? (
                  <fieldset style={{ marginTop: 20, border: 0, padding: 0, minWidth: 0 }}>
                    <legend style={{ fontSize: 12, fontWeight: 700, color: C.dark, padding: 0, marginBottom: 4 }}>{form.modsLabel}</legend>
                    {form.modsHelp ? (
                      <p style={{ fontSize: 12, color: C.text, margin: "0 0 10px", lineHeight: 1.6 }}>{form.modsHelp}</p>
                    ) : null}
                    <div className="quote-mods-grid">
                      {form.mods.map((option, i) => (
                        <label key={i} style={{
                          display: "flex", alignItems: "center", gap: 8,
                          padding: "8px 12px", borderRadius: 4,
                          border: `1.5px solid ${C.border}`,
                          background: C.light, cursor: "pointer",
                          fontSize: 12, fontWeight: 600, color: C.text
                        }}>
                          <input type="checkbox" name="mods" value={option} style={{ accentColor: C.gold }} />
                          {option}
                        </label>
                      ))}
                    </div>
                    <label htmlFor="quote-mods-details" style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", margin: "14px 0 5px" }}>{form.modsDetailsLabel}</label>
                    <textarea id="quote-mods-details" placeholder={form.modsDetailsPlaceholder} rows={3} maxLength={2000}
                      {...fieldProps("modsDetails", { width: "100%", padding: "9px 12px", borderRadius: 4, border: `1.5px solid ${C.border}`, fontSize: 13, color: C.dark, background: C.light, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" })}
                    />
                    <FieldError name="modsDetails" errors={fieldErrors} />
                  </fieldset>
                ) : null}

                {/* Service Type */}
                <div style={{ marginTop: 20 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 10 }}>{form.serviceLabel}</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {SERVICES.map((service, i) => (
                      <label key={i} style={{
                        display: "flex", alignItems: "center", gap: 8,
                        padding: "8px 14px", borderRadius: 4,
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
                    style={{ width: "100%", padding: "9px 12px", borderRadius: 4, border: `1.5px solid ${C.border}`, fontSize: 13, color: C.dark, background: C.light, outline: "none", boxSizing: "border-box" }}
                  >
                    <option value="">{form.durationPlaceholder}</option>
                    {form.durations.map((d, i) => (
                      <option key={i}>{d}</option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div style={{ marginTop: 14 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 5 }}>
                    <label htmlFor="quote-location" style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block" }}>{form.locationLabel}</label>
                    {site.locateButton === "yes" && (
                      <LocateButton
                        site={site}
                        onFound={(a) => setFieldValue(formRef.current, "location", [a.street, a.city, [a.state, a.zip].filter(Boolean).join(" ")].filter(Boolean).join(", "))}
                      />
                    )}
                  </div>
                  <input id="quote-location" type="text" placeholder={form.locationPlaceholder} required autoComplete="street-address"
                    {...fieldProps("location", { width: "100%", padding: "9px 12px", borderRadius: 4, border: `1.5px solid ${C.border}`, fontSize: 13, color: C.dark, background: C.light, outline: "none", boxSizing: "border-box" })}
                  />
                <FieldError name="location" errors={fieldErrors} />
                </div>

                {/* Notes */}
                <div style={{ marginTop: 14 }}>
                  <label htmlFor="quote-notes" style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 5 }}>{form.notesLabel}</label>
                  <textarea id="quote-notes" placeholder={form.notesPlaceholder} rows={4} maxLength={3000}
                    {...fieldProps("notes", { width: "100%", padding: "9px 12px", borderRadius: 4, border: `1.5px solid ${C.border}`, fontSize: 13, color: C.dark, background: C.light, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" })}
                  />
                <FieldError name="notes" errors={fieldErrors} />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{
                    width: "100%", padding: "13px",
                    borderRadius: 4, border: "none",
                    background: status === "loading" ? "#d4b86a" : C.gold,
                    color: C.dark, fontSize: 14, fontWeight: 800,
                    cursor: status === "loading" ? "not-allowed" : "pointer",
                    marginTop: 20, letterSpacing: 0.5
                  }}
                >
                  {status === "loading" ? form.sendingLabel : form.submitLabel}
                </button>

                <FormNote form={form} site={site} />
              </form>
            </div>

            {/* Right panel */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ background: C.dark, borderRadius: 4, padding: "24px 20px", border: `1.5px solid ${C.navy}` }}>
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

              <div style={{ background: "#fff", borderRadius: 4, padding: "24px 20px", border: `1.5px solid ${C.border}` }}>
                <h3 style={{ fontSize: 15, fontWeight: 900, color: C.dark, margin: "0 0 16px" }}>{page.callTitle}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {page.contacts.map((c) => ({ ...c, icon: getIcon(c.icon, "fa/FaPhone") })).map((contact, i) => (
                    <a key={i} href={contact.href} style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
                      <div style={{ width: 36, height: 36, borderRadius: 4, background: contact.color + "18", border: `1px solid ${contact.color}33`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
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

              <div style={{ background: C.gold + "15", borderRadius: 4, padding: "16px 18px", border: `1.5px solid ${C.gold}44` }}>
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