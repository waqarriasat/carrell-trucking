import Link from "next/link"
import { FaHome, FaTruck, FaPhone } from "react-icons/fa"
import { getContent } from "@/app/lib/server/content"

const C = {
  dark:   "#0f2d4a",
  navy:   "#1e4d7b",
  gold:   "#c9a84c",
  muted:  "#a9c1d4",
  light:  "#f0f6fb",
  border: "#d6e8f5",
  text:   "#4a6b85",
}

export default async function NotFound() {
  const { notFound: page, site } = await getContent()

  return (
    <div className="page-section wrap" style={{
      minHeight: "70vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      fontFamily: "system-ui, sans-serif",
    }}>
      <div className="panel" style={{ maxWidth: 640, width: "100%", textAlign: "center", padding: "clamp(28px, 4vw, 48px)" }}>

        {/* 404 number */}
        <div style={{
          fontSize: "clamp(80px, 20vw, 140px)",
          fontWeight: 900,
          color: C.dark,
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
          fontWeight: 900, color: C.dark,
          margin: "0 0 12px", lineHeight: 1.2
        }}>
          {page.title}
        </h1>

        <p style={{ fontSize: 15, color: C.text, lineHeight: 1.8, margin: "0 0 32px" }}>
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
            borderRadius: 8, border: `2px solid ${C.dark}`, color: C.dark,
            textDecoration: "none"
          }}>
            <FaTruck size={14} /> {page.fleetLabel}
          </Link>
          <a href={site.phoneHref} style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 13, fontWeight: 700, padding: "12px 24px",
            borderRadius: 8, border: `2px solid ${C.border}`, color: C.text,
            textDecoration: "none"
          }}>
            <FaPhone size={14} /> {page.callLabel}
          </a>
        </div>

        {/* Quick links */}
        <div style={{
          background: C.light,
          border: `1px solid ${C.border}`,
          borderRadius: 14, padding: "20px 24px"
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: "#86671e", marginBottom: 14 }}>
            {page.quickLinksLabel}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {page.quickLinks.map((link, i) => (
              <Link key={i} href={link.href} style={{
                fontSize: 12, fontWeight: 600, padding: "6px 14px",
                borderRadius: 20, border: `1px solid ${C.border}`, background: "#fff",
                color: C.dark, textDecoration: "none",
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