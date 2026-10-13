"use client"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import { FaCheck, FaPhone } from "react-icons/fa"
import Breadcrumb from "@/app/components/common/Breadcrumb"
import { FaFileInvoice, FaShieldHalved, FaLocationDot } from "react-icons/fa6"
import { imageProps, isCutout } from "@/app/lib/content/images"

const C = {
  dark: "#0f2d4a",
  navy: "#1e4d7b",
  gold: "#c9a84c",
  goldText: "#86671e", // gold for text on white/light backgrounds (readable)
  muted: "#a9c1d4",
  light: "#f0f6fb",
  border: "#d6e8f5",
  text: "#4a6b85",
}

// Quote form link with this unit (and the choice, if given) already selected.
const quoteHref = (unit, interest) => `/quote?${new URLSearchParams(interest ? { unit, interest } : { unit }).toString()}`

export default function FleetDetail({ item, fleet, fleetDetail, fleetPage, site, usedIn = [] }) {
  const allImages = [item.image, ...(item.gallery || [])].filter(Boolean)
  const [activeImage, setActiveImage] = useState(0)
  // The "Request a Modification" button picks the Modification choice in the quote form.
  const modifyOption = (fleetDetail.availableOptions || []).find((o) => /modif/i.test(o)) || "Modification"

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
        .available-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
        @media (max-width: 520px) { .available-grid { grid-template-columns: repeat(2, 1fr); } }
        .features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px 16px;
        }
        .thumb {
          cursor: pointer;
          border-radius: 4px;
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
      <div className="page-section wrap">
        <div style={{ width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, marginBottom: 16 }}>
  <Link href="/" style={{ color: C.text, textDecoration: "none" }}>{fleetPage.breadcrumbHome}</Link>
  <span style={{ color: "#8aa3b8" }}>›</span>
  <Link href="/fleet" style={{ color: C.text, textDecoration: "none" }}>{fleetPage.breadcrumbCurrent}</Link>
  <span style={{ color: "#8aa3b8" }}>›</span>
  <span style={{ color: C.goldText, fontWeight: 700 }}>{item.name}</span>
</div>

 {item.badge && (
            <span style={{
              display: "inline-block", fontSize: 10, fontWeight: 700,
              textTransform: "uppercase", letterSpacing: 2,
              padding: "4px 12px", borderRadius: 4, marginBottom: 12,
              background: C.gold + "12", color: C.goldText, border: `1px solid ${C.gold}44`
            }}>
              {item.badge}
            </span>
          )}

          <h1 style={{ fontSize: "clamp(26px, 5vw, 40px)", fontWeight: 900, color: C.dark, margin: "0 0 12px", lineHeight: 1.1 }}>
            {item.name}
          </h1>

          <p style={{ fontSize: 14, color: C.text, maxWidth: 560, lineHeight: 1.8, margin: "0 0 24px" }}>
            {item.description}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {item.sizes.map((s, i) => (
              <span key={i} style={{
                fontSize: 12, fontWeight: 700, padding: "6px 16px",
                borderRadius: 4, border: `2px solid ${C.gold}`, color: C.goldText
              }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="page-section wrap">
        <div style={{ width: "100%" }}>
          <div className="detail-grid">

            {/* LEFT - Images */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

              {/* Main large image */}
              <div style={{
                borderRadius: 4, overflow: "hidden", border: `1.5px solid ${C.border}`, position: "relative", height: 320,
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
              <div style={{ background: "#fff", borderRadius: 4, padding: "20px", border: `1.5px solid ${C.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 24, height: 2, background: C.gold }} />
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.goldText }}>
                    {fleetDetail.overviewLabel}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: C.text, lineHeight: 1.8, margin: 0 }}>
                  {item.description}
                </p>
              </div>

              {/* Features */}
              <div style={{ background: "#fff", borderRadius: 4, padding: "20px", border: `1.5px solid ${C.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <div style={{ width: 24, height: 2, background: C.gold }} />
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.goldText }}>
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

              {/* Highlight for this unit, e.g. pest-resistant feed storage (switch in Admin → Fleet Page) */}
              {fleetDetail.showHighlights === "yes" && item.highlightTitle ? (
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start", background: C.gold + "14", borderRadius: 4, padding: "18px 20px", border: `1.5px solid ${C.gold}55` }}>
                  <span style={{ width: 38, height: 38, borderRadius: 4, background: C.dark, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <FaShieldHalved size={16} style={{ color: C.gold }} aria-hidden="true" />
                  </span>
                  <div>
                    <h2 style={{ fontSize: 15, fontWeight: 900, color: C.dark, margin: "0 0 6px" }}>{item.highlightTitle}</h2>
                    {item.highlightText ? <p style={{ fontSize: 13, color: C.text, lineHeight: 1.7, margin: 0 }}>{item.highlightText}</p> : null}
                  </div>
                </div>
              ) : null}

              {/* Use Cases */}
              {item.useCases?.length > 0 && (
                <div style={{ background: "#fff", borderRadius: 4, padding: "20px", border: `1.5px solid ${C.border}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <div style={{ width: 24, height: 2, background: C.gold }} />
                    <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.goldText }}>
                      {fleetDetail.useCasesLabel}
                    </span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {item.useCases.map((u, i) => (
                      <span key={i} style={{
                        fontSize: 11, fontWeight: 600, padding: "5px 12px",
                        borderRadius: 4, background: C.light,
                        border: `1px solid ${C.border}`, color: C.text
                      }}>{u}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Industries that use this unit — links to the matching service pages */}
              {usedIn.length > 0 && (
                <div style={{ background: "#fff", borderRadius: 4, padding: "20px", border: `1.5px solid ${C.border}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <div style={{ width: 24, height: 2, background: C.gold }} />
                    <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.goldText }}>
                      Industries We Supply
                    </span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {usedIn.map((s) => (
                      <Link
                        key={s.id}
                        href={`/services/${s.id}`}
                        className="pill-outline-navy"
                        style={{ fontSize: 12, fontWeight: 700, padding: "6px 14px", borderRadius: 4, textDecoration: "none" }}
                      >
                        {s.label} {item.shortName || item.name} rentals →
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Rent / Buy / Rent to Own / Modify — each opens the quote form pre-filled */}
              {fleetDetail.availableOptions?.length > 0 && (
                <div style={{ background: "#fff", borderRadius: 4, padding: "20px", border: `1.5px solid ${C.border}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <div style={{ width: 24, height: 2, background: C.gold }} />
                    <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.goldText }}>
                      {fleetDetail.availableLabel}
                    </span>
                  </div>
                  <div className="available-grid">
                    {fleetDetail.availableOptions.map((opt) => (
                      <Link
                        key={opt}
                        href={quoteHref(item.name, opt)}
                        className="pill-outline-navy"
                        style={{ fontSize: 12, fontWeight: 800, padding: "10px 8px", borderRadius: 4, textDecoration: "none", textAlign: "center" }}
                      >
                        {opt}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom modifications */}
              {fleetDetail.mods?.length > 0 && (
                <div style={{ background: C.light, borderRadius: 4, padding: "20px", border: `1.5px solid ${C.border}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <div style={{ width: 24, height: 2, background: C.gold }} />
                    <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.goldText }}>
                      {fleetDetail.modsLabel}
                    </span>
                  </div>
                  {fleetDetail.modsText ? (
                    <p style={{ fontSize: 13, color: C.text, lineHeight: 1.7, margin: "0 0 12px" }}>{fleetDetail.modsText}</p>
                  ) : null}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
                    {fleetDetail.mods.map((m) => (
                      <span key={m} style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        fontSize: 11, fontWeight: 700, padding: "5px 12px",
                        borderRadius: 4, background: "#fff", border: `1px solid ${C.border}`, color: C.dark
                      }}>
                        <FaCheck size={8} style={{ color: C.gold }} /> {m}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={quoteHref(item.name, modifyOption)}
                    className="btn-outline-navy"
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 800, padding: "10px 16px", borderRadius: 4, textDecoration: "none" }}
                  >
                    {fleetDetail.modsButtonLabel} →
                  </Link>
                </div>
              )}

              {/* See it at our yard — local, owner-direct (switch in Admin → Fleet Page) */}
              {fleetDetail.showYardBox === "yes" && fleetDetail.yardTitle ? (
                <div style={{ background: C.dark, borderRadius: 4, padding: "22px 20px", border: `1.5px solid ${C.navy}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <div style={{ width: 24, height: 2, background: C.gold }} />
                    <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>{fleetDetail.yardLabel}</span>
                  </div>
                  <h2 style={{ fontSize: 17, fontWeight: 900, color: "#fff", margin: "0 0 8px" }}>{fleetDetail.yardTitle}</h2>
                  {fleetDetail.yardText ? <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, margin: "0 0 12px" }}>{fleetDetail.yardText}</p> : null}
                  {fleetDetail.yardPoints?.length ? (
                    <ul style={{ listStyle: "none", margin: "0 0 16px", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                      {fleetDetail.yardPoints.map((pt) => (
                        <li key={pt} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#fff" }}>
                          <FaCheck size={10} style={{ color: C.gold, flexShrink: 0 }} aria-hidden="true" /> {pt}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {fleetDetail.yardButtonLabel && fleetDetail.yardButtonHref ? (
                    <a
                      href={fleetDetail.yardButtonHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 800, padding: "10px 16px", borderRadius: 4, border: `1.5px solid ${C.gold}`, color: C.gold, textDecoration: "none" }}
                    >
                      <FaLocationDot size={12} aria-hidden="true" /> {fleetDetail.yardButtonLabel}
                    </a>
                  ) : null}
                </div>
              ) : null}

              {/* CTA Buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Link
                  href={quoteHref(item.name)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    fontSize: 13, fontWeight: 800, padding: "13px",
                    borderRadius: 4, background: C.gold, color: C.dark, textDecoration: "none"
                  }}
                >
                  <FaFileInvoice size={14} /> {fleetDetail.quoteButtonLabel}
                </Link>
                <a
                  href={site.phoneHref}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    fontSize: 13, fontWeight: 800, padding: "13px",
                    borderRadius: 4, border: `2px solid ${C.navy}`, color: C.navy, textDecoration: "none"
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
      <div className="page-section wrap band-navy">
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
                  borderRadius: 4, border: `1px solid ${C.navy}`,
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