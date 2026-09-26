"use client"

import { useActionState } from "react"
import { requestPasswordResetAction } from "@/app/actions/admin"
import { authButton, authInput } from "../AuthShell"

export default function ForgotForm() {
  const [state, formAction, pending] = useActionState(requestPasswordResetAction, null)

  if (state?.sent) {
    return <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm leading-relaxed text-emerald-800">{state.message}</p>
  }

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>}
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-slate-700">
          Email
        </label>
        <input id="email" name="email" type="email" autoComplete="username" required className={authInput} />
      </div>
      <button disabled={pending} className={authButton}>
        {pending ? "Sending…" : "Send reset link"}
      </button>
    </form>
  )
}
