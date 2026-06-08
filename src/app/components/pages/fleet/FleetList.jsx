import Link from "next/link"
import {
  FaBox, FaTruck, FaSnowflake, FaBolt,
  FaIndustry, FaPlug, FaBuilding, FaFlask,
  FaCheck, FaPhone
} from "react-icons/fa"
import { FaFileInvoice } from "react-icons/fa6"

const FLEET = [
  {
    id: "container-dry",
    icon: FaBox,
    name: "Container Dry",
    category: "Storage Container Rentals",
    sizes: ["10 ft", "20 ft", "40 ft"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
    description: "Secure, weather-tight dry containers for on-site storage. Perfect for construction sites, retail overflow, and industrial storage.",
    features: ["Weatherproof", "Lockable", "Ground level access", "Multiple sizes", "Pest resistant", "Stackable"],
    color: "#2d8fdd",
  },
  {
    id: "trailers",
    icon: FaTruck,
    name: "Trailers",
    category: "Heavy-Duty Trailer Rentals",
    sizes: ["28 ft", "48 ft", "53 ft"],
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80",
    description: "Standard enclosed trailers for all general freight requirements. Ideal for temporary storage and on-site logistics.",
    features: ["Dry freight", "Roll-up doors", "Side doors", "Swing doors", "E-track rails", "Logistics ready"],
    color: "#2d8fdd",
  },
  {
    id: "reefer-diesel",
    icon: FaSnowflake,
    name: "Reefer Diesel",
    category: "Diesel Reefer Rentals",
    sizes: ["28 ft", "48 ft", "53 ft"],
    image: "https://images.unsplash.com/photo-1590534247854-e97d5e3feef6?auto=format&fit=crop&w=600&q=80",
    description: "Diesel-powered refrigerated trailers for temperature-sensitive cargo. Self-contained and ready to run independently.",
    features: ["Diesel powered", "Multi-temp zones", "24/7 monitoring", "Self-contained", "Independent", "Wide temp range"],
    color: "#2d8fdd",
  },
  {
    id: "reefer-electric",
    icon: FaBolt,
    name: "Reefer Electric",
    category: "Electric Reefer Rentals",
    sizes: ["20 ft", "40 ft"],
    image: "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=600&q=80",
    description: "Electric refrigerated units — quiet, efficient, and eco-friendly. Ideal for locations with reliable power access.",
    features: ["Electric powered", "Low noise", "Energy efficient", "Precise temp", "Eco friendly", "Indoor suitable"],
    color: "#2d8fdd",
  },
  {
    id: "reefer-container",
    icon: FaIndustry,
    name: "Reefer Container",
    category: "Refrigerated Container Rentals",
    sizes: ["20 ft", "40 ft"],
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80",
    description: "Refrigerated containers for stationary cold storage on your site. Plug in and keep product at the right temperature.",
    features: ["Plug-in electric", "Ground level", "Secure storage", "Temp monitoring", "Weatherproof", "Remote ready"],
    color: "#2d8fdd",
  },
  {
    id: "generator",
    icon: FaPlug,
    name: "Generator Units",
    category: "Industrial Generator Rentals",
    sizes: ["20 kW", "50 kW", "100 kW"],
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80",
    description: "Reliable power generation units for remote and industrial sites. Keep your operations running no matter the location.",
    features: ["Diesel powered", "Remote monitoring", "Auto transfer", "Weatherproof", "Load ready", "Fuel efficient"],
    color: "#c9a84c",
  },
  {
    id: "office",
    icon: FaBuilding,
    name: "Office Units",
    category: "Mobile Office Rentals",
    sizes: ["8x20 ft", "8x40 ft", "12x60 ft"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
    description: "Comfortable, ready-to-use portable office spaces for job sites. Climate controlled and fully equipped for daily work.",
    features: ["Climate controlled", "Electrical outlets", "Windows", "Lockable doors", "HVAC included", "Move-in ready"],
    color: "#c9a84c",
  },
  {
    id: "mud-lab",
    icon: FaFlask,
    name: "Mud Lab",
    category: "Custom Mud Lab Units",
    sizes: ["Custom"],
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80",
    description: "Specialized mud lab units for oilfield and drilling operations. Custom fit-out available to match your exact specs.",
    features: ["Oilfield spec", "Lab equipment ready", "Climate controlled", "Custom fit-out", "Industry standard", "Durable build"],
    color: "#c9a84c",
  },
]

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

function FleetCard({ item }) {
  const Icon = item.icon
  return (
    <div className="fleet-card">
      {/* Details */}
      <div className="fleet-card-left">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <div style={{
            width: 42, height: 42, borderRadius: 10,
            background: item.color + "18",
            border: `1px solid ${item.color}33`,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
          }}>
            <Icon size={18} style={{ color: item.color }} />
          </div>
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 900, color: C.dark, margin: 0, lineHeight: 1.2 }}>{item.name}</h3>
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: item.color }}>{item.category}</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "12px 0" }}>
          {item.sizes.map(s => (
            <span key={s} style={{
              fontSize: 11, fontWeight: 700, padding: "3px 10px",
              borderRadius: 20, background: "#e8f2fb", color: C.navy
            }}>{s}</span>
          ))}
        </div>

        <p style={{ fontSize: 13, color: C.text, lineHeight: 1.7, margin: "0 0 16px" }}>
          {item.description}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px", marginBottom: 20 }}>
          {item.features.map(f => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: 7 }}>
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
            <FaFileInvoice size={12} /> Get a Quote
          </Link>
          <a href="tel:580-226-7811" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontSize: 13, fontWeight: 700, padding: "10px 20px",
            borderRadius: 8, border: `2px solid ${C.navy}`, color: C.navy, textDecoration: "none"
          }}>
            <FaPhone size={12} /> Call Now
          </a>
        </div>
      </div>

      {/* Image */}
      <div className="fleet-card-image">
        <img
          src={item.image}
          alt={item.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: 200 }}
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
        }}>{item.category}</span>
      </div>
    </div>
  )
}

export default function FleetList() {
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
        }
        @media (max-width: 768px) {
          .fleet-card {
            grid-template-columns: 1fr;
          }
          .fleet-card-image {
            height: 200px;
          }
          .fleet-card-left {
            padding: 20px 16px;
          }
        }
      `}</style>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
        {FLEET.map(item => <FleetCard key={item.id} item={item} />)}
      </div>
    </section>
  )
}