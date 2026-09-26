import Link from "next/link"

// Centered card used by the sign-in / forgot / reset pages.
export default function AuthShell({ brand, title, subtitle, children, footer }) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#0f2d4a] px-4 py-10 font-sans antialiased">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.06]"
        style={{ backgroundImage: "radial-gradient(circle, #7a9bb5 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-md">
        <div className="mb-6 text-center leading-none">
          <Link href="/" className="inline-block">
            <span className="block text-2xl font-black tracking-tight text-white" style={{ fontFamily: "Georgia, serif" }}>
              {brand}
            </span>
            <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.25em] text-[#c9a84c]">Admin Panel</span>
          </Link>
        </div>
        <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
          <div className="h-1 bg-[#c9a84c]" />
          <div className="p-6 sm:p-8">
            <h1 className="text-xl font-bold text-slate-900">{title}</h1>
            {subtitle && <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{subtitle}</p>}
            <div className="mt-6">{children}</div>
          </div>
        </div>
        {footer && <div className="mt-5 text-center text-sm text-slate-400">{footer}</div>}
      </div>
    </div>
  )
}

export const authInput =
  "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#2d8fdd] focus:ring-2 focus:ring-[#2d8fdd]/20"

export const authButton =
  "w-full rounded-lg bg-[#c9a84c] px-4 py-2.5 text-sm font-bold text-[#0f2d4a] shadow-sm transition hover:brightness-105 disabled:opacity-60"
