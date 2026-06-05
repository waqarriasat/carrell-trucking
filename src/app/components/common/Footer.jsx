import Link from "next/link";
import {
  FaPhone,
  FaEnvelope,
  FaLocationDot,
  FaTruck,
  FaChevronRight,
} from "react-icons/fa6";
import { SITE, FOOTER_COLUMNS } from "@/app/lib/constants";

// ─────────────────────────────────────────────
//  Footer
//  4-column grid layout (stacks to 2-col on
//  mobile, single col on xs).
//
//  Columns (from constants.js FOOTER_COLUMNS):
//    1. Company links
//    2. Fleet links (hash anchors)
//    3. Industries served
//    4. Contact info
//
//  No state, no hooks — pure server component.
// ─────────────────────────────────────────────

// ── Column heading label ──────────────────────
function ColHeading({ children }) {
  return (
    <h3
      className="text-xs font-bold tracking-[0.2em] uppercase mb-5 pb-3 border-b"
      style={{ color: "#c9a84c", borderColor: "#1e4d7b" }}
    >
      {children}
    </h3>
  );
}

// ── Standard link row ─────────────────────────
function FooterLink({ href, children }) {
  // External-ish links (tel:, mailto:, maps) render as <a>; all others as Next Link
  const isExternal =
    href.startsWith("tel:") ||
    href.startsWith("mailto:") ||
    href.startsWith("http");

  const cls =
    "group flex items-start gap-2 text-sm leading-snug mb-3 transition-colors hover:text-white";
  const style = { color: "#7a9bb5" };

  if (isExternal) {
    return (
      <a href={href} className={cls} style={style}>
        <FaChevronRight
          size={10}
          className="mt-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: "#c9a84c" }}
        />
        <span>{children}</span>
      </a>
    );
  }

  return (
    <Link href={href} className={cls} style={style}>
      <FaChevronRight
        size={10}
        className="mt-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ color: "#c9a84c" }}
      />
      <span>{children}</span>
    </Link>
  );
}

// ── Main component ────────────────────────────
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "#0a2038" }}>

      {/* ── CTA strip ── */}
      <div
        className="border-b"
        style={{ borderColor: "#1e4d7b", backgroundColor: "#0f2d4a" }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p
              className="text-xs font-bold tracking-widest uppercase mb-1"
              style={{ color: "#c9a84c" }}
            >
              Ready to Rent?
            </p>
            <p className="text-white font-semibold text-lg leading-tight">
              Get your equipment on-site fast.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={SITE.phoneHref}
              className="flex items-center gap-2 px-5 py-2.5 rounded font-bold text-sm tracking-wide border-2 transition-all hover:brightness-110"
              style={{ borderColor: "#7a9bb5", color: "#7a9bb5" }}
            >
              <FaPhone size={13} />
              {SITE.phone}
            </a>
            <Link
              href="/quote"
              className="px-5 py-2.5 rounded font-bold text-sm tracking-wider uppercase transition-all hover:brightness-110 active:scale-95"
              style={{ backgroundColor: "#c9a84c", color: "#0f2d4a" }}
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>

      {/* ── 4-column grid ── */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-8">

          {/* Col 1 — Company (enhanced: includes logo + blurb) */}
          <div className="col-span-2 md:col-span-1">
            {/* Wordmark */}
            <Link href="/" className="inline-block mb-4 group" aria-label="Home">
              <span
                className="block font-black text-xl tracking-tight text-white group-hover:opacity-90 transition-opacity"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
              >
                ARDMORE
              </span>
              <span
                className="block text-xs font-bold tracking-[0.22em] uppercase"
                style={{ color: "#c9a84c" }}
              >
                Trailer, Inc.
              </span>
            </Link>

            <p className="text-sm leading-relaxed mb-5" style={{ color: "#7a9bb5" }}>
              Southern Oklahoma&apos;s rental source for dry containers, reefers,
              trailers, generators, and custom specialty units.
            </p>

            {/* Min rental badge */}
            <span
              className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full border"
              style={{ borderColor: "#c9a84c", color: "#c9a84c" }}
            >
              <FaTruck size={11} />
              {SITE.minRental}
            </span>
          </div>

          {/* Cols 2–4 — from FOOTER_COLUMNS (skip index 0 — we handled Company above) */}
          {FOOTER_COLUMNS.slice(1).map((col) => (
            <div key={col.heading}>
              <ColHeading>{col.heading}</ColHeading>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="border-t"
        style={{ borderColor: "#1e4d7b" }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">

          {/* Copyright */}
          <p className="text-xs text-center sm:text-left" style={{ color: "#7a9bb5" }}>
            © {currentYear} {SITE.name}. All rights reserved.
          </p>

          {/* Address + contact row */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <a
              href={SITE.address.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs transition-colors hover:text-white"
              style={{ color: "#7a9bb5" }}
            >
              <FaLocationDot size={11} style={{ color: "#c9a84c" }} />
              {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
            </a>

            <a
              href={SITE.phoneHref}
              className="flex items-center gap-1.5 text-xs transition-colors hover:text-white"
              style={{ color: "#7a9bb5" }}
            >
              <FaPhone size={11} style={{ color: "#c9a84c" }} />
              {SITE.phone}
            </a>

            <a
              href={SITE.emailHref}
              className="flex items-center gap-1.5 text-xs transition-colors hover:text-white"
              style={{ color: "#7a9bb5" }}
            >
              <FaEnvelope size={11} style={{ color: "#c9a84c" }} />
              {SITE.email}
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
}