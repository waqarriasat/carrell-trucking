"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { FaLocationDot, FaChevronDown, FaLocationCrosshairs } from "react-icons/fa6"

// ─────────────────────────────────────────────
//  "Delivering to: Durant, OK" bar under the header.
//  The visitor's town comes from their location
//  (only after the browser asks and they allow it)
//  or from a ZIP code / town they type. It is kept
//  on their device and pre-fills the quote and
//  pickup forms (see readDelivery below).
// ─────────────────────────────────────────────

const STORE_KEY = "ardmore-delivery"
const ASKED_KEY = "ardmore-delivery-asked"
const STATES = { oklahoma: "OK", texas: "TX", arkansas: "AR", kansas: "KS", "new mexico": "NM", louisiana: "LA" }

const norm = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "")
const stateCode = (s) => {
  const v = String(s || "").trim()
  return /^[A-Za-z]{2}$/.test(v) ? v.toUpperCase() : STATES[v.toLowerCase()] || v
}

// Saved location for other parts of the site (forms). Safe if storage is blocked.
export function readDelivery() {
  try {
    const v = JSON.parse(window.localStorage.getItem(STORE_KEY) || "null")
    return v && v.city ? v : null
  } catch {
    return null
  }
}
function saveDelivery(v) {
  try {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(v))
  } catch {}
}
function markAsked() {
  try {
    window.localStorage.setItem(ASKED_KEY, "1")
  } catch {}
}
function wasAsked() {
  try {
    return window.localStorage.getItem(ASKED_KEY) === "1"
  } catch {
    return true
  }
}

export const deliveryLabel = (v) => (v ? [v.city, [v.state, v.zip].filter(Boolean).join(" ")].filter(Boolean).join(", ") : "")

