"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { FaLocationCrosshairs } from "react-icons/fa6"
import { TRAP_FIELD, STARTED_FIELD } from "@/app/lib/lead-fields"

// ─────────────────────────────────────────────
//  Shared pieces of the Contact and Quote forms:
//  spam protection, per-field errors and the
//  reply-time / privacy note under the button.
// ─────────────────────────────────────────────

const RED = "#dc2626"

// Red border for a field with an error. The whole `border` is swapped (not just
// borderColor): React drops a removed longhand without restoring the shorthand's colour.
const errorBorder = (style) =>
  style?.border ? { ...style, border: String(style.border).replace(/#[0-9a-f]{3,8}\b|rgba?\([^)]*\)/i, RED) } : { ...style, borderColor: RED }

// Form state + submit handling shared by both forms.
export function useLeadForm(action) {
  const started = useRef(0)
  const [status, setStatus] = useState(null) // null | "loading" | "success" | "error"
  const [errorMsg, setErrorMsg] = useState("")
  const [fieldErrors, setFieldErrors] = useState({})

  useEffect(() => {
    started.current = Date.now()
  }, [])

  async function onSubmit(e) {
    e.preventDefault()
    const formEl = e.currentTarget
    setStatus("loading")
    setFieldErrors({})
    const formData = new FormData(formEl)
    formData.set(STARTED_FIELD, String(started.current))
    let result
    try {
      result = await action(formData)
    } catch {
      result = { success: false, error: "Something went wrong. Please try again or call us." }
    }
    if (result.success) {
      setStatus("success")
      formEl.reset()
      started.current = Date.now()
      formEl.closest("[data-lead-form]")?.scrollIntoView({ behavior: "smooth", block: "start" })
      return
    }
    setStatus("error")
    setErrorMsg(result.error)
    setFieldErrors(result.fieldErrors || {})
    const first = Object.keys(result.fieldErrors || {})[0]
    if (first) formEl.querySelector(`[name="${first}"]`)?.focus()
  }

  // Clear a field's error as soon as it is edited.
  function onInput(e) {
    const name = e.target?.name
    if (name && fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  // Props for an input: error border + accessible error message link.
  const fieldProps = (name, style) => ({
    name,
    "aria-invalid": fieldErrors[name] ? true : undefined,
    "aria-describedby": fieldErrors[name] ? `${name}-error` : undefined,
    style: fieldErrors[name] ? errorBorder(style) : style,
  })

  return { status, errorMsg, fieldErrors, onSubmit, onInput, fieldProps }
}

// Invisible to people (and screen readers); bots fill it in.
export function SpamTrap() {
  return (
    <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
      <label>
        Leave this field empty
        <input type="text" name={TRAP_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  )
}

export function FieldError({ name, errors }) {
  if (!errors[name]) return null
  return (
    <p id={`${name}-error`} role="alert" style={{ margin: "5px 0 0", fontSize: 12, fontWeight: 600, color: RED }}>
      {errors[name]}
    </p>
  )
}

// Reply time, call line and privacy note under the submit button.
export function FormNote({ form, site, color = "#4a6b85", linkColor = "#86671e" }) {
  return (
    <div style={{ marginTop: 12, textAlign: "center", fontSize: 12, lineHeight: 1.6, color }}>
      <p style={{ margin: 0 }}>
        {form.responseNote ? `${form.responseNote} ` : ""}
        {form.callText}{" "}
        <a href={site.phoneHref} style={{ color: linkColor, fontWeight: 700, textDecoration: "none" }}>{site.phone}</a>
      </p>
      {(form.privacyText || form.privacyLinkLabel) && (
        <p style={{ margin: "6px 0 0", fontSize: 11 }}>
          {form.privacyText}{" "}
          {form.privacyLinkLabel && (
            <Link href="/privacy" style={{ color: linkColor, fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 2 }}>
              {form.privacyLinkLabel}
            </Link>
          )}
        </p>
      )}
    </div>
  )
}

// "Use my location": asks the browser for the visitor's position (only when tapped)
// and turns it into an address via /api/locate. `onFound({ street, city, state, zip })`.
export function LocateButton({ site, onFound }) {
  const [state, setState] = useState("idle") // idle | busy | error
  const [message, setMessage] = useState("")

  function fail(text) {
    setState("error")
    setMessage(text)
  }

  function locate() {
    if (!navigator.geolocation) return fail(site.locateDenied)
    setState("busy")
    setMessage("")
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await fetch(`/api/locate?lat=${coords.latitude}&lon=${coords.longitude}`)
          const data = await res.json()
          if (!res.ok || data.error) return fail(data.error || site.locateFailed)
          onFound(data)
          setState("idle")
        } catch {
          fail(site.locateFailed)
        }
      },
      (err) => fail(err.code === 1 ? site.locateDenied : site.locateFailed),
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 300000 }
    )
  }

  return (
    <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
      <button
        type="button"
        onClick={locate}
        disabled={state === "busy"}
        style={{
          display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 4,
          border: "1.5px solid #c9a84c", background: "#fff", color: "#0f2d4a", fontSize: 11, fontWeight: 800,
          cursor: state === "busy" ? "wait" : "pointer", whiteSpace: "nowrap",
        }}
      >
        <FaLocationCrosshairs size={11} style={{ color: "#86671e" }} aria-hidden="true" />
        {state === "busy" ? site.locatingLabel : site.locateLabel}
      </button>
      {state === "error" && message ? (
        <span role="status" style={{ fontSize: 11, fontWeight: 600, color: "#86671e", textAlign: "right" }}>{message}</span>
      ) : null}
    </span>
  )
}

// Fill an uncontrolled form field and let the form know it changed (clears its error).
export function setFieldValue(form, name, value) {
  const el = form?.elements?.namedItem(name)
  if (!el || value == null) return
  el.value = value
  el.dispatchEvent(new Event("input", { bubbles: true }))
}
