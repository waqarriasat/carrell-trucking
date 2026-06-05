import Link from "next/link";
import {
  FaBox,
  FaTruck,
  FaTemperatureHalf,
  FaBolt,
  FaSnowflake,
  FaPlug,
  FaBuilding,
  FaFlask,
  FaChevronRight,
  FaArrowRight,
  FaCheck,
} from "react-icons/fa6";
import { FLEET } from "@/app/lib/constants";

// ─────────────────────────────────────────────
//  FleetGrid
//  Responsive 4-col (desktop) / 2-col (tablet)
//  / 1-col (mobile) card grid of all 8 fleet
//  categories. Each card links to /fleet#id.
//
//  Icons are resolved from a local map so the
//  component stays a server component (no
//  dynamic require, no state).
//
//  No state, no hooks — pure server component.
// ─────────────────────────────────────────────

// ── Icon resolver ─────────────────────────────
const ICON_MAP = {
  FaBox,
  FaTruck,
  FaTemperatureHalf,
  FaBolt,
  FaSnowflake,
  FaPlug,
  FaBuilding,
  FaFlask,
};

// ── Category accent colors (hardcoded, not from COLORS object) ──
const CATEGORY_ACCENT = {
  container: "#2d8fdd",
  trailer:   "#2d8fdd",
  reefer:    "#2d8fdd",
  power:     "#c9a84c",
  specialty: "#c9a84c",
};

// ── Individual fleet card ─────────────────────
function FleetCard({ item }) {
  const Icon = ICON_MAP[item.iconName] ?? FaBox;
  const accent = CATEGORY_ACCENT[item.category] ?? "#2d8fdd";

  return (
    <Link
      href={`/fleet#${item.id}`}
      id={item.id}
      className="group relative flex flex-col rounded-xl border overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
      style={{
        backgroundColor: "#ffffff",
        borderColor: "#d6e8f5",
      }}
    >
      {/* ── Card header band ── */}
      <div
        className="relative flex items-center justify-between px-5 pt-5 pb-4"
        style={{ backgroundColor: "#f0f6fb" }}
      >
        {/* Icon circle */}
        <span
          className="flex items-center justify-center w-11 h-11 rounded-full shrink-0"
          style={{ backgroundColor: accent + "18", border: `1px solid ${accent}33` }}
        >
          <Icon size={20} style={{ color: accent }} />
        </span>

        {/* Badge */}
        {item.badge ? (
          <span
            className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: "#c9a84c18",
              color: "#c9a84c",
              border: "1px solid #c9a84c44",
            }}
          >
            {item.badge}
          </span>
        ) : (
          /* Category chip when no badge */
          <span
            className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: accent + "14",
              color: accent,
              border: `1px solid ${accent}33`,
            }}
          >
            {item.category}
          </span>
        )}
      </div>

      {/* Gold top-border accent on hover */}
      <span
        className="absolute top-0 inset-x-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
        style={{ backgroundColor: "#c9a84c" }}
        aria-hidden="true"
      />

      {/* ── Card body ── */}
      <div className="flex flex-col flex-1 px-5 py-4">
        {/* Name */}
        <h3
          className="font-bold text-base leading-snug mb-1"
          style={{ color: "#0f2d4a" }}
        >
          {item.name}
        </h3>

        {/* Sizes pill row */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {item.sizes.map((size) => (
            <span
              key={size}
              className="text-[11px] font-semibold px-2 py-0.5 rounded"
              style={{
                backgroundColor: "#e8f2fb",
                color: "#1e4d7b",
              }}
            >
              {size}
            </span>
          ))}
        </div>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-4 flex-1"
          style={{ color: "#4a6b85" }}
        >
          {item.description}
        </p>

        {/* Features list — top 3 only */}
        <ul className="space-y-1.5 mb-5">
          {item.features.slice(0, 3).map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-xs" style={{ color: "#4a6b85" }}>
              <FaCheck
                size={10}
                className="mt-0.5 shrink-0"
                style={{ color: "#c9a84c" }}
              />
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA link */}
        <div
          className="flex items-center justify-between pt-3 border-t"
          style={{ borderColor: "#d6e8f5" }}
        >
          <span
            className="text-xs font-bold tracking-wider uppercase group-hover:underline"
            style={{ color: accent }}
          >
            View Details
          </span>
          <FaChevronRight
            size={11}
            className="transition-transform duration-200 group-hover:translate-x-1"
            style={{ color: accent }}
          />
        </div>
      </div>
    </Link>
  );
}

// ── Main component ────────────────────────────
export default function FleetGrid() {
  return (
    <section
      className="w-full py-16 md:py-20"
      style={{ backgroundColor: "#f0f6fb" }}
      aria-labelledby="fleet-heading"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">

        {/* ── Section header ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-3">
              <span
                className="h-px w-8 shrink-0"
                style={{ backgroundColor: "#c9a84c" }}
                aria-hidden="true"
              />
              <span
                className="text-xs font-bold tracking-[0.2em] uppercase"
                style={{ color: "#c9a84c" }}
              >
                What We Rent
              </span>
            </div>

            <h2
              id="fleet-heading"
              className="text-3xl md:text-4xl font-black leading-tight"
              style={{
                color: "#0f2d4a",
                fontFamily: "'Georgia', 'Times New Roman', serif",
              }}
            >
              Our Full Fleet
            </h2>
            <p className="mt-2 text-base max-w-xl" style={{ color: "#4a6b85" }}>
              Eight equipment categories — dry, refrigerated, powered, and
              custom specialty — all available on a 2-month minimum rental.
            </p>
          </div>

          {/* Desktop "View all" link */}
          <Link
            href="/fleet"
            className="hidden md:inline-flex items-center gap-2 text-sm font-bold tracking-wide shrink-0 transition-colors hover:opacity-80"
            style={{ color: "#2d8fdd" }}
          >
            See full fleet page
            <FaArrowRight size={13} style={{ color: "#c9a84c" }} />
          </Link>
        </div>

        {/* ── Card grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FLEET.map((item) => (
            <FleetCard key={item.id} item={item} />
          ))}
        </div>

        {/* ── Mobile "View all" CTA ── */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href="/fleet"
            className="inline-flex items-center gap-2 px-6 py-3 rounded font-bold text-sm tracking-wider uppercase transition-all hover:brightness-110 active:scale-95"
            style={{ backgroundColor: "#2d8fdd", color: "#ffffff" }}
          >
            View Full Fleet
            <FaArrowRight size={13} />
          </Link>
        </div>

      </div>
    </section>
  );
}