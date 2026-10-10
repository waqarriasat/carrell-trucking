import Link from "next/link";
import { isCutout } from "@/app/lib/content/images";

// ─────────────────────────────────────────────
//  FleetBanner (Server Component)
//  Premier-style band under the header: the whole
//  fleet as one lineup on the brand navy.
//  Desktop: a two-row "yard" composition — the
//  first 4 units in the order list stand in the
//  back row, the next 5 in the front row.
//  Phones: a swipeable row of the same units.
//  Admin: Home → Fleet banner (order of units).
// ─────────────────────────────────────────────

// Slot positions in % of the banner box (left, bottom, width).
const SLOTS = [
  // back row (long trailers)
  { left: 5, bottom: 37, width: 26, z: 4 },
  { left: 25, bottom: 37, width: 26, z: 3 },
  { left: 45, bottom: 37, width: 26, z: 2 },
  { left: 65, bottom: 37, width: 26, z: 1 },
  // front row (ground units)
  { left: 1, bottom: 0, width: 22, z: 10 },
  { left: 20, bottom: 0, width: 24, z: 9 },
  { left: 42, bottom: 0, width: 22, z: 8 },
  { left: 63.5, bottom: 1, width: 17, z: 7 },
  { left: 80, bottom: 0, width: 13, z: 6 },
];

export default function FleetBanner({ banner, fleet }) {
  if (!banner || banner.enabled === "no") return null;
  const byId = new Map(fleet.map((f) => [f.id, f]));
  const ordered = (banner.order || []).map((id) => byId.get(id)).filter((f) => f && isCutout(f.image));
  const units = ordered.length ? ordered : fleet.filter((f) => isCutout(f.image));
  if (!units.length) return null;

  return (
    <section
      aria-label={banner.label || "Our fleet"}
      className="relative w-full overflow-hidden pt-16 lg:pt-[92px]"
      style={{ background: "radial-gradient(ellipse at 50% 85%, #1e4d7b 0%, #12355a 45%, #0f2d4a 80%)" }}
    >
      {/* Desktop / tablet: composed lineup */}
      <div className="hidden md:block max-w-7xl mx-auto px-6 lg:px-10 pt-10 pb-6">
        <div className="relative w-full" style={{ aspectRatio: "1200 / 262" }}>
          {units.slice(0, SLOTS.length).map((u, i) => {
            const s = SLOTS[i];
            return (
              <Link
                key={u.id}
                href={`/fleet/${u.id}`}
                title={u.name}
                aria-label={u.name}
                className="absolute block transition-transform duration-300 hover:-translate-y-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c9a84c]"
                style={{ left: `${s.left}%`, bottom: `${s.bottom}%`, width: `${s.width}%`, zIndex: s.z }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={u.image} alt={u.name} className="block w-full h-auto" loading="eager" draggable="false" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Phones: swipeable row */}
      <div className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory px-4 pt-6 pb-5 [scrollbar-width:none]">
        {units.map((u) => (
          <Link key={u.id} href={`/fleet/${u.id}`} className="snap-center shrink-0 w-[72%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={u.image} alt={u.name} className="block w-full h-32 object-contain" loading="lazy" draggable="false" />
            <span className="block mt-1 text-center text-xs font-bold text-white/80">{u.shortName || u.name}</span>
          </Link>
        ))}
      </div>

      {/* Floor fade into the hero below */}
      <div className="absolute inset-x-0 bottom-0 h-10 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, #0f2d4a)" }} aria-hidden="true" />
    </section>
  );
}
