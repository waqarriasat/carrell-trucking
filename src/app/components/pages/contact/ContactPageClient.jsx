"use client"

import { useState } from "react"
import { FaMapMarkerAlt, FaClock, FaUser, FaCheck } from "react-icons/fa"
import { getIcon } from "@/app/lib/content/icons"
import Breadcrumb from "@/app/components/common/Breadcrumb"
import { submitContact } from "@/app/actions/submitContact"

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

export default function ContactPageClient({ page, site }) {
  const CONTACT_INFO = page.infoCards.map((c) => ({ ...c, icon: getIcon(c.icon, "fa/FaPhone") }))
  const TEAM_CONTACTS = page.team
  const form = page.form

  const [status,   setStatus]   = useState(null)
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus("loading")
    const formData = new FormData(e.target)
    const result = await submitContact(formData)
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
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start; }
        .contact-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .contact-team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr; gap: 24px; }
          .contact-info-grid { grid-template-columns: 1fr; }
          .contact-team-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Hero */}
      <div className="page-section wrap">
        <div className="panel" style={{ padding: "clamp(22px, 3vw, 40px)", width: "100%" }}>
          <Breadcrumb crumbs={[{ label: page.breadcrumbHome, href: "/" }, { label: page.breadcrumbCurrent }]} />
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 32, height: 2, background: C.gold }} />
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.goldText }}>
              {page.eyebrow}
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 900, color: C.dark, margin: "0 0 12px", lineHeight: 1.15 }}>
            {`${page.titleStart} `}<span style={{ color: C.goldText }}>{page.titleAccent}</span>
          </h1>
          <p style={{ fontSize: 14, color: C.text, maxWidth: 520, lineHeight: 1.8, margin: 0 }}>
            {page.text}
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="page-section wrap">
        <div style={{ width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 32, height: 2, background: C.gold }} />
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.goldText }}>{page.infoEyebrow}</span>
          </div>
          <h2 style={{ fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 900, color: C.dark, margin: "0 0 24px" }}>
            {page.infoTitle}
          </h2>
          <div className="contact-info-grid">
            {CONTACT_INFO.map((info, i) => (
              <a key={i} href={info.href}
                target={/^https?:/.test(info.href || "") ? "_blank" : undefined}
                rel={/^https?:/.test(info.href || "") ? "noopener noreferrer" : undefined}
                style={{ textDecoration: "none" }}
              >
                <div style={{ background: "#fff", borderRadius: 14, padding: "20px", border: `1.5px solid ${C.border}`, display: "flex", alignItems: "flex-start", gap: 14, cursor: "pointer" }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, flexShrink: 0, background: info.color + "18", border: `1px solid ${info.color}33`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <info.icon size={16} style={{ color: info.color }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: C.text, marginBottom: 3 }}>{info.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: C.dark, marginBottom: 2 }}>{info.value}</div>
                    <div style={{ fontSize: 12, color: C.text }}>{info.sub}</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Map + Form */}
      <div className="page-section wrap">
        <div className="panel" style={{ padding: "clamp(22px, 3vw, 40px)", width: "100%" }}>
          <div className="contact-grid">

            {/* Map */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 32, height: 2, background: C.gold }} />
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.goldText }}>{page.mapEyebrow}</span>
              </div>
              <h2 style={{ fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 900, color: C.dark, margin: "0 0 16px" }}>
                {page.mapTitle}
              </h2>
              <div style={{ borderRadius: 14, overflow: "hidden", border: `1.5px solid ${C.border}`, marginBottom: 12 }}>
                <iframe
                  src={site.mapEmbedUrl}
                  width="100%" height="260"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen="" loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${site.name} location`}
                />
              </div>
              <div style={{ background: C.light, borderRadius: 10, padding: "14px 16px", border: `1.5px solid ${C.border}`, display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                <FaMapMarkerAlt size={14} style={{ color: C.gold, flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{page.mapLocationName}</div>
                  <div style={{ fontSize: 12, color: C.text }}>{page.mapLocationAddress}</div>
                </div>
              </div>
              <div style={{ background: C.light, borderRadius: 10, padding: "14px 16px", border: `1.5px solid ${C.border}`, display: "flex", alignItems: "flex-start", gap: 10 }}>
                <FaClock size={14} style={{ color: C.gold, flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.dark, marginBottom: 4 }}>{page.hoursTitle}</div>
                  {page.hours.map((line, i) => (
                    <div key={i} style={{ fontSize: 12, color: C.text }}>{line}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 32, height: 2, background: C.gold }} />
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.goldText }}>{page.formEyebrow}</span>
              </div>
              <h2 style={{ fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 900, color: C.dark, margin: "0 0 16px" }}>
                {page.formTitle}
              </h2>

              <div style={{ background: C.light, borderRadius: 16, padding: "24px 20px", border: `1.5px solid ${C.border}` }}>

                {/* Success */}
                {status === "success" && (
                  <div style={{ background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 10, padding: "12px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                    <FaCheck size={13} style={{ color: "#16a34a", flexShrink: 0 }} />
                    <p style={{ fontSize: 13, color: "#16a34a", fontWeight: 600, margin: 0 }}>
                      {form.successMessage}
                    </p>
                  </div>
                )}

                {/* Error */}
                {status === "error" && (
                  <div style={{ background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 10, padding: "12px 16px", marginBottom: 16 }}>
                    <p style={{ fontSize: 13, color: "#dc2626", fontWeight: 600, margin: 0 }}>{errorMsg}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {[
                    { label: form.nameLabel,  name: "name",  type: "text",  placeholder: form.namePlaceholder,  required: true },
                    { label: form.phoneLabel, name: "phone", type: "tel",   placeholder: form.phonePlaceholder, required: true },
                    { label: form.emailLabel, name: "email", type: "email", placeholder: form.emailPlaceholder, required: false },
                  ].map(field => (
                    <div key={field.name} style={{ marginBottom: 14 }}>
                      <label style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 5 }}>
                        {field.label}
                      </label>
                      <input
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.required}
                        style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${C.border}`, fontSize: 13, color: C.dark, background: "#fff", outline: "none", boxSizing: "border-box" }}
                      />
                    </div>
                  ))}

                  <div style={{ marginBottom: 18 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 5 }}>
                      {form.messageLabel}
                    </label>
                    <textarea
                      name="message"
                      placeholder={form.messagePlaceholder}
                      rows={4}
                      required
                      style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${C.border}`, fontSize: 13, color: C.dark, background: "#fff", outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    style={{ width: "100%", padding: "12px", borderRadius: 8, border: "none", background: status === "loading" ? "#d4b86a" : C.gold, color: C.dark, fontSize: 13, fontWeight: 800, cursor: status === "loading" ? "not-allowed" : "pointer" }}
                  >
                    {status === "loading" ? form.sendingLabel : form.submitLabel}
                  </button>

                  <p style={{ fontSize: 11, color: C.text, textAlign: "center", marginTop: 10, marginBottom: 0 }}>
                    {form.callText}{" "}
                    <a href={site.phoneHref} style={{ color: C.goldText, fontWeight: 700, textDecoration: "none" }}>{site.phone}</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="page-section wrap">
        <div style={{ width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 32, height: 2, background: C.gold }} />
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.goldText }}>{page.teamEyebrow}</span>
          </div>
          <h2 style={{ fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 900, color: C.dark, margin: "0 0 20px" }}>
            {page.teamTitle}
          </h2>
          <div className="contact-team-grid">
            {TEAM_CONTACTS.map((member, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "20px 18px", border: `1.5px solid ${C.border}`, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: C.gold }} />
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: C.dark, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                  <FaUser size={16} style={{ color: C.gold }} />
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 800, color: C.dark, margin: "0 0 2px" }}>{member.name}</h3>
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: C.goldText }}>{member.role}</span>
                <p style={{ fontSize: 12, color: C.text, margin: "6px 0 0", lineHeight: 1.5 }}>{member.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}