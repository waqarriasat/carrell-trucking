"use client";

import Link from "next/link";
import { FaXmark, FaPhone, FaChevronRight } from "react-icons/fa6";
import { NAV_LINKS, NAV_CTA, SITE } from "@/app/lib/constants";

// ─────────────────────────────────────────────
//  MobileMenu
//  Slide-down overlay drawer for small screens.
//  Props:
//    isOpen   {boolean}  — controls visibility
//    onClose  {function} — called when user closes menu
// ─────────────────────────────────────────────

export default function MobileMenu({ isOpen, onClose }) {
  return (
    <>
      {/* ── Backdrop ── */}
      <div
        onClick={onClose}
        className={[
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        aria-hidden="true"
      />

      {/* ── Drawer panel ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={[
          "fixed top-0 right-0 z-50 h-full w-72 flex flex-col",
          "transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        style={{ backgroundColor: "#0f2d4a" }}
      >
        {/* Header row */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b"
          style={{ borderColor: "#1e4d7b" }}
        >
          <span className="text-white font-bold text-sm tracking-widest uppercase">
            Menu
          </span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 rounded-md transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <FaXmark className="text-white" size={18} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="group flex items-center justify-between px-6 py-4 text-white/90 hover:text-white transition-colors border-b"
                  style={{ borderColor: "#1e4d7b" }}
                >
                  <span className="font-medium tracking-wide">{link.label}</span>
                  <FaChevronRight
                    size={12}
                    className="text-white/30 group-hover:text-white/70 transition-colors"
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA button */}
          <div className="px-6 pt-6 pb-4">
            <Link
              href={NAV_CTA.href}
              onClick={onClose}
              className="block w-full text-center py-3 px-6 rounded font-bold text-sm tracking-wider uppercase transition-all duration-200 hover:brightness-110 active:scale-95"
              style={{ backgroundColor: "#c9a84c", color: "#0f2d4a" }}
            >
              {NAV_CTA.label}
            </Link>
          </div>
        </nav>

        {/* Footer contact strip */}
        <div
          className="px-6 py-5 border-t"
          style={{ borderColor: "#1e4d7b", backgroundColor: "#0a2038" }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-3"
             style={{ color: "#7a9bb5" }}>
            Call Direct
          </p>
          <a
            href={SITE.phoneHref}
            className="flex items-center gap-3 text-white hover:text-white/80 transition-colors"
          >
            <span
              className="flex items-center justify-center w-8 h-8 rounded-full shrink-0"
              style={{ backgroundColor: "#2d8fdd" }}
            >
              <FaPhone size={13} className="text-white" />
            </span>
            <span className="font-bold text-lg tracking-wide">{SITE.phone}</span>
          </a>
        </div>
      </div>
    </>
  );
}