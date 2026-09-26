"use client"

import { useCallback, useEffect, useMemo, useRef, useState, useActionState } from "react"
import {
  FaGauge, FaBuilding, FaTableColumns, FaHouse, FaTruck, FaList, FaBriefcase, FaCircleInfo,
  FaEnvelope, FaFileLines, FaTriangleExclamation, FaUserShield, FaArrowUpRightFromSquare,
  FaMagnifyingGlass, FaFloppyDisk, FaRotateLeft, FaCircleCheck, FaBars, FaXmark, FaKey,
  FaRightFromBracket, FaWandMagicSparkles, FaClockRotateLeft,
} from "react-icons/fa6"
import { ADMIN_PAGES } from "../schema"
import { DEFAULT_CONTENT } from "@/app/lib/content/defaults"
import { PLACEHOLDERS } from "@/app/lib/content/resolve"
import { saveContentAction, logoutAction, requestPasswordResetAction } from "@/app/actions/admin"
import { EditorContext, Fields } from "./fields"
import { buildSearchIndex, formatDate, setAt, toPath, validateContent, getAt } from "./utils"

const PAGE_ICONS = {
  building: FaBuilding,
  layout: FaTableColumns,
  home: FaHouse,
  truck: FaTruck,
  list: FaList,
  briefcase: FaBriefcase,
  info: FaCircleInfo,
  mail: FaEnvelope,
  file: FaFileLines,
  alert: FaTriangleExclamation,
}

