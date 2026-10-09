"use client"

import { usePathname } from "next/navigation"

// Public pages get the navbar, footer, convoy animation and WhatsApp button;
// the admin panel (/admin/*) renders on its own.
export default function SiteChrome({ navbar, footer, convoy, whatsapp, children }) {
  const pathname = usePathname() || ""
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return children

  return (
    <>
      {navbar}
      {children}
      {footer}
      {convoy}
      {whatsapp}
    </>
  )
}
