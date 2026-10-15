"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaBars, FaPhone, FaChevronDown, FaChevronRight } from "react-icons/fa6";
import TextLogo from "./TextLogo";
import MobileMenu from "./MobileMenu";

export default function Navbar({ site, nav, fleet, services, resources, topLinks = [] }) {
  const DROPDOWNS = {
    "/fleet": {
      items: fleet.map((f) => ({ label: f.name, href: `/fleet/${f.id}`, image: f.image })),
      viewAll: { label: nav.fleetViewAll, href: "/fleet" },
    },
    "/services": {
      items: services.map((s) => ({ label: s.label, href: `/services/${s.id}`, description: s.description })),
      viewAll: { label: nav.servicesViewAll, href: "/services" },
    },
    "/blog": resources && {
      columns: [
        { heading: resources.guidesHeading, items: resources.guides.map((p) => ({ label: p.title, href: `/blog/${p.id}` })) },
        {
          heading: resources.topicsHeading,
          items: [
            ...resources.categories.map((c) => ({ label: c.label, href: `/blog/category/${c.id}` })),
            { label: resources.faqLabel, href: "/faq" },
          ],
        },
      ],
      note: resources.note,
      viewAll: { label: resources.viewAll, href: "/blog" },
    },
  }

  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const openDropdown = (href) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveDropdown(href)
  }

  const closeDropdown = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150)
  }

  return (
    <>
      <style>{`
/* ── Header dropdown menus ──
   Square, clean panels that open flush under the header: thin gold top
   line, divider lines between items, light hover with a gold marker. */
.nav-dropdown {
  position: absolute;
  top: calc(100% + 22px);
  background: #ffffff;
  border: 1px solid #e3e9f0;
  border-top: 3px solid #c9a84c;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 18px 40px rgba(15, 45, 74, 0.16);
  z-index: 100;
  animation: navDrop 0.16s ease-out both;
}
/* invisible bridge so the menu stays open while the cursor moves down */
.nav-dropdown::before {
  content: "";
  position: absolute;
  left: 0; right: 0; top: -26px; height: 26px;
}
@keyframes navDrop {
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
}
.nav-dropdown .dd-heading {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #86671e;
  padding: 18px 22px 10px;
}
.nav-dropdown .dd-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 11px 22px;
  border-top: 1px solid #edf1f5;
  color: #0f2d4a;
  text-decoration: none;
  transition: background-color 0.15s;
}
.nav-dropdown .dd-item::before {
  content: "";
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  background: #c9a84c;
  transform: scaleY(0);
  transition: transform 0.15s;
}
.nav-dropdown .dd-item:hover,
.nav-dropdown .dd-item:focus-visible {
  background: #f5f7fa;
}
.nav-dropdown .dd-item:hover::before,
.nav-dropdown .dd-item:focus-visible::before {
  transform: scaleY(1);
}
.nav-dropdown .dd-title {
  display: block;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.3;
}
.nav-dropdown .dd-sub {
  display: block;
  margin-top: 2px;
  font-size: 12px;
  line-height: 1.4;
  color: #5b7389;
}
.nav-dropdown .dd-thumb {
  flex: none;
  width: 64px;
  height: 40px;
  object-fit: contain;
}
.nav-dropdown .dd-arrow {
  margin-left: auto;
  color: #c9a84c;
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.15s, transform 0.15s;
}
.nav-dropdown .dd-item:hover .dd-arrow { opacity: 1; transform: translateX(0); }
.nav-dropdown .dd-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 22px;
  border-top: 1px solid #e3e9f0;
  background: #f5f7fa;
  font-size: 13px;
}
.nav-dropdown .dd-footer a {
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-size: 12px;
  color: #0f2d4a;
  text-decoration: none;
}
.nav-dropdown .dd-footer a:hover { color: #86671e; }
.fleet-dropdown { left: -120px; width: 640px; }
.fleet-dropdown .dd-grid { display: grid; grid-template-columns: 1fr 1fr; }
.fleet-dropdown .dd-grid .dd-item:nth-child(odd) { border-right: 1px solid #edf1f5; }
.services-dropdown { left: 0; width: 340px; }
.nav-dropdown .dd-cols { display: grid; grid-template-columns: 1fr 1fr; }
.nav-dropdown .dd-cols > div + div { border-left: 1px solid #edf1f5; }
.resources-dropdown { left: -220px; width: 620px; }
`}</style>

      <header
        className={[
          "fixed top-0 inset-x-0 z-30 transition-all duration-300 border-b",
          scrolled ? "shadow-lg" : "shadow-sm",
        ].join(" ")}
        style={{ backgroundColor: "#0f2d4a", borderColor: "#c9a84c" }}
      >
        {/* Top bar (desktop) — small links above the main row, e.g. Request Pickup.
            Only rendered when there is a link to show; globals.css adds its height to the page offset. */}
        {topLinks.length > 0 && (
          <div className="site-topbar hidden lg:block border-b" style={{ backgroundColor: "#0a2038", borderColor: "rgba(201,168,76,0.35)" }}>
            <div className="wrap h-8 flex items-center justify-end gap-6">
              {topLinks.map((l) => (
                <Link key={l.href} href={l.href} className="text-[12px] font-semibold tracking-wide text-white/85 hover:text-[#c9a84c] transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Main row — dark navy: text logo on the left, prominent phone on the right */}
        <div className="flex items-center justify-between gap-2 sm:gap-4 wrap h-16 lg:h-20">

          {/* Text logo (white + gold on the dark header) */}
          <Link href="/" className="flex items-center shrink-0 transition-opacity hover:opacity-90" aria-label={`${site.name} — Home`}>
            <TextLogo top={site.logoTop} bottom={site.logoBottom} />
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-1 ml-auto" aria-label="Primary navigation">
            {nav.links.map((link, li) => {
              const dropdown = DROPDOWNS[link.href]
              const isOpen = activeDropdown === link.href

              return (
                <div
                  key={li}
                  style={{ position: "relative" }}
                  onMouseEnter={() => dropdown && openDropdown(link.href)}
                  onMouseLeave={() => dropdown && closeDropdown()}
                >
                  <Link
                    href={link.href}
                    onClick={() => dropdown && setActiveDropdown(isOpen ? null : link.href)}
                    className="relative flex items-center gap-1 whitespace-nowrap px-2 xl:px-4 py-2 text-[14px] xl:text-[15px] font-semibold tracking-wide transition-colors rounded text-white hover:text-[#c9a84c]"
                  >
                    {link.label}
                    {dropdown && (
                      <FaChevronDown
                        size={10}
                        style={{
                          color: "#c9a84c",
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.2s"
                        }}
                      />
                    )}
                    <span
                      className="absolute bottom-0 left-4 right-4 h-px origin-left transition-transform duration-200"
                      style={{
                        backgroundColor: "#c9a84c",
                        transform: isOpen ? "scaleX(1)" : "scaleX(0)"
                      }}
                      aria-hidden="true"
                    />
                  </Link>

                  {/* Fleet dropdown — two columns with a picture of each unit */}
                  {dropdown && isOpen && link.href === "/fleet" && (
                    <div
                      className="nav-dropdown fleet-dropdown"
                      onMouseEnter={() => openDropdown(link.href)}
                      onMouseLeave={() => closeDropdown()}
                    >
                      <div className="dd-heading">{link.label}</div>
                      <div className="dd-grid">
                        {dropdown.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="dd-item"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {item.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={item.image} alt="" className="dd-thumb" loading="lazy" />
                            ) : null}
                            <span className="dd-title">{item.label}</span>
                          </Link>
                        ))}
                      </div>
                      <div className="dd-footer">
                        <span style={{ color: "#5b7389" }}>{nav.mobileCallLabel}: <a href={site.phoneHref} style={{ textTransform: "none", letterSpacing: 0 }}>{site.phone}</a></span>
                        <Link href={dropdown.viewAll.href} onClick={() => setActiveDropdown(null)}>
                          {dropdown.viewAll.label} →
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Services dropdown — industries with a short line each */}
                  {dropdown && isOpen && link.href === "/services" && (
                    <div
                      className="nav-dropdown services-dropdown"
                      onMouseEnter={() => openDropdown(link.href)}
                      onMouseLeave={() => closeDropdown()}
                    >
                      <div className="dd-heading">{link.label}</div>
                      {dropdown.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="dd-item"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <span>
                            <span className="dd-title">{item.label}</span>
                            {item.description ? <span className="dd-sub">{item.description}</span> : null}
                          </span>
                          <FaChevronRight size={11} className="dd-arrow" />
                        </Link>
                      ))}
                      <div className="dd-footer">
                        <Link href={dropdown.viewAll.href} onClick={() => setActiveDropdown(null)}>
                          {dropdown.viewAll.label} →
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Resources dropdown — guides on the left, topics + FAQ on the right */}
                  {dropdown && isOpen && link.href === "/blog" && (
                    <div className="nav-dropdown resources-dropdown" onMouseEnter={() => openDropdown(link.href)} onMouseLeave={() => closeDropdown()}>
                      <div className="dd-cols">
                        {dropdown.columns.map((col) => (
                          <div key={col.heading}>
                            <div className="dd-heading">{col.heading}</div>
                            {col.items.map((item) => (
                              <Link key={item.href} href={item.href} className="dd-item" onClick={() => setActiveDropdown(null)}>
                                <span className="dd-title" style={{ fontWeight: 600 }}>{item.label}</span>
                                <FaChevronRight size={11} className="dd-arrow" />
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                      <div className="dd-footer">
                        <span>{dropdown.note}</span>
                        <Link href={dropdown.viewAll.href} onClick={() => setActiveDropdown(null)}>{dropdown.viewAll.label} →</Link>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Desktop: prominent phone + quote button */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-5 shrink-0 pl-3 xl:pl-5 border-l" style={{ borderColor: "rgba(255,255,255,0.18)" }}>
            <a href={site.phoneHref} className="flex items-center gap-2.5 group" aria-label={`Call ${site.phone}`}>
              <span className="hidden xl:flex items-center justify-center w-10 h-10 rounded-full" style={{ backgroundColor: "rgba(201,168,76,0.18)" }}>
                <FaPhone size={15} style={{ color: "#c9a84c" }} />
              </span>
              <span className="leading-tight">
                <span className="hidden xl:block text-[10px] font-extrabold tracking-[0.2em] uppercase" style={{ color: "#c9a84c" }}>
                  {nav.mobileCallLabel}
                </span>
                <span className="block text-lg xl:text-xl font-extrabold tracking-wide text-white whitespace-nowrap group-hover:text-[#c9a84c] transition-colors">
                  {site.phone}
                </span>
              </span>
            </a>
            <Link
              href={nav.cta.href}
              className="px-4 xl:px-5 py-3 rounded text-sm font-extrabold tracking-wider uppercase whitespace-nowrap transition-all duration-200 hover:brightness-110 active:scale-95"
              style={{ backgroundColor: "#c9a84c", color: "#0f2d4a" }}
            >
              {nav.cta.label}
            </Link>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={site.phoneHref}
              aria-label={`Call ${site.phone}`}
              className="flex items-center gap-2 max-[400px]:gap-1.5 h-9 px-2.5 max-[400px]:px-2 rounded-[3px] whitespace-nowrap transition-colors"
              style={{ backgroundColor: "rgba(201,168,76,0.18)", color: "#ffffff" }}
            >
              <FaPhone size={14} style={{ color: "#c9a84c" }} />
              <span className="text-sm max-[400px]:text-[13px] font-extrabold">{site.phone}</span>
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              className="flex items-center justify-center w-9 h-9 rounded-[4px] transition-colors hover:bg-white/10"
            >
              <FaBars size={20} style={{ color: "#ffffff" }} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} site={site} nav={nav} fleet={fleet} services={services} resources={resources} extraLinks={topLinks.filter((l) => !nav.links.some((n) => n.href === l.href))} />
    </>
  )
}