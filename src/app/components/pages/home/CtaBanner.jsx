import Link from "next/link";
import { FaFileLines } from "react-icons/fa6";
import { getIcon } from "@/app/lib/content/icons";

export default function CtaBanner({ ctaBanner }) {
  return (
    <section className="page-section wrap" aria-labelledby="cta-heading">
      <div>

        {/* ── Main CTA Box ── */}
        <div className="panel-navy overflow-hidden">
          {/* Gold top accent */}
          <div className="h-1 w-full" style={{ backgroundColor: "#c9a84c" }} />

          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Left — Value Proposition */}
            <div
              className="p-8 md:p-12 flex flex-col justify-center relative"
              style={{ backgroundColor: "#1e4d7b" }}
            >
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-8 shrink-0" style={{ backgroundColor: "#c9a84c" }} aria-hidden="true" />
                  <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#c9a84c" }}>
                    {ctaBanner.eyebrow}
                  </span>
                </div>

                <h2
                  id="cta-heading"
                  className="text-3xl md:text-4xl font-black leading-tight mb-4"
                  style={{ color: "#ffffff" }}
                >
                  {ctaBanner.titleStart}{" "}
                  <span style={{ color: "#c9a84c" }}>
                    {ctaBanner.titleAccent}
                  </span>
                </h2>

                <p className="text-base leading-relaxed mb-8" style={{ color: "#cbd5e1" }}>
                  {ctaBanner.text}
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={ctaBanner.button.href}
                    className="flex items-center justify-center gap-2 text-sm font-bold px-8 py-4 rounded-lg transition-all duration-200 hover:brightness-110 active:scale-95 shadow-lg"
                    style={{ backgroundColor: "#c9a84c", color: "#0f2d4a" }}
                  >
                    <FaFileLines size={14} />
                    {ctaBanner.button.label}
                  </Link>
                </div>
              </div>
            </div>

            {/* Right — 3-Step Process */}
            <div
              className="p-8 md:p-12 flex flex-col justify-center gap-8 relative"
              style={{ backgroundColor: "#0a2038" }}
            >
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/50 mb-2">
                {ctaBanner.processLabel}
              </p>

              {ctaBanner.steps.map((step, i) => ({
                icon: getIcon(step.icon),
                step: String(i + 1).padStart(2, "0"),
                title: step.title,
                desc: step.text,
              })).map((item) => (
                <div key={item.step} className="flex gap-4 items-start relative group">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0 border"
                    style={{
                      backgroundColor: "rgba(201, 168, 76, 0.1)",
                      borderColor: "rgba(201, 168, 76, 0.35)",
                    }}
                  >
                    <item.icon size={15} style={{ color: "#c9a84c" }} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded text-[#c9a84c] bg-[#c9a84c]/10">
                        {ctaBanner.stepPrefix} {item.step}
                      </span>
                      <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "#a9c1d4" }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}