import { FaPhone, FaChevronRight } from "react-icons/fa6";
import Link from "next/link";

// ─────────────────────────────────────────────
//  TrustBar (light theme)
//  Directly below the hero:
//   • stat cards — white cards, navy numbers
//     (admin: Home → Trust bar)
//   • industries row — one white block with
//     links to the fleet filtered by industry
//  No state, no hooks — pure server component.
// ─────────────────────────────────────────────

// Tailwind needs literal class names, so map the item count to a column class.
const LG_COLS = { 1: "lg:grid-cols-1", 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" };
const NAVY = "#0f2d4a";

export default function TrustBar({ trustBar, site, services }) {
  const TRUST_STATS = trustBar.stats;

  return (
    <section className="page-section wrap" aria-label="Trust indicators">
      {/* ── Stat cards ── */}
      <div className={`grid grid-cols-2 ${LG_COLS[TRUST_STATS.length] || "lg:grid-cols-4"} gap-3 sm:gap-4`}>
        {TRUST_STATS.map((stat, i) => (
          <div
            key={i}
            className={`panel relative overflow-hidden flex flex-col items-center justify-center text-center py-6 sm:py-7 px-4 ${
              // Odd count on mobile: let the last stat use the full row
              TRUST_STATS.length % 2 === 1 && i === TRUST_STATS.length - 1 ? "col-span-2 lg:col-span-1" : ""
            }`}
          >
            <span className="absolute inset-x-0 top-0 h-[3px]" style={{ backgroundColor: "#c9a84c" }} aria-hidden="true" />
            <span
              className="block text-3xl md:text-4xl font-black tracking-tight leading-tight whitespace-nowrap mb-1.5"
              style={{ color: NAVY, fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              {stat.value}
            </span>
            <span className="text-xs font-semibold tracking-wider uppercase leading-snug max-w-[230px]" style={{ color: "#4a6b85" }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Industries served ── */}
      <div className="panel mt-3 sm:mt-4 px-5 sm:px-7 py-4">
        <div className="flex flex-wrap items-center justify-center lg:justify-between gap-3">
          <span className="text-xs font-bold tracking-[0.2em] uppercase shrink-0" style={{ color: "#86671e" }}>
            {trustBar.industriesLabel}
          </span>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/fleet?industry=${service.id}`}
                className="pill-outline-navy inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase group"
              >
                {service.label}
                <FaChevronRight size={8} className="opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: "#c9a84c" }} />
              </Link>
            ))}
          </div>

          <a
            href={site.phoneHref}
            className="hidden lg:inline-flex items-center gap-2 text-sm font-bold tracking-wide transition-colors hover:text-[#86671e] shrink-0"
            style={{ color: NAVY }}
          >
            <FaPhone size={13} style={{ color: "#86671e" }} />
            {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
