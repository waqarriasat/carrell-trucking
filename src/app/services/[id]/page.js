import Link from "next/link"
import { FaCheck, FaPhone, FaChevronRight } from "react-icons/fa"
import { FaFileInvoice } from "react-icons/fa6"
import { notFound } from "next/navigation"
import { SERVICES, FLEET } from "@/app/lib/constants"

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

const SERVICE_DETAILS = {
  commercial: {
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    features: ["Retail overflow storage", "Seasonal inventory", "Temporary warehousing", "Event storage", "Business relocation"],
    fleet: ["container-dry", "trailers", "reefer-electric", "office"],
  },
  residential: {
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
    features: ["Home renovation storage", "Moving assistance", "Personal storage", "Garage overflow", "Estate management"],
    fleet: ["container-dry", "trailers", "office"],
  },
  construction: {
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    features: ["On-site tool storage", "Equipment staging", "Site offices", "Material storage", "Crew facilities"],
    fleet: ["container-dry", "trailers", "office", "generator"],
  },
  industrial: {
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    features: ["Oilfield operations", "Manufacturing support", "Energy sector", "Custom mud labs", "Remote site power"],
    fleet: ["reefer-diesel", "generator", "mud-lab", "office"],
  },
}

export function generateStaticParams() {
  return SERVICES.map((s) => ({ id: s.id }))
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const service = SERVICES.find((s) => s.id === id)
  if (!service) return { title: "Not Found" }
  return {
    title: `${service.label} | Ardmore Trailer, Inc.`,
    description: service.description,
  }
}

export default async function ServiceDetailPage({ params }) {
  const { id } = await params
  const service = SERVICES.find((s) => s.id === id)
  if (!service) notFound()

  const details = SERVICE_DETAILS[service.id]
  const relatedFleet = FLEET.filter(f => details.fleet.includes(f.id))

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
      <div style={{ background: C.dark, padding: "100px 40px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, fontSize: 12, color: C.muted }}>
            <Link href="/" style={{ color: C.muted, textDecoration: "none" }}>Home</Link>
            <FaChevronRight size={9} />
            <Link href="/services" style={{ color: C.muted, textDecoration: "none" }}>Services</Link>
            <FaChevronRight size={9} />
            <span style={{ color: C.gold }}>{service.label}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 28, height: 2, background: C.gold }} />
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>
              Our Services
            </span>
          </div>

          <h1 style={{ fontSize: "clamp(26px, 5vw, 40px)", fontWeight: 900, color: "#fff", margin: "0 0 12px", lineHeight: 1.1 }}>
            {service.label} <span style={{ color: C.gold }}>Solutions</span>
          </h1>

          <p style={{ fontSize: 14, color: C.muted, maxWidth: 560, lineHeight: 1.8, margin: 0 }}>
            {service.description}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ background: C.light, padding: "48px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
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
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>
                    Common Applications
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {details.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>
                    Recommended Equipment
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
                      <div style={{ fontSize: 11, color: C.muted }}>{f.sizes.join(" · ")}</div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Why Us */}
              <div style={{ background: C.dark, borderRadius: 14, padding: "20px", border: `1.5px solid ${C.navy}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <div style={{ width: 24, height: 2, background: C.gold }} />
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>
                    Why Ardmore Trailer
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    "Local Oklahoma company",
                    "2-month minimum rental",
                    "Direct contact with Rick",
                    "No hidden fees",
                    "On-site delivery",
                  ].map(item => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
                  <FaFileInvoice size={14} /> Get a Free Quote
                </Link>
                <a href="tel:580-226-7811" style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  fontSize: 13, fontWeight: 800, padding: "13px",
                  borderRadius: 8, border: `2px solid ${C.navy}`, color: C.navy, textDecoration: "none"
                }}>
                  <FaPhone size={14} /> Call 580-226-7811
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other Services */}
      <div style={{ background: C.dark, padding: "40px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <div style={{ width: 24, height: 2, background: C.gold }} />
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>
              Other Services
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 }}>
            {SERVICES.filter(s => s.id !== service.id).map(s => (
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