export default function AdminApp({ initialContent, adminEmail, lastSaved, notice }) {
  const [content, setContent] = useState(initialContent)
  const [savedJson, setSavedJson] = useState(() => JSON.stringify(initialContent))
  const [savedMeta, setSavedMeta] = useState(lastSaved)
  const [pageId, setPageId] = useState("dashboard")
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(notice ? { type: "success", text: notice } : null)
  const [errors, setErrors] = useState([])
  const [focus, setFocus] = useState(null)
  const [navOpen, setNavOpen] = useState(false)
  const mainRef = useRef(null)

  const dirty = useMemo(() => JSON.stringify(content) !== savedJson, [content, savedJson])
  const page = ADMIN_PAGES.find((p) => p.id === pageId)

  // ── Editing ────────────────────────────────
  const update = useCallback((path, value) => {
    setContent((prev) => {
      let next = setAt(prev, path, value)
      // Renaming an equipment page address keeps services' "recommended equipment" linked.
      if (path.length === 3 && path[0] === "fleet" && path[2] === "id") {
        const oldId = getAt(prev, path)
        if (oldId && oldId !== value) {
          next = {
            ...next,
            services: next.services.map((s) => ({ ...s, fleet: (s.fleet || []).map((id) => (id === oldId ? value : id)) })),
          }
        }
      }
      return next
    })
  }, [])

  const upload = useCallback(async (file) => {
    const body = new FormData()
    body.append("file", file)
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || "Upload failed.")
      setToast({ type: "success", text: "Image uploaded — remember to save." })
      return data.url
    } catch (err) {
      setToast({ type: "error", text: err.message })
      return null
    }
  }, [])

  // ── Saving ─────────────────────────────────
  const save = useCallback(async () => {
    const problems = validateContent(content)
    setErrors(problems)
    if (problems.length) {
      setToast({ type: "error", text: "Please fix the highlighted problems before saving." })
      mainRef.current?.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
    setSaving(true)
    try {
      const res = await saveContentAction(content)
      if (!res.ok) throw new Error(res.error)
      setContent(res.content)
      setSavedJson(JSON.stringify(res.content))
      setSavedMeta(res.savedAt)
      setToast({ type: "success", text: "Saved! Your website is now updated." })
    } catch (err) {
      setToast({ type: "error", text: err.message || "Saving failed. Please try again." })
    } finally {
      setSaving(false)
    }
  }, [content])

  const discard = () => {
    if (!window.confirm("Discard all unsaved changes?")) return
    setContent(JSON.parse(savedJson))
    setErrors([])
  }

  const restorePage = () => {
    if (!page) return
    if (!window.confirm(`Restore “${page.label}” to the original website content? Nothing is changed on the live site until you click Save.`)) return
    setContent((prev) => {
      let next = prev
      for (const key of page.restoreKeys) next = { ...next, [key]: structuredClone(DEFAULT_CONTENT[key]) }
      return next
    })
    setToast({ type: "info", text: "Original content restored in the editor. Click Save to publish it." })
  }

  // Ctrl/Cmd + S saves; warn before leaving with unsaved work.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault()
        if (dirty && !saving) save()
      }
    }
    const onUnload = (e) => {
      if (dirty) {
        e.preventDefault()
        e.returnValue = ""
      }
    }
    window.addEventListener("keydown", onKey)
    window.addEventListener("beforeunload", onUnload)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("beforeunload", onUnload)
    }
  }, [dirty, saving, save])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), toast.type === "error" ? 7000 : 4000)
    return () => clearTimeout(t)
  }, [toast])

  // ── Navigation ─────────────────────────────
  const goTo = (id, target) => {
    setPageId(id)
    setNavOpen(false)
    setFocus(target?.focus || null)
    requestAnimationFrame(() => {
      if (target?.sectionIdx !== undefined) {
        const el = document.getElementById(`sec-${id}-${target.sectionIdx}`)
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" })
          el.classList.add("ring-2", "ring-[#c9a84c]")
          setTimeout(() => el.classList.remove("ring-2", "ring-[#c9a84c]"), 1600)
          return
        }
      }
      mainRef.current?.scrollTo({ top: 0 })
    })
  }

  const ctx = useMemo(() => ({ content, update, upload, focus }), [content, update, upload, focus])

  return (
    <EditorContext.Provider value={ctx}>
      <div className="flex h-dvh overflow-hidden bg-slate-100 font-sans text-slate-900 antialiased">
        {/* ── Sidebar ── */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-[#0f2d4a] text-slate-300 transition-transform lg:static lg:translate-x-0 ${
            navOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div className="leading-none">
              <div className="text-lg font-black tracking-tight text-white" style={{ fontFamily: "Georgia, serif" }}>
                {content.site.logoTop}
              </div>
              <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#c9a84c]">Admin Panel</div>
            </div>
            <button className="rounded-md p-2 hover:bg-white/10 lg:hidden" onClick={() => setNavOpen(false)} aria-label="Close menu">
              <FaXmark />
            </button>
          </div>

          <SearchBox content={content} onPick={(hit) => goTo(hit.pageId, hit)} />

          <nav className="flex-1 overflow-y-auto px-3 pb-4">
            <NavItem icon={FaGauge} label="Dashboard" active={pageId === "dashboard"} onClick={() => goTo("dashboard")} />
            <div className="mb-1 mt-4 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Website content</div>
            {ADMIN_PAGES.map((p) => (
              <NavItem key={p.id} icon={PAGE_ICONS[p.icon]} label={p.label} active={pageId === p.id} onClick={() => goTo(p.id)} />
            ))}
            <div className="mb-1 mt-4 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Settings</div>
            <NavItem icon={FaUserShield} label="Account & Password" active={pageId === "account"} onClick={() => goTo("account")} />
          </nav>

          <div className="border-t border-white/10 p-3">
            <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-white/5 hover:text-white">
              <FaArrowUpRightFromSquare size={12} /> View website
            </a>
            <form action={logoutAction}>
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-white/5 hover:text-white">
                <FaRightFromBracket size={12} /> Sign out
              </button>
            </form>
          </div>
        </aside>
        {navOpen && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setNavOpen(false)} />}

        {/* ── Main ── */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
            <button className="rounded-md p-2 text-slate-600 hover:bg-slate-100 lg:hidden" onClick={() => setNavOpen(true)} aria-label="Open menu">
              <FaBars />
            </button>
            <div className="min-w-0 flex-1">
              <div className="truncate text-base font-bold text-slate-900">
                {page?.label || (pageId === "account" ? "Account & Password" : "Dashboard")}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                {dirty ? (
                  <>
                    <span className="h-2 w-2 rounded-full bg-amber-500" /> Unsaved changes
                  </>
                ) : (
                  <>
                    <FaCircleCheck className="text-emerald-500" size={11} /> All changes saved
                    {savedMeta && <span className="hidden sm:inline"> · last saved {formatDate(savedMeta)}</span>}
                  </>
                )}
              </div>
            </div>
            {page && (
              <a
                href={page.preview}
                target="_blank"
                rel="noreferrer"
                className="hidden items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-slate-400 sm:inline-flex"
              >
                <FaArrowUpRightFromSquare size={11} /> View page
              </a>
            )}
            <button
              onClick={discard}
              disabled={!dirty || saving}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40"
            >
              <FaRotateLeft size={11} /> <span className="hidden sm:inline">Discard</span>
            </button>
            <button
              onClick={save}
              disabled={!dirty || saving}
              className="inline-flex items-center gap-2 rounded-lg bg-[#c9a84c] px-4 py-2 text-sm font-bold text-[#0f2d4a] shadow-sm transition hover:brightness-105 disabled:opacity-50"
            >
              <FaFloppyDisk size={13} /> {saving ? "Saving…" : "Save"}
            </button>
          </header>

          <main ref={mainRef} className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
              {errors.length > 0 && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  <div className="mb-1 font-bold">Please fix before saving:</div>
                  <ul className="list-disc space-y-0.5 pl-5">
                    {errors.map((e, i) => (
                      <li key={i}>{e}</li>
                    ))}
                  </ul>
                </div>
              )}

              {pageId === "dashboard" && <Dashboard content={content} savedMeta={savedMeta} onOpen={goTo} />}
              {pageId === "account" && <Account adminEmail={adminEmail} />}
              {page && (
                <>
                  <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <p className="max-w-2xl text-sm leading-relaxed text-slate-600">{page.description}</p>
                    <button
                      onClick={restorePage}
                      className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-white hover:text-slate-800"
                    >
                      <FaClockRotateLeft size={11} /> Restore original
                    </button>
                  </div>
                  {page.id === "business" && <PlaceholderHelp />}
                  <div className="space-y-6">
                    {page.sections.map((section, i) => (
                      <section
                        key={`${page.id}-${i}`}
                        id={`sec-${page.id}-${i}`}
                        className="scroll-mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition sm:p-6"
                      >
                        <h2 className="text-base font-bold text-slate-900">{section.title}</h2>
                        {section.description && <p className="mt-1 text-sm text-slate-500">{section.description}</p>}
                        <div className="mt-5">
                          <Fields fields={section.fields} basePath={toPath(section.path)} />
                        </div>
                      </section>
                    ))}
                  </div>
                  <div className="h-16" />
                </>
              )}
            </div>
          </main>
        </div>

        {toast && <Toast toast={toast} onClose={() => setToast(null)} />}
      </div>
    </EditorContext.Provider>
  )
}

