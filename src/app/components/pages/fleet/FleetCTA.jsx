import Link from "next/link";
import { FaPhone, FaFileAlt } from "react-icons/fa";

export default function FleetCTA({ fleetPage }) {
  return (
    <section className="page-section wrap">
      <div className="panel-navy px-6 sm:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2
            className="text-2xl md:text-3xl font-black leading-tight mb-2"
            style={{ color: "#ffffff" }}
          >
            {fleetPage.ctaTitle}
            <br />
            <span style={{ color: "#c9a84c" }}>{fleetPage.ctaAccent}</span>
          </h2>
          <p className="text-sm" style={{ color: "#a9c1d4" }}>
            {fleetPage.ctaText}
          </p>
        </div>
        {/* <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link
            href="/quote"
            className="flex items-center justify-center gap-2 text-sm font-bold px-7 py-3.5 rounded-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#c9a84c", color: "#0f2d4a" }}
          >
            <FaFileAlt size={14} /> Get a Free Quote
          </Link>
          <a
            href="tel:580-226-7811"
            className="flex items-center justify-center gap-2 text-sm font-bold px-7 py-3.5 rounded-lg transition-opacity hover:opacity-90"
            style={{ border: "2px solid rgba(255,255,255,0.8)", color: "#ffffff" }}
          >
            <FaPhone size={14} /> 580-226-7811
          </a>
        </div> */}
      </div>
    </section>
  );
}