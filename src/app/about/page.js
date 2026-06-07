import Link from "next/link"
import {
  FaPhone, FaEnvelope, FaMapMarkerAlt,
  FaShieldAlt, FaHandshake, FaTruck,
  FaUsers, FaAward, FaClock
} from "react-icons/fa"

const STATS = [
  { value: "8+",   label: "Equipment Types" },
  { value: "2 Mo", label: "Min. Rental Period" },
  { value: "OK+",  label: "Service Area" },
  { value: "24/7", label: "Support Available" },
]

const TEAM = [
  { name: "Rick Carrell", role: "President" },
  { name: "Wendy",        role: "Billing" },
  { name: "Royce Brad",   role: "Office" },
]

const VALUES = [
  { icon: FaShieldAlt,  title: "Quality First",        text: "Every unit is maintained to the highest standard before it leaves our yard." },
  { icon: FaHandshake,  title: "Honest Service",       text: "No hidden fees, no surprises. Transparent pricing from day one." },
  { icon: FaTruck,      title: "On-Time Delivery",     text: "We show up when we say we will — every time, no excuses." },
  { icon: FaAward,      title: "Industry Experience",  text: "Years of experience serving Oklahoma's toughest job sites." },
  { icon: FaClock,      title: "2-Month Minimum",      text: "Flexible rental terms starting at 2 months to match your project." },
  { icon: FaUsers,      title: "Local Team",           text: "Talk directly to Rick and the team — no call centers, ever." },
]

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

export const metadata = {
  title: "About Us | Ardmore Trailer, Inc.",
  description: "Learn about Ardmore Trailer, Inc. — Oklahoma's trusted trailer and container rental company.",
}

