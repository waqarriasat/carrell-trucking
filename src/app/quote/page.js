import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheck } from "react-icons/fa"
import Link from "next/link"

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
  "Container Dry",
  "Trailers",
  "Reefer Diesel",
  "Reefer Electric",
  "Reefer Container",
  "Generator Units",
  "Office Units",
  "Mud Lab",
]

const SERVICES = [
  "Commercial",
  "Residential",
  "Construction",
  "Industrial",
]

const WHY_QUOTE = [
  { text: "Free, no-obligation quote" },
  { text: "Fast response from our team" },
  { text: "No hidden fees or charges" },
  { text: "2-month minimum rental" },
  { text: "Serving Oklahoma & surrounding areas" },
  { text: "Talk directly to Rick — no call centers" },
]

export const metadata = {
  title: "Get a Quote | Ardmore Trailer, Inc.",
  description: "Request a free quote for trailer and container rentals in Oklahoma.",
}

export default function QuotePage() {
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
          .quote-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .quote-form-grid {
            grid-template-columns: 1fr;
          }
          .quote-fleet-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>

      {/* ── Hero ── */}
      <div style={{ background: C.dark, padding: "60px 24px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
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
            Tell us what you need and we'll get back to you with pricing and
            availability. No obligation, no pressure — just honest service.
          </p>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{ background: C.light, padding: "40px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="quote-grid">

            {/* ── LEFT: Form ── */}
            <div style={{
              background: "#fff",
              borderRadius: 16,
              padding: "28px 24px",
              border: `1.5px solid ${C.border}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div style={{ width: 28, height: 2, background: C.gold }} />
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>
                  Your Details
                </span>
              </div>
              <h2 style={{ fontSize: "clamp(18px, 3vw, 22px)", fontWeight: 900, color: C.dark, margin: "0 0 20px" }}>
                Request a Quote
              </h2>

              {/* Name + Phone */}
              <div className="quote-form-grid">
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 5 }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    style={{
                      width: "100%", padding: "9px 12px",
                      borderRadius: 8, border: `1.5px solid ${C.border}`,
                      fontSize: 13, color: C.dark, background: C.light,
                      outline: "none", boxSizing: "border-box"
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 5 }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="Your phone number"
                    style={{
                      width: "100%", padding: "9px 12px",
                      borderRadius: 8, border: `1.5px solid ${C.border}`,
                      fontSize: 13, color: C.dark, background: C.light,
                      outline: "none", boxSizing: "border-box"
                    }}
                  />
                </div>
              </div>

              {/* Email + Company */}
              <div className="quote-form-grid" style={{ marginTop: 14 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 5 }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    style={{
                      width: "100%", padding: "9px 12px",
                      borderRadius: 8, border: `1.5px solid ${C.border}`,
                      fontSize: 13, color: C.dark, background: C.light,
                      outline: "none", boxSizing: "border-box"
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 5 }}>
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your company (optional)"
                    style={{
                      width: "100%", padding: "9px 12px",
                      borderRadius: 8, border: `1.5px solid ${C.border}`,
                      fontSize: 13, color: C.dark, background: C.light,
                      outline: "none", boxSizing: "border-box"
                    }}
                  />
                </div>
              </div>

              {/* Equipment needed */}
              <div style={{ marginTop: 20 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 10 }}>
                  Equipment Needed *
                </label>
                <div className="quote-fleet-grid">
                  {FLEET_OPTIONS.map(option => (
                    <label key={option} style={{
                      display: "flex", alignItems: "center", gap: 8,
                      padding: "8px 12px", borderRadius: 8,
                      border: `1.5px solid ${C.border}`,
                      background: C.light, cursor: "pointer",
                      fontSize: 12, fontWeight: 600, color: C.text
                    }}>
                      <input type="checkbox" style={{ accentColor: C.gold }} />
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              {/* Service Type */}
              <div style={{ marginTop: 20 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 10 }}>
                  Service Type
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {SERVICES.map(service => (
                    <label key={service} style={{
                      display: "flex", alignItems: "center", gap: 8,
                      padding: "8px 14px", borderRadius: 8,
                      border: `1.5px solid ${C.border}`,
                      background: C.light, cursor: "pointer",
                      fontSize: 12, fontWeight: 600, color: C.text
                    }}>
                      <input type="radio" name="service" style={{ accentColor: C.gold }} />
                      {service}
                    </label>
                  ))}
                </div>
              </div>

              {/* Rental Duration */}
              <div style={{ marginTop: 20 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 5 }}>
                  Estimated Rental Duration
                </label>
                <select style={{
                  width: "100%", padding: "9px 12px",
                  borderRadius: 8, border: `1.5px solid ${C.border}`,
                  fontSize: 13, color: C.dark, background: C.light,
                  outline: "none", boxSizing: "border-box"
                }}>
                  <option value="">Select duration</option>
                  <option>2 Months</option>
                  <option>3 Months</option>
                  <option>4-6 Months</option>
                  <option>6-12 Months</option>
                  <option>12+ Months</option>
                </select>
              </div>

              {/* Delivery Location */}
              <div style={{ marginTop: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 5 }}>
                  Delivery Location *
                </label>
                <input
                  type="text"
                  placeholder="City, State or full address"
                  style={{
                    width: "100%", padding: "9px 12px",
                    borderRadius: 8, border: `1.5px solid ${C.border}`,
                    fontSize: 13, color: C.dark, background: C.light,
                    outline: "none", boxSizing: "border-box"
                  }}
                />
              </div>

              {/* Additional Notes */}
              <div style={{ marginTop: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 5 }}>
                  Additional Notes
                </label>
                <textarea
                  placeholder="Any specific requirements, sizes, or questions..."
                  rows={4}
                  style={{
                    width: "100%", padding: "9px 12px",
                    borderRadius: 8, border: `1.5px solid ${C.border}`,
                    fontSize: 13, color: C.dark, background: C.light,
                    outline: "none", resize: "vertical",
                    boxSizing: "border-box", fontFamily: "inherit"
                  }}
                />
              </div>

              {/* Submit */}
              <button style={{
                width: "100%", padding: "13px",
                borderRadius: 8, border: "none",
                background: C.gold, color: C.dark,
                fontSize: 14, fontWeight: 800,
                cursor: "pointer", marginTop: 20,
                letterSpacing: 0.5
              }}>
                Submit Quote Request
              </button>

              <p style={{ fontSize: 11, color: C.muted, textAlign: "center", marginTop: 10, marginBottom: 0 }}>
                Or call us directly at{" "}
                <a href="tel:580-226-7811" style={{ color: C.gold, fontWeight: 700, textDecoration: "none" }}>
                  580-226-7811
                </a>
              </p>
            </div>

            {/* ── RIGHT: Info Panel ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Why get a quote */}
              <div style={{
                background: C.dark,
                borderRadius: 14,
                padding: "24px 20px",
                border: `1.5px solid ${C.navy}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <div style={{ width: 24, height: 2, background: C.gold }} />
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>
                    Why Choose Us
                  </span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 900, color: "#fff", margin: "0 0 16px" }}>
                  What You Can Expect
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {WHY_QUOTE.map(item => (
                    <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 20, height: 20, borderRadius: "50%",
                        background: C.gold + "20", border: `1px solid ${C.gold}44`,
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                      }}>
                        <FaCheck size={9} style={{ color: C.gold }} />
                      </div>
                      <span style={{ fontSize: 13, color: C.muted }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact direct */}
              <div style={{
                background: "#fff",
                borderRadius: 14,
                padding: "24px 20px",
                border: `1.5px solid ${C.border}`,
              }}>
                <h3 style={{ fontSize: 15, fontWeight: 900, color: C.dark, margin: "0 0 16px" }}>
                  Prefer to Call?
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <a href="tel:580-226-7811" style={{
                    display: "flex", alignItems: "center", gap: 12,
                    textDecoration: "none"
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 8,
                      background: C.gold + "18", border: `1px solid ${C.gold}33`,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                    }}>
                      <FaPhone size={14} style={{ color: C.gold }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: C.muted }}>Main</div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: C.dark }}>580-226-7811</div>
                    </div>
                  </a>
                  <a href="tel:580-221-3494" style={{
                    display: "flex", alignItems: "center", gap: 12,
                    textDecoration: "none"
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 8,
                      background: C.blue + "18", border: `1px solid ${C.blue}33`,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                    }}>
                      <FaPhone size={14} style={{ color: C.blue }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: C.muted }}>Cell</div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: C.dark }}>580-221-3494</div>
                    </div>
                  </a>
                  <a href="mailto:rick@carrelltrucking.com" style={{
                    display: "flex", alignItems: "center", gap: 12,
                    textDecoration: "none"
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 8,
                      background: C.gold + "18", border: `1px solid ${C.gold}33`,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                    }}>
                      <FaEnvelope size={14} style={{ color: C.gold }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: C.muted }}>Email</div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: C.dark }}>rick@carrelltrucking.com</div>
                    </div>
                  </a>

                  <a
                  
                    href="https://maps.google.com/?q=3801+Springdale+Road+Ardmore+OK"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: 8,
                      background: C.blue + "18", border: `1px solid ${C.blue}33`,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                    }}>
                      <FaMapMarkerAlt size={14} style={{ color: C.blue }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: C.muted }}>Address</div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: C.dark }}>3801 Springdale Rd, Ardmore OK</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Min rental note */}
              <div style={{
                background: C.gold + "15",
                borderRadius: 12,
                padding: "16px 18px",
                border: `1.5px solid ${C.gold}44`,
              }}>
                <p style={{ fontSize: 12, color: C.dark, margin: 0, lineHeight: 1.6, fontWeight: 600 }}>
                  📋 <strong>Minimum Rental Period:</strong> 2 Months.
                  All rentals are subject to equipment availability.
                  We serve Oklahoma and surrounding areas.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}