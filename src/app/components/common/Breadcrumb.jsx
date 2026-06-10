"use client"

import Link from "next/link"

export default function Breadcrumb({ crumbs = [] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: 12,
        marginBottom: 16,
      }}
    >
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1
        return (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {i > 0 && (
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10 }}>›</span>
            )}
            {isLast || !crumb.href ? (
              <span style={{ color: "#c9a84c", fontWeight: 600 }}>
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                style={{ color: "#7a9bb5", textDecoration: "none" }}
              >
                {crumb.label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}