import Link from "next/link"
import { FaHome, FaTruck, FaPhone } from "react-icons/fa"
import { getContent } from "@/app/lib/server/content"

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

export default async function NotFound() {
  const { notFound: page, site } = await getContent()

  return (
    <div style={{
      background: C.dark,
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      fontFamily: "system-ui, sans-serif",
    }}>
      <div style={{ maxWidth: 560, width: "100%", textAlign: "center" }}>

        {/* 404 number */}
        <div style={{
          fontSize: "clamp(80px, 20vw, 140px)",
          fontWeight: 900,
          color: C.navy,
          lineHeight: 1,
          marginBottom: 8,
          userSelect: "none",
        }}>
          404
        </div>

        {/* Gold divider */}
        <div style={{ width: 60, height: 3, background: C.gold, margin: "0 auto 24px" }} />

        {/* Icon */}
        <div style={{
          width: 64, height: 64, borderRadius: "50%",
          background: C.navy,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px"
        }}>
          <FaTruck size={28} style={{ color: C.gold }} />
        </div>

        {/* Heading */}
        <h1 style={{
          fontSize: "clamp(22px, 5vw, 30px)",
          fontWeight: 900, color: "#fff",
          margin: "0 0 12px", lineHeight: 1.2
        }}>
          {page.title}
        </h1>

        <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.8, margin: "0 0 32px" }}>
          {page.text}
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
          <Link href="/" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 13, fontWeight: 700, padding: "12px 24px",
            borderRadius: 8, background: C.gold, color: C.dark,
            textDecoration: "none"
          }}>
            <FaHome size={14} /> {page.homeLabel}
          </Link>
          <Link href="/fleet" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 13, fontWeight: 700, padding: "12px 24px",
            borderRadius: 8, border: `2px solid ${C.blue}`, color: C.blue,
            textDecoration: "none"
          }}>
            <FaTruck size={14} /> {page.fleetLabel}
          </Link>
          <a href={site.phoneHref} style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 13, fontWeight: 700, padding: "12px 24px",
            borderRadius: 8, border: `2px solid ${C.muted}`, color: C.muted,
            textDecoration: "none"
          }}>
            <FaPhone size={14} /> {page.callLabel}
          </a>
        </div>

        {/* Quick links */}
        <div style={{
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${C.navy}`,
          borderRadius: 14, padding: "20px 24px"
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.gold, marginBottom: 14 }}>
            {page.quickLinksLabel}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {page.quickLinks.map((link, i) => (
              <Link key={i} href={link.href} style={{
                fontSize: 12, fontWeight: 600, padding: "6px 14px",
                borderRadius: 20, border: `1px solid ${C.navy}`,
                color: C.muted, textDecoration: "none",
              }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}