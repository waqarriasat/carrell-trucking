import Link from "next/link";
import {
  FaArrowRight,
  FaChevronRight,
  FaCheck,
} from "react-icons/fa6";
import { FLEET } from "@/app/lib/constants";

// ─────────────────────────────────────────────
//  FleetGrid (Server Component)
// ─────────────────────────────────────────────

// Category accent colors 
const CATEGORY_ACCENT = {
  container: "#2d8fdd",
  trailer:   "#2d8fdd",
  reefer:    "#2d8fdd",
  power:     "#c9a84c",
  specialty: "#c9a84c",
};

// ── Highly Accurate Pure-CSS Equipment Graphic Engine ──
function RealisticVehicleIcon({ id, name }) {
  const checkString = `${id || ""} ${name || ""}`.toLowerCase();

  // Unified reusable tire set for trailer transport configurations
  const FixedTires = () => (
    <div className="absolute -bottom-1.5 left-4 flex gap-1 z-30">
      <div className="w-3.5 h-3.5 bg-[radial-gradient(circle,#ffffff_20%,#475569_35%,#111111_60%)] rounded-full shadow-md flex items-center justify-center">
        <div className="w-2 h-2 rounded-full border border-dashed border-white/30" />
      </div>
      <div className="w-3.5 h-3.5 bg-[radial-gradient(circle,#ffffff_20%,#475569_35%,#111111_60%)] rounded-full shadow-md flex items-center justify-center">
        <div className="w-2 h-2 rounded-full border border-dashed border-white/30" />
      </div>
    </div>
  );

  // Common inner branding sticker container that guarantees vertical and horizontal alignment
  const AlignedSticker = ({ main, sub, subColor = "text-[#ffb300]" }) => (
    <div className="absolute inset-[3px] bg-white rounded-[2px] flex flex-col justify-center items-center text-center p-0.5 select-none overflow-hidden">
      <span className="text-[9px] font-black text-[#0f2d4a] tracking-tight leading-none uppercase">
        {main}
      </span>
      <span className={`text-[5.5px] font-extrabold ${subColor} tracking-widest leading-none mt-0.5 uppercase`}>
        {sub}
      </span>
    </div>
  );

  // 1. GENERATOR SETS
  if (checkString.includes("generator") || checkString.includes("power")) {
    return (
      <div className="w-[140px] h-[50px] flex items-end justify-center relative overflow-visible">
        <div className="w-[95px] h-[32px] bg-[#2d3748] border-2 border-[#4a5568] rounded-t-md relative shadow-md">
          <div className="absolute -top-1.5 right-3 w-3 h-1.5 bg-[#1a202c] rounded-t-[1px]" />
          <div className="absolute left-2.5 top-1.5 bottom-1.5 w-3.5 flex flex-col gap-[1.5px] justify-center">
            <div className="h-[2px] bg-[#1a202c] rounded-sm" />
            <div className="h-[2px] bg-[#1a202c] rounded-sm" />
            <div className="h-[2px] bg-[#1a202c] rounded-sm" />
          </div>
          <div className="absolute right-2 inset-y-0 left-8 flex flex-col justify-center items-center text-center">
            <span className="text-[9px] font-black text-[#ffb300] leading-none uppercase">ARDMORE</span>
            <span className="text-[5.5px] font-bold text-white tracking-widest leading-none mt-0.5 uppercase">POWER GEN</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. MOBILE OFFICE UNITS
  if (checkString.includes("office")) {
    return (
      <div className="w-[140px] h-[50px] flex items-end justify-center relative overflow-visible">
        <div className="w-[115px] h-[34px] bg-[#e2e8f0] border border-[#cbd5e1] border-b-[3px] border-b-[#94a3b8] rounded-t relative flex items-center justify-between px-2 shadow-sm">
          <div className="w-4 h-[26px] bg-[#475569] border border-[#334155] rounded-t-[1px] self-end relative">
            <div className="absolute top-3 right-0.5 w-[2px] h-[2px] bg-yellow-500 rounded-full" />
          </div>
          <div className="flex flex-col items-center justify-center text-center flex-1 px-1">
            <span className="text-[8px] font-black text-[#0d47a1] leading-none uppercase">ARDMORE</span>
            <span className="text-[5.5px] font-black text-[#475569] tracking-tighter leading-none mt-0.5 uppercase">HQ SITE OFFICE</span>
          </div>
          <div className="w-7 h-[16px] bg-[#e0f7fa] border border-[#94a3b8] flex p-[1px] gap-[1px]">
            <div className="flex-1 bg-white/60 border-r border-[#b2ebf2]" />
            <div className="flex-1 bg-white/60" />
          </div>
        </div>
      </div>
    );
  }

  // 3. MUD LAB UNITS
  if (checkString.includes("lab") || checkString.includes("mud")) {
    return (
      <div className="w-[140px] h-[50px] flex items-end justify-center relative overflow-visible">
        <div className="w-[110px] h-[34px] bg-[#34495e] border border-[#2c3e50] rounded-t relative shadow-md">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[repeating-linear-gradient(45deg,#ffb300,#ffb300_3px,#1a202c_3px,#1a202c_6px)] rounded-t-[1px]" />
          <div className="absolute -top-2 left-4 w-1.5 h-2 bg-[#94a3b8] border-t border-[#1a202c]">
            <div className="w-2.5 h-[2px] bg-[#1a202c] absolute top-0 -left-0.5" />
          </div>
          <div className="absolute inset-x-2 bottom-1 top-2.5 flex flex-col justify-center items-center text-center">
            <span className="text-[8px] font-black text-white leading-none uppercase">ARDMORE TECH</span>
            <span className="text-[5.5px] font-bold text-[#ffb300] tracking-wider leading-none mt-0.5 uppercase">MUD LAB UNIT</span>
          </div>
        </div>
      </div>
    );
  }

  // --- TRAILER-BASED CONFIGURATIONS ---
  return (
    <div className="w-[140px] h-[50px] flex items-end justify-center relative overflow-visible">
      <div className="w-[130px] h-[34px] relative flex flex-row-reverse items-end">
        
        {/* Semi Tractor Cab Element Block */}
        <div className="w-8 h-[28px] bg-[#0d47a1] rounded-tr-md rounded-br-[1px] relative shrink-0 z-10">
          <div 
            className="absolute top-[3px] right-[3px] w-[12px] h-[8px] bg-white rounded-tr-[2px]" 
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 35% 100%)" }}
          />
          <div className="absolute -bottom-1 right-1 w-3.5 h-3.5 bg-[radial-gradient(circle,#ffffff_20%,#111111_45%)] rounded-full shadow" />
        </div>

        {/* 4. DIESEL REEFER TRAILER */}
        {checkString.includes("diesel") && checkString.includes("reefer") ? (
          <div className="flex-grow h-[34px] bg-[#0288d1] relative rounded-l-sm box-border shadow-inner">
            <div className="absolute top-[3px] right-[-3px] w-1.5 h-3 bg-[#e2e8f0] border border-[#64748b] rounded-[1px] z-20 flex flex-col gap-[1px] p-[1px]">
              <div className="h-[1.5px] bg-red-500 rounded-full" />
              <div className="h-[1px] bg-[#64748b]" />
            </div>
            <AlignedSticker main="Ardmore" sub="DIESEL REEFER" subColor="text-red-600" />
            <FixedTires />
          </div>
        )

        // 5. ELECTRIC REEFER TRAILER
        : (checkString.includes("electric") || checkString.includes("reefer")) && !checkString.includes("dry") ? (
          <div className="flex-grow h-[34px] bg-[#00a896] relative rounded-l-sm box-border shadow-inner">
            <div className="absolute top-[8px] right-[-2.5px] w-1 h-2 bg-[#ffb300] border border-[#b57c00] rounded-l-[1px] z-20" />
            <AlignedSticker main="Ardmore" sub="E-POWER REEFER" subColor="text-[#00a896]" />
            <FixedTires />
          </div>
        )

        // 6. REFRIGERATED STORAGE CONTAINERS
        : checkString.includes("refrigerated") && checkString.includes("container") ? (
          <div className="flex-grow h-[34px] bg-[#0288d1] relative rounded-l-sm box-border">
            <div 
              className="absolute inset-0 opacity-15" 
              style={{ background: "repeating-linear-gradient(90deg, #000, #000 2px, transparent 2px, transparent 6px)" }} 
            />
            <AlignedSticker main="Ardmore" sub="REEFER STORAGE" subColor="text-[#0288d1]" />
            <FixedTires />
          </div>
        )

        // 7. DRY STORAGE CONTAINERS
        : checkString.includes("container") ? (
          <div className="flex-grow h-[34px] bg-[#1b5e20] relative rounded-l-sm box-border">
            <div 
              className="absolute inset-0" 
              style={{ background: "repeating-linear-gradient(90deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1) 2px, transparent 2px, transparent 6px)" }} 
            />
            <AlignedSticker main="Ardmore" sub="STEEL CARGO" subColor="text-[#1b5e20]" />
            <FixedTires />
          </div>
        )

        // 8. FLATBED CHASSIS (FIXED: Places text in the exact red marked area above the beam)
        : checkString.includes("flatbed") || checkString.includes("chassis") ? (
          <div className="flex-grow h-[6px] bg-[#334155] border-t border-[#455a64] relative rounded-l-[1px] mb-[1px] box-border">
            {/* Seamless Gooseneck Drawbar Connection profile */}
            <div 
              className="absolute right-[-7px] bottom-0 w-[8px] h-2 bg-[#334155]" 
              style={{ clipPath: "polygon(0 40%, 100% 0, 100% 100%, 0 100%)" }}
            />
            
            {/* Float Floating Text Block exactly in the requested Red Container Zone */}
            <div className="absolute bottom-[8px] left-0 right-0 flex items-center justify-center select-none overflow-visible pointer-events-none">
              <span className="text-[8px] font-black text-[#0f2d4a] tracking-wider whitespace-nowrap bg-white/40 px-1.5 py-0.5 rounded-[2px] uppercase">
                FLAT BED TRAILER
              </span>
            </div>

            <FixedTires />
          </div>
        )

        // 9. DRY VAN TRAILERS (FALLBACK TRAILER TYPE)
        : (
          <div className="flex-grow h-[34px] bg-[#f59e0b] relative rounded-l-sm box-border shadow-inner">
            <AlignedSticker main="Ardmore" sub="DRY VAN FREIGHT" subColor="text-[#f59e0b]" />
            <FixedTires />
          </div>
        )}

      </div>
    </div>
  );
}

// ── Individual fleet card component ─────────────────────
function FleetCard({ item }) {
  const accent = CATEGORY_ACCENT[item.category] ?? "#2d8fdd";

  return (
    <Link
      href={`/fleet#${item.id}`}
      id={item.id}
      className="group relative flex flex-col rounded-xl border overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
      style={{
        backgroundColor: "#ffffff",
        borderColor: "#d6e8f5",
      }}
    >
      {/* ── Card Graphics Header Band ── */}
      <div
        className="relative flex flex-col items-center justify-center pt-10 pb-6 px-4 overflow-hidden border-b transition-colors group-hover:bg-[#ebf4fc]"
        style={{ backgroundColor: "#f0f6fb", borderColor: "#d6e8f5" }}
      >
        {/* Category Badge Pinout */}
        <div className="absolute top-3 left-4 right-4 flex items-center justify-between w-full px-1">
          {item.badge ? (
            <span
              className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: "#c9a84c18",
                color: "#c9a84c",
                border: "1px solid #c9a84c44",
              }}
            >
              {item.badge}
            </span>
          ) : (
            <span
              className="text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: accent + "14",
                color: accent,
                border: `1px solid ${accent}33`,
              }}
            >
              {item.category}
            </span>
          )}
        </div>

        {/* Scaled Render Layer */}
        <div className="mt-2 transform transition-transform duration-300 group-hover:scale-105">
          <RealisticVehicleIcon id={item.id} name={item.name} />
        </div>
      </div>

      {/* Gold accent strip line */}
      <span
        className="absolute top-0 inset-x-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
        style={{ backgroundColor: "#c9a84c" }}
        aria-hidden="true"
      />

      {/* ── Card body ── */}
      <div className="flex flex-col flex-1 px-5 py-4">
        {/* Name */}
        <h3
          className="font-bold text-base leading-snug mb-1"
          style={{ color: "#0f2d4a" }}
        >
          {item.name}
        </h3>

        {/* Sizes pill row */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {item.sizes.map((size) => (
            <span
              key={size}
              className="text-[11px] font-semibold px-2 py-0.5 rounded"
              style={{
                backgroundColor: "#e8f2fb",
                color: "#1e4d7b",
              }}
            >
              {size}
            </span>
          ))}
        </div>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-4 flex-1"
          style={{ color: "#4a6b85" }}
        >
          {item.description}
        </p>

        {/* Features list */}
        <ul className="space-y-1.5 mb-5">
          {item.features.slice(0, 3).map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-xs" style={{ color: "#4a6b85" }}>
              <FaCheck
                size={10}
                className="mt-0.5 shrink-0"
                style={{ color: "#c9a84c" }}
              />
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA link row */}
        <div
          className="flex items-center justify-between pt-3 border-t"
          style={{ borderColor: "#d6e8f5" }}
        >
          <span
            className="text-xs font-bold tracking-wider uppercase group-hover:underline"
            style={{ color: accent }}
          >
            View Details
          </span>
          <FaChevronRight
            size={11}
            className="transition-transform duration-200 group-hover:translate-x-1"
            style={{ color: accent }}
          />
        </div>
      </div>
    </Link>
  );
}