export default function DeliveryBar({ bar, towns = [], areasLive = false }) {
  const [place, setPlace] = useState(null)
  const [open, setOpen] = useState(false)
  const [text, setText] = useState("")
  const [status, setStatus] = useState({ busy: false, message: "" })
  const panelRef = useRef(null)

  const town = place ? towns.find((t) => norm(t.name) === norm(place.city) && (!place.state || t.state === place.state)) : null

  function done(v) {
    const next = { city: v.city || "", state: stateCode(v.state), zip: v.zip || "" }
    saveDelivery(next)
    setPlace(next)
    setStatus({ busy: false, message: "" })
    setOpen(false)
  }

  function locate(quietOnFail = false) {
    if (!navigator.geolocation) return !quietOnFail && setStatus({ busy: false, message: bar.deniedText })
    markAsked()
    // The quiet check on arrival never locks the box: a visitor who ignores
    // the browser's location prompt can still type a ZIP or town.
    if (!quietOnFail) setStatus({ busy: true, message: bar.locatingText })
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await fetch(`/api/locate?lat=${coords.latitude}&lon=${coords.longitude}`)
          const data = await res.json()
          if (!res.ok || data.error || !data.city) throw new Error()
          done(data)
        } catch {
          setStatus({ busy: false, message: quietOnFail ? "" : bar.failedText })
        }
      },
      (err) => setStatus({ busy: false, message: quietOnFail ? "" : err.code === 1 ? bar.deniedText : bar.failedText }),
      { timeout: 12000, maximumAge: 600000 }
    )
  }

  async function submit(e) {
    e.preventDefault()
    const v = text.trim()
    if (!v) return
    if (/^\d{5}$/.test(v)) {
      setStatus({ busy: true, message: "" })
      try {
        const res = await fetch(`/api/locate?zip=${v}`)
        const data = await res.json()
        if (!res.ok || data.error) throw new Error()
        return done(data)
      } catch {
        return setStatus({ busy: false, message: bar.failedText })
      }
    }
    // "Durant" or "Durant, OK" — use as typed (matched to our towns when possible).
    const [city, st] = v.split(",").map((s) => s.trim())
    const match = towns.find((t) => norm(t.name) === norm(city) && (!st || t.state === stateCode(st)))
    done({ city: match ? match.name : city, state: match ? match.state : st || "", zip: "" })
  }

  // Show the saved town; on a first visit, ask for location if the admin chose "on arrival".
  useEffect(() => {
    const saved = readDelivery()
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read once from this device after load
    if (saved) setPlace(saved)
    else if (bar.askOnArrival === "yes" && !wasAsked()) locate(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Close the panel on Escape or a click outside it.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === "Escape" && setOpen(false)
    const onClick = (e) => panelRef.current && !panelRef.current.contains(e.target) && setOpen(false)
    document.addEventListener("keydown", onKey)
    document.addEventListener("mousedown", onClick)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("mousedown", onClick)
    }
  }, [open])

  return (
    <div className="delivery-bar border-b" style={{ background: "#eef3f8", borderColor: "#d6e8f5" }}>
      <div className="wrap flex flex-wrap items-center gap-x-4 gap-y-1 py-2 text-[13px]" style={{ minHeight: 40 }}>
        <div ref={panelRef} className="relative">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="inline-flex items-center gap-2 rounded px-1 py-1 font-semibold"
            style={{ color: "#0f2d4a" }}
          >
            <FaLocationDot style={{ color: "#c9a84c" }} aria-hidden="true" />
            <span style={{ color: "#4a6b85" }}>{bar.label}</span>
            <span className="underline decoration-dotted underline-offset-2">{place ? deliveryLabel(place) : bar.emptyText}</span>
            <FaChevronDown size={10} aria-hidden="true" style={{ color: "#86671e" }} />
          </button>

          {open && (
            <div
              className="absolute left-0 top-full z-40 mt-1 w-[min(320px,calc(100vw-32px))] rounded border bg-white p-4 shadow-lg"
              style={{ borderColor: "#d6e8f5" }}
            >
              <form onSubmit={submit}>
                <label htmlFor="delivery-input" className="block text-xs font-bold" style={{ color: "#0f2d4a" }}>{bar.inputLabel}</label>
                <div className="mt-1.5 flex gap-2">
                  <input
                    id="delivery-input"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={bar.inputPlaceholder}
                    autoComplete="postal-code"
                    maxLength={60}
                    className="min-w-0 flex-1 rounded border px-3 py-2 text-sm"
                    style={{ borderColor: "#d6e8f5", color: "#0f2d4a" }}
                    autoFocus
                  />
                  <button disabled={status.busy} className="rounded px-3 text-sm font-extrabold" style={{ background: "#c9a84c", color: "#0f2d4a" }}>
                    {bar.saveLabel}
                  </button>
                </div>
              </form>
              <button
                type="button"
                onClick={() => locate(false)}
                disabled={status.busy}
                className="mt-3 inline-flex items-center gap-2 text-xs font-extrabold"
                style={{ color: "#0f2d4a" }}
              >
                <FaLocationCrosshairs aria-hidden="true" style={{ color: "#c9a84c" }} /> {bar.useLocationLabel}
              </button>
              {status.message ? (
                <p className="mt-2 text-xs" style={{ color: "#4a6b85" }} role="status">{status.message}</p>
              ) : null}
            </div>
          )}
        </div>

        {town ? (
          <Link href={`/areas/${town.id}`} className="font-bold" style={{ color: "#86671e" }}>
            {bar.townLinkLabel.replace("{town}", town.name)}
          </Link>
        ) : place ? (
          // Town we don't have a page for (or Service Areas is off): the quote form fills in the saved town.
          <Link href="/quote" className="font-bold" style={{ color: "#86671e" }}>
            {(bar.notListedLabel || "").replace("{town}", place.city)}
          </Link>
        ) : areasLive ? (
          <Link href="/areas" className="font-bold" style={{ color: "#86671e" }}>{bar.areasLinkLabel}</Link>
        ) : null}
      </div>
    </div>
  )
}
