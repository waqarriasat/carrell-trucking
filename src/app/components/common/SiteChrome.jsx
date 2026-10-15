"use client"

import { usePathname } from "next/navigation"

// Public pages get the navbar, footer, convoy animation and WhatsApp button;
// the admin panel (/admin/*) renders on its own.
export default function SiteChrome({ navbar, deliveryBar, footer, convoy, whatsapp, children }) {
  const pathname = usePathname() || ""
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return children

  return (
    <>
      {navbar}
      {deliveryBar}
      {/* Page sections are full-width bands (see .page-section in globals.css) */}
      <main className="site-main">{children}</main>
      {footer}
      {convoy}
      {whatsapp}
    </>
  )
}
