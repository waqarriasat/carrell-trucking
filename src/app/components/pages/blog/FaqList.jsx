import Markdown from "./Markdown";

// FAQ accordion. Native <details>/<summary>: works without JavaScript and
// the answers stay in the page for search engines.
export default function FaqList({ items }) {
  return (
    <div className="border-t" style={{ borderColor: "#e3e9f0" }}>
      {items.map((it, i) => (
        <details key={i} className="faq-item group border-b" style={{ borderColor: "#e3e9f0" }}>
          <summary className="flex items-start justify-between gap-6 py-5 cursor-pointer list-none">
            <h3 className="text-base md:text-lg font-bold leading-snug" style={{ color: "#0f2d4a" }}>{it.q}</h3>
            <span
              className="faq-icon shrink-0 mt-0.5 flex h-7 w-7 items-center justify-center rounded-[4px] text-lg font-bold transition-transform"
              style={{ backgroundColor: "#c9a84c26", color: "#86671e" }}
              aria-hidden="true"
            >
              +
            </span>
          </summary>
          <div className="pb-5 pr-12">
            <Markdown text={it.a} compact />
          </div>
        </details>
      ))}
    </div>
  );
}
