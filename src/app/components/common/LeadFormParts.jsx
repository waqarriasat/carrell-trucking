"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { TRAP_FIELD, STARTED_FIELD } from "@/app/lib/lead-fields"

// ─────────────────────────────────────────────
//  Shared pieces of the Contact and Quote forms:
//  spam protection, per-field errors and the
//  reply-time / privacy note under the button.
// ─────────────────────────────────────────────

const RED = "#dc2626"

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
    style: fieldErrors[name] ? { ...style, borderColor: RED } : style,
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
