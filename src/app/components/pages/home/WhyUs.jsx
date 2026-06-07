import Image from "next/image";

const WHY_ITEMS = [
  {
    icon: "/images/quality.png",
    title: "Quality Equipment",
    text: "Every unit in our fleet is maintained to the highest standard — ready to work the moment it arrives on your site.",
    stat: "100%",
    statLabel: "Maintained Fleet",
  },
  {
    icon: "/images/safe-service.png",
    title: "Safe & Reliable Service",
    text: "We prioritize safety on every delivery and rental. Our equipment meets all industry standards for your peace of mind.",
    stat: "100%",
    statLabel: "Safe Service",
  },
  {
    icon: "/images/support.png",
    title: "24/7 Support",
    text: "Our team is always reachable. Whether it's a question or an urgent issue — we're just a call away anytime.",
    stat: "24/7",
    statLabel: "Available",
  },
  {
    icon: "/images/customer-satisfaction.png",
    title: "Customer Satisfaction",
    text: "We go the extra mile to make sure every customer is happy — from first call to final pickup.",
    stat: "100%",
    statLabel: "Satisfaction",
  },
  {
    icon: "/images/cost-efficient.png",
    title: "Cost Efficient",
    text: "Competitive rates with no surprises. Get the best value for your rental budget across all equipment types.",
    stat: "Best",
    statLabel: "Value",
  },
  {
    icon: "/images/hidden-charges.png",
    title: "No Hidden Charges",
    text: "Transparent pricing from day one. What you see is what you pay — no unexpected fees or fine print.",
    stat: "0",
    statLabel: "Hidden Fees",
  },
  {
    icon: "/images/experienced-staff.png",
    title: "Experienced Staff",
    text: "Our team knows the trailer and container business inside out. Talk directly to Rick and the team — no call centers.",
    stat: "20+",
    statLabel: "Years Experience",
  },
  {
    icon: "/images/free-quote.png",
    title: "Free Quote",
    text: "Get a fast, no-obligation quote for any equipment type. We'll help you find the right unit for your needs.",
    stat: "FREE",
    statLabel: "No Obligation",
  },
];

export default function WhyUs() {
  return (
    <section
      className="w-full py-16 md:py-20"
      style={{ backgroundColor: "#ffffff" }}
      aria-labelledby="why-heading"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">

        {/* ── Section Header ── */}
        <div className="mb-12">
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
              Why Choose Us
            </span>
          </div>
          <h2
            id="why-heading"
            className="text-3xl md:text-4xl font-black leading-tight"
            style={{ color: "#0f2d4a" }}
          >
            Built for Oklahoma's Toughest Jobs
          </h2>
          <p className="mt-2 text-base max-w-xl" style={{ color: "#4a6b85" }}>
            From oilfields to construction sites — we show up with the right
            equipment, on time, every time.
          </p>
        </div>

        {/* ── Satisfaction + ISO badges row ── */}
        <div className="flex flex-wrap items-center gap-6 mb-12 p-6 rounded-xl"
          style={{ backgroundColor: "#f0f6fb", border: "1.5px solid #d6e8f5" }}>
          <div className="relative w-20 h-20 shrink-0">
            <Image
              src="/images/satisfaction.png"
              alt="100% Customer Satisfaction Guaranteed"
              fill
              sizes="80px"
              className="object-contain"
              priority
            />
          </div>
          <div className="relative w-20 h-20 shrink-0">
            <Image
              src="/images/iso.png"
              alt="ISO 9001:2015 Certified"
              fill
              sizes="80px"
              className="object-contain"
              priority
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1" style={{ color: "#0f2d4a" }}>
              100% Satisfaction Guaranteed & ISO 9001:2015 Certified
            </h3>
            <p className="text-sm" style={{ color: "#4a6b85" }}>
              We stand behind every rental with a satisfaction guarantee and
              operate to international quality management standards.
            </p>
          </div>
        </div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {WHY_ITEMS.map((item, index) => (
            <div
              key={item.title}
              className="relative flex flex-col rounded-xl overflow-hidden shadow-md"
              style={{
                backgroundColor: "#0f2d4a",
                border: "1px solid #1e4d7b",
              }}
            >
              {/* Gold top border line */}
              <span
                className="absolute top-0 inset-x-0 h-1"
                style={{ backgroundColor: "#c9a84c" }}
                aria-hidden="true"
              />

              <div className="p-5 flex flex-col items-center text-center flex-1">

                {/* Icon Container Wrapper */}
                <div
                  className="flex items-center justify-center w-16 h-16 rounded-xl mb-4 mt-2 relative p-3.5"
                  style={{ backgroundColor: "#0f2d4a" }}
                >
                  {/* FIXED: Uses CSS masks to forcefully render your PNG shapes in pure prominent gold (#c9a84c) */}
                  <div 
                    className="w-full h-full"
                    style={{
                      backgroundColor: "#c9a84c",
                      WebkitMaskImage: `url(${item.icon})`,
                      maskImage: `url(${item.icon})`,
                      WebkitMaskSize: "contain",
                      maskSize: "contain",
                      WebkitMaskPosition: "center",
                      maskPosition: "center",
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat"
                    }}
                  />
                </div>

                {/* Stat Display */}
                <div
                  className="text-xl font-black leading-none mb-1"
                  style={{ color: "#c9a84c" }}
                >
                  {item.stat}
                </div>
                <div
                  className="text-[10px] font-semibold uppercase tracking-widest mb-3"
                  style={{ color: "#7a9bb5" }}
                >
                  {item.statLabel}
                </div>

                {/* Card Title */}
                <h3
                  className="text-sm font-bold mb-2 tracking-wide"
                  style={{ color: "#ffffff" }}
                >
                  {item.title}
                </h3>

                {/* Body Text Description */}
                <p
                  className="text-xs leading-relaxed flex-1"
                  style={{ color: "#cbd5e1" }}
                >
                  {item.text}
                </p>

                {/* Large Background Counter Number */}
                {/* <div
                  className="mt-4 text-4xl font-black select-none pointer-events-none"
                  style={{ color: "rgba(214, 232, 245, 0.05)" }}
                >
                  0{index + 1}
                </div> */}

              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom trust strip ── */}
        <div
          className="mt-10 rounded-xl px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{
            backgroundColor: "#0f2d4a",
            border: "1px solid #1e4d7b",
          }}
        >
          <p
            className="text-sm font-medium text-center md:text-left"
            style={{ color: "#7a9bb5" }}
          >
            Serving Oklahoma & surrounding areas with a{" "}
            <span style={{ color: "#c9a84c", fontWeight: 700 }}>
              2-month minimum
            </span>{" "}
            rental period.
          </p>
          <a
            href="tel:580-226-7811"
            className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-lg shrink-0 transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#c9a84c", color: "#0f2d4a" }}
          >
            Call 580-226-7811
          </a>
        </div>

      </div>
    </section>
  );
}