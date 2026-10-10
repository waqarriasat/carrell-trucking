import { FaQuoteLeft, FaStar } from "react-icons/fa"

const C = {
  dark:   "#0f2d4a",
  navy:   "#1e4d7b",
  gold:   "#c9a84c",
  muted:  "#a9c1d4",
  goldText: "#86671e", // gold for small text on white
  light:  "#f0f6fb",
  border: "#d6e8f5",
  text:   "#4a6b85",
}

export default function Testimonials({ testimonials, site }) {
  const TESTIMONIALS = testimonials.items

  return (
    <section className="page-section wrap">
      <div style={{ width: "100%" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 32, height: 2, background: C.gold }} />
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.goldText }}>
              {testimonials.eyebrow}
            </span>
            <div style={{ width: 32, height: 2, background: C.gold }} />
          </div>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 900, color: C.dark, margin: "0 0 12px" }}>
            {testimonials.title}
          </h2>
          <p style={{ fontSize: 15, color: C.text, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
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
              className="panel"
              style={{
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
              <FaQuoteLeft size={24} style={{ color: "#c9d8e6", marginBottom: 12 }} aria-hidden="true" />

              {/* Quote text */}
              <p style={{
                fontSize: 15, color: "#33475b",
                lineHeight: 1.8, marginBottom: 24,
                fontStyle: "italic"
              }}>
                "{t.quote}"
              </p>

              {/* Author */}
              <div style={{
                display: "flex", alignItems: "center", gap: 12,
                borderTop: `1px solid ${C.border}`, paddingTop: 16
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: C.dark,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: 16, fontWeight: 900, color: C.gold }}>
                    {(t.author || "").charAt(0)}
                  </span>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: C.dark }}>
                    {t.author}
                  </div>
                  <div style={{ fontSize: 12, color: C.text }}>
                    {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="panel-navy" style={{
          marginTop: "var(--gap)", textAlign: "center",
          padding: "32px 24px",
        }}>
          <p style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 6 }}>
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
                borderRadius: 8, border: "2px solid rgba(255,255,255,0.8)",
                color: "#ffffff", textDecoration: "none"
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