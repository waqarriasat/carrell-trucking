"use client"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import { FaCheck, FaPhone } from "react-icons/fa"
import Breadcrumb from "@/app/components/common/Breadcrumb"
import { FaFileInvoice } from "react-icons/fa6"
import { imageProps, isCutout } from "@/app/lib/content/images"

const C = {
  dark: "#0f2d4a",
  navy: "#1e4d7b",
  blue: "#2d8fdd",
  gold: "#c9a84c",
  muted: "#7a9bb5",
  light: "#f0f6fb",
  border: "#d6e8f5",
  text: "#4a6b85",
}

export default function FleetDetail({ item, fleet, fleetDetail, fleetPage, site }) {
  const allImages = [item.image, ...(item.gallery || [])].filter(Boolean)
  const [activeImage, setActiveImage] = useState(0)

  return (
    <>
      <style>{`
        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: start;
        }
        /* 7 other items: 4 + 3 on desktop, centered so no card is left alone */
        .other-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
        .other-card { flex: 0 1 calc(25% - 7.5px); min-width: 0; }
        @media (max-width: 768px) { .other-card { flex-basis: calc(50% - 5px); } }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
        }
        .features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px 16px;
        }
        .thumb {
          cursor: pointer;
          border-radius: 8px;
          overflow: hidden;
          border: 2px solid transparent;
          transition: all 0.2s;
          opacity: 0.65;
        }
        .thumb:hover { opacity: 1; }
        .thumb.active {
          border-color: #c9a84c;
          opacity: 1;
        }
        .main-image {
          transition: opacity 0.25s ease;
        }
        @media (max-width: 768px) {
          .detail-grid { grid-template-columns: 1fr; gap: 20px; }
          .gallery-grid { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>

      {/* ── Hero ── */}
      <div style={{ background: C.dark, padding: "20px var(--gutter) 40px" }}>
        <div style={{ width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, marginBottom: 16 }}>
  <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>{fleetPage.breadcrumbHome}</Link>
  <span style={{ color: "rgba(255,255,255,0.4)" }}>›</span>
  <Link href="/fleet" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>{fleetPage.breadcrumbCurrent}</Link>
  <span style={{ color: "rgba(255,255,255,0.4)" }}>›</span>
  <span style={{ color: "#c9a84c", fontWeight: 600 }}>{item.name}</span>
</div>

 {item.badge && (
            <span style={{
              display: "inline-block", fontSize: 10, fontWeight: 700,
              textTransform: "uppercase", letterSpacing: 2,
              padding: "4px 12px", borderRadius: 20, marginBottom: 12,
              background: C.gold + "20", color: C.gold, border: `1px solid ${C.gold}44`
            }}>
              {item.badge}
            </span>
          )}

          <h1 style={{ fontSize: "clamp(26px, 5vw, 40px)", fontWeight: 900, color: "#fff", margin: "0 0 12px", lineHeight: 1.1 }}>
            {item.name}
          </h1>

          <p style={{ fontSize: 14, color: C.muted, maxWidth: 560, lineHeight: 1.8, margin: "0 0 24px" }}>
            {item.description}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {item.sizes.map((s, i) => (
              <span key={i} style={{
                fontSize: 12, fontWeight: 700, padding: "6px 16px",
                borderRadius: 20, border: `2px solid ${C.gold}`, color: C.gold
              }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{ background: C.light, padding: "48px var(--gutter)" }}>
        <div style={{ width: "100%" }}>
          <div className="detail-grid">

            {/* LEFT - Images */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

              {/* Main large image */}
              <div style={{
                borderRadius: 14, overflow: "hidden", border: `1.5px solid ${C.border}`, position: "relative", height: 320,
                background: isCutout(allImages[activeImage]) ? "linear-gradient(180deg, #ffffff 0%, #e8f1f9 100%)" : undefined,
              }}>
                {allImages[activeImage] && <Image
                  key={activeImage}
                  src={allImages[activeImage]}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={`${isCutout(allImages[activeImage]) ? "object-contain" : "object-cover"} main-image`}
                  style={isCutout(allImages[activeImage]) ? { padding: 24 } : undefined}
                  priority
                  {...imageProps(allImages[activeImage])}
                />}
                {item.cornerBadge ? (
                  <span style={{
                    position: "absolute", right: 12, bottom: 12,
                    fontSize: 10, fontWeight: 900, textTransform: "uppercase", letterSpacing: 1.5,
                    padding: "4px 10px", borderRadius: 4,
                    background: C.gold, color: C.dark, boxShadow: "0 2px 6px rgba(0,0,0,0.25)"
                  }}>{item.cornerBadge}</span>
                ) : null}
              </div>


              {/* Thumbnails (only when there is more than one picture) */}
              {allImages.length > 1 && <div className="gallery-grid">
                {allImages.map((img, i) => (
                  <div
                    key={i}
                    className={`thumb ${activeImage === i ? "active" : ""}`}
                    onClick={() => setActiveImage(i)}
                    style={{ position: "relative", height: 70 }}
                  >
                    <Image
                      src={img}
                      alt={`${item.name} view ${i + 1}`}
                      fill
                      sizes="100px"
                      className="object-cover"
                      {...imageProps(img)}
                    />
                  </div>
                ))}
              </div>}
            </div>

            {/* RIGHT - Details */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

              {/* Description */}
              <div style={{ background: "#fff", borderRadius: 14, padding: "20px", border: `1.5px solid ${C.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 24, height: 2, background: C.gold }} />
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>
                    {fleetDetail.overviewLabel}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: C.text, lineHeight: 1.8, margin: 0 }}>
                  {item.description}
                </p>
              </div>

              {/* Features */}
              <div style={{ background: "#fff", borderRadius: 14, padding: "20px", border: `1.5px solid ${C.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <div style={{ width: 24, height: 2, background: C.gold }} />
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>
                    {fleetDetail.featuresLabel}
                  </span>
                </div>
                <div className="features-grid">
                  {item.features.map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{
                        width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                        background: C.gold + "20", border: `1px solid ${C.gold}44`,
                        display: "flex", alignItems: "center", justifyContent: "center"
                      }}>
                        <FaCheck size={8} style={{ color: C.gold }} />
                      </div>
                      <span style={{ fontSize: 12, color: C.text }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Use Cases */}
              {item.useCases?.length > 0 && (
                <div style={{ background: "#fff", borderRadius: 14, padding: "20px", border: `1.5px solid ${C.border}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <div style={{ width: 24, height: 2, background: C.gold }} />
                    <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>
                      {fleetDetail.useCasesLabel}
                    </span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {item.useCases.map((u, i) => (
                      <span key={i} style={{
                        fontSize: 11, fontWeight: 600, padding: "5px 12px",
                        borderRadius: 20, background: C.light,
                        border: `1px solid ${C.border}`, color: C.text
                      }}>{u}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Link
                  href="/quote"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    fontSize: 13, fontWeight: 800, padding: "13px",
                    borderRadius: 8, background: C.gold, color: C.dark, textDecoration: "none"
                  }}
                >
                  <FaFileInvoice size={14} /> {fleetDetail.quoteButtonLabel}
                </Link>
                <a
                  href={site.phoneHref}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    fontSize: 13, fontWeight: 800, padding: "13px",
                    borderRadius: 8, border: `2px solid ${C.navy}`, color: C.navy, textDecoration: "none"
                  }}
                >
                  <FaPhone size={14} /> {fleetDetail.callButtonLabel}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Related Fleet ── */}
      <div style={{ background: C.dark, padding: " 40px var(--gutter)" }}>
        <div style={{ width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <div style={{ width: 24, height: 2, background: C.gold }} />
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>
              {fleetDetail.otherLabel}
            </span>
          </div>
          <div className="other-grid">
            {fleet.filter(f => f.id !== item.id).map(f => (
              <Link
                key={f.id}
                href={`/fleet/${f.id}`}
                className="other-card"
                style={{
                  display: "block", padding: "12px 16px",
                  borderRadius: 10, border: `1px solid ${C.navy}`,
                  textDecoration: "none",
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{f.name}</div>
                <div style={{ fontSize: 10, color: C.muted, minHeight: 14 }}>{f.sizes.join(" · ")}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}