import Breadcrumb from "@/app/components/common/Breadcrumb";

// Title band used by the blog, category and FAQ pages.
export default function PageTitle({ crumbs, eyebrow, titleStart, titleAccent, text, children }) {
  return (
    <section className="page-section wrap">
      <Breadcrumb crumbs={crumbs} />
      <div className="flex items-center gap-3 mb-3">
        <span className="h-px w-8 shrink-0" style={{ backgroundColor: "#c9a84c" }} aria-hidden="true" />
        <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#86671e" }}>{eyebrow}</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4" style={{ color: "#0f2d4a", fontFamily: "Georgia, 'Times New Roman', serif" }}>
        {titleStart} {titleAccent ? <span style={{ color: "var(--gold-heading)" }}>{titleAccent}</span> : null}
      </h1>
      {text ? <p className="text-base md:text-lg max-w-3xl leading-relaxed" style={{ color: "#4a6b85" }}>{text}</p> : null}
      {children}
    </section>
  );
}
