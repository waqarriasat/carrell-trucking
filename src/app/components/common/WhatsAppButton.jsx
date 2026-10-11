import { FaWhatsapp } from "react-icons/fa6";

// ─────────────────────────────────────────────
//  WhatsAppButton
//  Floating green button (bottom-right, every
//  public page) that opens a WhatsApp chat with
//  the business number set in the admin
//  (Business Info → WhatsApp chat button).
//  Hidden when no number is set.
//  Sits below the mobile menu (z-40/z-50).
// ─────────────────────────────────────────────

export default function WhatsAppButton({ site }) {
  if (!site.whatsappHref) return null;
  const label = site.whatsappLabel || "Chat on WhatsApp";

  return (
    <a
      href={site.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="group fixed z-[35] right-4 bottom-4 md:right-6 md:bottom-6 flex items-center gap-2 rounded-full shadow-lg transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      style={{
        backgroundColor: "#25D366",
        color: "#ffffff",
        marginBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <span className="flex h-12 w-12 items-center justify-center">
        <FaWhatsapp size={26} aria-hidden="true" />
      </span>
      {/* Label slides out on hover (desktop) */}
      <span className="hidden md:block max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold transition-all duration-300 group-hover:max-w-[200px] group-hover:pr-4">
        {label}
      </span>
    </a>
  );
}
