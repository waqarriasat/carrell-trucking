"use client";

import { useEffect } from "react";
import FleetHero from "@/app/components/pages/fleet/FleetHero";
import FleetList from "@/app/components/pages/fleet/FleetList";
import FleetCTA from "@/app/components/pages/fleet/FleetCTA";

export default function FleetPage() {
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

  return (
    <>
      <FleetHero />
      <FleetList />
      <FleetCTA />
    </>
  );
}