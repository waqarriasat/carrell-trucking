"use client"

import { useState } from "react"
import Link from "next/link"
import { FaMagnifyingGlass, FaLocationDot } from "react-icons/fa6"

// Town search + list, grouped by state. Filters as you type.
const norm = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "")

export default function AreasList({ towns, stateNames = {}, searchLabel, searchPlaceholder, noResults }) {
  const [q, setQ] = useState("")
  const query = norm(q)
  const shown = query ? towns.filter((t) => norm(t.name).includes(query) || norm(t.county).includes(query)) : towns
  const states = [...new Set(towns.map((t) => t.state))]

  return (
    <div style={{ width: "100%" }}>
      <label htmlFor="area-search" className="block text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#86671e" }}>
        {searchLabel}
      </label>
      <div className="relative mt-2 max-w-md">
        <FaMagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#7a9bb5" }} aria-hidden="true" />
        <input
          id="area-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={searchPlaceholder}
          autoComplete="off"
          className="w-full rounded border py-3 pl-10 pr-3 text-[15px]"
          style={{ borderColor: "#d6e8f5", background: "#f0f6fb", color: "#0f2d4a" }}
        />
      </div>

      {shown.length === 0 ? (
        <p className="mt-6 text-sm" style={{ color: "#4a6b85" }} role="status">{noResults}</p>
      ) : (
        states.map((st) => {
          const list = shown.filter((t) => t.state === st)
          if (!list.length) return null
          return (
            <section key={st} className="mt-8">
              <h2 className="mb-3 text-lg font-black" style={{ color: "#0f2d4a" }}>{stateNames[st] || st}</h2>
              <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((t) => (
                  <li key={t.id}>
                    <Link
                      href={`/areas/${t.id}`}
                      className="flex items-center gap-3 rounded border px-4 py-3 transition hover:border-[#c9a84c]"
                      style={{ borderColor: "#d6e8f5", background: "#fff" }}
                    >
                      <FaLocationDot style={{ color: "#c9a84c", flexShrink: 0 }} aria-hidden="true" />
                      <span className="min-w-0">
                        <span className="block text-sm font-bold" style={{ color: "#0f2d4a" }}>
                          {t.name}, {t.state}
                        </span>
                        <span className="block text-xs" style={{ color: "#4a6b85" }}>{t.county}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )
        })
      )}
    </div>
  )
}
