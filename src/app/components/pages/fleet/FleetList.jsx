import { createElement } from "react"
import Link from "next/link"
import Image from "next/image"
import { FaCheck, FaPhone } from "react-icons/fa"
import { FaFileInvoice } from "react-icons/fa6"
import { getIcon } from "@/app/lib/content/icons"
import { imageProps } from "@/app/lib/content/images"

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

function FleetCard({ item, fleetPage, site }) {
  const color = item.accent || C.blue
  return (
    <div className="fleet-card">
      <div className="fleet-card-left">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <div style={{
            width: 42, height: 42, borderRadius: 10,
            background: color + "18",
            border: `1px solid ${color}33`,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
          }}>
            {createElement(getIcon(item.icon, "fa/FaBox"), { size: 18, style: { color } })}
          </div>
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 900, color: C.dark, margin: 0, lineHeight: 1.2 }}>{item.name}</h3>
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color }}>{item.badge}</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "12px 0" }}>
          {item.listSizes.map((s, i) => (
            <span key={i} style={{
              fontSize: 11, fontWeight: 700, padding: "3px 10px",
              borderRadius: 20, background: "#e8f2fb", color: C.navy
            }}>{s}</span>
          ))}
        </div>

        <p style={{ fontSize: 13, color: C.text, lineHeight: 1.7, margin: "0 0 16px" }}>
          {item.listDescription}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px", marginBottom: 20 }}>
          {item.listFeatures.map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <FaCheck size={9} style={{ color: C.gold, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: C.text }}>{f}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: "auto", flexWrap: "wrap" }}>
          <Link href="/quote" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontSize: 13, fontWeight: 700, padding: "10px 20px",
            borderRadius: 8, background: C.gold, color: C.dark, textDecoration: "none"
          }}>
            <FaFileInvoice size={12} /> {fleetPage.quoteButtonLabel}
          </Link>
          <a href={site.phoneHref} style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontSize: 13, fontWeight: 700, padding: "10px 20px",
            borderRadius: 8, border: `2px solid ${C.navy}`, color: C.navy, textDecoration: "none"
          }}>
            <FaPhone size={12} /> {fleetPage.callButtonLabel}
          </a>
        </div>
      </div>

      {/* Image — using Next.js Image */}
      <div className="fleet-card-image">
        <Image
          src={item.image}
          alt={item.name}
          {...imageProps(item.image)}
          fill
          sizes="280px"
          className="object-cover"
          priority={false}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, rgba(15,45,74,0.3) 0%, transparent 60%)"
        }} />
        <span style={{
          position: "absolute", top: 12, left: 12,
          fontSize: 10, fontWeight: 800,
          textTransform: "uppercase", letterSpacing: 2,
          padding: "4px 10px", borderRadius: 20,
          background: C.gold, color: C.dark
        }}>{item.badge}</span>
      </div>
    </div>
  )
}

export default function FleetList({ fleetPage, fleet, site }) {
  return (
    <section style={{ backgroundColor: C.light, padding: "48px 24px" }}>
      <style>{`
        .fleet-card {
          display: grid;
          grid-template-columns: 1fr 280px;
          background: #fff;
          border-radius: 16px;
          border: 1.5px solid #d6e8f5;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(15,45,74,0.07);
        }
        .fleet-card-left {
          padding: 28px 32px;
          display: flex;
          flex-direction: column;
        }
        .fleet-card-image {
          position: relative;
          overflow: hidden;
          min-height: 200px;
        }
        @media (max-width: 768px) {
          .fleet-card { grid-template-columns: 1fr; }
          .fleet-card-image { height: 200px; }
          .fleet-card-left { padding: 20px 16px; }
        }
      `}</style>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
        {fleet.map(item => <FleetCard key={item.id} item={item} fleetPage={fleetPage} site={site} />)}
      </div>
    </section>
  )
}