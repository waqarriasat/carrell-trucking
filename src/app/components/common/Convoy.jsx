import Link from "next/link";
import { isCutout } from "@/app/lib/content/images";

// ─────────────────────────────────────────────
//  Convoy (Server Component)
//  Strip below the footer: the real 3D fleet
//  renders roll slowly along a road, each with
//  its current name (from Admin → Fleet).
//  The list is drawn twice so the loop is
//  seamless. Pauses on hover; stands still for
//  visitors who prefer less motion.
// ─────────────────────────────────────────────

const CSS = `
.convoy-track { animation: convoy-roll var(--convoy-t, 60s) linear infinite; }
.convoy:hover .convoy-track { animation-play-state: paused; }
@keyframes convoy-roll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) { .convoy-track { animation: none; } }
`;

export default function Convoy({ fleet = [] }) {
  const units = fleet.filter((f) => isCutout(f.image));
  if (!units.length) return null;

  return (
    <div className="convoy relative overflow-hidden" style={{ backgroundColor: "#0a2038" }} aria-label="Our fleet">
      <style>{CSS}</style>

      <div className="convoy-track flex w-max items-end" style={{ "--convoy-t": `${units.length * 7}s` }}>
        {[0, 1].map((copy) =>
          units.map((u) => (
            <Link
              key={`${copy}-${u.id}`}
              href={`/fleet/${u.id}`}
              aria-hidden={copy === 1 ? "true" : undefined}
              tabIndex={copy === 1 ? -1 : undefined}
              className="group flex shrink-0 flex-col items-center px-6 md:px-9 pt-4 pb-3"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={u.image}
                alt={copy === 1 ? "" : u.name}
                className="block h-14 md:h-16 w-auto transition-transform duration-300 group-hover:-translate-y-1"
                loading="lazy"
                draggable="false"
              />
              <span className="mt-1.5 whitespace-nowrap text-[11px] font-bold tracking-wide text-white group-hover:text-[#c9a84c]">
                {u.shortName || u.name}
              </span>
            </Link>
          ))
        )}
      </div>

      {/* Road */}
      <div className="relative h-4" style={{ backgroundColor: "#071a2e", borderTop: "2px solid #1e3a5f" }} aria-hidden="true">
        <div
          className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2"
          style={{ backgroundImage: "repeating-linear-gradient(90deg, #c9a84c66 0, #c9a84c66 24px, transparent 24px, transparent 52px)" }}
        />
      </div>
    </div>
  );
}
