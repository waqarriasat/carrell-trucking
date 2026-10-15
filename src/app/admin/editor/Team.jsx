"use client"

import { useState } from "react"
import { FaUserPlus, FaTrash, FaEnvelope, FaCrown, FaCopy, FaUsers } from "react-icons/fa6"
import { addUserAction, resendInviteAction, removeUserAction } from "@/app/actions/admin"
import { formatDate } from "./utils"

// ─────────────────────────────────────────────
//  Admin → Account & Users → People with access.
//  Everyone sees the list; only the owner can add
//  or remove people. New people get an email link
//  to choose their own password.
// ─────────────────────────────────────────────

export default function Team({ me, initialUsers = [] }) {
  const [users, setUsers] = useState(initialUsers)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [busy, setBusy] = useState(null)
  const [message, setMessage] = useState(null)
  const isOwner = me?.role === "owner"

  // Shows the result of add / resend / remove (and the link to copy when email isn't set up).
  function report(result, done) {
    if (!result.ok) return setMessage({ type: "error", text: result.error })
    if (result.users) setUsers(result.users)
    if (result.link) setMessage({ type: "link", text: `${done} Email isn't set up on this server, so send this set-up link yourself:`, link: result.link })
    else setMessage({ type: "ok", text: done + (result.emailed ? " A set-up link was emailed to them." : "") })
  }

  async function add(e) {
    e.preventDefault()
    setBusy("add")
    setMessage(null)
    const result = await addUserAction(name, email)
    setBusy(null)
    report(result, "Added.")
    if (result.ok) {
      setName("")
      setEmail("")
    }
  }

  async function resend(user) {
    setBusy(user.id)
    setMessage(null)
    report(await resendInviteAction(user.id), `New link for ${user.email}.`)
    setBusy(null)
  }

  async function remove(user) {
    if (!window.confirm(`Remove ${user.name || user.email}? They will be signed out and can no longer use the admin panel.`)) return
    setBusy(user.id)
    setMessage(null)
    report(await removeUserAction(user.id), `${user.name || user.email} was removed.`)
    setBusy(null)
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#c9a84c]/15 text-[#b08d2e]">
          <FaUsers />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-bold text-slate-900">People with access</h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            Everyone has their own login and password.{" "}
            {isOwner ? "Add someone and they'll get an email link to choose their password." : "Only the owner can add or remove people."}
          </p>
        </div>
      </div>

      <ul className="mt-5 divide-y divide-slate-100 rounded-xl border border-slate-200">
        {users.map((u) => (
          <li key={u.id} className="flex flex-wrap items-center gap-3 px-4 py-3">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-900">
                {u.name || u.email}
                {u.role === "owner" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#c9a84c]/15 px-2 py-0.5 text-[11px] font-bold text-[#8a6d1f]">
                    <FaCrown size={9} /> Owner
                  </span>
                )}
                {u.id === me?.id && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-600">You</span>}
                {u.pending && <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-700">Waiting for password</span>}
              </div>
              <div className="truncate text-xs text-slate-500">
                {u.name ? u.email : null}
                {u.createdAt ? `${u.name ? " · " : ""}added ${formatDate(u.createdAt)}` : null}
              </div>
            </div>
            {isOwner && u.role !== "owner" && (
              <div className="flex gap-2">
                {u.pending && (
                  <button
                    onClick={() => resend(u)}
                    disabled={busy === u.id}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-slate-400 disabled:opacity-50"
                  >
                    <FaEnvelope size={11} /> Send link again
                  </button>
                )}
                <button
                  onClick={() => remove(u)}
                  disabled={busy === u.id}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50"
                >
                  <FaTrash size={10} /> Remove
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {message && (
        <div
          role="status"
          className={`mt-4 rounded-lg px-3 py-2 text-sm ${message.type === "error" ? "bg-red-50 text-red-700" : message.type === "link" ? "bg-amber-50 text-amber-900" : "bg-emerald-50 text-emerald-800"}`}
        >
          {message.text}
          {message.link && (
            <div className="mt-2 flex items-center gap-2">
              <input readOnly value={message.link} className="min-w-0 flex-1 rounded border border-amber-200 bg-white px-2 py-1 text-xs" onFocus={(e) => e.target.select()} />
              <button
                onClick={() => navigator.clipboard?.writeText(message.link)}
                className="inline-flex items-center gap-1 rounded border border-amber-300 px-2 py-1 text-xs font-semibold"
              >
                <FaCopy size={10} /> Copy
              </button>
            </div>
          )}
        </div>
      )}

      {isOwner && (
        <form onSubmit={add} className="mt-5 grid gap-3 sm:grid-cols-[1fr_1.4fr_auto] sm:items-end">
          <label className="text-xs font-semibold text-slate-700">
            Name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={80}
              placeholder="e.g. Royce"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-normal text-slate-900"
            />
          </label>
          <label className="text-xs font-semibold text-slate-700">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={200}
              placeholder="name@company.com"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-normal text-slate-900"
            />
          </label>
          <button
            disabled={busy === "add"}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0f2d4a] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1e4d7b] disabled:opacity-60"
          >
            <FaUserPlus size={13} /> {busy === "add" ? "Adding…" : "Add person"}
          </button>
        </form>
      )}
    </section>
  )
}
