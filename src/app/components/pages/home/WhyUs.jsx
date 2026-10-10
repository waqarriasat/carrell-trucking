import Image from "next/image";
import { imageProps } from "@/app/lib/content/images";

export default function WhyUs({ whyUs, site }) {
  const WHY_ITEMS = whyUs.items;

  return (
    <section className="page-section wrap" aria-labelledby="why-heading">
      <div>

        {/* ── Section Header ── */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span
              className="h-px w-8 shrink-0"
              style={{ backgroundColor: "#c9a84c" }}
              aria-hidden="true"
            />
            <span
              className="text-xs font-bold tracking-[0.2em] uppercase"
              style={{ color: "#86671e" }}
            >
              {whyUs.eyebrow}
            </span>
          </div>
          <h2
            id="why-heading"
            className="text-3xl md:text-4xl font-black leading-tight"
            style={{ color: "#0f2d4a" }}
          >
            {whyUs.title}
          </h2>
          <p className="mt-2 text-base max-w-xl" style={{ color: "#4a6b85" }}>
            {whyUs.text}
          </p>
        </div>

        {/* ── Satisfaction + ISO badges row (hidden when left empty in the admin) ── */}
        {(whyUs.badgeTitle || whyUs.badgeText || whyUs.badge1.image || whyUs.badge2.image) && (
        <div className="flex flex-wrap items-center gap-6 mb-12 p-6 rounded-xl"
          style={{ backgroundColor: "#ffffff", border: "1px solid #e1e8f0" }}>
          {whyUs.badge1.image && <div className="relative w-20 h-20 shrink-0">
            <Image
              src={whyUs.badge1.image}
              alt={whyUs.badge1.alt}
              {...imageProps(whyUs.badge1.image)}
              fill
              sizes="80px"
              className="object-contain"
              priority
            />
          </div>}
          {whyUs.badge2.image && <div className="relative w-20 h-20 shrink-0">
            <Image
              src={whyUs.badge2.image}
              alt={whyUs.badge2.alt}
              {...imageProps(whyUs.badge2.image)}
              fill
              sizes="80px"
              className="object-contain"
              priority
            />
          </div>}
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1" style={{ color: "#0f2d4a" }}>
              {whyUs.badgeTitle}
            </h3>
            <p className="text-sm" style={{ color: "#4a6b85" }}>
              {whyUs.badgeText}
            </p>
          </div>
        </div>
        )}

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {WHY_ITEMS.map((item, index) => (
            <div
              key={index}
              className="panel relative flex flex-col overflow-hidden"
            >
              {/* Gold top border line */}
              <span
                className="absolute top-0 inset-x-0 h-1"
                style={{ backgroundColor: "#c9a84c" }}
                aria-hidden="true"
              />

              <div className="p-5 flex flex-col items-center text-center flex-1">

                {/* Icon Container Wrapper */}
                <div
                  className="flex items-center justify-center w-16 h-16 rounded-xl mb-4 mt-2 relative p-3.5"
                  style={{ backgroundColor: "#0f2d4a" }}
                  aria-hidden="true"
                >
                  {/* FIXED: Uses CSS masks to forcefully render your PNG shapes in pure prominent gold (#c9a84c) */}
                  <div 
                    className="w-full h-full"
                    style={{
                      backgroundColor: "#c9a84c",
                      WebkitMaskImage: `url(${item.icon})`,
                      maskImage: `url(${item.icon})`,
                      WebkitMaskSize: "contain",
                      maskSize: "contain",
                      WebkitMaskPosition: "center",
                      maskPosition: "center",
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat"
                    }}
                  />
                </div>

                {/* Optional stat (only shown when filled in the admin) */}
                {item.stat ? (
                  <>
                    <div className="text-xl font-black leading-none mb-1" style={{ color: "#0f2d4a" }}>
                      {item.stat}
                    </div>
                    <div className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#86671e" }}>
                      {item.statLabel}
                    </div>
                  </>
                ) : null}

                {/* Card Title */}
                <h3
                  className="text-base font-bold mb-2 tracking-wide"
                  style={{ color: "#0f2d4a" }}
                >
                  {item.title}
                </h3>

                {/* Body Text Description */}
                <p
                  className="text-sm leading-relaxed flex-1"
                  style={{ color: "#4a6b85" }}
                >
                  {item.text}
                </p>

                {/* Large Background Counter Number */}
                {/* <div
                  className="mt-4 text-4xl font-black select-none pointer-events-none"
                  style={{ color: "rgba(214, 232, 245, 0.05)" }}
                >
                  0{index + 1}
                </div> */}

              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom trust strip ── */}
        <div
          className="panel-navy mt-8 px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p
            className="text-sm font-medium text-center md:text-left"
            style={{ color: "#e2e8f0" }}
          >
            {whyUs.stripBefore}{" "}
            <span style={{ color: "#c9a84c", fontWeight: 700 }}>
              {whyUs.stripHighlight}
            </span>{" "}
            {whyUs.stripAfter}
          </p>
          <a
            href={site.phoneHref}
            className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-lg shrink-0 transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#c9a84c", color: "#0f2d4a" }}
          >
            {whyUs.stripButtonLabel}
          </a>
        </div>

      </div>
    </section>
  );
}