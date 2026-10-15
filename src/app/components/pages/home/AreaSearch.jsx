"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FaMagnifyingGlass, FaLocationDot, FaArrowRight } from "react-icons/fa6"

// Home page "Do we deliver to you?" strip: type a town, jump to its page.
const norm = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "")

export default function AreaSearch({ areas, towns, phone }) {
  const router = useRouter()
  const [q, setQ] = useState("")
  const query = norm(q)
  const matches = query ? towns.filter((t) => norm(t.name).startsWith(query) || norm(t.name).includes(query)).slice(0, 6) : []

  function submit(e) {
    e.preventDefault()
    router.push(matches[0] ? `/areas/${matches[0].id}` : "/areas")
  }

  return (
    <section className="page-section wrap" aria-labelledby="area-search-title">
      <div className="grid w-full gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-0.5 w-7" style={{ background: "#c9a84c" }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: "#86671e" }}>{areas.stripEyebrow}</span>
          </div>
          <h2 id="area-search-title" className="text-2xl font-black md:text-3xl" style={{ color: "#0f2d4a" }}>{areas.stripTitle}</h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed" style={{ color: "#4a6b85" }}>{areas.stripText}</p>
        </div>
        <div>
          <form onSubmit={submit} role="search" className="flex gap-2">
            <label htmlFor="home-area-search" className="sr-only">{areas.searchLabel}</label>
            <div className="relative min-w-0 flex-1">
              <FaMagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#7a9bb5" }} aria-hidden="true" />
              <input
                id="home-area-search"
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={areas.searchPlaceholder}
                autoComplete="off"
                className="w-full rounded border py-3 pl-10 pr-3 text-[15px]"
                style={{ borderColor: "#d6e8f5", background: "#fff", color: "#0f2d4a" }}
              />
            </div>
            <button className="inline-flex shrink-0 items-center gap-2 rounded px-4 text-sm font-extrabold" style={{ background: "#c9a84c", color: "#0f2d4a" }}>
              Go <FaArrowRight size={12} aria-hidden="true" />
            </button>
          </form>
          {query ? (
            matches.length ? (
              <ul className="mt-3 flex flex-wrap gap-2">
                {matches.map((t) => (
                  <li key={t.id}>
                    <Link href={`/areas/${t.id}`} className="inline-flex items-center gap-2 rounded border px-3 py-2 text-sm font-semibold hover:border-[#c9a84c]" style={{ borderColor: "#d6e8f5", background: "#fff", color: "#0f2d4a" }}>
                      <FaLocationDot style={{ color: "#c9a84c" }} aria-hidden="true" /> {t.name}, {t.state}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm" style={{ color: "#4a6b85" }} role="status">{String(areas.noResults || "").replace("{phone}", phone || "")}</p>
            )
          ) : null}
          <Link href="/areas" className="mt-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider" style={{ color: "#0f2d4a" }}>
            {areas.stripButtonLabel} <FaArrowRight size={11} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
