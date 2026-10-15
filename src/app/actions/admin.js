"use server"

import { redirect } from "next/navigation"
import { revalidatePath, revalidateTag } from "next/cache"
import {
  login,
  clearSession,
  getSession,
  createResetToken,
  resetPassword,
  getBaseUrl,
  listUsers,
  addUser,
  renewInvite,
  removeUser,
  MIN_PASSWORD_LENGTH,
  STORAGE_ERROR,
} from "@/app/lib/server/auth"
import { saveContent, CONTENT_TAG } from "@/app/lib/server/content"
import { listLeads, setLeadStatus, deleteLead } from "@/app/lib/server/leads"
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
  "If that email belongs to an admin login, a password reset link has been sent. Please check your inbox (and spam folder)."

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

  let result
  try {
    result = await resetPassword(token, password)
  } catch (err) {
    return { error: err.message || "Could not save the new password. Please try again." }
  }
  if (!result.ok) return { error: result.error }
  redirect("/admin?passwordChanged=1")
}

// ── Users ─────────────────────────────────────

// Emails a new person their set-up link. If email can't be sent, the owner
// gets the link to pass on themselves.
const escapeHtml = (v) => String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c])

async function sendInvite(user, token, invitedBy) {
  const link = `${await getBaseUrl()}/admin/reset-password?token=${encodeURIComponent(token)}`
  if (!isMailConfigured()) return { emailed: false, link }
  const hello = user.name ? `Hi ${user.name},` : "Hello,"
  const h = { hello: escapeHtml(hello), by: escapeHtml(invitedBy), email: escapeHtml(user.email) }
  try {
    await sendMail({
      to: user.email,
      subject: "Your website admin login",
      text: `${hello}\n\n${invitedBy} added you to the website admin panel.\n\nOpen this link to choose your password (valid for 7 days):\n${link}\n\nAfter that, sign in at ${await getBaseUrl()}/admin with ${user.email}.`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;padding:24px;border:1px solid #d6e8f5;border-radius:12px">
          <h2 style="color:#0f2d4a;margin:0 0 12px">Your website admin login</h2>
          <p style="color:#4a6b85;font-size:14px;line-height:1.6">${h.hello} ${h.by} added you to the website admin panel. Click the button below to choose your password. This link is valid for <strong>7 days</strong>.</p>
          <p style="margin:24px 0"><a href="${link}" style="background:#c9a84c;color:#0f2d4a;padding:12px 22px;border-radius:8px;text-decoration:none;font-weight:700">Choose my password</a></p>
          <p style="color:#7a9bb5;font-size:12px;line-height:1.6">Then sign in with <strong>${h.email}</strong>.<br>If the button doesn't work, copy this link into your browser:<br><a href="${link}" style="color:#2d8fdd;word-break:break-all">${link}</a></p>
        </div>`,
    })
    return { emailed: true }
  } catch (err) {
    console.error("[admin] Failed to send invite email:", err)
    return { emailed: false, link }
  }
}

export async function listUsersAction() {
  try {
    await requireAdmin()
    return { ok: true, users: await listUsers() }
  } catch (err) {
    return { ok: false, error: err.message || "Could not load users." }
  }
}

export async function addUserAction(name, email) {
  try {
    const session = await requireAdmin()
    const result = await addUser(session, { name, email })
    if (!result.ok) return result
    const sent = await sendInvite(result.user, result.token, session.name || session.email)
    return { ok: true, users: await listUsers(), ...sent }
  } catch (err) {
    return { ok: false, error: err.message || "Could not add this person." }
  }
}

export async function resendInviteAction(id) {
  try {
    const session = await requireAdmin()
    const result = await renewInvite(session, String(id))
    if (!result.ok) return result
    const sent = await sendInvite(result.user, result.token, session.name || session.email)
    return { ok: true, users: await listUsers(), ...sent }
  } catch (err) {
    return { ok: false, error: err.message || "Could not send the link." }
  }
}

export async function removeUserAction(id) {
  try {
    const session = await requireAdmin()
    const result = await removeUser(session, String(id))
    if (!result.ok) return result
    return { ok: true, users: await listUsers() }
  } catch (err) {
    return { ok: false, error: err.message || "Could not remove this person." }
  }
}

// ── Content ───────────────────────────────────

async function requireAdmin() {
  const session = await getSession()
  if (!session) throw new Error("Your session has expired. Please sign in again.")
  return session
}

export async function saveContentAction(content, contentVersion) {
  try {
    const session = await requireAdmin()
    if (!content || typeof content !== "object" || Array.isArray(content)) {
      return { ok: false, error: "Invalid content." }
    }
    const saved = await saveContent(content, session.email, Number(contentVersion) || 1)
    // Every public page reads this content — drop the cached copy right away, then refresh all pages.
    revalidateTag(CONTENT_TAG, { expire: 0 })
    revalidatePath("/", "layout")
    return { ok: true, content: saved, savedAt: new Date().toISOString() }
  } catch (err) {
    console.error("[admin] Save failed:", err)
    if (["EROFS", "EACCES", "EPERM"].includes(err?.code)) return { ok: false, error: STORAGE_ERROR }
    return { ok: false, error: err.message || "Saving failed." }
  }
}


// ── Leads (form messages) ─────────────────────

export async function listLeadsAction() {
  try {
    await requireAdmin()
    return { ok: true, leads: await listLeads() }
  } catch (err) {
    console.error("[admin] Could not load leads:", err)
    return { ok: false, error: err.message || "Could not load messages." }
  }
}

export async function setLeadStatusAction(id, status) {
  try {
    await requireAdmin()
    return { ok: await setLeadStatus(String(id), String(status)) }
  } catch (err) {
    return { ok: false, error: err.message || "Could not update the message." }
  }
}

export async function deleteLeadAction(id) {
  try {
    await requireAdmin()
    return { ok: await deleteLead(String(id)) }
  } catch (err) {
    return { ok: false, error: err.message || "Could not delete the message." }
  }
}
