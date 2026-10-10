import Link from "next/link"
import { FaCheck, FaPhone } from "react-icons/fa"
import Breadcrumb from "@/app/components/common/Breadcrumb"
import { FaFileInvoice } from "react-icons/fa6"
import { notFound } from "next/navigation"
import { getContent } from "@/app/lib/server/content"
import { fill } from "@/app/lib/content/resolve"

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

export async function generateStaticParams() {
  const { services } = await getContent()
  return services.map((s) => ({ id: s.id }))
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const { services, serviceDetail } = await getContent()
  const service = services.find((s) => s.id === id)
  if (!service) return { title: "Not Found" }
  return {
    title: fill(serviceDetail.metaTitle, { service: service.label }),
    description: service.description,
  }
}

export default async function ServiceDetailPage({ params }) {
  const { id } = await params
  const { services, fleet, serviceDetail: page, servicesPage, site } = await getContent()
  const service = services.find((s) => s.id === id)
  if (!service) notFound()

  const details = service
  const relatedFleet = fleet.filter(f => (details.fleet || []).includes(f.id))

  return (
    <>
      <style>{`
        .service-detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: start;
        }
        .service-fleet-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        @media (max-width: 768px) {
          .service-detail-grid { grid-template-columns: 1fr; gap: 20px; }
          .service-fleet-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Hero */}
      <div style={{ background: C.dark, padding: "20px var(--gutter) 40px" }}>
        <div style={{ width: "100%" }}>
          <Breadcrumb crumbs={[{ label: servicesPage.breadcrumbHome, href: "/" }, { label: servicesPage.breadcrumbCurrent, href: "/services" }, { label: service.label }]} />

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 28, height: 2, background: C.gold }} />
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>
              {page.eyebrow}
            </span>
          </div>

          <h1 style={{ fontSize: "clamp(26px, 5vw, 40px)", fontWeight: 900, color: "#fff", margin: "0 0 12px", lineHeight: 1.1 }}>
            {service.label} <span style={{ color: C.gold }}>{page.titleAccent}</span>
          </h1>

          <p style={{ fontSize: 14, color: C.muted, maxWidth: 560, lineHeight: 1.8, margin: 0 }}>
            {service.description}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ background: C.light, padding: "48px var(--gutter)" }}>
        <div style={{ width: "100%" }}>
          <div className="service-detail-grid">

            {/* Left - Image + Features */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ borderRadius: 14, overflow: "hidden", border: `1.5px solid ${C.border}` }}>
                <img
                  src={details.image}
                  alt={service.label}
                  style={{ width: "100%", height: 280, objectFit: "cover", display: "block" }}
                />
              </div>

              <div style={{ background: "#fff", borderRadius: 14, padding: "20px", border: `1.5px solid ${C.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <div style={{ width: 24, height: 2, background: C.gold }} />
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.goldText }}>
                    {page.applicationsLabel}
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {details.features.map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                        background: C.gold + "20", border: `1px solid ${C.gold}44`,
                        display: "flex", alignItems: "center", justifyContent: "center"
                      }}>
                        <FaCheck size={9} style={{ color: C.gold }} />
                      </div>
                      <span style={{ fontSize: 13, color: C.text }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Fleet + CTA */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              <div style={{ background: "#fff", borderRadius: 14, padding: "20px", border: `1.5px solid ${C.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <div style={{ width: 24, height: 2, background: C.gold }} />
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.goldText }}>
                    {page.recommendedLabel}
                  </span>
                </div>
                <div className="service-fleet-grid">
                  {relatedFleet.map(f => (
                    <Link
                      key={f.id}
                      href={`/fleet/${f.id}`}
                      style={{
                        display: "block", padding: "12px 14px",
                        borderRadius: 10, border: `1.5px solid ${C.border}`,
                        textDecoration: "none", background: C.light,
                      }}
                    >
                      <div style={{ fontSize: 13, fontWeight: 700, color: C.dark, marginBottom: 3 }}>{f.name}</div>
                      <div style={{ fontSize: 11, color: C.text }}>{f.sizes.join(" · ")}</div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Why Us */}
              <div style={{ background: C.dark, borderRadius: 14, padding: "20px", border: `1.5px solid ${C.navy}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <div style={{ width: 24, height: 2, background: C.gold }} />
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>
                    {page.whyLabel}
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {page.whyItems.map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <FaCheck size={9} style={{ color: C.gold, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: C.muted }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Link href="/quote" style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  fontSize: 13, fontWeight: 800, padding: "13px",
                  borderRadius: 8, background: C.gold, color: C.dark, textDecoration: "none"
                }}>
                  <FaFileInvoice size={14} /> {page.quoteButtonLabel}
                </Link>
                <a href={site.phoneHref} style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  fontSize: 13, fontWeight: 800, padding: "13px",
                  borderRadius: 8, border: `2px solid ${C.navy}`, color: C.navy, textDecoration: "none"
                }}>
                  <FaPhone size={14} /> {page.callButtonLabel}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other Services */}
      <div style={{ background: C.dark, padding: "40px var(--gutter)" }}>
        <div style={{ width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <div style={{ width: 24, height: 2, background: C.gold }} />
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>
              {page.otherLabel}
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 }}>
            {services.filter(s => s.id !== service.id).map(s => (
              <Link key={s.id} href={`/services/${s.id}`} style={{
                display: "block", padding: "12px 16px",
                borderRadius: 10, border: `1px solid ${C.navy}`,
                textDecoration: "none",
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{s.label}</div>
                <div style={{ fontSize: 11, color: C.muted }}>{s.description.slice(0, 40)}...</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}