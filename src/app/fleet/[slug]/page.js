"use client"

import { useState, use } from "react"
import Link from "next/link"
import { FaChevronRight, FaCheck, FaPhone } from "react-icons/fa"
import { FaFileInvoice } from "react-icons/fa6"
import { FLEET } from "@/app/lib/constants"
import { notFound } from "next/navigation"

const IMAGES = {
  "container-dry":    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
  "trailers":         "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=900&q=80",
  "reefer-diesel":    "https://images.unsplash.com/photo-1590534247854-e97d5e3feef6?auto=format&fit=crop&w=900&q=80",
  "reefer-electric":  "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=900&q=80",
  "reefer-container": "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=900&q=80",
  "generator":        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=80",
  "office":           "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
  "mud-lab":          "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=900&q=80",
}

const GALLERY = {
  "container-dry":    ["https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=400&q=80","https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=400&q=80","https://images.unsplash.com/photo-1590534247854-e97d5e3feef6?auto=format&fit=crop&w=400&q=80"],
  "trailers":         ["https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80","https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=400&q=80","https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80"],
  "reefer-diesel":    ["https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=400&q=80","https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=400&q=80","https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80"],
  "reefer-electric":  ["https://images.unsplash.com/photo-1590534247854-e97d5e3feef6?auto=format&fit=crop&w=400&q=80","https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80","https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=400&q=80"],
  "reefer-container": ["https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=400&q=80","https://images.unsplash.com/photo-1590534247854-e97d5e3feef6?auto=format&fit=crop&w=400&q=80","https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=400&q=80"],
  "generator":        ["https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80","https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=400&q=80","https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=400&q=80"],
  "office":           ["https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80","https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80","https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=400&q=80"],
  "mud-lab":          ["https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80","https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80","https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=400&q=80"],
}

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

export default function FleetDetailPage({ params }) {
  const { slug } = use(params)
  const item = FLEET.find((f) => f.id === slug)
  if (!item) notFound()

  const allImages = [IMAGES[item.id], ...(GALLERY[item.id] || [])]
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
      <div style={{ background: C.dark, padding: "60px 40px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, fontSize: 12, color: C.muted }}>
            <Link href="/" style={{ color: C.muted, textDecoration: "none" }}>Home</Link>
            <FaChevronRight size={9} />
            <Link href="/fleet" style={{ color: C.muted, textDecoration: "none" }}>Fleet</Link>
            <FaChevronRight size={9} />
            <span style={{ color: C.gold }}>{item.name}</span>
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
            {item.sizes.map(s => (
              <span key={s} style={{
                fontSize: 12, fontWeight: 700, padding: "6px 16px",
                borderRadius: 20, border: `2px solid ${C.gold}`, color: C.gold
              }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{ background: C.light, padding: "48px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="detail-grid">

            {/* LEFT - Images */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

              {/* Main large image */}
              <div style={{ borderRadius: 14, overflow: "hidden", border: `1.5px solid ${C.border}` }}>
                <img
                  key={activeImage}
                  src={allImages[activeImage]}
                  alt={item.name}
                  className="main-image"
                  style={{ width: "100%", height: 320, objectFit: "cover", display: "block" }}
                />
              </div>

              {/* Thumbnails */}
              <div className="gallery-grid">
                {allImages.map((img, i) => (
                  <div
                    key={i}
                    className={`thumb ${activeImage === i ? "active" : ""}`}
                    onClick={() => setActiveImage(i)}
                  >
                    <img
                      src={img}
                      alt={`${item.name} view ${i + 1}`}
                      style={{ width: "100%", height: 70, objectFit: "cover", display: "block" }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT - Details */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

              {/* Description */}
              <div style={{ background: "#fff", borderRadius: 14, padding: "20px", border: `1.5px solid ${C.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 24, height: 2, background: C.gold }} />
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>
                    Overview
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
                    Key Features
                  </span>
                </div>
                <div className="features-grid">
                  {item.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 8 }}>
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
              {item.useCases && (
                <div style={{ background: "#fff", borderRadius: 14, padding: "20px", border: `1.5px solid ${C.border}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <div style={{ width: 24, height: 2, background: C.gold }} />
                    <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>
                      Common Use Cases
                    </span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {item.useCases.map(u => (
                      <span key={u} style={{
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
                  <FaFileInvoice size={14} /> Get a Free Quote
                </Link>
                <a
                  href="tel:580-226-7811"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    fontSize: 13, fontWeight: 800, padding: "13px",
                    borderRadius: 8, border: `2px solid ${C.navy}`, color: C.navy, textDecoration: "none"
                  }}
                >
                  <FaPhone size={14} /> Call 580-226-7811
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Related Fleet ── */}
      <div style={{ background: C.dark, padding: " 40px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <div style={{ width: 24, height: 2, background: C.gold }} />
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>
              Other Equipment
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 }}>
            {FLEET.filter(f => f.id !== item.id).map(f => (
              <Link
                key={f.id}
                href={`/fleet/${f.id}`}
                style={{
                  display: "block", padding: "12px 16px",
                  borderRadius: 10, border: `1px solid ${C.navy}`,
                  textDecoration: "none",
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{f.name}</div>
                <div style={{ fontSize: 10, color: C.muted }}>{f.sizes.join(" · ")}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}