import Link from "next/link";
import { isCutout } from "@/app/lib/content/images";

// ─────────────────────────────────────────────
//  FleetBanner (Server Component)
//  Premier-style band under the header: a single,
//  evenly spaced row of fleet units on the brand
//  navy, spanning the full screen width. The
//  bottom fades into the hero so the two read as
//  one section.
//  Phones: a swipeable row of the same units.
//  Admin: Home → Fleet banner (units and order).
// ─────────────────────────────────────────────

// Share of the row each unit takes, so long trailers look longer
// than a generator or a toilet (roughly true to life).
const WEIGHT = {
  trailers: 1.3,
  "reefer-diesel": 1.3,
  "reefer-electric": 1.3,
  "mud-lab": 1.25,
  office: 1.15,
  "container-dry": 1.05,
  "reefer-container": 1.05,
  generator: 0.85,
  "portable-toilets": 0.7,
};
const MAX_UNITS = 6;
const NAVY = "#0f2d4a";

export default function FleetBanner({ banner, fleet }) {
  if (!banner || banner.enabled === "no") return null;
  const byId = new Map(fleet.map((f) => [f.id, f]));
  const ordered = (banner.order || []).map((id) => byId.get(id)).filter((f) => f && isCutout(f.image));
  const units = (ordered.length ? ordered : fleet.filter((f) => isCutout(f.image))).slice(0, MAX_UNITS);
  if (!units.length) return null;

  return (
    <section
      aria-label={banner.label || "Our fleet"}
      className="relative w-full overflow-hidden pt-16 lg:pt-[92px]"
      style={{ background: `radial-gradient(ellipse 70% 90% at 50% 30%, #1e4d7b 0%, #163f66 40%, ${NAVY} 85%)` }}
    >
      {/* Desktop / tablet: one row across the full width */}
      <div className="wrap hidden md:flex items-end justify-between gap-[2.5vw] pt-6 lg:pt-8 pb-10 lg:pb-14">
        {units.map((u) => (
          <Link
            key={u.id}
            href={`/fleet/${u.id}`}
            title={u.name}
            className="relative z-10 block min-w-0 transition-transform duration-300 hover:-translate-y-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c9a84c]"
            style={{ flex: `${WEIGHT[u.id] || 1} 1 0` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={u.image} alt={u.name} className="block w-full h-auto" loading="eager" draggable="false" />
          </Link>
        ))}
      </div>

      {/* Phones: swipeable row */}
      <div className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory px-4 pt-6 pb-8 [scrollbar-width:none]">
        {units.map((u) => (
          <Link key={u.id} href={`/fleet/${u.id}`} className="relative z-10 snap-center shrink-0 w-[72%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={u.image} alt={u.name} className="block w-full h-32 object-contain" loading="lazy" draggable="false" />
            <span className="block mt-1 text-center text-xs font-bold text-white/80">{u.shortName || u.name}</span>
          </Link>
        ))}
      </div>

      {/* Soft fade into the hero's navy below — no hard edge */}
      <div
        className="absolute inset-x-0 bottom-0 h-24 lg:h-32 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, rgba(15,45,74,0) 0%, rgba(15,45,74,.7) 55%, ${NAVY} 100%)` }}
        aria-hidden="true"
      />
    </section>
  );
}
