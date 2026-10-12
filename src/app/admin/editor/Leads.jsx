"use client"

import { useState } from "react"
import {
  FaPhone, FaEnvelope, FaTrash, FaRotate, FaDownload, FaTriangleExclamation, FaMagnifyingGlass, FaInbox,
} from "react-icons/fa6"
import { listLeadsAction, setLeadStatusAction, deleteLeadAction } from "@/app/actions/admin"

// ─────────────────────────────────────────────
//  Admin → Leads: every Contact and Quote form
//  message, newest first, with a status so the
//  team can see what has been answered.
// ─────────────────────────────────────────────

const STATUSES = [
  { id: "new", label: "New", cls: "bg-amber-100 text-amber-800 border-amber-200" },
  { id: "contacted", label: "Contacted", cls: "bg-sky-100 text-sky-800 border-sky-200" },
  { id: "closed", label: "Closed", cls: "bg-slate-100 text-slate-600 border-slate-200" },
]
const statusOf = (id) => STATUSES.find((s) => s.id === id) || STATUSES[0]

const when = (iso) => {
  try {
    return new Date(iso).toLocaleString("en-US", {
      timeZone: "America/Chicago", month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit",
    })
  } catch {
    return iso
  }
}

const detailText = (d) => (Array.isArray(d.value) ? d.value.join(", ") : d.value)

function toCsv(leads) {
  const labels = [...new Set(leads.flatMap((l) => (l.details || []).map((d) => d.label)))]
  const head = ["Date", "Type", "Status", "Name", "Company", "Phone", "Email", ...labels]
  const q = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`
  const rows = leads.map((l) => {
    const byLabel = Object.fromEntries((l.details || []).map((d) => [d.label, detailText(d)]))
    return [when(l.createdAt), l.kind, statusOf(l.status).label, l.customer?.name, l.customer?.company, l.customer?.phone, l.customer?.email, ...labels.map((x) => byLabel[x])]
  })
  return [head, ...rows].map((r) => r.map(q).join(",")).join("\r\n")
}

// `leads` / `setLeads` live in AdminApp (loaded with the page) so the menu badge stays in sync.
export default function Leads({ leads, setLeads }) {
  const [error, setError] = useState("")
  const [filter, setFilter] = useState("all")
  const [query, setQuery] = useState("")
  const [busy, setBusy] = useState(false)

  async function load() {
    setBusy(true)
    const res = await listLeadsAction()
    setBusy(false)
    if (!res.ok) return setError(res.error)
    setError("")
    setLeads(res.leads)
  }

  async function changeStatus(id, status) {
    const before = leads
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status } : l)))
    const res = await setLeadStatusAction(id, status)
    if (!res.ok) {
      setLeads(before)
      setError(res.error || "Could not update the message.")
    }
  }

  async function remove(lead) {
    if (!window.confirm(`Delete the message from ${lead.customer?.name || "this visitor"}? This cannot be undone.`)) return
    const res = await deleteLeadAction(lead.id)
    if (!res.ok) return setError(res.error || "Could not delete the message.")
    setLeads((ls) => ls.filter((l) => l.id !== lead.id))
  }

  function download() {
    const blob = new Blob(["﻿" + toCsv(shown)], { type: "text/csv;charset=utf-8" })
    const a = document.createElement("a")
    a.href = URL.createObjectURL(blob)
    a.download = `website-leads-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const counts = { all: leads.length }
  for (const s of STATUSES) counts[s.id] = leads.filter((l) => (l.status || "new") === s.id).length

  const term = query.trim().toLowerCase()
  const shown = leads.filter((l) => {
    if (filter !== "all" && (l.status || "new") !== filter) return false
    if (!term) return true
    const c = l.customer || {}
    return [c.name, c.company, c.phone, c.email, ...(l.details || []).map(detailText)].some((v) => String(v || "").toLowerCase().includes(term))
  })

  return (
    <div className="space-y-5">
      <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
        Every message sent through the Contact and Get-a-Quote forms is kept here, even if the email notification
        didn&apos;t arrive. Set a status as you reply, so everyone can see what still needs an answer.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {[{ id: "all", label: "All" }, ...STATUSES].map((s) => (
            <button
              key={s.id}
              onClick={() => setFilter(s.id)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                filter === s.id ? "border-[#0f2d4a] bg-[#0f2d4a] text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
              }`}
            >
              {s.label} <span className="opacity-70">({counts[s.id] || 0})</span>
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={load} disabled={busy} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-slate-400 disabled:opacity-50">
            <FaRotate size={11} className={busy ? "animate-spin" : ""} /> Refresh
          </button>
          <button onClick={download} disabled={!shown.length} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-slate-400 disabled:opacity-50">
            <FaDownload size={11} /> Export CSV
          </button>
        </div>
      </div>

      <label className="relative block">
        <FaMagnifyingGlass size={12} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, company, phone, email or message…"
          className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#2d8fdd] focus:ring-2 focus:ring-[#2d8fdd]/20"
        />
      </label>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}

      {shown.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <FaInbox size={22} className="mx-auto text-slate-300" />
          <p className="mt-3 text-sm text-slate-500">{leads.length ? "No messages match this filter." : "No messages yet. New form messages will appear here."}</p>
        </div>
      )}

      <div className="space-y-3">
        {shown.map((l) => {
          const c = l.customer || {}
          const st = statusOf(l.status)
          return (
            <article key={l.id} className={`rounded-2xl border bg-white p-5 shadow-sm ${l.status === "new" ? "border-amber-300" : "border-slate-200"}`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-[#0f2d4a] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#c9a84c]">{l.kind}</span>
                    <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${st.cls}`}>{st.label}</span>
                    <span className="text-xs text-slate-500">{when(l.createdAt)}</span>
                  </div>
                  <h3 className="mt-2 text-base font-bold text-slate-900">
                    {c.name || "Website visitor"}
                    {c.company && <span className="font-normal text-slate-500"> · {c.company}</span>}
                  </h3>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                    {c.phone && (
                      <a href={`tel:${c.phone.replace(/[^\d+]/g, "")}`} className="inline-flex items-center gap-1.5 font-semibold text-[#1e4d7b] hover:underline">
                        <FaPhone size={11} /> {c.phone}
                      </a>
                    )}
                    {c.email && (
                      <a href={`mailto:${c.email}`} className="inline-flex items-center gap-1.5 text-[#1e4d7b] hover:underline">
                        <FaEnvelope size={11} /> {c.email}
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={l.status || "new"}
                    onChange={(e) => changeStatus(l.id, e.target.value)}
                    aria-label="Status"
                    className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700"
                  >
                    {STATUSES.map((s) => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                  <button onClick={() => remove(l)} aria-label="Delete message" className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600">
                    <FaTrash size={12} />
                  </button>
                </div>
              </div>

              {l.emailed === false && (
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800">
                  <FaTriangleExclamation size={11} /> The email notification for this message could not be sent — please reply from here.
                </div>
              )}

              <dl className="mt-4 grid gap-x-6 gap-y-2 border-t border-slate-100 pt-4 text-sm sm:grid-cols-[160px_minmax(0,1fr)]">
                {(l.details || []).filter((d) => (Array.isArray(d.value) ? d.value.length : d.value)).map((d) => (
                  <div key={d.label} className="contents">
                    <dt className="text-xs font-bold uppercase tracking-wider text-slate-400 sm:pt-0.5">{d.label}</dt>
                    <dd className="whitespace-pre-line break-words text-slate-700">{detailText(d)}</dd>
                  </div>
                ))}
              </dl>
            </article>
          )
        })}
      </div>
    </div>
  )
}
