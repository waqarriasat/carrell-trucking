// ─────────────────────────────────────────────
//  TextLogo
//  "ARDMORE" in white bold serif with
//  "TRAILER, INC." in gold underneath — the same
//  lettering as on every unit in the fleet
//  images. Used on the dark header and footer.
//  Text comes from Admin → Business (logo lines).
// ─────────────────────────────────────────────

export default function TextLogo({ top, bottom, size = "md" }) {
  const big = size === "lg";
  return (
    <span className="flex flex-col items-start leading-none">
      <span
        className={`font-black text-white ${big ? "text-[32px]" : "text-[24px] lg:text-[30px]"}`}
        style={{ fontFamily: "'Georgia', 'Times New Roman', serif", letterSpacing: "0.02em" }}
      >
        {top}
      </span>
      <span
        className={`mt-1 font-bold uppercase ${big ? "text-[11px]" : "text-[9px] lg:text-[10.5px]"}`}
        style={{ fontFamily: "'Georgia', 'Times New Roman', serif", color: "#c9a84c", letterSpacing: "0.28em" }}
      >
        {bottom}
      </span>
    </span>
  );
}
