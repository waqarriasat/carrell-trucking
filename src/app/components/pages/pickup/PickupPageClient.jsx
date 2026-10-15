"use client"

import { useEffect, useRef, useState } from "react"
import { FaCheck, FaPhone } from "react-icons/fa"
import Breadcrumb from "@/app/components/common/Breadcrumb"
import { submitPickup } from "@/app/actions/submitPickup"
import { useLeadForm, SpamTrap, FieldError, FormNote, LocateButton, setFieldValue } from "@/app/components/common/LeadFormParts"

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

const LABEL = { fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 5 }
const INPUT = { width: "100%", padding: "9px 12px", borderRadius: 4, border: `1.5px solid ${C.border}`, fontSize: 13, color: C.dark, background: C.light, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }
const HELP = { fontSize: 11, color: C.text, margin: "5px 0 0" }

function GroupTitle({ children, help, action }) {
  return (
    <div style={{ marginTop: 24, marginBottom: 12, paddingBottom: 8, borderBottom: `1.5px solid ${C.border}`, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
      <div>
        <h3 style={{ fontSize: 14, fontWeight: 900, color: C.dark, margin: 0 }}>{children}</h3>
        {help ? <p style={{ ...HELP, marginTop: 3 }}>{help}</p> : null}
      </div>
      {action}
    </div>
  )
}

export default function PickupPageClient({ page, site, units }) {
  const form = page.form
  const { status, errorMsg, fieldErrors, onSubmit, onInput, fieldProps } = useLeadForm(submitPickup)

  // Length choices follow the chosen unit type (all lengths until one is picked).
  const [unitType, setUnitType] = useState("")
  const allSizes = [...new Set(units.flatMap((u) => u.sizes))]
  const sizes = units.find((u) => u.name === unitType)?.sizes ?? allSizes

  // "Use my location" fills the address boxes (unknown states fall back to "Other").
  const formRef = useRef(null)
  function fillAddress(a) {
    const f = formRef.current
    const states = form.states || []
    setFieldValue(f, "street", a.street)
    setFieldValue(f, "city", a.city)
    if (a.state) setFieldValue(f, "state", states.includes(a.state) ? a.state : states.includes("Other") ? "Other" : states[0])
    setFieldValue(f, "zip", a.zip)
  }

  // No pickup dates in the past (set in the browser so the page can stay static).
  const dateRef = useRef(null)
  useEffect(() => {
    if (dateRef.current) dateRef.current.min = new Date().toLocaleDateString("en-CA")
  }, [])

  return (
    <>
      <style>{`
        .pickup-grid { display: grid; grid-template-columns: 1fr 380px; gap: 32px; align-items: start; }
        .pickup-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .pickup-city { display: grid; grid-template-columns: 2fr 1.2fr 1fr; gap: 14px; }
        .pickup-ready { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .pickup-choice {
          display: flex; align-items: center; gap: 8px; padding: 11px 12px; border-radius: 4px; cursor: pointer;
          border: 1.5px solid ${C.border}; background: ${C.light}; font-size: 13px; font-weight: 700; color: ${C.text};
          transition: border-color .15s, background .15s, color .15s;
        }
        .pickup-choice input { accent-color: ${C.gold}; margin: 0; flex-shrink: 0; }
        .pickup-choice:has(input:checked) { border-color: ${C.gold}; background: #c9a84c1f; color: ${C.dark}; }
        .pickup-choice:focus-within { outline: 2px solid ${C.gold}; outline-offset: 2px; }
        @media (max-width: 768px) {
          .pickup-grid { grid-template-columns: 1fr; gap: 24px; }
          .pickup-2, .pickup-ready { grid-template-columns: 1fr; }
          .pickup-city { grid-template-columns: 1fr 1fr; }
          .pickup-city > :first-child { grid-column: 1 / -1; }
        }
      `}</style>

      {/* Hero */}
      <div className="page-section wrap">
        <div style={{ width: "100%" }}>
          <Breadcrumb crumbs={[{ label: page.breadcrumbHome, href: "/" }, { label: page.breadcrumbCurrent }]} />
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 28, height: 2, background: C.gold }} />
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.goldText }}>{page.eyebrow}</span>
          </div>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 900, color: C.dark, margin: "0 0 10px", lineHeight: 1.15 }}>
            {`${page.titleStart} `}<span style={{ color: C.goldText }}>{page.titleAccent}</span>
          </h1>
          <p style={{ fontSize: 13, color: C.text, maxWidth: 520, lineHeight: 1.7, margin: 0 }}>{page.text}</p>
        </div>
      </div>

      {/* Main */}
      <div className="page-section wrap">
        <div style={{ width: "100%" }}>
          <div className="pickup-grid">

            {/* Form */}
            <div data-lead-form style={{ position: "relative", scrollMarginTop: 120, background: "#fff", borderRadius: 4, padding: "28px 24px", border: `1.5px solid ${C.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div style={{ width: 28, height: 2, background: C.gold }} />
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.goldText }}>{page.formEyebrow}</span>
              </div>
              <h2 style={{ fontSize: "clamp(18px, 3vw, 22px)", fontWeight: 900, color: C.dark, margin: "0 0 8px" }}>{page.formTitle}</h2>

              {status === "success" && (
                <div role="status" style={{ background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 4, padding: "14px 16px", margin: "12px 0", display: "flex", alignItems: "center", gap: 10 }}>
                  <FaCheck size={14} style={{ color: "#16a34a", flexShrink: 0 }} />
                  <p style={{ fontSize: 13, color: "#16a34a", fontWeight: 600, margin: 0 }}>{form.successMessage}</p>
                </div>
              )}
              {status === "error" && (
                <div role="alert" style={{ background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 4, padding: "14px 16px", margin: "12px 0" }}>
                  <p style={{ fontSize: 13, color: "#dc2626", fontWeight: 600, margin: 0 }}>{errorMsg}</p>
                </div>
              )}

              <form ref={formRef} onSubmit={onSubmit} onInput={onInput} noValidate>
                <SpamTrap />

                {/* Contact */}
                <div className="pickup-2" style={{ marginTop: 12 }}>
                  <div>
                    <label htmlFor="pickup-name" style={LABEL}>{form.nameLabel}</label>
                    <input id="pickup-name" type="text" placeholder={form.namePlaceholder} required autoComplete="name" {...fieldProps("name", INPUT)} />
                    <FieldError name="name" errors={fieldErrors} />
                  </div>
                  <div>
                    <label htmlFor="pickup-phone" style={LABEL}>{form.phoneLabel}</label>
                    <input id="pickup-phone" type="tel" placeholder={form.phonePlaceholder} required autoComplete="tel" {...fieldProps("phone", INPUT)} />
                    <FieldError name="phone" errors={fieldErrors} />
                  </div>
                </div>
                <div style={{ marginTop: 14 }}>
                  <label htmlFor="pickup-email" style={LABEL}>{form.emailLabel}</label>
                  <input id="pickup-email" type="email" placeholder={form.emailPlaceholder} autoComplete="email" {...fieldProps("email", INPUT)} />
                  <FieldError name="email" errors={fieldErrors} />
                </div>

                {/* Pickup location */}
                <GroupTitle help={form.locationHelp} action={site.locateButton === "yes" ? <LocateButton site={site} onFound={fillAddress} /> : null}>
                  {form.locationHeading}
                </GroupTitle>
                <div>
                  <label htmlFor="pickup-street" style={LABEL}>{form.streetLabel}</label>
                  <input id="pickup-street" type="text" placeholder={form.streetPlaceholder} required autoComplete="street-address" {...fieldProps("street", INPUT)} />
                  <FieldError name="street" errors={fieldErrors} />
                </div>
                <div className="pickup-city" style={{ marginTop: 14 }}>
                  <div>
                    <label htmlFor="pickup-city" style={LABEL}>{form.cityLabel}</label>
                    <input id="pickup-city" type="text" placeholder={form.cityPlaceholder} required autoComplete="address-level2" {...fieldProps("city", INPUT)} />
                    <FieldError name="city" errors={fieldErrors} />
                  </div>
                  <div>
                    <label htmlFor="pickup-state" style={LABEL}>{form.stateLabel}</label>
                    <select id="pickup-state" required defaultValue={form.states?.[0] || ""} {...fieldProps("state", INPUT)}>
                      {(form.states || []).map((st) => <option key={st}>{st}</option>)}
                    </select>
                    <FieldError name="state" errors={fieldErrors} />
                  </div>
                  <div>
                    <label htmlFor="pickup-zip" style={LABEL}>{form.zipLabel}</label>
                    <input id="pickup-zip" type="text" inputMode="numeric" placeholder={form.zipPlaceholder} autoComplete="postal-code" maxLength={12} {...fieldProps("zip", INPUT)} />
                    <FieldError name="zip" errors={fieldErrors} />
                  </div>
                </div>

                {/* Unit */}
                <GroupTitle>{form.unitHeading}</GroupTitle>
                <div className="pickup-2">
                  <div>
                    <label htmlFor="pickup-unit" style={LABEL}>{form.unitTypeLabel}</label>
                    <select id="pickup-unit" required defaultValue="" onChange={(e) => setUnitType(e.target.value)} {...fieldProps("unitType", INPUT)}>
                      <option value="" disabled>{form.unitTypePlaceholder}</option>
                      {units.map((u) => <option key={u.name}>{u.name}</option>)}
                    </select>
                    <FieldError name="unitType" errors={fieldErrors} />
                  </div>
                  <div>
                    <label htmlFor="pickup-length" style={LABEL}>{form.lengthLabel}</label>
                    <select id="pickup-length" defaultValue="" {...fieldProps("length", INPUT)}>
                      <option value="">{form.lengthPlaceholder}</option>
                      {sizes.map((s) => <option key={s}>{s}</option>)}
                      <option>{form.notSureLabel}</option>
                    </select>
                  </div>
                </div>
                <div style={{ marginTop: 14 }}>
                  <label htmlFor="pickup-number" style={LABEL}>{form.unitNumberLabel}</label>
                  <input id="pickup-number" type="text" placeholder={form.unitNumberPlaceholder} maxLength={50} {...fieldProps("unitNumber", INPUT)} />
                </div>

                <fieldset style={{ marginTop: 18, border: 0, padding: 0, minWidth: 0 }}>
                  <legend style={{ ...LABEL, padding: 0, marginBottom: 10 }}>{form.readyLabel}</legend>
                  <div className="pickup-ready">
                    {(form.readyOptions || []).map((opt) => (
                      <label key={opt} className="pickup-choice">
                        <input type="radio" name="ready" value={opt} required aria-describedby={fieldErrors.ready ? "ready-error" : undefined} />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                  <FieldError name="ready" errors={fieldErrors} />
                </fieldset>

                <div style={{ marginTop: 14, maxWidth: 260 }}>
                  <label htmlFor="pickup-date" style={LABEL}>{form.dateLabel}</label>
                  <input ref={dateRef} id="pickup-date" type="date" {...fieldProps("date", INPUT)} />
                  <p style={HELP}>{form.dateHelp}</p>
                </div>

                <div style={{ marginTop: 14 }}>
                  <label htmlFor="pickup-notes" style={LABEL}>{form.notesLabel}</label>
                  <textarea id="pickup-notes" placeholder={form.notesPlaceholder} rows={3} maxLength={2000} {...fieldProps("notes", { ...INPUT, resize: "vertical" })} />
                  <FieldError name="notes" errors={fieldErrors} />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{
                    width: "100%", padding: "13px", borderRadius: 4, border: "none",
                    background: status === "loading" ? "#d4b86a" : C.gold, color: C.dark, fontSize: 14, fontWeight: 800,
                    cursor: status === "loading" ? "not-allowed" : "pointer", marginTop: 20, letterSpacing: 0.5,
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
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>{page.stepsEyebrow}</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 900, color: "#fff", margin: "0 0 16px" }}>{page.stepsTitle}</h3>
                <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                  {(page.steps || []).map((step, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{ width: 22, height: 22, borderRadius: "50%", background: C.gold, color: C.dark, fontSize: 11, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</span>
                      <span style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <a href={site.phoneHref} style={{ display: "flex", alignItems: "center", gap: 12, background: "#fff", borderRadius: 4, padding: "18px 20px", border: `1.5px solid ${C.border}`, textDecoration: "none" }}>
                <span style={{ width: 36, height: 36, borderRadius: 4, background: C.gold + "18", border: `1px solid ${C.gold}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <FaPhone size={14} style={{ color: C.goldText }} />
                </span>
                <span>
                  <span style={{ display: "block", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: C.text }}>{form.callText}</span>
                  <span style={{ display: "block", fontSize: 15, fontWeight: 800, color: C.dark }}>{site.phone}</span>
                </span>
              </a>

              {page.tipText ? (
                <div style={{ background: C.gold + "15", borderRadius: 4, padding: "16px 18px", border: `1.5px solid ${C.gold}44` }}>
                  <p style={{ fontSize: 12, color: C.dark, margin: 0, lineHeight: 1.6, fontWeight: 600 }}>
                    <strong>{page.tipBold}</strong> {page.tipText}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
