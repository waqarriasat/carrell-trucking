"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaPhone, FaChevronRight, FaArrowRight } from "react-icons/fa6";
import { SITE, FLEET } from "@/app/lib/constants";

const HERO_FLEET_PREVIEW = FLEET.slice(0, 6);

// Live high-resolution paths for heavy-duty containers, reefers, and equipment transport trailers
const SLIDER_IMAGES = [
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=80", // Cargo Containers Yard
  "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=2000&q=80", // Semi-Truck & Fleet Trailer on highway
  "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=2000&q=80", // Logistics industrial hub
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatically cycle images every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDER_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative min-h-[92vh] flex items-center overflow-hidden"
      style={{ backgroundColor: "#0f2d4a" }}
    >
      {/* ── BACKGROUND IMAGE SLIDER ── */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {SLIDER_IMAGES.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-25 scale-100" : "opacity-0 scale-105"
            } transform motion-reduce:transition-none`}
            style={{
              backgroundImage: `url('${src}')`,
            }}
          />
        ))}
      </div>

      {/* Dark overlay matrix tint layer to guarantee typography readability */}
      <div 
        className="absolute inset-0 z-0 mix-blend-multiply opacity-80"
        style={{ backgroundColor: "#0f2d4a" }}
        aria-hidden="true"
      />

      {/* Dot-grid structural texture */}
      <div
        className="absolute inset-0 opacity-[0.05] z-0"
        style={{
          backgroundImage: "radial-gradient(circle, #7a9bb5 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      {/* Diagonal accent graphic line */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] z-0"
        style={{
          background: "linear-gradient(135deg, transparent 40%, #c9a84c 40%, #c9a84c 42%, transparent 42%)",
        }}
        aria-hidden="true"
      />

      {/* Blue radial spotlight beam */}
      <div
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, #2d8fdd 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Bottom organic fade blend out */}
      <div
        className="absolute bottom-0 inset-x-0 h-32 pointer-events-none z-0"
        style={{ background: "linear-gradient(to bottom, transparent, #0f2d4a)" }}
        aria-hidden="true"
      />

      {/* ── Content Grid Layout ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8 lg:px-10 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Headline & Call To Actions Panel */}
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 shrink-0" style={{ backgroundColor: "#c9a84c" }} aria-hidden="true" />
              <span className="text-xs font-bold tracking-[0.25em] uppercase" style={{ color: "#c9a84c" }}>
                Ardmore, Oklahoma
              </span>
            </div>

            {/* Main Headline Statement */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] text-white mb-6"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Heavy-Duty{" "}
              <span className="relative inline-block" style={{ color: "#2d8fdd" }}>
                Trailers
                <span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                  style={{ backgroundColor: "#c9a84c" }}
                  aria-hidden="true"
                />
              </span>
              {" & "}
              <span style={{ color: "#2d8fdd" }}>Containers</span>
              <br />
              <span className="text-white">for Every </span>
              <span style={{ color: "#c9a84c" }}>Job Site.</span>
            </h1>

            {/* Context Subtext Description */}
            <p className="text-base sm:text-lg leading-relaxed mb-8 max-w-lg" style={{ color: "#cbd5e1" }}>
              Southern Oklahoma&apos;s rental source for dry containers, reefer trailers,
              mobile offices, generators, and custom mud lab units.{" "}
              <span className="text-white font-medium">
                2-month minimum. Direct line to the owner.
              </span>
            </p>

            {/* Primary Action Button Cluster */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded font-bold text-sm tracking-wider uppercase transition-all duration-200 hover:brightness-110 active:scale-95"
                style={{ backgroundColor: "#c9a84c", color: "#0f2d4a" }}
              >
                Get a Free Quote
                <FaArrowRight size={13} />
              </Link>
              <Link
                href="/fleet"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded font-bold text-sm tracking-wider uppercase border-2 transition-all duration-200 hover:bg-white/10"
                style={{ borderColor: "#2d8fdd", color: "#2d8fdd" }}
              >
                Browse Fleet
                <FaChevronRight size={12} />
              </Link>
            </div>

            {/* Direct Line Phone Trigger */}
            <a href={SITE.phoneHref} className="inline-flex items-center gap-3 group">
              <span
                className="flex items-center justify-center w-9 h-9 rounded-full border transition-colors group-hover:border-white/50"
                style={{ borderColor: "#1e4d7b" }}
              >
                <FaPhone size={14} style={{ color: "#c9a84c" }} />
              </span>
              <span>
                <span className="block text-xs font-semibold tracking-widest uppercase" style={{ color: "#7a9bb5" }}>
                  Call Direct
                </span>
                <span className="block text-white font-bold text-lg tracking-wide group-hover:text-white/80 transition-colors">
                  {SITE.phone}
                </span>
              </span>
            </a>
          </div>

          {/* Right: Fleet Preview Cards — Desktop Viewports Only */}
          <div className="hidden lg:block">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-5" style={{ color: "#7a9bb5" }}>
              Available Equipment
            </p>

            <div className="grid grid-cols-2 gap-3">
              {HERO_FLEET_PREVIEW.map((item, i) => (
                <Link
                  key={item.id}
                  href={`/fleet/${item.id}`}
                  className="group relative flex flex-col justify-between p-4 rounded-lg border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{
                    backgroundColor: i % 2 === 0 ? "rgba(10, 32, 56, 0.85)" : "rgba(17, 40, 64, 0.85)",
                    borderColor: "#1e4d7b",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {item.badge && (
                    <span
                      className="inline-block text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full mb-3 self-start border"
                      style={{ backgroundColor: "#c9a84c22", color: "#c9a84c", borderColor: "#c9a84c55" }}
                    >
                      {item.badge}
                    </span>
                  )}

                  <div>
                    <p className="text-white font-bold text-sm leading-tight mb-1">
                      {item.shortName}
                    </p>
                    <p className="text-xs" style={{ color: "#7a9bb5" }}>
                      {item.sizes.join(" · ")}
                    </p>
                  </div>

                  <FaChevronRight
                    size={10}
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-60 transition-opacity"
                    style={{ color: "#c9a84c" }}
                  />

                  <span
                    className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: "#c9a84c" }}
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>

            <Link
              href="/fleet"
              className="inline-flex items-center gap-2 mt-4 text-sm font-medium transition-colors hover:text-white"
              style={{ color: "#7a9bb5" }}
            >
              View all {FLEET.length} equipment types
              <FaArrowRight size={12} style={{ color: "#c9a84c" }} />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}