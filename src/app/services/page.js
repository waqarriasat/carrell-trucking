import Link from "next/link"
import { FaStore, FaHome, FaHardHat, FaIndustry, FaCheck, FaPhone } from "react-icons/fa"
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

const ICON_MAP = {
  FaStore:    FaStore,
  FaHouse:    FaHome,
  FaHardHat:  FaHardHat,
  FaIndustry: FaIndustry,
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

export const metadata = {
  title: "Services | Ardmore Trailer, Inc.",
  description: "Trailer and container rental services for commercial, residential, construction, and industrial needs in Oklahoma.",
}

export default function ServicesPage() {
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
      <div style={{ background: C.dark, padding: "40px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 28, height: 2, background: C.gold }} />
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold }}>
              What We Do
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(26px, 5vw, 40px)", fontWeight: 900, color: "#fff", margin: "0 0 12px", lineHeight: 1.1 }}>
            Industries <span style={{ color: C.gold }}>We Serve</span>
          </h1>
          <p style={{ fontSize: 14, color: C.muted, maxWidth: 560, lineHeight: 1.8, margin: "0 0 24px" }}>
            From oilfield operations to home renovations — Ardmore Trailer, Inc.
            provides the right equipment for every job across Oklahoma and surrounding areas.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 32 }}>
            {[["4", "Industries"], ["8+", "Equipment Types"], ["2 Mo", "Min. Rental"]].map(([v, l]) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 24, fontWeight: 900, color: C.gold }}>{v}</span>
                <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, color: C.muted }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Services Grid ── */}
      <div style={{ background: C.light, padding: "48px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="services-grid">
            {SERVICES.map((service) => {
              const Icon = ICON_MAP[service.iconName] || FaStore
              const details = SERVICE_DETAILS[service.id]
              const relatedFleet = FLEET.filter(f => details.fleet.includes(f.id))

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
                        Common Applications
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {details.features.map(f => (
                          <div key={f} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <FaCheck size={9} style={{ color: C.gold, flexShrink: 0 }} />
                            <span style={{ fontSize: 12, color: C.text }}>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Related Fleet */}
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: C.gold, marginBottom: 10 }}>
                        Recommended Equipment
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
                      Get a Quote for {service.label}
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div style={{ background: C.dark, padding: "48px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <div>
            <h2 style={{ fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 900, color: "#fff", margin: "0 0 8px" }}>
              Not Sure What You Need?{" "}
              <span style={{ color: C.gold }}>Let's Talk.</span>
            </h2>
            <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>
              Call us at 580-226-7811 — Rick and the team will find the right solution for your job.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/quote" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: 13, fontWeight: 700, padding: "12px 22px",
              borderRadius: 8, background: C.gold, color: C.dark, textDecoration: "none"
            }}>
              Get a Free Quote
            </Link>
            <a href="tel:580-226-7811" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: 13, fontWeight: 700, padding: "12px 22px",
              borderRadius: 8, border: `2px solid ${C.blue}`, color: C.blue, textDecoration: "none"
            }}>
              <FaPhone size={13} /> 580-226-7811
            </a>
          </div>
        </div>
      </div>
    </>
  )
}