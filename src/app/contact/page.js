import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaUser } from "react-icons/fa"

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
  {
    icon: FaPhone,
    label: "Main Phone",
    value: "580-226-7811",
    sub: "Call us during business hours",
    href: "tel:580-226-7811",
    color: C.gold,
  },
  {
    icon: FaPhone,
    label: "Cell",
    value: "580-221-3494",
    sub: "Rick Carrell — President",
    href: "tel:580-221-3494",
    color: C.blue,
  },
  {
    icon: FaEnvelope,
    label: "Email",
    value: "rick@carrelltrucking.com",
    sub: "We'll respond as soon as possible",
    href: "mailto:rick@carrelltrucking.com",
    color: C.gold,
  },
  {
    icon: FaMapMarkerAlt,
    label: "Address",
    value: "3801 Springdale Road",
    sub: "Ardmore, OK 73401",
    href: "https://maps.google.com/?q=3801+Springdale+Road+Ardmore+OK",
    color: C.blue,
  },
]

const TEAM_CONTACTS = [
  { name: "Rick Carrell", role: "President",          note: "General inquiries & rentals" },
  { name: "Wendy",        role: "Billing",             note: "Billing & payment questions" },
  { name: "Royce Brad",   role: "Office Manager",      note: "Office & admin questions" },
]

export const metadata = {
  title: "Contact Us | Ardmore Trailer, Inc.",
  description: "Contact Ardmore Trailer, Inc. for trailer and container rental inquiries in Oklahoma.",
}

