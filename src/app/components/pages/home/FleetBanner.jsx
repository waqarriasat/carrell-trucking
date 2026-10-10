import Link from "next/link";
import { isCutout } from "@/app/lib/content/images";

// ─────────────────────────────────────────────
//  FleetBanner (Server Component)
//  Premier-style band under the header: a single,
//  evenly spaced row of fleet units in a light
//  block, with light page space around it.
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

export default function FleetBanner({ banner, fleet }) {
  if (!banner || banner.enabled === "no") return null;
  const byId = new Map(fleet.map((f) => [f.id, f]));
  const ordered = (banner.order || []).map((id) => byId.get(id)).filter((f) => f && isCutout(f.image));
  const units = (ordered.length ? ordered : fleet.filter((f) => isCutout(f.image))).slice(0, MAX_UNITS);
  if (!units.length) return null;

  return (
    <section aria-label={banner.label || "Our fleet"} className="page-section wrap">
      {/* A light block: the white units stand out with their soft shadows */}
      <div
        className="panel overflow-hidden"
        style={{ background: "linear-gradient(180deg, #f7f9fc 0%, #e6edf5 100%)" }}
      >
      {/* Desktop / tablet: one row across the full width */}
      <div className="hidden md:flex items-end justify-between gap-[2.5vw] px-[3%] pt-8 lg:pt-10 pb-6 lg:pb-8">
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
      <div className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory px-4 pt-5 pb-4 [scrollbar-width:none]">
        {units.map((u) => (
          <Link key={u.id} href={`/fleet/${u.id}`} className="relative z-10 snap-center shrink-0 w-[72%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={u.image} alt={u.name} className="block w-full h-32 object-contain" loading="lazy" draggable="false" />
            <span className="block mt-1 text-center text-xs font-bold" style={{ color: "#0f2d4a" }}>{u.shortName || u.name}</span>
          </Link>
        ))}
      </div>
      </div>
    </section>
  );
}
