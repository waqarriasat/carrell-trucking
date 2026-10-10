import Image from "next/image";
import Link from "next/link";
import { FaCheck, FaArrowRight, FaLocationDot } from "react-icons/fa6";
import { imageProps } from "@/app/lib/content/images";
import DeliveryAnimation from "./DeliveryAnimation";

// ─────────────────────────────────────────────
//  YardSection (Server Component)
//  Row 1 — "We own every unit": text + aerial
//          photo of the yard.
//  Row 2 — ground-level delivery: video (YouTube
//          / .mp4 link from the admin) or, until
//          one is added, the animated illustration.
//  Admin: Home → Our yard & delivery video
// ─────────────────────────────────────────────

// YouTube watch / share / shorts links → privacy-friendly embed URL.
function youTubeEmbed(url) {
  const m = String(url).match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/);
  return m ? `https://www.youtube-nocookie.com/embed/${m[1]}?rel=0` : null;
}

function DeliveryMedia({ url, caption, brand }) {
  const link = String(url || "").trim();
  const yt = link && youTubeEmbed(link);
  if (yt) {
    return (
      <iframe
        src={yt}
        title={caption || "Delivery video"}
        className="block w-full aspect-video"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    );
  }
  if (link) {
    return <video src={link} className="block w-full aspect-video bg-black" controls playsInline preload="metadata" />;
  }
  return <DeliveryAnimation brand={brand} caption={caption} />;
}

function CheckList({ items }) {
  return (
    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
      {items.map((p, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm font-semibold text-white">
          <span
            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: "#c9a84c22", border: "1px solid #c9a84c66" }}
          >
            <FaCheck size={9} style={{ color: "#c9a84c" }} />
          </span>
          {p}
        </li>
      ))}
    </ul>
  );
}

function Eyebrow({ children }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="h-px w-8 shrink-0" style={{ backgroundColor: "#c9a84c" }} aria-hidden="true" />
      <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#c9a84c" }}>
        {children}
      </span>
    </div>
  );
}

export default function YardSection({ yard, site }) {
  if (!yard) return null;

  return (
    <section className="w-full py-16 md:py-24" style={{ backgroundColor: "#0f2d4a" }} aria-labelledby="yard-heading">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">

        {/* ── Row 1: own yard ── */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <Eyebrow>{yard.eyebrow}</Eyebrow>
            <h2
              id="yard-heading"
              className="text-3xl md:text-4xl font-black leading-tight text-white"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              {yard.titleStart}{" "}
              <span style={{ color: "#c9a84c" }}>{yard.titleAccent}</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: "#9fb8cc" }}>
              {yard.text}
            </p>
            <div className="mt-6">
              <CheckList items={yard.points || []} />
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {yard.buttonLabel ? (
                <Link
                  href={yard.buttonHref || "/quote"}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded font-bold text-sm tracking-wider uppercase transition-all hover:brightness-110 active:scale-95"
                  style={{ backgroundColor: "#c9a84c", color: "#0f2d4a" }}
                >
                  {yard.buttonLabel}
                  <FaArrowRight size={12} />
                </Link>
              ) : null}
              {yard.directionsLabel && site.salesMapsHref ? (
                <a
                  href={site.salesMapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold transition-colors hover:text-white"
                  style={{ color: "#2d8fdd" }}
                >
                  <FaLocationDot size={13} style={{ color: "#c9a84c" }} />
                  {yard.directionsLabel}
                </a>
              ) : null}
            </div>
          </div>

          {yard.image ? (
            <figure className="m-0">
              <div className="relative w-full overflow-hidden rounded-xl border shadow-2xl" style={{ borderColor: "#1e4d7b", aspectRatio: "1307 / 761" }}>
                <Image
                  src={yard.image}
                  alt={yard.imageAlt || ""}
                  fill
                  sizes="(min-width: 1024px) 600px, 100vw"
                  className="object-cover"
                  {...imageProps(yard.image)}
                />
              </div>
              <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs" style={{ color: "#7a9bb5" }}>
                <span className="inline-flex items-center gap-1.5">
                  <FaLocationDot size={11} style={{ color: "#c9a84c" }} />
                  {yard.imageCaption}
                </span>
                {yard.imageCredit ? <span className="opacity-80">{yard.imageCredit}</span> : null}
              </figcaption>
            </figure>
          ) : null}
        </div>

        {/* ── Row 2: ground-level delivery ── */}
        <div className="mt-16 md:mt-20 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <figure className="m-0 order-2 lg:order-1">
            <div className="overflow-hidden rounded-xl border shadow-2xl" style={{ borderColor: "#1e4d7b", backgroundColor: "#0a2038" }}>
              <DeliveryMedia url={yard.videoUrl} caption={yard.videoCaption} brand={site.logoTop} />
            </div>
            {yard.videoCaption ? (
              <figcaption className="mt-3 text-xs" style={{ color: "#7a9bb5" }}>{yard.videoCaption}</figcaption>
            ) : null}
          </figure>

          <div className="order-1 lg:order-2">
            <Eyebrow>{yard.videoEyebrow}</Eyebrow>
            <h3
              className="text-2xl md:text-3xl font-black leading-tight text-white"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              {yard.videoTitle}
            </h3>
            <p className="mt-4 text-base leading-relaxed" style={{ color: "#9fb8cc" }}>
              {yard.videoText}
            </p>
            <div className="mt-6">
              <CheckList items={yard.videoPoints || []} />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
