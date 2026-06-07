import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

export default function FleetHero() {
  return (
    <section
      className="w-full py-14 md:py-20"
      style={{ backgroundColor: "#0f2d4a" }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link
            href="/"
            className="text-xs font-semibold hover:underline"
            style={{ color: "#7a9bb5" }}
          >
            Home
          </Link>
          <FaChevronRight size={10} style={{ color: "#7a9bb5" }} />
          <span
            className="text-xs font-semibold"
            style={{ color: "#c9a84c" }}
          >
            Fleet
          </span>
        </div>

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-4">
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

        {/* Title */}
        <h1
          className="text-4xl md:text-5xl font-black leading-tight mb-4"
          style={{ color: "#ffffff" }}
        >
          Our Full Fleet
        </h1>

        <p
          className="text-base max-w-2xl leading-relaxed"
          style={{ color: "#7a9bb5" }}
        >
          Eight equipment categories — dry, refrigerated, powered, and specialty
          — all available on a 2-month minimum rental. Serving Oklahoma and
          surrounding areas.
        </p>

        {/* Stats strip */}
        <div className="flex flex-wrap gap-6 mt-10">
          {[
            { value: "8",     label: "Equipment Types" },
            { value: "2 Mo",  label: "Min. Rental" },
            { value: "OK+",   label: "Service Area" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <span
                className="text-2xl font-black"
                style={{ color: "#c9a84c" }}
              >
                {s.value}
              </span>
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "#7a9bb5" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}