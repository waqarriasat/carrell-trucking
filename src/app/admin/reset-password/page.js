import Link from "next/link"
import { isResetTokenValid, MIN_PASSWORD_LENGTH } from "@/app/lib/server/auth"
import { getContent } from "@/app/lib/server/content"
import AuthShell from "../AuthShell"
import ResetForm from "./ResetForm"

export default async function ResetPasswordPage({ searchParams }) {
  const { token } = await searchParams
  const [{ site }, valid] = await Promise.all([getContent(), isResetTokenValid(token)])

  if (!valid) {
    return (
      <AuthShell brand={site.logoTop} title="Link expired" subtitle="This password link is invalid, has already been used, or has expired (links last 30 minutes).">
        <Link
          href="/admin/forgot-password"
          className="block w-full rounded-lg bg-[#c9a84c] px-4 py-2.5 text-center text-sm font-bold text-[#0f2d4a] hover:brightness-105"
        >
          Send a new link
        </Link>
      </AuthShell>
    )
  }

  return (
    <AuthShell brand={site.logoTop} title="Choose a new password" subtitle={`Use at least ${MIN_PASSWORD_LENGTH} characters. You'll be signed in right after.`}>
      <ResetForm token={token} minLength={MIN_PASSWORD_LENGTH} />
    </AuthShell>
  )
}
