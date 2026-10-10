"use client";
import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { FaPhone, FaChevronRight, FaArrowRight } from "react-icons/fa6";

// ─────────────────────────────────────────────
//  Hero (home page, under the fleet banner)
//  Two layouts, chosen in Admin → Home → Hero → Layout:
//   • "photo" (default) — text on solid navy on the left, the slide
//     photo at full strength on the right (sharp edge, thin gold line).
//     Each slide has its own text; the main headline stays as one slide.
//     Pauses while hovered. On phones the photo is its own band under
//     the text. Nothing ever sits on the photo or behind the text.
//   • "cards" — the earlier layout: equipment cards on the right over
//     a darkened slideshow. Kept so it can be switched back any time.
// ─────────────────────────────────────────────

const NAVY = "#0f2d4a";

function SlideDots({ count, current, onPick, className = "" }) {
  if (count < 2) return null;
  return (
    <div className={`flex gap-2 ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onPick(i)}
          aria-label={`Show slide ${i + 1} of ${count}`}
          aria-current={i === current ? "true" : undefined}
          className="h-2.5 rounded-full transition-all duration-300 shadow"
          style={{ width: i === current ? 28 : 10, backgroundColor: i === current ? "#c9a84c" : "rgba(255,255,255,0.85)" }}
        />
      ))}
    </div>
  );
}

function Slides({ images, current }) {
  return images.map((src, index) => (
    <div
      key={index}
      className={`absolute inset-0 bg-cover transition-opacity duration-1000 ease-in-out motion-reduce:transition-none ${
        index === current ? "opacity-100" : "opacity-0"
      }`}
      // Crop focus a little right of centre: the slide photos keep their
      // subject and lettering there, so narrow panels don't cut the name.
      style={{ backgroundImage: `url('${src}')`, backgroundPosition: "60% 50%" }}
    />
  ));
}

// Visitors who ask their device for less motion get no auto-advance.
const subscribeReducedMotion = (cb) => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const getReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const HEADLINE_CLASS = "text-4xl sm:text-5xl lg:text-[2.6rem] xl:text-[3.2rem] 2xl:text-[3.5rem] font-black leading-[1.08] text-white mb-6";
const HEADLINE_STYLE = { fontFamily: "'Georgia', 'Times New Roman', serif" };
const TEXT_CLASS = "text-base sm:text-lg leading-relaxed mb-8 max-w-lg";

function Eyebrow({ children }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="h-px w-10 shrink-0" style={{ backgroundColor: "#c9a84c" }} aria-hidden="true" />
      <span className="text-xs font-bold tracking-[0.25em] uppercase" style={{ color: "#c9a84c" }}>
        {children}
      </span>
    </div>
  );
}

// The site's main headline (Admin → Home → Hero → Headline)
function MainHeadline({ hero, as: Tag = "h1" }) {
  return (
    <Tag className={HEADLINE_CLASS} style={HEADLINE_STYLE}>
      {hero.titleStart}{" "}
      <span className="relative inline-block text-white">
        {hero.titleAccent1}
        <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full" style={{ backgroundColor: "#c9a84c" }} aria-hidden="true" />
      </span>
      {` ${hero.titleJoin} `}
      <span className="text-white">{hero.titleAccent2}</span>
      <br />
      <span className="text-white">{`${hero.titleLine2} `}</span>
      <span className="whitespace-nowrap" style={{ color: "#c9a84c" }}>{hero.titleAccent3}</span>
    </Tag>
  );
}

function MainText({ hero }) {
  return (
    <p className={TEXT_CLASS} style={{ color: "#e2e8f0" }}>
      {hero.text}{" "}
      <span className="text-white font-medium">{hero.textHighlight}</span>
    </p>
  );
}

const isExternal = (href) => /^https?:\/\//i.test(href || "");

function SecondaryButton({ button }) {
  const cls = "inline-flex items-center justify-center gap-2 px-6 xl:px-7 py-3.5 rounded font-bold text-sm tracking-wider uppercase whitespace-nowrap border-2 transition-all duration-200 hover:bg-white/10";
  const style = { borderColor: "rgba(255,255,255,0.85)", color: "#ffffff", backgroundColor: "rgba(10,32,56,0.35)" };
  const inner = (
    <>
      {button.label}
      <FaChevronRight size={12} />
    </>
  );
  return isExternal(button.href) ? (
    <a href={button.href} target="_blank" rel="noopener noreferrer" className={cls} style={style}>{inner}</a>
  ) : (
    <Link href={button.href || "/fleet"} className={cls} style={style}>{inner}</Link>
  );
}

function Actions({ hero, site, secondary }) {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 mb-10">
        <Link
          href={hero.primaryButton.href}
          className="inline-flex items-center justify-center gap-2 px-6 xl:px-7 py-3.5 rounded font-bold text-sm tracking-wider uppercase whitespace-nowrap transition-all duration-200 hover:brightness-110 active:scale-95"
          style={{ backgroundColor: "#c9a84c", color: "#0f2d4a" }}
        >
          {hero.primaryButton.label}
          <FaArrowRight size={13} />
        </Link>
        <SecondaryButton button={secondary} />
      </div>

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
    </>
  );
}

export default function Hero({ hero, site, fleet, compact = false }) {
  const photoLayout = hero.layout !== "cards";
  const HERO_FLEET_PREVIEW = fleet.slice(0, hero.previewCount);

  // Photo layout: slides with their own text. Cards layout: background photos.
  const photoSlides = (hero.photoSlides || []).filter((sl) => sl && sl.image);
  const SLIDER_IMAGES = photoLayout && photoSlides.length
    ? photoSlides.map((sl) => sl.image)
    : (hero.slides || []).filter(Boolean);
  const slideCount = SLIDER_IMAGES.length;
  const slideMs = Math.max(2, Number(hero.slideSeconds) || 8) * 1000;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [restartKey, setRestartKey] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);

  // Auto-advance; waits while the visitor hovers/reads, restarts after a dot click.
  useEffect(() => {
    if (slideCount < 2 || paused || reducedMotion) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, slideMs);
    return () => clearInterval(timer);
  }, [slideCount, slideMs, restartKey, paused, reducedMotion]);

  const pickSlide = (i) => {
    setCurrentSlide(i);
    setRestartKey((k) => k + 1);
  };

  const pauseProps = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onFocus: () => setPaused(true),
    onBlur: () => setPaused(false),
  };

  // ── Photo layout ──
  if (photoLayout) {
    // Slide text: a slide with an empty headline shows the main headline.
    // The first such slide carries the page's <h1>; the others use <h2>.
    const isMain = (sl) => !String(sl.title || "").trim();
    const mainIndex = photoSlides.findIndex(isMain);
    const textSlides = photoSlides.length ? photoSlides : [{ title: "" }];
    const active = textSlides[Math.min(currentSlide, textSlides.length - 1)];
    const secondary = !isMain(active) && active.button && active.button.label ? active.button : hero.secondaryButton;

    return (
      <section className="relative overflow-hidden" style={{ backgroundColor: NAVY }} aria-roledescription="carousel" aria-label="Highlights" {...pauseProps}>
        {/* Desktop: photo panel on the right — shown at full strength, nothing on top */}
        {slideCount ? (
          <div className="absolute inset-y-0 right-0 z-0 hidden lg:block w-[48%] xl:w-[52%] 2xl:w-[54%]">
            <div className="absolute inset-0" aria-hidden="true">
              <Slides images={SLIDER_IMAGES} current={currentSlide} />
            </div>
            {/* Clean edge with a thin gold line between text and photo */}
            <div className="absolute inset-y-0 left-0 w-[3px]" style={{ backgroundColor: "#c9a84c" }} aria-hidden="true" />
          </div>
        ) : null}

        {/* Desktop slide dots — own layer above the text area so they stay clickable */}
        <SlideDots count={slideCount} current={currentSlide} onPick={pickSlide} className="hidden lg:flex absolute z-20 bottom-6 right-[var(--gutter)] rounded-full px-2.5 py-2 bg-[#0a2038]/70" />

        <div className={`relative z-10 wrap ${compact ? "py-12 lg:py-20" : "py-20 lg:py-28"} lg:min-h-[560px] flex items-center`}>
          <div className="w-full lg:w-[48%] xl:w-[45%] 2xl:w-[43%]">
            {mainIndex === -1 ? (
              <h1 className="sr-only">{`${hero.titleStart} ${hero.titleAccent1} ${hero.titleJoin} ${hero.titleAccent2} ${hero.titleLine2} ${hero.titleAccent3}`.replace(/\s+/g, " ").trim()}</h1>
            ) : null}

            {/* All slide texts share one grid cell, so the height never jumps */}
            <div className="grid" aria-live={paused ? "polite" : "off"}>
              {textSlides.map((sl, i) => {
                const on = i === currentSlide;
                const main = isMain(sl);
                const Heading = main && i === mainIndex ? "h1" : "h2";
                return (
                  <div
                    key={i}
                    className="[grid-area:1/1]"
                    aria-hidden={on ? undefined : "true"}
                    style={{
                      opacity: on ? 1 : 0,
                      visibility: on ? "visible" : "hidden",
                      transition: on ? "opacity .7s ease" : "opacity .7s ease, visibility 0s linear .7s",
                    }}
                  >
                    <Eyebrow>{main ? hero.eyebrow : sl.eyebrow || hero.eyebrow}</Eyebrow>
                    {main ? (
                      <>
                        <MainHeadline hero={hero} as={Heading} />
                        <MainText hero={hero} />
                      </>
                    ) : (
                      <>
                        <Heading className={HEADLINE_CLASS} style={HEADLINE_STYLE}>
                          {sl.title}{" "}
                          {sl.titleAccent ? <span className="whitespace-nowrap" style={{ color: "#c9a84c" }}>{sl.titleAccent}</span> : null}
                        </Heading>
                        <p className={TEXT_CLASS} style={{ color: "#e2e8f0" }}>{sl.text}</p>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            <Actions hero={hero} site={site} secondary={secondary} />

            {/* Phones / tablets: the photo as its own clear band under the text */}
            {slideCount ? (
              <div className="lg:hidden mt-10" style={{ marginInline: "calc(var(--gutter) * -1)" }}>
                <div className="relative w-full aspect-[3/2] overflow-hidden" aria-hidden="true">
                  <Slides images={SLIDER_IMAGES} current={currentSlide} />
                </div>
                <SlideDots count={slideCount} current={currentSlide} onPick={pickSlide} className="justify-center mt-4" />
              </div>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  // Cards layout: the main headline and text, fixed
  const textBlock = (
    <div>
      <Eyebrow>{hero.eyebrow}</Eyebrow>
      <MainHeadline hero={hero} />
      <MainText hero={hero} />
      <Actions hero={hero} site={site} secondary={hero.secondaryButton} />
    </div>
  );

  // ── Equipment cards layout (earlier design) ──
  return (
    <section
      className={`relative flex items-center overflow-hidden ${compact ? "" : "min-h-[92vh]"}`}
      style={{ backgroundColor: NAVY }}
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

          {textBlock}

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
