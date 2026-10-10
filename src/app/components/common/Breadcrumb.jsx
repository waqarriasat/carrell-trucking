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
              <span style={{ color: "#8aa3b8", fontSize: 10 }}>›</span>
            )}
            {isLast || !crumb.href ? (
              <span style={{ color: "#86671e", fontWeight: 700 }}>
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                style={{ color: "#4a6b85", textDecoration: "none" }}
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