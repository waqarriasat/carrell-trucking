"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaPhone } from "react-icons/fa6";
import { NAV_LINKS, NAV_CTA, SITE } from "@/app/lib/constants";
import MobileMenu from "./MobileMenu";

// ─────────────────────────────────────────────
//  Navbar
//  Sticky top navigation bar.
//  - Transparent → solid on scroll (scrolled state)
//  - Desktop: horizontal link row + CTA button
//  - Mobile: hamburger → MobileMenu drawer
// ─────────────────────────────────────────────

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to swap background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={[
          "fixed top-0 inset-x-0 z-30 transition-all duration-300",
          scrolled
            ? "shadow-lg"
            : "bg-transparent",
        ].join(" ")}
        style={scrolled ? { backgroundColor: "#0f2d4a" } : {}}
      >
        {/* ── Top micro-bar: phone number ── */}
        <div
          className="hidden lg:flex items-center justify-end px-6 py-1.5 text-xs font-medium gap-2 border-b"
          style={{
            backgroundColor: "#0a2038",
            borderColor: "#1e4d7b",
            color: "#7a9bb5",
          }}
        >
          <FaPhone size={11} style={{ color: "#c9a84c" }} />
          <a
            href={SITE.phoneHref}
            className="hover:text-white transition-colors tracking-wide"
          >
            {SITE.phone}
          </a>
          <span className="mx-2 opacity-30">|</span>
          <span>{SITE.address.city}, {SITE.address.state}</span>
        </div>

        {/* ── Main nav row ── */}
        <div className="flex items-center justify-between px-5 md:px-8 lg:px-10 h-16">


          {/* Wordmark / Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Ardmore Trailer, Inc. — Home"
          >
           

            <div className="flex flex-col leading-none">
              <span
                className="font-black text-lg md:text-xl tracking-tight text-white group-hover:opacity-90 transition-opacity"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
              >
                ARDMORE
              </span>

              <span
                className="text-xs font-bold tracking-[0.22em] uppercase"
                style={{ color: "#c9a84c" }}
              >
                Trailer, Inc.
              </span>
            </div>
          </Link>

          {/* ── Desktop nav links ── */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium tracking-wide text-white/80 hover:text-white transition-colors rounded
                           after:absolute after:bottom-0 after:left-4 after:right-4 after:h-px after:scale-x-0
                           hover:after:scale-x-100 after:transition-transform after:duration-200"
                style={{ "--tw-after-bg": "#c9a84c" }}
              >
                {link.label}
                {/* Gold underline hover indicator */}
                <span
                  className="absolute bottom-0 left-4 right-4 h-px scale-x-0 hover:scale-x-100 transition-transform duration-200 origin-left"
                  style={{ backgroundColor: "#c9a84c" }}
                  aria-hidden="true"
                />
              </Link>
            ))}

            {/* Divider */}
            <span className="mx-2 h-5 w-px opacity-20" style={{ backgroundColor: "#7a9bb5" }} aria-hidden="true" />

            {/* CTA */}
            <Link
              href={NAV_CTA.href}
              className="px-5 py-2 rounded text-sm font-bold tracking-wider uppercase border-2 transition-all duration-200 hover:brightness-110 active:scale-95"
              style={{
                borderColor: "#c9a84c",
                color: "#c9a84c",
              }}
            >
              {NAV_CTA.label}
            </Link>
          </nav>

          {/* ── Mobile: phone icon + hamburger ── */}
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
              className="flex items-center justify-center w-9 h-9 rounded-md transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <FaBars size={20} className="text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer — rendered outside the header so it can cover the full viewport */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}