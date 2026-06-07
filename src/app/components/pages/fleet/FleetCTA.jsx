import Link from "next/link";
import { FaPhone, FaFileAlt } from "react-icons/fa";

export default function FleetCTA() {
  return (
    <section
      className="w-full py-14"
      style={{ backgroundColor: "#0f2d4a" }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2
            className="text-2xl md:text-3xl font-black leading-tight mb-2"
            style={{ color: "#ffffff" }}
          >
            Don't See What You Need?
            <br />
            <span style={{ color: "#c9a84c" }}>Let's Talk.</span>
          </h2>
          <p className="text-sm" style={{ color: "#7a9bb5" }}>
            Call us at 580-226-7811 or request a free quote and we'll find the right unit for your job.
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
            style={{ border: "2px solid #2d8fdd", color: "#2d8fdd" }}
          >
            <FaPhone size={14} /> 580-226-7811
          </a>
        </div> */}
      </div>
    </section>
  );
}