"use client"

import { useState } from "react"
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheck } from "react-icons/fa"
import Breadcrumb from "@/app/components/common/Breadcrumb"
import Link from "next/link"
import { submitQuote } from "@/app/actions/submitQuote"

const C = {
  dark:   "#0f2d4a",
  navy:   "#1e4d7b",
  blue:   "#2d8fdd",
  gold:   "#c9a84c",
  muted:  "#7a9bb5",
  light:  "#f0f6fb",
  border: "#d6e8f5",
  text:   "#4a6b85",
}

const FLEET_OPTIONS = [
  "Container Dry", "Trailers", "Reefer Diesel",
  "Reefer Electric", "Reefer Container",
  "Generator Units", "Office Units", "Mud Lab",
]

const SERVICES = ["Commercial", "Residential", "Construction", "Industrial"]

const WHY_QUOTE = [
  { text: "Free, no-obligation quote" },
  { text: "Fast response from our team" },
  { text: "No hidden fees or charges" },
  { text: "2-month minimum rental" },
  { text: "Serving Oklahoma & surrounding areas" },
  { text: "Talk directly to Rick — no call centers" },
]

export default function QuotePage() {
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
        @media (max-width: 768px) {
          .quote-grid { grid-template-columns: 1fr; gap: 24px; }
          .quote-form-grid { grid-template-columns: 1fr; }
          .quote-fleet-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      {/* Hero */}
      <div style={{ background: C.dark, padding: "20px 24px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Get a Quote" }]} />
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 28, height: 2, background: C.gold }} />
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>
              Free Quote
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 900, color: "#fff", margin: "0 0 10px", lineHeight: 1.15 }}>
            Get a <span style={{ color: C.gold }}>Free Quote</span>
          </h1>
          <p style={{ fontSize: 13, color: C.muted, maxWidth: 480, lineHeight: 1.7, margin: 0 }}>
            Tell us what you need and we'll get back to you with pricing and availability. No obligation, no pressure.
          </p>
        </div>
      </div>

      {/* Main */}
      <div style={{ background: C.light, padding: "40px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="quote-grid">

            {/* Form */}
            <div style={{ background: "#fff", borderRadius: 16, padding: "28px 24px", border: `1.5px solid ${C.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div style={{ width: 28, height: 2, background: C.gold }} />
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>
                  Your Details
                </span>
              </div>
              <h2 style={{ fontSize: "clamp(18px, 3vw, 22px)", fontWeight: 900, color: C.dark, margin: "0 0 20px" }}>
                Request a Quote
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
                    Quote request sent! We'll get back to you shortly.
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
                    <label style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 5 }}>Full Name *</label>
                    <input name="name" type="text" placeholder="Your full name" required
                      style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${C.border}`, fontSize: 13, color: C.dark, background: C.light, outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 5 }}>Phone Number *</label>
                    <input name="phone" type="tel" placeholder="Your phone number" required
                      style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${C.border}`, fontSize: 13, color: C.dark, background: C.light, outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                </div>

                {/* Email + Company */}
                <div className="quote-form-grid" style={{ marginTop: 14 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 5 }}>Email Address</label>
                    <input name="email" type="email" placeholder="your@email.com"
                      style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${C.border}`, fontSize: 13, color: C.dark, background: C.light, outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 5 }}>Company Name</label>
                    <input name="company" type="text" placeholder="Your company (optional)"
                      style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${C.border}`, fontSize: 13, color: C.dark, background: C.light, outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                </div>

                {/* Equipment */}
                <div style={{ marginTop: 20 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 10 }}>Equipment Needed *</label>
                  <div className="quote-fleet-grid">
                    {FLEET_OPTIONS.map(option => (
                      <label key={option} style={{
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
                  <label style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 10 }}>Service Type</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {SERVICES.map(service => (
                      <label key={service} style={{
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
                  <label style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 5 }}>Estimated Rental Duration</label>
                  <select name="duration"
                    style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${C.border}`, fontSize: 13, color: C.dark, background: C.light, outline: "none", boxSizing: "border-box" }}
                  >
                    <option value="">Select duration</option>
                    <option>2 Months</option>
                    <option>3 Months</option>
                    <option>4-6 Months</option>
                    <option>6-12 Months</option>
                    <option>12+ Months</option>
                  </select>
                </div>

                {/* Location */}
                <div style={{ marginTop: 14 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 5 }}>Delivery Location *</label>
                  <input name="location" type="text" placeholder="City, State or full address" required
                    style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${C.border}`, fontSize: 13, color: C.dark, background: C.light, outline: "none", boxSizing: "border-box" }}
                  />
                </div>

                {/* Notes */}
                <div style={{ marginTop: 14 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 5 }}>Additional Notes</label>
                  <textarea name="notes" placeholder="Any specific requirements, sizes, or questions..." rows={4}
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
                  {status === "loading" ? "Sending..." : "Submit Quote Request"}
                </button>

                <p style={{ fontSize: 11, color: C.muted, textAlign: "center", marginTop: 10, marginBottom: 0 }}>
                  Or call us at{" "}
                  <a href="tel:580-226-7811" style={{ color: C.gold, fontWeight: 700, textDecoration: "none" }}>580-226-7811</a>
                </p>
              </form>
            </div>

            {/* Right panel */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ background: C.dark, borderRadius: 14, padding: "24px 20px", border: `1.5px solid ${C.navy}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <div style={{ width: 24, height: 2, background: C.gold }} />
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>Why Choose Us</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 900, color: "#fff", margin: "0 0 16px" }}>What You Can Expect</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {WHY_QUOTE.map(item => (
                    <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: C.gold + "20", border: `1px solid ${C.gold}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <FaCheck size={9} style={{ color: C.gold }} />
                      </div>
                      <span style={{ fontSize: 13, color: C.muted }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: "#fff", borderRadius: 14, padding: "24px 20px", border: `1.5px solid ${C.border}` }}>
                <h3 style={{ fontSize: 15, fontWeight: 900, color: C.dark, margin: "0 0 16px" }}>Prefer to Call?</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { icon: FaPhone, label: "Main", value: "580-226-7811", href: "tel:580-226-7811", color: C.gold },
                    { icon: FaPhone, label: "Cell", value: "580-221-3494", href: "tel:580-221-3494", color: C.blue },
                    { icon: FaEnvelope, label: "Email", value: "rick@carrelltrucking.com", href: "mailto:rick@carrelltrucking.com", color: C.gold },
                    { icon: FaMapMarkerAlt, label: "Address", value: "3801 Springdale Rd, Ardmore OK", href: "https://maps.google.com/?q=3801+Springdale+Road+Ardmore+OK", color: C.blue },
                  ].map(contact => (
                    <a key={contact.label} href={contact.href} style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: contact.color + "18", border: `1px solid ${contact.color}33`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <contact.icon size={14} style={{ color: contact.color }} />
                      </div>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: C.muted }}>{contact.label}</div>
                        <div style={{ fontSize: 13, fontWeight: 800, color: C.dark }}>{contact.value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div style={{ background: C.gold + "15", borderRadius: 12, padding: "16px 18px", border: `1.5px solid ${C.gold}44` }}>
                <p style={{ fontSize: 12, color: C.dark, margin: 0, lineHeight: 1.6, fontWeight: 600 }}>
                  📋 <strong>Minimum Rental Period:</strong> 2 Months. All rentals subject to availability. Serving Oklahoma and surrounding areas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}