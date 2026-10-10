// ─────────────────────────────────────────────
//  TextLogo
//  "ARDMORE" in white bold serif with
//  "TRAILER, INC." in gold underneath — the same
//  lettering as on every unit in the fleet
//  images. White on the dark header; navy (onLight) in the light footer.
//  Text comes from Admin → Business (logo lines).
// ─────────────────────────────────────────────

export default function TextLogo({ top, bottom, size = "md", onLight = false }) {
  const big = size === "lg";
  return (
    <span className="flex flex-col items-start leading-none">
      <span
        className={`font-black ${big ? "text-[32px]" : "text-[24px] lg:text-[30px]"}`}
        style={{ fontFamily: "'Georgia', 'Times New Roman', serif", letterSpacing: "0.02em", color: onLight ? "#0f2d4a" : "#ffffff" }}
      >
        {top}
      </span>
      <span
        className={`mt-1 font-bold uppercase ${big ? "text-[11px]" : "text-[9px] lg:text-[10.5px]"}`}
        style={{ fontFamily: "'Georgia', 'Times New Roman', serif", color: onLight ? "#86671e" : "#c9a84c", letterSpacing: "0.28em" }}
      >
        {bottom}
      </span>
    </span>
  );
}
