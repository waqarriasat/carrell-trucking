"use client"

import { useActionState, useState } from "react"
import Link from "next/link"
import { FaEye, FaEyeSlash } from "react-icons/fa6"
import { loginAction } from "@/app/actions/admin"
import { authButton, authInput } from "../AuthShell"

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, null)
  const [show, setShow] = useState(false)

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>}
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-slate-700">
          Email
        </label>
        <input id="email" name="email" type="email" autoComplete="username" required defaultValue={state?.email} className={authInput} />
      </div>
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-semibold text-slate-700">
            Password
          </label>
          <Link href="/admin/forgot-password" className="text-xs font-semibold text-[#2d8fdd] hover:underline">
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={show ? "text" : "password"}
            autoComplete="current-password"
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
      <button disabled={pending} className={authButton}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  )
}
