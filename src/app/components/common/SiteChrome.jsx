"use client"

import { usePathname } from "next/navigation"

// Public pages get the navbar, footer and convoy animation;
// the admin panel (/admin/*) renders on its own.
export default function SiteChrome({ navbar, footer, convoy, children }) {
  const pathname = usePathname() || ""
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return children

  return (
    <>
      {navbar}
      {children}
      {footer}
      {convoy}
    </>
  )
}
