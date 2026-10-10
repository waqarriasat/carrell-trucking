import Link from "next/link";


export default function FleetHero({ fleetPage }) {
  return (
    <section className="page-section wrap">
      <div className="panel" style={{ width: "100%", padding: "clamp(22px, 3vw, 40px)" }}>

        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, marginBottom: 16 }}>
  <Link href="/" style={{ color: "#4a6b85", textDecoration: "none" }}>{fleetPage.breadcrumbHome}</Link>
  <span style={{ color: "#8aa3b8" }}>›</span>
  <span style={{ color: "#86671e", fontWeight: 700 }}>{fleetPage.breadcrumbCurrent}</span>
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
            style={{ color: "#86671e" }}
          >
            {fleetPage.eyebrow}
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-4xl md:text-5xl font-black leading-tight mb-4"
          style={{ color: "#0f2d4a" }}
        >
          {fleetPage.title}
        </h1>

        <p
          className="text-base max-w-2xl leading-relaxed"
          style={{ color: "#4a6b85" }}
        >
          {fleetPage.text}
        </p>

        {/* Stats strip */}
        <div className="flex flex-wrap gap-6 mt-10">
          {fleetPage.stats.map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <span
                className="text-2xl font-black"
                style={{ color: "#0f2d4a" }}
              >
                {s.value}
              </span>
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "#86671e" }}
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