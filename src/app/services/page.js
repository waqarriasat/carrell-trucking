import Link from "next/link"
import Breadcrumb from "@/app/components/common/Breadcrumb"
import { FaCheck, FaPhone } from "react-icons/fa"
import { getContent } from "@/app/lib/server/content"
import { getIcon } from "@/app/lib/content/icons"

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

export async function generateMetadata() {
  const { servicesPage } = await getContent()
  return {
    title: servicesPage.metaTitle,
    description: servicesPage.metaDescription,
  }
}

export default async function ServicesPage() {
  const { servicesPage: page, services, fleet, site } = await getContent()

  return (
    <>
      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .service-fleet-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        @media (max-width: 768px) {
          .services-grid { grid-template-columns: 1fr; }
          .service-fleet-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── Hero ── */}
      <div style={{ background: C.dark, padding: "20px var(--gutter) 40px" }}>
        <div style={{ width: "100%" }}>
          <Breadcrumb crumbs={[{ label: page.breadcrumbHome, href: "/" }, { label: page.breadcrumbCurrent }]} />
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 28, height: 2, background: C.gold }} />
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>
              {page.eyebrow}
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(26px, 5vw, 40px)", fontWeight: 900, color: "#fff", margin: "0 0 12px", lineHeight: 1.1 }}>
            {`${page.titleStart} `}<span style={{ color: C.gold }}>{page.titleAccent}</span>
          </h1>
          <p style={{ fontSize: 14, color: C.muted, maxWidth: 560, lineHeight: 1.8, margin: "0 0 24px" }}>
            {page.text}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 32 }}>
            {page.stats.map(({ value: v, label: l }, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 24, fontWeight: 900, color: C.gold }}>{v}</span>
                <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, color: C.muted }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Services Grid ── */}
      <div style={{ background: C.light, padding: "48px var(--gutter)" }}>
        <div style={{ width: "100%" }}>
          <div className="services-grid">
            {services.map((service) => {
              const Icon = getIcon(service.icon, "fa/FaStore")
              const details = service
              const relatedFleet = fleet.filter(f => (details.fleet || []).includes(f.id))

              return (
                <div key={service.id} style={{
                  background: "#fff",
                  borderRadius: 16,
                  overflow: "hidden",
                  border: `1.5px solid ${C.border}`,
                  boxShadow: "0 2px 12px rgba(15,45,74,0.06)",
                }}>
                  {/* Image */}
                  <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
                    <img
                      src={details.image}
                      alt={service.label}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to top, rgba(15,45,74,0.8), transparent)"
                    }} />
                    <div style={{
                      position: "absolute", bottom: 14, left: 16,
                      display: "flex", alignItems: "center", gap: 10
                    }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 8,
                        background: C.gold,
                        display: "flex", alignItems: "center", justifyContent: "center"
                      }}>
                        <Icon size={16} style={{ color: C.dark }} />
                      </div>
                      <h2 style={{ fontSize: 20, fontWeight: 900, color: "#fff", margin: 0 }}>
                        {service.label}
                      </h2>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: "20px" }}>
                    <p style={{ fontSize: 13, color: C.text, lineHeight: 1.7, marginBottom: 16 }}>
                      {service.description}
                    </p>

                    {/* Features */}
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: C.gold, marginBottom: 10 }}>
                        {page.applicationsLabel}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {details.features.map((f, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <FaCheck size={9} style={{ color: C.gold, flexShrink: 0 }} />
                            <span style={{ fontSize: 12, color: C.text }}>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Related Fleet */}
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: C.gold, marginBottom: 10 }}>
                        {page.recommendedLabel}
                      </div>
                      <div className="service-fleet-grid">
                        {relatedFleet.map(f => (
                          <Link
                            key={f.id}
                            href={`/fleet/${f.id}`}
                            style={{
                              display: "block", padding: "8px 12px",
                              borderRadius: 8, border: `1px solid ${C.border}`,
                              fontSize: 12, fontWeight: 600, color: C.navy,
                              textDecoration: "none", background: C.light,
                              transition: "all 0.15s"
                            }}
                          >
                            {f.name}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <Link
                      href="/quote"
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        gap: 6, fontSize: 12, fontWeight: 800,
                        padding: "10px", borderRadius: 8,
                        background: C.gold, color: C.dark, textDecoration: "none"
                      }}
                    >
                      {page.cardButtonLabel.replace("{service}", service.label)}
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div style={{ background: C.dark, padding: "48px var(--gutter)" }}>
        <div style={{ width: "100%", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <div>
            <h2 style={{ fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 900, color: "#fff", margin: "0 0 8px" }}>
              {page.ctaTitle}{" "}
              <span style={{ color: C.gold }}>{page.ctaAccent}</span>
            </h2>
            <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>
              {page.ctaText}
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href={page.ctaPrimaryButton.href} style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: 13, fontWeight: 700, padding: "12px 22px",
              borderRadius: 8, background: C.gold, color: C.dark, textDecoration: "none"
            }}>
              {page.ctaPrimaryButton.label}
            </Link>
            <a href={site.phoneHref} style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: 13, fontWeight: 700, padding: "12px 22px",
              borderRadius: 8, border: `2px solid ${C.blue}`, color: C.blue, textDecoration: "none"
            }}>
              <FaPhone size={13} /> {site.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}