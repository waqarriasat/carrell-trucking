"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaBars, FaPhone, FaChevronDown } from "react-icons/fa6";
import TextLogo from "./TextLogo";
import MobileMenu from "./MobileMenu";

export default function Navbar({ site, nav, fleet, services }) {
  const DROPDOWNS = {
    "/fleet": {
      items: fleet.map((f) => ({ label: f.name, href: `/fleet/${f.id}` })),
      viewAll: { label: nav.fleetViewAll, href: "/fleet" },
    },
    "/services": {
      items: services.map((s) => ({ label: s.label, href: `/services/${s.id}` })),
      viewAll: { label: nav.servicesViewAll, href: "/services" },
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
  .nav-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: auto;
  right: 0;
  transform: none;
  background: #fff;
  border: 1.5px solid #d6e8f5;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(15,45,74,0.15);
  z-index: 100;
  min-width: 200px;
  overflow: hidden;
  animation: dropInSimple 0.15s ease forwards;
}
.nav-dropdown.fleet-dropdown {
  min-width: 300px;
  left: 0;
  right: 0;
  transform: none;
  animation: dropInSimple 0.15s ease forwards;
}
.nav-dropdown.services-dropdown {
  min-width: 200px;
  left: 0;
  right: 0;
  transform: none;
  animation: dropInSimple 0.15s ease forwards;
}
.dropdown-item {
  display: block;
  padding: 9px 16px;
  font-size: 13px;
  font-weight: 500;
  color: #4a6b85;
  text-decoration: none;
  transition: all 0.15s;
  border-bottom: 1px solid #f0f6fb;
}
.dropdown-item:hover {
  background: #f0f6fb;
  color: #0f2d4a;
  padding-left: 20px;
}
.dropdown-item:last-child { border-bottom: none; }
.view-all-link {
  display: block;
  padding: 10px 16px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #c9a84c;
  text-decoration: none;
  background: #0f2d4a;
  transition: opacity 0.15s;
}
.view-all-link:hover { opacity: 0.85; }
@keyframes dropInSimple {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fleet-dropdown-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 8px;
  gap: 2px;
}
.fleet-dropdown-item {
  display: block;
  padding: 9px 12px;
  font-size: 13px;
  font-weight: 500;
  color: #4a6b85;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.15s;
}
.fleet-dropdown-item:hover {
  background: #f0f6fb;
  color: #0f2d4a;
}
.fleet-dropdown-footer {
  border-top: 1.5px solid #d6e8f5;
  padding: 10px 16px;
  background: #0f2d4a;
}
`}</style>

      <header
        className={[
          "fixed top-0 inset-x-0 z-30 transition-all duration-300 border-b",
          scrolled ? "shadow-lg" : "shadow-sm",
        ].join(" ")}
        style={{ backgroundColor: "#0f2d4a", borderColor: "#c9a84c" }}
      >
        {/* Main row — dark navy: text logo on the left, prominent phone on the right */}
        <div className="flex items-center justify-between gap-4 wrap h-16 lg:h-20">

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
                    className="relative flex items-center gap-1 px-3 xl:px-4 py-2 text-[15px] font-semibold tracking-wide transition-colors rounded text-white hover:text-[#c9a84c]"
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

                  {/* Fleet dropdown — 2 column grid */}
                  {dropdown && isOpen && link.href === "/fleet" && (
                    <div
                      className="nav-dropdown fleet-dropdown"
                      onMouseEnter={() => openDropdown(link.href)}
                      onMouseLeave={() => closeDropdown()}
                    >
                      <div className="fleet-dropdown-grid">
                        {dropdown.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="fleet-dropdown-item"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                      <div className="fleet-dropdown-footer">
                        <Link
                          href={dropdown.viewAll.href}
                          className="view-all-link"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {dropdown.viewAll.label} →
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Services dropdown — single column */}
                  {dropdown && isOpen && link.href === "/services" && (
                    <div
                      className="nav-dropdown services-dropdown"
                      onMouseEnter={() => openDropdown(link.href)}
                      onMouseLeave={() => closeDropdown()}
                    >
                      {dropdown.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="dropdown-item"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {item.label}
                        </Link>
                      ))}
                      <Link
                        href={dropdown.viewAll.href}
                        className="view-all-link"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {dropdown.viewAll.label} →
                      </Link>
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Desktop: prominent phone + quote button */}
          <div className="hidden lg:flex items-center gap-5 shrink-0 pl-5 border-l" style={{ borderColor: "rgba(255,255,255,0.18)" }}>
            <a href={site.phoneHref} className="flex items-center gap-2.5 group" aria-label={`Call ${site.phone}`}>
              <span className="flex items-center justify-center w-10 h-10 rounded-full" style={{ backgroundColor: "rgba(201,168,76,0.18)" }}>
                <FaPhone size={15} style={{ color: "#c9a84c" }} />
              </span>
              <span className="leading-tight">
                <span className="hidden xl:block text-[10px] font-extrabold tracking-[0.2em] uppercase" style={{ color: "#c9a84c" }}>
                  {nav.mobileCallLabel}
                </span>
                <span className="block text-xl font-extrabold tracking-wide text-white group-hover:text-[#c9a84c] transition-colors">
                  {site.phone}
                </span>
              </span>
            </a>
            <Link
              href={nav.cta.href}
              className="px-5 py-3 rounded text-sm font-extrabold tracking-wider uppercase transition-all duration-200 hover:brightness-110 active:scale-95"
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
              className="flex items-center gap-2 h-9 px-2.5 rounded-full transition-colors"
              style={{ backgroundColor: "rgba(201,168,76,0.18)", color: "#ffffff" }}
            >
              <FaPhone size={14} style={{ color: "#c9a84c" }} />
              <span className="text-sm font-extrabold">{site.phone}</span>
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              className="flex items-center justify-center w-9 h-9 rounded-md transition-colors hover:bg-white/10"
            >
              <FaBars size={20} style={{ color: "#ffffff" }} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} site={site} nav={nav} fleet={fleet} services={services} />
    </>
  )
}