export default function ContactPage() {
  return (
    <>
      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }
        .contact-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .contact-team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .contact-info-grid {
            grid-template-columns: 1fr;
          }
          .contact-team-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* ── Hero ── */}
      <div style={{ background: C.dark, padding: "60px 24px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
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
            Have a question about rentals? Need a quote? Want to check availability?
            Reach out to our team directly — no call centers, just real people.
          </p>
        </div>
      </div>

      {/* ── Contact Info Cards ── */}
      <div style={{ background: C.light, padding: "56px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 32, height: 2, background: C.gold }} />
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>
              Reach Us
            </span>
          </div>
          <h2 style={{ fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 900, color: C.dark, margin: "0 0 28px" }}>
            Contact Information
          </h2>
            
          <div className="contact-info-grid">
            {CONTACT_INFO.map(info => (
              <a
                key={info.label}
                href={info.href}
                target={info.label === "Address" ? "_blank" : undefined}
                rel={info.label === "Address" ? "noopener noreferrer" : undefined}
                style={{ textDecoration: "none" }}
              >
                <div style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: "22px 20px",
                  border: `1.5px solid ${C.border}`,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  transition: "box-shadow 0.2s",
                  cursor: "pointer",
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                    background: info.color + "18",
                    border: `1px solid ${info.color}33`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <info.icon size={18} style={{ color: info.color }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: C.muted, marginBottom: 4 }}>
                      {info.label}
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: C.dark, marginBottom: 2 }}>
                      {info.value}
                    </div>
                    <div style={{ fontSize: 12, color: C.text }}>
                      {info.sub}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Map + Form ── */}
      <div style={{ background: "#fff", padding: "56px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="contact-grid">

            {/* Left - Map */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 32, height: 2, background: C.gold }} />
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>
                  Find Us
                </span>
              </div>
              <h2 style={{ fontSize: "clamp(20px, 4vw, 26px)", fontWeight: 900, color: C.dark, margin: "0 0 20px" }}>
                Visit Our Location
              </h2>

              {/* Map embed */}
              <div style={{ borderRadius: 14, overflow: "hidden", border: `1.5px solid ${C.border}`, marginBottom: 16 }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3252.7!2d-97.1!3d34.17!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s3801+Springdale+Road%2C+Ardmore%2C+OK+73401!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="280"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ardmore Trailer Location"
                />
              </div>

              {/* Address block */}
              <div style={{
                background: C.light,
                borderRadius: 12,
                padding: "16px 18px",
                border: `1.5px solid ${C.border}`,
                display: "flex", alignItems: "flex-start", gap: 12
              }}>
                <FaMapMarkerAlt size={16} style={{ color: C.gold, flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>Ardmore Trailer, Inc.</div>
                  <div style={{ fontSize: 13, color: C.text }}>3801 Springdale Road, Ardmore, OK 73401</div>
                </div>
              </div>

              {/* Hours */}
              <div style={{
                background: C.light,
                borderRadius: 12,
                padding: "16px 18px",
                border: `1.5px solid ${C.border}`,
                display: "flex", alignItems: "flex-start", gap: 12,
                marginTop: 12
              }}>
                <FaClock size={16} style={{ color: C.gold, flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.dark, marginBottom: 4 }}>Business Hours</div>
                  <div style={{ fontSize: 13, color: C.text }}>Monday – Friday: 8:00 AM – 5:00 PM</div>
                  <div style={{ fontSize: 13, color: C.text }}>Saturday: By appointment</div>
                  <div style={{ fontSize: 13, color: C.text }}>Sunday: Closed</div>
                </div>
              </div>
            </div>

            {/* Right - Quick Contact Form */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 32, height: 2, background: C.gold }} />
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>
                  Send a Message
                </span>
              </div>
              <h2 style={{ fontSize: "clamp(20px, 4vw, 26px)", fontWeight: 900, color: C.dark, margin: "0 0 20px" }}>
                Quick Contact
              </h2>

              <div style={{
                background: C.light,
                borderRadius: 16,
                padding: "28px 24px",
                border: `1.5px solid ${C.border}`,
              }}>
                {/* Name */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 6 }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    style={{
                      width: "100%", padding: "10px 14px",
                      borderRadius: 8, border: `1.5px solid ${C.border}`,
                      fontSize: 13, color: C.dark, background: "#fff",
                      outline: "none", boxSizing: "border-box"
                    }}
                  />
                </div>

                {/* Phone */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 6 }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="Your phone number"
                    style={{
                      width: "100%", padding: "10px 14px",
                      borderRadius: 8, border: `1.5px solid ${C.border}`,
                      fontSize: 13, color: C.dark, background: "#fff",
                      outline: "none", boxSizing: "border-box"
                    }}
                  />
                </div>

                {/* Email */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 6 }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    style={{
                      width: "100%", padding: "10px 14px",
                      borderRadius: 8, border: `1.5px solid ${C.border}`,
                      fontSize: 13, color: C.dark, background: "#fff",
                      outline: "none", boxSizing: "border-box"
                    }}
                  />
                </div>

                {/* Message */}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: C.dark, display: "block", marginBottom: 6 }}>
                    Message *
                  </label>
                  <textarea
                    placeholder="Tell us what you need..."
                    rows={4}
                    style={{
                      width: "100%", padding: "10px 14px",
                      borderRadius: 8, border: `1.5px solid ${C.border}`,
                      fontSize: 13, color: C.dark, background: "#fff",
                      outline: "none", resize: "vertical", boxSizing: "border-box",
                      fontFamily: "inherit"
                    }}
                  />
                </div>

                <button style={{
                  width: "100%", padding: "13px",
                  borderRadius: 8, border: "none",
                  background: C.gold, color: C.dark,
                  fontSize: 14, fontWeight: 800,
                  cursor: "pointer", letterSpacing: 0.5
                }}>
                  Send Message
                </button>

                <p style={{ fontSize: 11, color: C.muted, textAlign: "center", marginTop: 12, marginBottom: 0 }}>
                  Or call us directly at{" "}
                  <a href="tel:580-226-7811" style={{ color: C.gold, fontWeight: 700, textDecoration: "none" }}>
                    580-226-7811
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Team Contacts ── */}
      <div style={{ background: C.light, padding: "48px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 32, height: 2, background: C.gold }} />
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>
              Who to Contact
            </span>
          </div>
          <h2 style={{ fontSize: "clamp(20px, 4vw, 26px)", fontWeight: 900, color: C.dark, margin: "0 0 24px" }}>
            Reach the Right Person
          </h2>
          <div className="contact-team-grid">
            {TEAM_CONTACTS.map(member => (
              <div key={member.name} style={{
                background: "#fff",
                borderRadius: 14,
                padding: "22px 20px",
                border: `1.5px solid ${C.border}`,
                position: "relative", overflow: "hidden"
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: C.gold }} />
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: C.dark,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 12
                }}>
                  <FaUser size={18} style={{ color: C.gold }} />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: C.dark, margin: "0 0 2px" }}>
                  {member.name}
                </h3>
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: C.gold }}>
                  {member.role}
                </span>
                <p style={{ fontSize: 12, color: C.text, margin: "8px 0 0", lineHeight: 1.5 }}>
                  {member.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}