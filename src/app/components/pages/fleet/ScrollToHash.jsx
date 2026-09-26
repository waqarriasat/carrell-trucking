"use client";

import { useEffect } from "react";

// Scrolls to #equipment-id when arriving from a link like /fleet#office
export default function ScrollToHash() {
  useEffect(() => {
    const hash = window.location.hash?.replace("#", "");
    if (!hash) return;
    // Delay allows FleetList to fully render before scrolling
    const timer = setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
