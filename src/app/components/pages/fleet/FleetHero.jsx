import Link from "next/link";


export default function FleetHero() {
  return (
    <section
  style={{ backgroundColor: "#0f2d4a", padding: "20px 24px 40px" }}
>
      <div style={{ maxWidth: 1100, margin: "0 auto"}}>

        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, marginBottom: 16 }}>
  <Link href="/" style={{ color: "#7a9bb5", textDecoration: "none" }}>Home</Link>
  <span style={{ color: "#7a9bb5" }}>›</span>
  <span style={{ color: "#c9a84c", fontWeight: 600 }}>Fleet</span>
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