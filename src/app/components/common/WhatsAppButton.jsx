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
      className="fixed z-[35] right-4 bottom-4 md:right-6 md:bottom-6 block transition-transform duration-200 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] rounded-full"
      style={{ marginBottom: "env(safe-area-inset-bottom)", filter: "drop-shadow(0 3px 6px rgba(0,0,0,.28))" }}
    >
      {/* The official logo on its own: green speech bubble, white ring and phone (no extra circle). */}
      <span className="relative block h-14 w-14" aria-hidden="true">
        <svg viewBox="0 -32 448 512" className="absolute inset-0 h-full w-full">
          <path fill="#25D366" d="M224 22C112.4 22 22 112.4 22 224c0 35.6 9.3 70.3 26.9 100.9L20 428l106.6-28c29.6 16.2 63 24.8 97.3 24.8C335.6 424.8 426 334.4 426 222.8 426 111.2 335.6 22 224 22z" />
        </svg>
        <FaWhatsapp className="absolute inset-0 h-full w-full" style={{ color: "#ffffff" }} />
      </span>
    </a>
  );
}
