"use client"

import { useState } from "react"
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaUser, FaCheck } from "react-icons/fa"
import Breadcrumb from "@/app/components/common/Breadcrumb"
import { submitContact } from "@/app/actions/submitContact"

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

const CONTACT_INFO = [
  { icon: FaPhone,        label: "Main Phone", value: "580-226-7811",           sub: "Call us during business hours",    href: "tel:580-226-7811",                                                          color: C.gold },
  { icon: FaPhone,        label: "Cell",       value: "580-221-3494",           sub: "Rick Carrell — President",         href: "tel:580-221-3494",                                                          color: C.blue },
  { icon: FaEnvelope,     label: "Email",      value: "rick@carrelltrucking.com", sub: "We'll respond as soon as possible", href: "mailto:rick@carrelltrucking.com",                                         color: C.gold },
  { icon: FaMapMarkerAlt, label: "Address",    value: "3801 Springdale Road",   sub: "Ardmore, OK 73401",                href: "https://maps.google.com/?q=3801+Springdale+Road+Ardmore+OK", color: C.blue },
]

const TEAM_CONTACTS = [
  { name: "Rick Carrell", role: "President",     note: "General inquiries & rentals" },
  { name: "Wendy",        role: "Billing",        note: "Billing & payment questions" },
  { name: "Royce Brad",   role: "Office Manager", note: "Office & admin questions" },
]

export default function ContactPage() {
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
        .contact-team-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr; gap: 24px; }
          .contact-info-grid { grid-template-columns: 1fr; }
          .contact-team-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Hero */}
      <div style={{ background: C.dark, padding: "20px 24px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 32, height: 2, background: C.gold }} />
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>
              Get In Touch
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 900, color: "#fff", margin: "0 0 12px", lineHeight: 1.15 }}>
            Contact <span style={{ color: C.gold }}>Ardmore Trailer</span>
          </h1>
          <p style={{ fontSize: 14, color: C.muted, maxWidth: 520, lineHeight: 1.8, margin: 0 }}>
            Have a question about rentals? Need a quote? Reach out to our team directly — no call centers, just real people.
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div style={{ background: C.light, padding: "48px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 32, height: 2, background: C.gold }} />
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>Reach Us</span>
          </div>
          <h2 style={{ fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 900, color: C.dark, margin: "0 0 24px" }}>
            Contact Information
          </h2>
          <div className="contact-info-grid">
            {CONTACT_INFO.map(info => (
              <a key={info.label} href={info.href}
                target={info.label === "Address" ? "_blank" : undefined}
                rel={info.label === "Address" ? "noopener noreferrer" : undefined}
                style={{ textDecoration: "none" }}
              >
                <div style={{ background: "#fff", borderRadius: 14, padding: "20px", border: `1.5px solid ${C.border}`, display: "flex", alignItems: "flex-start", gap: 14, cursor: "pointer" }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, flexShrink: 0, background: info.color + "18", border: `1px solid ${info.color}33`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <info.icon size={16} style={{ color: info.color }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: C.muted, marginBottom: 3 }}>{info.label}</div>
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
      <div style={{ background: "#fff", padding: "48px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="contact-grid">

            {/* Map */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 32, height: 2, background: C.gold }} />
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>Find Us</span>
              </div>
              <h2 style={{ fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 900, color: C.dark, margin: "0 0 16px" }}>
                Visit Our Location
              </h2>
              <div style={{ borderRadius: 14, overflow: "hidden", border: `1.5px solid ${C.border}`, marginBottom: 12 }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3252.7!2d-97.1!3d34.17!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s3801+Springdale+Road%2C+Ardmore%2C+OK+73401!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%" height="260"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen="" loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ardmore Trailer Location"
                />
              </div>
              <div style={{ background: C.light, borderRadius: 10, padding: "14px 16px", border: `1.5px solid ${C.border}`, display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                <FaMapMarkerAlt size={14} style={{ color: C.gold, flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Ardmore Trailer, Inc.</div>
                  <div style={{ fontSize: 12, color: C.text }}>3801 Springdale Road, Ardmore, OK 73401</div>
                </div>
              </div>
              <div style={{ background: C.light, borderRadius: 10, padding: "14px 16px", border: `1.5px solid ${C.border}`, display: "flex", alignItems: "flex-start", gap: 10 }}>
                <FaClock size={14} style={{ color: C.gold, flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.dark, marginBottom: 4 }}>Business Hours</div>
                  <div style={{ fontSize: 12, color: C.text }}>Monday – Friday: 8:00 AM – 5:00 PM</div>
                  <div style={{ fontSize: 12, color: C.text }}>Saturday: By appointment</div>
                  <div style={{ fontSize: 12, color: C.text }}>Sunday: Closed</div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 32, height: 2, background: C.gold }} />
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>Send a Message</span>
              </div>
              <h2 style={{ fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 900, color: C.dark, margin: "0 0 16px" }}>
                Quick Contact
              </h2>

              <div style={{ background: C.light, borderRadius: 16, padding: "24px 20px", border: `1.5px solid ${C.border}` }}>

                {/* Success */}
                {status === "success" && (
                  <div style={{ background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 10, padding: "12px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                    <FaCheck size={13} style={{ color: "#16a34a", flexShrink: 0 }} />
                    <p style={{ fontSize: 13, color: "#16a34a", fontWeight: 600, margin: 0 }}>
                      Message sent! We'll get back to you shortly.
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
                    { label: "Full Name *",    name: "name",    type: "text",  placeholder: "Your full name",    required: true },
                    { label: "Phone Number *", name: "phone",   type: "tel",   placeholder: "Your phone number", required: true },
                    { label: "Email Address",  name: "email",   type: "email", placeholder: "your@email.com",    required: false },
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
                      Message *
                    </label>
                    <textarea
                      name="message"
                      placeholder="Tell us what you need..."
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
                    {status === "loading" ? "Sending..." : "Send Message"}
                  </button>

                  <p style={{ fontSize: 11, color: C.muted, textAlign: "center", marginTop: 10, marginBottom: 0 }}>
                    Or call us at{" "}
                    <a href="tel:580-226-7811" style={{ color: C.gold, fontWeight: 700, textDecoration: "none" }}>580-226-7811</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div style={{ background: C.light, padding: "48px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 32, height: 2, background: C.gold }} />
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>Who to Contact</span>
          </div>
          <h2 style={{ fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 900, color: C.dark, margin: "0 0 20px" }}>
            Reach the Right Person
          </h2>
          <div className="contact-team-grid">
            {TEAM_CONTACTS.map(member => (
              <div key={member.name} style={{ background: "#fff", borderRadius: 12, padding: "20px 18px", border: `1.5px solid ${C.border}`, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: C.gold }} />
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: C.dark, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                  <FaUser size={16} style={{ color: C.gold }} />
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 800, color: C.dark, margin: "0 0 2px" }}>{member.name}</h3>
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: C.gold }}>{member.role}</span>
                <p style={{ fontSize: 12, color: C.text, margin: "6px 0 0", lineHeight: 1.5 }}>{member.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}