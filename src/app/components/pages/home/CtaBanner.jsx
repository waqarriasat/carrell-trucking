import Link from "next/link";
import { FaFileLines, FaTruck, FaClipboardCheck, FaShield } from "react-icons/fa6";

// Unique, non-duplicative metrics focusing on operational excellence
const STATS = [
  { value: "20+",    label: "Years in Business" },
  { value: "Direct",  label: "Owner Communication" },
  { value: "On-Site", label: "Prompt Delivery" },
  { value: "100%",   label: "Commercial Grade" },
];

export default function CtaBanner() {
  return (
    <section
      className="w-full py-16 md:py-20 overflow-hidden"
      style={{ backgroundColor: "#0f2d4a" }}
      aria-labelledby="cta-heading"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">

        {/* ── Stats Grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center text-center rounded-xl py-6 px-4 transition-all"
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span
                className="text-2xl sm:text-3xl font-black leading-none mb-1.5 block"
                style={{ color: "#c9a84c" }}
              >
                {s.value}
              </span>
              <span
                className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest block"
                style={{ color: "#7a9bb5" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Main CTA Box ── */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid #1e4d7b" }}
        >
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
                    Streamlined Logistics
                  </span>
                </div>

                <h2
                  id="cta-heading"
                  className="text-3xl md:text-4xl font-black leading-tight mb-4"
                  style={{ color: "#ffffff" }}
                >
                  Lock In Your Fleet Assets{" "}
                  <span style={{ color: "#c9a84c" }}>
                    Before Your Next Project.
                  </span>
                </h2>

                <p className="text-base leading-relaxed mb-8" style={{ color: "#cbd5e1" }}>
                  Don&apos;t risk project downtime due to supply constraints. We coordinate
                  with your timeline to drop off heavy-duty infrastructure directly where
                  you need it most. Secure your minimum 2-month rental allocation today.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/quote"
                    className="flex items-center justify-center gap-2 text-sm font-bold px-8 py-4 rounded-lg transition-all duration-200 hover:brightness-110 active:scale-95 shadow-lg"
                    style={{ backgroundColor: "#c9a84c", color: "#0f2d4a" }}
                  >
                    <FaFileLines size={14} />
                    Begin Online Setup
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
                Our Seamless Rental Process
              </p>

              {[
                {
                  icon: FaClipboardCheck,
                  step: "01",
                  title: "Submit Requirements",
                  desc: "Request your specific sizes, generator capacities, or office styles online.",
                },
                {
                  icon: FaShield,
                  step: "02",
                  title: "Confirm Allocation",
                  desc: "Review your comprehensive, transparent commercial contract with a 2-month minimum term.",
                },
                {
                  icon: FaTruck,
                  step: "03",
                  title: "Scheduled Delivery",
                  desc: "Our dispatch team drops off the certified ready-to-use fleet assets directly to your site.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 items-start relative group">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0 border"
                    style={{
                      backgroundColor: "rgba(45, 143, 221, 0.08)",
                      borderColor: "rgba(45, 143, 221, 0.25)",
                    }}
                  >
                    <item.icon size={15} style={{ color: "#2d8fdd" }} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded text-[#c9a84c] bg-[#c9a84c]/10">
                        STEP {item.step}
                      </span>
                      <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "#7a9bb5" }}>
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