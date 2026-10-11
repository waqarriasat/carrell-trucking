// ─────────────────────────────────────────────
//  DeliveryAnimation
//  Looping illustration of ground-level delivery:
//  a tilt-bed truck arrives, tilts its bed, the
//  container slides down to the ground, the truck
//  drives off and the doors open. Shown until a
//  real video link is added in the admin.
//  Pure SVG + CSS — no video file to download.
// ─────────────────────────────────────────────

const CSS = `
.dlv { --t: 14s; }
.dlv * { animation-duration: var(--t); animation-iteration-count: infinite; animation-timing-function: ease-in-out; }
.dlv .truck { animation-name: dlv-truck; }
.dlv .bed, .dlv .cargo { transform-box: fill-box; transform-origin: 0% 100%; }
.dlv .bed { animation-name: dlv-bed; }
.dlv .cargo { animation-name: dlv-cargo; }
.dlv .door { transform-box: fill-box; transform-origin: 100% 50%; animation-name: dlv-door; }
.dlv .wheel { transform-box: fill-box; transform-origin: 50% 50%; animation-name: dlv-wheel; animation-timing-function: linear; }
.dlv .scene { animation-name: dlv-fade; }
.dlv .s1 { animation-name: dlv-s1; } .dlv .s2 { animation-name: dlv-s2; }
.dlv .s3 { animation-name: dlv-s3; } .dlv .s4 { animation-name: dlv-s4; }
.dlv .done { animation-name: dlv-done; }

@keyframes dlv-truck {
  0% { transform: translateX(-470px); } 14% { transform: translateX(0); }
  48% { transform: translateX(0); } 62% { transform: translateX(150px); }
  68% { transform: translateX(150px); } 84%, 100% { transform: translateX(720px); }
}
@keyframes dlv-wheel {
  0% { transform: rotate(0); } 14% { transform: rotate(720deg); } 48% { transform: rotate(720deg); }
  62% { transform: rotate(940deg); } 68% { transform: rotate(940deg); } 84%, 100% { transform: rotate(2200deg); }
}
@keyframes dlv-bed {
  0%, 20% { transform: rotate(0); } 30%, 62% { transform: rotate(-16deg); } 68%, 100% { transform: rotate(0); }
}
@keyframes dlv-cargo {
  0% { transform: translate(-470px, 0) rotate(0); }
  14%, 20% { transform: translate(0, 0) rotate(0); }
  30% { transform: translate(0, 0) rotate(-16deg); }
  46% { transform: translate(-150px, 44px) rotate(-16deg); }
  62%, 100% { transform: translate(-150px, 44px) rotate(0); }
}
@keyframes dlv-door { 0%, 70% { transform: scaleX(1); } 78%, 94% { transform: scaleX(0.08); } 100% { transform: scaleX(1); } }
@keyframes dlv-fade { 0%, 95% { opacity: 1; } 99% { opacity: 0; } 100% { opacity: 1; } }
@keyframes dlv-s1 { 0%, 1% { opacity: 0; } 3%, 18% { opacity: 1; } 20%, 100% { opacity: 0; } }
@keyframes dlv-s2 { 0%, 19% { opacity: 0; } 21%, 32% { opacity: 1; } 34%, 100% { opacity: 0; } }
@keyframes dlv-s3 { 0%, 33% { opacity: 0; } 35%, 64% { opacity: 1; } 66%, 100% { opacity: 0; } }
@keyframes dlv-s4 { 0%, 70% { opacity: 0; } 73%, 95% { opacity: 1; } 99%, 100% { opacity: 0; } }
@keyframes dlv-done { 0%, 74% { opacity: 0; transform: translateY(6px); } 78%, 95% { opacity: 1; transform: translateY(0); } 99%, 100% { opacity: 0; } }

/* Visitors who prefer less motion see the finished scene, still. */
@media (prefers-reduced-motion: reduce) {
  .dlv * { animation: none !important; }
  .dlv .truck { transform: translateX(720px); }
  .dlv .cargo { transform: translate(-150px, 44px); }
  .dlv .s1, .dlv .s2, .dlv .s3 { opacity: 0; }
  .dlv .s4, .dlv .done { opacity: 1; }
  .dlv .door { transform: scaleX(0.08); }
}
`

const WHEELS = [196, 232, 452]