export default function AboutPage() {
  return (
    <>
      <style>{`
        .about-story-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }
        .about-values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .about-team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .about-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 32px;
        }
        .about-contact-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 24px;
        }
        .about-contact-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        @media (max-width: 768px) {
          .about-story-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .about-values-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .about-team-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .about-stats {
            flex-direction: column;
            gap: 16px;
          }
          .about-contact-strip {
            flex-direction: column;
            align-items: flex-start;
          }
          .about-contact-buttons {
            flex-direction: column;
            width: 100%;
          }
          .about-contact-buttons a {
            justify-content: center;
          }
          .about-story-image {
            height: 220px !important;
          }
        }
      `}</style>

      {/* ── Hero ── */}
      <div style={{ background: C.dark, padding: "48px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Breadcrumb */}
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <Link href="/" style={{ color: C.muted, textDecoration: "none" }}>Home</Link>
            <span>›</span>
            <span style={{ color: C.gold }}>About</span>
          </div>

          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 32, height: 2, background: C.gold }} />
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>
              Who We Are
            </span>
          </div>

          <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 900, color: "#fff", margin: "0 0 16px", lineHeight: 1.15 }}>
            Oklahoma's Trusted{" "}
            <span style={{ color: C.gold }}>Trailer & Container</span>{" "}
            Rental Company
          </h1>

          <p style={{ fontSize: 14, color: C.muted, maxWidth: 560, lineHeight: 1.8, margin: "0 0 32px" }}>
            Ardmore Trailer, Inc. has been serving Oklahoma and surrounding areas
            with professional trailer and container rentals. We deliver the right
            equipment to your site — on time, every time.
          </p>

          {/* Stats */}
          <div className="about-stats">
            {STATS.map(s => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 26, fontWeight: 900, color: C.gold }}>{s.value}</span>
                <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, color: C.muted }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Story Section ── */}
      <div style={{ background: "#fff", padding: "56px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="about-story-grid">

            {/* Image */}
            <div style={{ borderRadius: 16, overflow: "hidden", border: `1.5px solid ${C.border}` }}>
              <img
                src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=700&q=80"
                alt="Ardmore Trailer fleet"
                className="about-story-image"
                style={{ width: "100%", height: 360, objectFit: "cover", display: "block" }}
              />
            </div>

            {/* Text */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 32, height: 2, background: C.gold }} />
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>
                  Our Story
                </span>
              </div>

              <h2 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 900, color: C.dark, margin: "0 0 16px", lineHeight: 1.2 }}>
                Built on Trust, Delivered with Pride
              </h2>

              <p style={{ fontSize: 14, color: C.text, lineHeight: 1.8, marginBottom: 14 }}>
                Ardmore Trailer, Inc. was founded with one simple goal — provide
                reliable, high-quality trailer and container rentals to businesses
                and individuals across Oklahoma. From our base in Ardmore, we serve
                customers across the state and surrounding areas.
              </p>

              <p style={{ fontSize: 14, color: C.text, lineHeight: 1.8, marginBottom: 24 }}>
                Whether you need a dry container for on-site storage, a refrigerated
                trailer for temperature-sensitive cargo, a generator for a remote
                site, or a purpose-built mud lab — we have the equipment and
                experience to get the job done right.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "Minimum 2-month rental period",
                  "Serving Oklahoma & surrounding areas",
                  "8 equipment types available",
                  "Direct contact — no call centers",
                ].map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: "50%",
                      background: C.gold + "20", border: `1px solid ${C.gold}55`,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                    }}>
                      <span style={{ fontSize: 10, color: C.gold, fontWeight: 900 }}>✓</span>
                    </div>
                    <span style={{ fontSize: 13, color: C.text }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Values ── */}
      <div style={{ background: C.light, padding: "56px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 32, height: 2, background: C.gold }} />
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>
              What We Stand For
            </span>
          </div>

          <h2 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 900, color: C.dark, margin: "0 0 32px" }}>
            Our Values
          </h2>

          <div className="about-values-grid">
            {VALUES.map((v, i) => (
              <div key={v.title} style={{
                background: "#fff",
                borderRadius: 14,
                padding: "24px 20px",
                border: `1.5px solid ${C.border}`,
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: C.gold }} />
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: C.navy + "14", border: `1px solid ${C.navy}22`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 14
                }}>
                  <v.icon size={18} style={{ color: C.navy }} />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: C.dark, margin: "0 0 8px" }}>
                  {v.title}
                </h3>
                <p style={{ fontSize: 13, color: C.text, lineHeight: 1.7, margin: 0 }}>
                  {v.text}
                </p>
                <div style={{
                  position: "absolute", bottom: 10, right: 14,
                  fontSize: 32, fontWeight: 900, color: C.border, lineHeight: 1
                }}>
                  0{i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Team ── */}
      <div style={{ background: "#fff", padding: "56px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 32, height: 2, background: C.gold }} />
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>
              Our People
            </span>
          </div>

          <h2 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 900, color: C.dark, margin: "0 0 32px" }}>
            Meet the Team
          </h2>

          <div className="about-team-grid">
            {TEAM.map(member => (
              <div key={member.name} style={{
                background: C.light,
                borderRadius: 14,
                padding: "28px 24px",
                border: `1.5px solid ${C.border}`,
                textAlign: "center",
              }}>
                <div style={{
                  width: 64, height: 64, borderRadius: "50%",
                  background: C.dark,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px",
                }}>
                  <FaUsers size={24} style={{ color: C.gold }} />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: C.dark, margin: "0 0 4px" }}>
                  {member.name}
                </h3>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: C.gold }}>
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Contact Strip ── */}
      <div style={{ background: C.dark, padding: "48px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="about-contact-strip">
            <div>
              <h2 style={{ fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 900, color: "#fff", margin: "0 0 8px" }}>
                Ready to Get Started?{" "}
                <span style={{ color: C.gold }}>Let's Talk.</span>
              </h2>
              <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>
                Call us, send an email, or visit us in Ardmore, OK.
              </p>
            </div>
            <div className="about-contact-buttons">
              <a href="tel:580-226-7811" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontSize: 13, fontWeight: 700, padding: "12px 22px",
                borderRadius: 8, background: C.gold, color: C.dark, textDecoration: "none"
              }}>
                <FaPhone size={13} /> 580-226-7811
              </a>
              <a href="mailto:rick@carrelltrucking.com" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontSize: 13, fontWeight: 700, padding: "12px 22px",
                borderRadius: 8, border: `2px solid ${C.blue}`, color: C.blue, textDecoration: "none"
              }}>
                <FaEnvelope size={13} /> Email Us
              </a>
              <a href="https://maps.google.com/?q=3801+Springdale+Road+Ardmore+OK"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  fontSize: 13, fontWeight: 700, padding: "12px 22px",
                  borderRadius: 8, border: `2px solid ${C.muted}`, color: C.muted, textDecoration: "none"
                }}>
                <FaMapMarkerAlt size={13} /> Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}