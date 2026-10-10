"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaPhone, FaChevronRight, FaArrowRight } from "react-icons/fa6";

export default function Hero({ hero, site, fleet, compact = false }) {
  const HERO_FLEET_PREVIEW = fleet.slice(0, hero.previewCount);
  // Background slider images (managed in the admin panel)
  const SLIDER_IMAGES = hero.slides.filter(Boolean);
  const slideCount = SLIDER_IMAGES.length;
  const slideMs = Math.max(1, Number(hero.slideSeconds) || 5) * 1000;

  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatically cycle images
  useEffect(() => {
    if (slideCount < 2) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, slideMs);
    return () => clearInterval(timer);
  }, [slideCount, slideMs]);

  return (
    <section
      className={`relative flex items-center overflow-hidden ${compact ? "" : "min-h-[92vh]"}`}
      style={{ backgroundColor: "#0f2d4a" }}
    >
      {/* ── BACKGROUND IMAGE SLIDER ── (clearly visible photos) */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {SLIDER_IMAGES.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            } transform motion-reduce:transition-none`}
            style={{
              backgroundImage: `url('${src}')`,
            }}
          />
        ))}
      </div>

      {/* Readability layer: solid navy behind the text (left), fading out
          to the right so the photo shows. Phones (one column, text over the
          whole photo) get an even, darker layer so text always stays clear. */}
      <div
        className="absolute inset-0 z-0 lg:hidden"
        style={{ backgroundColor: "rgba(10, 32, 56, 0.9)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, #0a2038 0%, #0a2038 34%, rgba(10,32,56,0.9) 46%, rgba(10,32,56,0.5) 64%, rgba(10,32,56,0.35) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Top fade: continues the fleet banner's navy so there is no seam */}
      {compact ? (
        <div
          className="absolute top-0 inset-x-0 h-32 lg:h-40 pointer-events-none z-0"
          style={{ background: "linear-gradient(to bottom, #0f2d4a, transparent)" }}
          aria-hidden="true"
        />
      ) : null}

      {/* Bottom organic fade blend out */}
      <div
        className="absolute bottom-0 inset-x-0 h-32 pointer-events-none z-0"
        style={{ background: "linear-gradient(to bottom, transparent, #0f2d4a)" }}
        aria-hidden="true"
      />

      {/* ── Content Grid Layout ── */}
      <div className={`relative z-10 wrap ${compact ? "py-12 lg:py-16" : "py-20 lg:py-28"}`}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Headline & Call To Actions Panel */}
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 shrink-0" style={{ backgroundColor: "#c9a84c" }} aria-hidden="true" />
              <span className="text-xs font-bold tracking-[0.25em] uppercase" style={{ color: "#c9a84c" }}>
                {hero.eyebrow}
              </span>
            </div>

            {/* Main Headline Statement */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] text-white mb-6"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif", textShadow: "0 2px 12px rgba(0,0,0,0.45)" }}
            >
              {hero.titleStart}{" "}
              <span className="relative inline-block text-white">
                {hero.titleAccent1}
                <span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                  style={{ backgroundColor: "#c9a84c" }}
                  aria-hidden="true"
                />
              </span>
              {` ${hero.titleJoin} `}
              <span className="text-white">{hero.titleAccent2}</span>
              <br />
              <span className="text-white">{`${hero.titleLine2} `}</span>
              <span style={{ color: "#c9a84c" }}>{hero.titleAccent3}</span>
            </h1>

            {/* Context Subtext Description */}
            <p className="text-base sm:text-lg leading-relaxed mb-8 max-w-lg" style={{ color: "#e2e8f0", textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>
              {hero.text}{" "}
              <span className="text-white font-medium">
                {hero.textHighlight}
              </span>
            </p>

            {/* Primary Action Button Cluster */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                href={hero.primaryButton.href}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded font-bold text-sm tracking-wider uppercase transition-all duration-200 hover:brightness-110 active:scale-95"
                style={{ backgroundColor: "#c9a84c", color: "#0f2d4a" }}
              >
                {hero.primaryButton.label}
                <FaArrowRight size={13} />
              </Link>
              <Link
                href={hero.secondaryButton.href}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded font-bold text-sm tracking-wider uppercase border-2 transition-all duration-200 hover:bg-white/10"
                style={{ borderColor: "rgba(255,255,255,0.85)", color: "#ffffff", backgroundColor: "rgba(10,32,56,0.35)" }}
              >
                {hero.secondaryButton.label}
                <FaChevronRight size={12} />
              </Link>
            </div>

            {/* Direct Line Phone Trigger */}
            <a href={site.phoneHref} className="inline-flex items-center gap-3 group">
              <span
                className="flex items-center justify-center w-9 h-9 rounded-full border transition-colors group-hover:border-white/50"
                style={{ borderColor: "#c9a84c88", backgroundColor: "rgba(10,32,56,0.5)" }}
              >
                <FaPhone size={14} style={{ color: "#c9a84c" }} />
              </span>
              <span>
                <span className="block text-xs font-semibold tracking-widest uppercase" style={{ color: "#c9a84c" }}>
                  {hero.callLabel}
                </span>
                <span className="block text-white font-bold text-lg tracking-wide group-hover:text-white/80 transition-colors">
                  {site.phone}
                </span>
              </span>
            </a>
          </div>

          {/* Right: Fleet Preview Cards — Desktop Viewports Only */}
          <div className="hidden lg:block">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-5 inline-block px-2.5 py-1 rounded" style={{ color: "#ffffff", backgroundColor: "rgba(10,32,56,0.8)" }}>
              {hero.previewLabel}
            </p>

            <div className="grid grid-cols-2 gap-3">
              {HERO_FLEET_PREVIEW.map((item, i) => (
                <Link
                  key={item.id}
                  href={`/fleet/${item.id}`}
                  className="group relative flex flex-col justify-between p-4 rounded-lg border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{
                    backgroundColor: "rgba(10, 32, 56, 0.92)",
                    borderColor: "rgba(201, 168, 76, 0.35)",
                    backdropFilter: "blur(6px)",
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

                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <p className="text-white font-bold text-sm leading-tight">
                      {item.shortName}
                    </p>
                    {item.cornerBadge ? (
                      <span
                        className="text-[9px] font-black tracking-widest uppercase px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: "#c9a84c", color: "#0f2d4a" }}
                      >
                        {item.cornerBadge}
                      </span>
                    ) : null}
                  </div>

                  <FaChevronRight
                    size={10}
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
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
              className="inline-flex items-center gap-2 mt-4 text-sm font-semibold px-2.5 py-1 rounded transition-colors hover:text-[#c9a84c]"
              style={{ color: "#ffffff", backgroundColor: "rgba(10,32,56,0.8)" }}
            >
              {hero.viewAllText.replace("{count}", fleet.length)}
              <FaArrowRight size={12} style={{ color: "#c9a84c" }} />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}