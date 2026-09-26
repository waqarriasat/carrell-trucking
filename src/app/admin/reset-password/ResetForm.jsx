"use client"

import { useActionState, useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa6"
import { resetPasswordAction } from "@/app/actions/admin"
import { authButton, authInput } from "../AuthShell"

export default function ResetForm({ token, minLength }) {
  const [state, formAction, pending] = useActionState(resetPasswordAction, null)
  const [show, setShow] = useState(false)

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>}
      <input type="hidden" name="token" value={token} />
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-slate-700">
          New password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={show ? "text" : "password"}
            autoComplete="new-password"
            minLength={minLength}
            required
            className={`${authInput} pr-10`}
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-slate-400 hover:text-slate-700"
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
          </button>
        </div>
      </div>
      <div>
        <label htmlFor="confirm" className="mb-1.5 block text-sm font-semibold text-slate-700">
          Confirm new password
        </label>
        <input
          id="confirm"
          name="confirm"
          type={show ? "text" : "password"}
          autoComplete="new-password"
          minLength={minLength}
          required
          className={authInput}
        />
      </div>
      <button disabled={pending} className={authButton}>
        {pending ? "Saving…" : "Save new password"}
      </button>
    </form>
  )
}
