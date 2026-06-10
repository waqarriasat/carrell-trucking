"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaBars, FaPhone, FaChevronDown } from "react-icons/fa6";
import { NAV_LINKS, NAV_CTA, SITE, FLEET, SERVICES } from "@/app/lib/constants";
import MobileMenu from "./MobileMenu";

const DROPDOWNS = {
  "/fleet": {
    items: FLEET.map((f) => ({ label: f.name, href: `/fleet/${f.id}` })),
    viewAll: { label: "View All Fleet", href: "/fleet" },
  },
  "/services": {
    items: SERVICES.map((s) => ({ label: s.label, href: `/services/${s.id}` })),
    viewAll: { label: "View All Services", href: "/services" },
  },
}

export default function Navbar() {
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
    "fixed top-0 inset-x-0 z-30 transition-all duration-300",
    scrolled ? "shadow-lg" : "",
  ].join(" ")}
  style={{ backgroundColor: "#0f2d4a" }}
>
        {/* Top micro-bar */}
        <div
          className="hidden lg:flex items-center justify-end px-6 py-1.5 text-xs font-medium gap-2 border-b"
          style={{ backgroundColor: "#0a2038", borderColor: "#1e4d7b", color: "#7a9bb5" }}
        >
          <FaPhone size={11} style={{ color: "#c9a84c" }} />
          <a href={SITE.phoneHref} className="hover:text-white transition-colors tracking-wide">
            {SITE.phone}
          </a>
          <span className="mx-2 opacity-30">|</span>
          <span>{SITE.address.city}, {SITE.address.state}</span>
        </div>

        {/* Main nav row */}
        <div className="flex items-center justify-between px-5 md:px-8 lg:px-10 h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Ardmore Trailer, Inc. — Home">
            <div className="flex flex-col leading-none">
              <span
                className="font-black text-lg md:text-xl tracking-tight text-white group-hover:opacity-90 transition-opacity"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
              >
                ARDMORE
              </span>
              <span className="text-xs font-bold tracking-[0.22em] uppercase" style={{ color: "#c9a84c" }}>
                Trailer, Inc.
              </span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => {
              const dropdown = DROPDOWNS[link.href]
              const isOpen = activeDropdown === link.href

              return (
                <div
                  key={link.href}
                  style={{ position: "relative" }}
                  onMouseEnter={() => dropdown && openDropdown(link.href)}
                  onMouseLeave={() => dropdown && closeDropdown()}
                >
                  <Link
                    href={link.href}
                    onClick={() => dropdown && setActiveDropdown(isOpen ? null : link.href)}
                    className="relative flex items-center gap-1 px-4 py-2 text-sm font-medium tracking-wide text-white/80 hover:text-white transition-colors rounded"
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

            <span className="mx-2 h-5 w-px opacity-20" style={{ backgroundColor: "#7a9bb5" }} aria-hidden="true" />

            <Link
              href={NAV_CTA.href}
              className="px-5 py-2 rounded text-sm font-bold tracking-wider uppercase border-2 transition-all duration-200 hover:brightness-110 active:scale-95"
              style={{ borderColor: "#c9a84c", color: "#c9a84c" }}
            >
              {NAV_CTA.label}
            </Link>
          </nav>

          {/* Mobile */}
          <div className="flex items-center gap-3 lg:hidden">
            <a
              href={SITE.phoneHref}
              aria-label={`Call ${SITE.phone}`}
              className="flex items-center justify-center w-9 h-9 rounded-full transition-colors hover:bg-white/10"
              style={{ color: "#c9a84c" }}
            >
              <FaPhone size={16} />
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              className="flex items-center justify-center w-9 h-9 rounded-md transition-colors hover:bg-white/10"
            >
              <FaBars size={20} className="text-white" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}