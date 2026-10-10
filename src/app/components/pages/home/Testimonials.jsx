import { FaQuoteLeft, FaStar } from "react-icons/fa"

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

export default function Testimonials({ testimonials, site }) {
  const TESTIMONIALS = testimonials.items

  return (
    <section style={{ background: C.dark, padding: "64px var(--gutter)" }}>
      <div style={{ width: "100%" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 32, height: 2, background: C.gold }} />
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>
              {testimonials.eyebrow}
            </span>
            <div style={{ width: 32, height: 2, background: C.gold }} />
          </div>
          <h2 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 900, color: "#fff", margin: "0 0 12px" }}>
            {testimonials.title}
          </h2>
          <p style={{ fontSize: 14, color: C.muted, maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
            {testimonials.text}
          </p>
        </div>

        {/* Testimonials grid */}
        <style>{`
          .testimonials-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }
          @media (max-width: 768px) {
            .testimonials-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1.5px solid ${C.navy}`,
                borderRadius: 16,
                padding: "28px 24px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Gold top border */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: C.gold
              }} />

              {/* Stars */}
              <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                {[1,2,3,4,5].map(i => (
                  <FaStar key={i} size={13} style={{ color: C.gold }} />
                ))}
              </div>

              {/* Quote icon */}
              <FaQuoteLeft size={24} style={{ color: C.navy, marginBottom: 12 }} />

              {/* Quote text */}
              <p style={{
                fontSize: 14, color: "#cbd5e1",
                lineHeight: 1.8, marginBottom: 24,
                fontStyle: "italic"
              }}>
                "{t.quote}"
              </p>

              {/* Author */}
              <div style={{
                display: "flex", alignItems: "center", gap: 12,
                borderTop: `1px solid ${C.navy}`, paddingTop: 16
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: C.navy,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: 16, fontWeight: 900, color: C.gold }}>
                    {(t.author || "").charAt(0)}
                  </span>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>
                    {t.author}
                  </div>
                  <div style={{ fontSize: 11, color: C.muted }}>
                    {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{
          marginTop: 48, textAlign: "center",
          padding: "32px 24px", borderRadius: 16,
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${C.navy}`
        }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 6 }}>
            {testimonials.ctaTitle}
          </p>
          <p style={{ fontSize: 13, color: C.muted, marginBottom: 20 }}>
            {testimonials.ctaText}
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
           <a 
              href={testimonials.ctaPrimaryButton.href}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontSize: 13, fontWeight: 700, padding: "11px 24px",
                borderRadius: 8, background: C.gold, color: C.dark,
                textDecoration: "none"
              }}
            >
              {testimonials.ctaPrimaryButton.label}
            </a>
            <a
              href={site.phoneHref}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontSize: 13, fontWeight: 700, padding: "11px 24px",
                borderRadius: 8, border: `2px solid ${C.blue}`,
                color: C.blue, textDecoration: "none"
              }}
            >
              {testimonials.ctaCallLabel}
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}