// ── Pieces ────────────────────────────────────

function NavItem({ icon: Icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`mb-0.5 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${
        active ? "bg-white/10 font-semibold text-white" : "hover:bg-white/5 hover:text-white"
      }`}
    >
      <Icon size={13} className={active ? "text-[#c9a84c]" : "text-slate-500"} />
      {label}
    </button>
  )
}

function SearchBox({ content, onPick }) {
  const [q, setQ] = useState("")
  const index = useMemo(() => buildSearchIndex(ADMIN_PAGES, content), [content])
  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (term.length < 2) return []
    return index
      .filter((e) => e.text.toLowerCase().includes(term) || e.label.toLowerCase().includes(term))
      .slice(0, 30)
  }, [q, index])

  return (
    <div className="relative px-3 py-3">
      <div className="relative">
        <FaMagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={11} />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Find any text on the site…"
          className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-8 pr-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[#c9a84c]/60"
        />
      </div>
      {q.trim().length >= 2 && (
        <div className="absolute left-3 right-3 z-50 mt-2 max-h-96 overflow-y-auto rounded-xl border border-slate-200 bg-white p-1 text-slate-800 shadow-2xl">
          {results.length === 0 && <div className="p-3 text-xs text-slate-500">No matches.</div>}
          {results.map((r, i) => (
            <button
              key={i}
              onClick={() => {
                onPick(r)
                setQ("")
              }}
              className="block w-full rounded-lg px-3 py-2 text-left hover:bg-slate-100"
            >
              <div className="text-[10px] font-semibold uppercase tracking-wide text-[#b08d2e]">
                {r.pageLabel} › {r.sectionTitle}
              </div>
              <div className="truncate text-xs font-semibold text-slate-800">{r.label}</div>
              {r.text && <div className="truncate text-xs text-slate-500">{r.text}</div>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Toast({ toast, onClose }) {
  const styles = {
    success: "border-emerald-200 bg-emerald-50 text-emerald-800",
    error: "border-red-200 bg-red-50 text-red-800",
    info: "border-sky-200 bg-sky-50 text-sky-800",
  }
  return (
    <div role="status" className={`fixed bottom-5 right-5 z-50 flex max-w-sm items-start gap-3 rounded-xl border px-4 py-3 text-sm font-medium shadow-lg ${styles[toast.type]}`}>
      <span className="flex-1">{toast.text}</span>
      <button onClick={onClose} className="opacity-60 hover:opacity-100" aria-label="Dismiss">
        <FaXmark />
      </button>
    </div>
  )
}

function PlaceholderHelp() {
  return (
    <details className="mb-6 rounded-2xl border border-[#c9a84c]/40 bg-[#c9a84c]/10 p-4 text-sm text-slate-700">
      <summary className="flex cursor-pointer items-center gap-2 font-semibold text-slate-800">
        <FaWandMagicSparkles className="text-[#b08d2e]" size={13} /> Smart placeholders — type these in any text box
      </summary>
      <p className="mt-2 text-slate-600">
        Placeholders are replaced with your current details, so when your phone number changes you only update it here.
      </p>
      <div className="mt-3 grid gap-x-6 gap-y-1 sm:grid-cols-2">
        {PLACEHOLDERS.map(([token, desc]) => (
          <div key={token} className="flex gap-2 text-xs">
            <code className="rounded bg-white px-1.5 py-0.5 font-mono text-[11px] text-[#0f2d4a]">{token}</code>
            <span className="text-slate-600">{desc}</span>
          </div>
        ))}
      </div>
    </details>
  )
}

function Dashboard({ content, savedMeta, onOpen }) {
  const counts = {
    equipment: content.fleet.length,
    services: content.services.length,
  }
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-[#0f2d4a] p-6 text-white shadow-sm sm:p-8">
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#c9a84c]">Welcome</div>
        <h1 className="mt-2 text-2xl font-black sm:text-3xl" style={{ fontFamily: "Georgia, serif" }}>
          Manage your website
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-300">
          Every heading, paragraph, button, list and image on {content.site.name}&apos;s website can be edited here.
          Pick a page on the left, make your changes, then click <strong className="text-[#c9a84c]">Save</strong> — the
          live website updates immediately. The design and layout stay exactly the same.
        </p>
        <div className="mt-5 flex flex-wrap gap-6 text-sm">
          <Stat value={counts.equipment} label="Equipment types" />
          <Stat value={counts.services} label="Services" />
          <Stat value={savedMeta ? formatDate(savedMeta) : "Never"} label="Last saved" />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {ADMIN_PAGES.map((p) => {
          const Icon = PAGE_ICONS[p.icon]
          return (
            <button
              key={p.id}
              onClick={() => onOpen(p.id)}
              className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#c9a84c]/60 hover:shadow-md"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0f2d4a] text-[#c9a84c]">
                <Icon size={15} />
              </span>
              <span>
                <span className="block text-sm font-bold text-slate-900">{p.label}</span>
                <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">{p.description}</span>
              </span>
            </button>
          )
        })}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-sm">
        <div className="mb-2 font-bold text-slate-900">Tips</div>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Can&apos;t find where a text lives? Type part of it into the search box at the top-left.</li>
          <li>Lists (reviews, team members, equipment, stats…) can be added to, reordered with the arrows, duplicated or deleted.</li>
          <li>
            Upload images straight from your computer (PNG, JPG, WEBP — up to 8&nbsp;MB). Photos are cropped to fit their space
            automatically.
          </li>
          <li>Press <kbd className="rounded border border-slate-300 bg-slate-50 px-1 text-xs">Ctrl</kbd> + <kbd className="rounded border border-slate-300 bg-slate-50 px-1 text-xs">S</kbd> to save quickly.</li>
          <li>Made a mistake? “Discard” undoes everything since your last save, and “Restore original” resets a page to the original website text.</li>
        </ul>
      </div>
    </div>
  )
}

function Stat({ value, label }) {
  return (
    <div>
      <div className="text-lg font-black text-[#c9a84c]">{value}</div>
      <div className="text-[11px] uppercase tracking-widest text-slate-400">{label}</div>
    </div>
  )
}

function Account({ adminEmail }) {
  const [state, formAction, pending] = useActionState(requestPasswordResetAction, null)
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-bold text-slate-900">Admin login</h2>
        <p className="mt-1 text-sm text-slate-500">You sign in with this email address.</p>
        <div className="mt-4 inline-flex items-center gap-3 rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-800">
          <FaEnvelope className="text-[#b08d2e]" /> {adminEmail}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#c9a84c]/15 text-[#b08d2e]">
            <FaKey />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-bold text-slate-900">Change password</h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              For your security, password changes are confirmed by email. We&apos;ll send a secure link to{" "}
              <strong>{adminEmail}</strong>. Open it within 30 minutes to choose your new password.
            </p>
            {state?.error && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>}
            {state?.sent ? (
              <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{state.message}</p>
            ) : (
              <form action={formAction} className="mt-4">
                <input type="hidden" name="email" value={adminEmail} />
                <button
                  disabled={pending}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#0f2d4a] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1e4d7b] disabled:opacity-60"
                >
                  <FaEnvelope size={12} /> {pending ? "Sending…" : "Email me a password change link"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-bold text-slate-900">Forgot your password?</h2>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">
          On the sign-in page, click <strong>“Forgot password?”</strong> and enter {adminEmail}. You&apos;ll receive the same
          secure link by email.
        </p>
      </section>
    </div>
  )
}