// ── Main Layout Component ────────────────────────────
export default function FleetGrid() {
  return (
    <section
      className="w-full py-16 md:py-20"
      style={{ backgroundColor: "#f0f6fb" }}
      aria-labelledby="fleet-heading"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">

        {/* Section header panel */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span
                className="h-px w-8 shrink-0"
                style={{ backgroundColor: "#c9a84c" }}
                aria-hidden="true"
              />
              <span
                className="text-xs font-bold tracking-[0.2em] uppercase"
                style={{ color: "#c9a84c" }}
              >
                What We Rent
              </span>
            </div>

            <h2
              id="fleet-heading"
              className="text-3xl md:text-4xl font-black leading-tight"
              style={{
                color: "#0f2d4a",
                fontFamily: "'Georgia', 'Times New Roman', serif",
              }}
            >
              Our Full Fleet
            </h2>
            <p className="mt-2 text-base max-w-xl" style={{ color: "#4a6b85" }}>
              Eight equipment categories — dry, refrigerated, powered, and
              custom specialty — all available on a 2-month minimum rental.
            </p>
          </div>

          <Link
            href="/fleet"
            className="hidden md:inline-flex items-center gap-2 text-sm font-bold tracking-wide shrink-0 transition-colors hover:opacity-80"
            style={{ color: "#2d8fdd" }}
          >
            See full fleet page
            <FaArrowRight size={13} style={{ color: "#c9a84c" }} />
          </Link>
        </div>

        {/* Card responsive grid system wrapper */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FLEET.map((item) => (
            <FleetCard key={item.id} item={item} />
          ))}
        </div>

        {/* Mobile View All button layout */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href="/fleet"
            className="inline-flex items-center gap-2 px-6 py-3 rounded font-bold text-sm tracking-wider uppercase transition-all hover:brightness-110 active:scale-95"
            style={{ backgroundColor: "#2d8fdd", color: "#ffffff" }}
          >
            View Full Fleet
            <FaArrowRight size={13} />
          </Link>
        </div>

      </div>
    </section>
  );
}