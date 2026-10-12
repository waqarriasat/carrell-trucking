import Link from "next/link";

// ─────────────────────────────────────────────
//  Markdown (Server Component)
//  Renders article / FAQ text written in the admin:
//    ## Heading   ### Sub-heading   - bullet   1. step
//    **bold**     [text](/link)     blank line = new paragraph
//  Output is plain React elements (no raw HTML), so admin text can never
//  inject markup. ## headings get anchor ids for the table of contents.
// ─────────────────────────────────────────────

export const slugify = (t) =>
  String(t).toLowerCase().replace(/<[^>]*>/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const LINK_COLOR = "#0f2d4a";

// **bold** and [text](href) inside a line
export function Inline({ text }) {
  const out = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0, m, k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      out.push(<strong key={k++} style={{ color: "#0f2d4a", fontWeight: 700 }}>{m[1]}</strong>);
    } else {
      const href = m[3];
      const internal = href.startsWith("/");
      const style = { color: LINK_COLOR, fontWeight: 600, textDecoration: "underline", textDecorationColor: "#c9a84c", textUnderlineOffset: 3 };
      out.push(
        internal ? (
          <Link key={k++} href={href} style={style}>{m[2]}</Link>
        ) : /^(https?:|mailto:|tel:)/.test(href) ? (
          <a key={k++} href={href} style={style} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{m[2]}</a>
        ) : (
          m[2]
        )
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

// Split the text into blocks: headings, lists, paragraphs
export function parseBlocks(src) {
  const lines = String(src || "").replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let para = [];
  const flush = () => {
    if (para.length) blocks.push({ type: "p", text: para.join(" ") });
    para = [];
  };
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { flush(); continue; }
    let m;
    if ((m = line.match(/^(#{2,3})\s+(.*)$/))) {
      flush();
      blocks.push({ type: m[1].length === 2 ? "h2" : "h3", text: m[2] });
    } else if ((m = line.match(/^[-*]\s+(.*)$/))) {
      flush();
      const prev = blocks[blocks.length - 1];
      if (prev && prev.type === "ul") prev.items.push(m[1]);
      else blocks.push({ type: "ul", items: [m[1]] });
    } else if ((m = line.match(/^\d+[.)]\s+(.*)$/))) {
      flush();
      const prev = blocks[blocks.length - 1];
      if (prev && prev.type === "ol") prev.items.push(m[1]);
      else blocks.push({ type: "ol", items: [m[1]] });
    } else {
      para.push(line);
    }
  }
  flush();
  return blocks;
}

export default function Markdown({ text, compact = false }) {
  const blocks = parseBlocks(text);
  const p = { fontSize: compact ? 15 : 17, lineHeight: 1.8, color: "#33475b", margin: compact ? "0 0 12px" : "0 0 20px" };
  return (
    <div>
      {blocks.map((b, i) => {
        if (b.type === "h2")
          return (
            <h2 key={i} id={slugify(b.text)} style={{ fontSize: "clamp(22px, 2.4vw, 28px)", fontWeight: 900, color: "#0f2d4a", margin: "40px 0 14px", lineHeight: 1.25, fontFamily: "Georgia, 'Times New Roman', serif", scrollMarginTop: 110 }}>
              {b.text}
            </h2>
          );
        if (b.type === "h3")
          return <h3 key={i} style={{ fontSize: 19, fontWeight: 800, color: "#0f2d4a", margin: "28px 0 10px" }}>{b.text}</h3>;
        if (b.type === "ul" || b.type === "ol") {
          const Tag = b.type;
          return (
            <Tag key={i} style={{ margin: compact ? "0 0 12px" : "0 0 22px", paddingLeft: 22, listStyle: b.type === "ul" ? "disc" : "decimal", color: "#33475b" }}>
              {b.items.map((it, j) => (
                <li key={j} style={{ fontSize: p.fontSize, lineHeight: 1.75, marginBottom: 6, paddingLeft: 4 }}>
                  <Inline text={it} />
                </li>
              ))}
            </Tag>
          );
        }
        return <p key={i} style={p}><Inline text={b.text} /></p>;
      })}
    </div>
  );
}

// Plain text (for meta descriptions / FAQ structured data)
export function plainText(src) {
  return String(src || "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^#{2,3}\s+/gm, "")
    .replace(/^[-*]\s+|^\d+[.)]\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}
