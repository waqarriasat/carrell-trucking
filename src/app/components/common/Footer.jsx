import Link from "next/link";
import TextLogo from "./TextLogo";
import {
  FaPhone,
  FaEnvelope,
  FaLocationDot,
  FaTruck,
  FaChevronRight,
} from "react-icons/fa6";

// ─────────────────────────────────────────────
//  Footer
//  4-column grid layout (stacks to 2-col on
//  mobile, single col on xs).
//
//  Columns (text from the admin-managed content):
//    1. Company (logo + blurb)
//    2. Fleet links
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
      style={{ color: "#86671e", borderColor: "#e1e8f0" }}
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
    "group flex items-start gap-2 text-sm leading-snug mb-3 transition-colors text-[#4a6b85] hover:text-[#0f2d4a]";
  const style = undefined;

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
export default function Footer({ site, footer, fleet, services }) {
  const currentYear = new Date().getFullYear();

  const columns = [
    {
      heading: footer.fleetHeading,
      links: fleet.map((f) => ({ label: f.name, href: `/fleet/${f.id}` })),
    },
    {
      heading: footer.industriesHeading,
      links: services.map((s) => ({ label: s.label, href: `/services/${s.id}` })),
    },
    {
      heading: footer.contactHeading,
      links: [
        { label: `HQ: ${site.hqPhone || site.phone}`, href: site.hqPhoneHref || site.phoneHref },
        site.salesPhone && { label: `Sales: ${site.salesPhone}${site.salesName ? ` (${site.salesName})` : ""}`, href: site.salesPhoneHref },
        { label: site.email, href: site.emailHref },
        { label: `HQ: ${site.address}`, href: site.mapsHref },
        site.salesAddress && { label: `Sales & Yard: ${site.salesAddress}`, href: site.salesMapsHref },
        { label: footer.contactQuoteLabel, href: "/quote" },
      ].filter(Boolean),
    },
  ];

  return (
    <footer className="wrap">

      {/* ── CTA strip: one navy highlight block ── */}
      <div className="panel-navy">
        <div className="px-6 sm:px-10 py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p
              className="text-xs font-bold tracking-widest uppercase mb-1"
              style={{ color: "#c9a84c" }}
            >
              {footer.ctaEyebrow}
            </p>
            <p className="text-white font-semibold text-lg leading-tight">
              {footer.ctaTitle}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={site.phoneHref}
              className="flex items-center gap-2 px-5 py-2.5 rounded font-bold text-sm tracking-wide border-2 transition-colors text-white border-white/80 hover:bg-white hover:text-[#0f2d4a]"
            >
              <FaPhone size={13} />
              {site.phone}
            </a>
            <Link
              href={footer.ctaButton.href}
              className="px-5 py-2.5 rounded font-bold text-sm tracking-wider uppercase transition-all hover:brightness-110 active:scale-95"
              style={{ backgroundColor: "#c9a84c", color: "#0f2d4a" }}
            >
              {footer.ctaButton.label}
            </Link>
          </div>
        </div>
      </div>

      {/* ── 4-column grid: white block ── */}
      <div className="panel mt-[var(--gap)] px-6 sm:px-10 py-10 lg:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-8">

          {/* Col 1 — Company (enhanced: includes logo + blurb) */}
          <div className="col-span-2 md:col-span-1">
            {/* Wordmark */}
            <Link href="/" className="inline-block mb-5 transition-opacity hover:opacity-90" aria-label="Home">
              <TextLogo top={site.logoTop} bottom={site.logoBottom} size="lg" onLight />
            </Link>

            <p className="text-sm leading-relaxed mb-5" style={{ color: "#4a6b85" }}>
              {footer.blurb}
            </p>

            {/* Min rental badge */}
            <span
              className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full border"
              style={{ borderColor: "#c9a84c", color: "#86671e", backgroundColor: "#c9a84c14" }}
            >
              <FaTruck size={11} />
              {site.minRental}
            </span>
          </div>

          {/* Cols 2–4 — Fleet, Industries, Contact */}
          {columns.map((col, ci) => (
            <div key={ci}>
              <ColHeading>{col.heading}</ColHeading>
              <ul>
                {col.links.map((link, li) => (
                  <li key={li}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div>
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3">

          {/* Copyright */}
          <p className="text-xs text-center sm:text-left" style={{ color: "#4a6b85" }}>
            © {currentYear} {site.name}{`. ${footer.copyright}`}
          </p>

          {/* Address + contact row */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <a
              href={site.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs transition-colors text-[#4a6b85] hover:text-[#0f2d4a]"
            >
              <FaLocationDot size={11} style={{ color: "#86671e" }} />
              {site.city}, {site.state} {site.zip}
            </a>

            <a
              href={site.phoneHref}
              className="flex items-center gap-1.5 text-xs transition-colors text-[#4a6b85] hover:text-[#0f2d4a]"
            >
              <FaPhone size={11} style={{ color: "#86671e" }} />
              {site.phone}
            </a>

            <a
              href={site.emailHref}
              className="flex items-center gap-1.5 text-xs transition-colors text-[#4a6b85] hover:text-[#0f2d4a]"
            >
              <FaEnvelope size={11} style={{ color: "#86671e" }} />
              {site.email}
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
}