export default function DeliveryAnimation({ brand = "ARDMORE", caption }) {
  return (
    <figure className="dlv m-0">
      <style>{CSS}</style>
      <svg
        viewBox="0 0 640 320"
        className="block w-full h-auto"
        role="img"
        aria-label={caption || "Animation: a tilt-bed truck sets a container on the ground without a forklift"}
      >
        <defs>
          <linearGradient id="dlv-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0f2d4a" />
            <stop offset="1" stopColor="#173d63" />
          </linearGradient>
          <linearGradient id="dlv-box" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#dde5ee" />
          </linearGradient>
          <pattern id="dlv-rib" width="10" height="70" patternUnits="userSpaceOnUse">
            <rect width="10" height="70" fill="url(#dlv-box)" />
            <rect x="0" width="3" height="70" fill="#0f2d4a" opacity=".08" />
          </pattern>
        </defs>

        {/* Background */}
        <rect width="640" height="320" fill="url(#dlv-sky)" />
        <g opacity=".18" fill="#7a9bb5">
          <rect x="40" y="168" width="70" height="80" /><rect x="120" y="140" width="46" height="108" />
          <rect x="500" y="150" width="60" height="98" /><rect x="572" y="176" width="44" height="72" />
        </g>
        <rect y="248" width="640" height="72" fill="#0a2038" />
        <rect y="248" width="640" height="3" fill="#c9a84c" opacity=".7" />
        <g fill="#c9a84c" opacity=".25">
          {[20, 100, 180, 260, 340, 420, 500, 580].map((x) => <rect key={x} x={x} y="284" width="40" height="4" rx="2" />)}
        </g>

        <g className="scene">
          {/* Container (separate from the truck so it can stay on the ground) */}
          <g className="cargo">
            <rect x="176" y="130" width="230" height="70" rx="2" fill="url(#dlv-rib)" stroke="#94a3b8" strokeWidth="2" />
            <rect x="176" y="130" width="230" height="7" fill="#94a3b8" opacity=".45" />
            <rect x="380" y="137" width="24" height="61" fill="#0a2038" />
            <rect className="door" x="380" y="137" width="24" height="61" fill="#eef2f6" stroke="#94a3b8" strokeWidth="1.5" />
            <text x="276" y="172" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="700" fontSize="20" fill="#18186C">{brand}</text>
            <text x="276" y="186" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="8" letterSpacing="2" fill="#a8842c">TRAILER, INC.</text>
          </g>

          {/* Tilt-bed (rollback) truck */}
          <g className="truck">
            <rect x="170" y="210" width="330" height="12" rx="2" fill="#1f2937" />
            <g className="bed">
              <rect x="166" y="200" width="252" height="9" rx="2" fill="#475569" />
              <rect x="166" y="200" width="252" height="3" fill="#94a3b8" />
            </g>
            {/* cab */}
            <path d="M424 150 h48 q20 0 26 22 l14 30 v20 h-88 z" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
            <path d="M440 160 h30 q12 0 16 14 l6 14 h-52 z" fill="#1e3a5f" opacity=".9" />
            <rect x="500" y="206" width="16" height="8" rx="2" fill="#fbbf24" />
            <rect x="424" y="196" width="88" height="5" fill="#c9a84c" />
            {WHEELS.map((cx) => (
              <g key={cx} className="wheel">
                <circle cx={cx} cy="234" r="15" fill="#111827" />
                <circle cx={cx} cy="234" r="6" fill="#94a3b8" />
                <rect x={cx - 1.5} y="221" width="3" height="10" fill="#94a3b8" />
              </g>
            ))}
          </g>
        </g>

        {/* Step captions */}
        <g fontFamily="Arial, sans-serif" fontWeight="700" fontSize="15" fill="#ffffff" textAnchor="middle">
          <text className="s1" x="320" y="42">1 · Arrives on a tilt-bed truck</text>
          <text className="s2" x="320" y="42">2 · The bed tilts back</text>
          <text className="s3" x="320" y="42">3 · Container slides gently to the ground</text>
          <text className="s4" x="320" y="42">4 · Ready — walk right in</text>
        </g>
        <g className="done">
          <rect x="452" y="70" width="164" height="30" rx="6" fill="#c9a84c" />
          <text x="534" y="90" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="12" letterSpacing="1.5" fill="#0f2d4a">GROUND LEVEL</text>
          <rect x="452" y="106" width="164" height="26" rx="6" fill="#ffffff" opacity=".12" />
          <text x="534" y="123" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="11" fill="#ffffff">No forklift needed</text>
        </g>
      </svg>
    </figure>
  )
}
