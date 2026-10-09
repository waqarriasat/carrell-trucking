import { FaPhone, FaChevronRight } from "react-icons/fa6";
import Link from "next/link";

// ─────────────────────────────────────────────
//  TrustBar
//  Full-width strip that sits directly below
//  the Hero. Two rows:
//
//  Row 1 — stat counters (admin: Home → Trust bar)
//  Row 2 — industry pills (from services)
//
//  No state, no hooks — pure server component.
// ─────────────────────────────────────────────

// Tailwind needs literal class names, so map the item count to a column class.
const LG_COLS = { 1: "lg:grid-cols-1", 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" };

export default function TrustBar({ trustBar, site, services }) {
  const TRUST_STATS = trustBar.stats;

  return (
    <section
      className="relative w-full"
      style={{ backgroundColor: "#0f2d4a" }}
      aria-label="Trust indicators"
    >
      {/* ── Top divider rule ── */}
      <div
        className="h-px w-full"
        style={{ backgroundColor: "#1e4d7b" }}
        aria-hidden="true"
      />

      {/* ── Stat row ── */}
      <div
        className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10"
        style={{ borderBottom: "1px solid #1e4d7b" }}
      >
        <div className={`grid grid-cols-2 ${LG_COLS[TRUST_STATS.length] || "lg:grid-cols-4"}`}>
          {TRUST_STATS.map((stat, i) => (
            <div
              key={i}
              className={`relative flex flex-col items-center justify-start text-center py-8 px-4 ${
                // Odd count on mobile: let the last stat use the full row
                TRUST_STATS.length % 2 === 1 && i === TRUST_STATS.length - 1 ? "col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Vertical divider between items (not after last) */}
              {i < TRUST_STATS.length - 1 && (
                <span
                  className="hidden lg:block absolute right-0 top-1/4 bottom-1/4 w-px"
                  style={{ backgroundColor: "#1e4d7b" }}
                  aria-hidden="true"
                />
              )}
              {/* Mobile: divider on right for first col items */}
              {i % 2 === 0 && i < TRUST_STATS.length - 1 && (
                <span
                  className="lg:hidden absolute right-0 top-1/4 bottom-1/4 w-px"
                  style={{ backgroundColor: "#1e4d7b" }}
                  aria-hidden="true"
                />
              )}

              {/* Stat value */}
              <span
                className="block text-3xl md:text-4xl font-black tracking-tight leading-tight whitespace-nowrap mb-1"
                style={{
                  color: "#c9a84c",
                  fontFamily: "'Georgia', 'Times New Roman', serif",
                }}
              >
                {stat.value}
              </span>

              {/* Stat label */}
              <span
                className="text-xs font-semibold tracking-wider uppercase leading-snug max-w-[220px]"
                style={{ color: "#7a9bb5" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Industries served row ── */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10 py-5">
        <div className="flex flex-wrap items-center justify-center lg:justify-between gap-3">

          {/* Label */}
          <span
            className="text-xs font-bold tracking-[0.2em] uppercase shrink-0"
            style={{ color: "#7a9bb5" }}
          >
            {trustBar.industriesLabel}
          </span>

          {/* Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/fleet?industry=${service.id}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border transition-all duration-200 hover:border-opacity-100 hover:text-white group"
                style={{
                  borderColor: "#1e4d7b",
                  color: "#7a9bb5",
                }}
              >
                {service.label}
                <FaChevronRight
                  size={8}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: "#c9a84c" }}
                />
              </Link>
            ))}
          </div>

          {/* Phone CTA — desktop only */}
          <a
            href={site.phoneHref}
            className="hidden lg:inline-flex items-center gap-2 text-sm font-bold tracking-wide transition-colors hover:text-white shrink-0"
            style={{ color: "#2d8fdd" }}
          >
            <FaPhone size={13} style={{ color: "#c9a84c" }} />
            {site.phone}
          </a>

        </div>
      </div>

      {/* ── Bottom transition into light section ── */}
      <div
        className="h-8"
        style={{
          background: "linear-gradient(to bottom, #0f2d4a, #f0f6fb)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}