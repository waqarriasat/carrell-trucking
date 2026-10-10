import Link from "next/link"
import Breadcrumb from "@/app/components/common/Breadcrumb"
import { FaPhone, FaEnvelope, FaLocationDot, FaUsers } from "react-icons/fa6"
import { getContent } from "@/app/lib/server/content"
import { getIcon } from "@/app/lib/content/icons"

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

export async function generateMetadata() {
  const { about } = await getContent()
  return {
    title: about.metaTitle,
    description: about.metaDescription,
  }
}

export default async function AboutPage() {
  const { about: page, site } = await getContent()
  const STATS = page.stats
  const TEAM = page.team
  const VALUES = page.values.map((v) => ({ ...v, icon: getIcon(v.icon, "fa6/FaShield") }))

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
          /* one row for 3 or 4 people */
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
      <div style={{ background: C.dark, padding: "20px 24px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Breadcrumb */}
          <Breadcrumb crumbs={[{ label: page.breadcrumbHome, href: "/" }, { label: page.breadcrumbCurrent }]} />

          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 32, height: 2, background: C.gold }} />
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>
              {page.eyebrow}
            </span>
          </div>

          <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 900, color: "#fff", margin: "0 0 16px", lineHeight: 1.15 }}>
            {page.titleStart}{" "}
            <span style={{ color: C.gold }}>{page.titleAccent}</span>{" "}
            {page.titleEnd}
          </h1>

          <p style={{ fontSize: 14, color: C.muted, maxWidth: 560, lineHeight: 1.8, margin: "0 0 32px" }}>
            {page.text}
          </p>

          {/* Stats */}
          <div className="about-stats">
            {STATS.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
                src={page.storyImage}
                alt={page.storyImageAlt}
                className="about-story-image"
                style={{ width: "100%", height: 360, objectFit: "cover", display: "block" }}
              />
            </div>

            {/* Text */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 32, height: 2, background: C.gold }} />
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>
                  {page.storyEyebrow}
                </span>
              </div>

              <h2 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 900, color: C.dark, margin: "0 0 16px", lineHeight: 1.2 }}>
                {page.storyTitle}
              </h2>

              <p style={{ fontSize: 14, color: C.text, lineHeight: 1.8, marginBottom: 14 }}>
                {page.storyParagraph1}
              </p>

              <p style={{ fontSize: 14, color: C.text, lineHeight: 1.8, marginBottom: 24 }}>
                {page.storyParagraph2}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {page.storyChecklist.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
              {page.valuesEyebrow}
            </span>
          </div>

          <h2 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 900, color: C.dark, margin: "0 0 32px" }}>
            {page.valuesTitle}
          </h2>

          <div className="about-values-grid">
            {VALUES.map((v, i) => (
              <div key={i} style={{
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
              {page.teamEyebrow}
            </span>
          </div>

          <h2 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 900, color: C.dark, margin: "0 0 32px" }}>
            {page.teamTitle}
          </h2>

          <div className="about-team-grid">
            {TEAM.map((member, i) => (
              <div key={i} style={{
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
                  ...(member.photo ? { overflow: "hidden" } : {}),
                }}>
                  {member.photo ? (
                    <img src={member.photo} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  ) : (
                    <FaUsers size={24} style={{ color: C.gold }} />
                  )}
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
                {page.ctaTitle}{" "}
                <span style={{ color: C.gold }}>{page.ctaAccent}</span>
              </h2>
              <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>
                {page.ctaText}
              </p>
            </div>
            <div className="about-contact-buttons">
              <a href={site.phoneHref} style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontSize: 13, fontWeight: 700, padding: "12px 22px",
                borderRadius: 8, background: C.gold, color: C.dark, textDecoration: "none"
              }}>
                <FaPhone size={13} /> {page.ctaCallLabel}
              </a>
              <a href={site.emailHref} style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontSize: 13, fontWeight: 700, padding: "12px 22px",
                borderRadius: 8, border: `2px solid ${C.blue}`, color: C.blue, textDecoration: "none"
              }}>
                <FaEnvelope size={13} /> {page.ctaEmailLabel}
              </a>
              <a href={site.mapsHref}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  fontSize: 13, fontWeight: 700, padding: "12px 22px",
                  borderRadius: 8, border: `2px solid ${C.muted}`, color: C.muted, textDecoration: "none"
                }}>
                <FaLocationDot size={13} /> {page.ctaDirectionsLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}