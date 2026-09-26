"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import {
  login,
  clearSession,
  getSession,
  createResetToken,
  resetPassword,
  getBaseUrl,
  MIN_PASSWORD_LENGTH,
  STORAGE_ERROR,
} from "@/app/lib/server/auth"
import { saveContent } from "@/app/lib/server/content"
import { sendMail, isMailConfigured } from "@/app/lib/server/mailer"

// ── Auth ──────────────────────────────────────

export async function loginAction(prevState, formData) {
  const result = await login(formData.get("email"), formData.get("password"))
  if (!result.ok) return { error: result.error, email: String(formData.get("email") || "") }
  redirect("/admin")
}

export async function logoutAction() {
  await clearSession()
  redirect("/admin/login")
}

const GENERIC_SENT =
  "If that email belongs to the admin account, a password reset link has been sent. Please check your inbox (and spam folder)."

export async function requestPasswordResetAction(prevState, formData) {
  const email = String(formData.get("email") || "")
  if (!email.includes("@")) return { error: "Please enter a valid email address." }

  let reset
  try {
    reset = await createResetToken(email)
  } catch (err) {
    return { error: err.message }
  }
  // Unknown email, or a link was already sent in the last minute: same answer either way.
  if (!reset || reset.throttled) return { sent: true, message: GENERIC_SENT }

  const link = `${await getBaseUrl()}/admin/reset-password?token=${encodeURIComponent(reset.token)}`

  if (!isMailConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`\n[admin] Email is not configured. Password reset link:\n${link}\n`)
      return { sent: true, message: "Email is not configured in development — the reset link was printed in the server console." }
    }
    return {
      error: "The server cannot send email yet (EMAIL_USER / EMAIL_PASS are not set). Please contact your developer.",
    }
  }

  try {
    await sendMail({
      to: reset.email,
      subject: "Reset your website admin password",
      text: `A password change was requested for the website admin panel.\n\nOpen this link to choose a new password (valid for 30 minutes):\n${link}\n\nIf you didn't request this, you can ignore this email — your password stays the same.`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;padding:24px;border:1px solid #d6e8f5;border-radius:12px">
          <h2 style="color:#0f2d4a;margin:0 0 12px">Reset your admin password</h2>
          <p style="color:#4a6b85;font-size:14px;line-height:1.6">A password change was requested for the website admin panel. Click the button below to choose a new password. This link is valid for <strong>30 minutes</strong> and can be used once.</p>
          <p style="margin:24px 0"><a href="${link}" style="background:#c9a84c;color:#0f2d4a;padding:12px 22px;border-radius:8px;text-decoration:none;font-weight:700">Choose a new password</a></p>
          <p style="color:#7a9bb5;font-size:12px;line-height:1.6">If the button doesn't work, copy this link into your browser:<br><a href="${link}" style="color:#2d8fdd;word-break:break-all">${link}</a></p>
          <p style="color:#7a9bb5;font-size:12px">If you didn't request this, you can ignore this email — your password stays the same.</p>
        </div>`,
    })
  } catch (err) {
    console.error("[admin] Failed to send reset email:", err)
    return { error: "We couldn't send the email right now. Please try again in a few minutes." }
  }

  return { sent: true, message: GENERIC_SENT }
}

export async function resetPasswordAction(prevState, formData) {
  const token = String(formData.get("token") || "")
  const password = String(formData.get("password") || "")
  const confirm = String(formData.get("confirm") || "")

  if (password.length < MIN_PASSWORD_LENGTH) {
    return { error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.` }
  }
  if (password !== confirm) return { error: "The two passwords don't match." }

  const result = await resetPassword(token, password)
  if (!result.ok) return { error: result.error }
  redirect("/admin?passwordChanged=1")
}

// ── Content ───────────────────────────────────

async function requireAdmin() {
  const session = await getSession()
  if (!session) throw new Error("Your session has expired. Please sign in again.")
  return session
}

export async function saveContentAction(content) {
  try {
    const session = await requireAdmin()
    if (!content || typeof content !== "object" || Array.isArray(content)) {
      return { ok: false, error: "Invalid content." }
    }
    const saved = await saveContent(content, session.email)
    // Every public page reads this content — refresh all of them.
    revalidatePath("/", "layout")
    return { ok: true, content: saved, savedAt: new Date().toISOString() }
  } catch (err) {
    console.error("[admin] Save failed:", err)
    if (["EROFS", "EACCES", "EPERM"].includes(err?.code)) return { ok: false, error: STORAGE_ERROR }
    return { ok: false, error: err.message || "Saving failed." }
  }
}

