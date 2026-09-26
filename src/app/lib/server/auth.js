import "server-only"
import crypto from "crypto"
import { cookies, headers } from "next/headers"
import { readJSON, writeJSON } from "./storage"

// ─────────────────────────────────────────────
//  Admin authentication
//
//  • One admin account, stored in auth.json
//    (same storage as the site content).
//  • Passwords are hashed with scrypt.
//  • Sessions are HMAC-signed cookies; changing
//    the password signs out every session.
//  • Password resets use a single-use emailed
//    link that expires after 30 minutes.
// ─────────────────────────────────────────────

const AUTH_FILE = "auth.json"
export const SESSION_COOKIE = "admin_session"
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000
const RESET_TTL_MS = 30 * 60 * 1000

const DEFAULT_EMAIL = "waqarriasat@gmail.com"
// scrypt hash of the initial password (the plain password is not stored anywhere).
const DEFAULT_PASSWORD_HASH =
  "scrypt$16384$8$1$9fYw/3KibXedog0cTCKTWA==$c1jYXKwrEzmTqRiLfvnJ0vJlXiMOG63Qt8fxrJRwWZ3AChK69lw7Nzk23JnilFyQkDy4Cws9TzJdz2PWxdEUmw=="

export const MIN_PASSWORD_LENGTH = 8

// ── Password hashing ──────────────────────────

function scrypt(password, salt, N, r, p) {
  return new Promise((resolve, reject) =>
    crypto.scrypt(password, salt, 64, { N, r, p, maxmem: 64 * 1024 * 1024 }, (err, key) =>
      err ? reject(err) : resolve(key)
    )
  )
}

export async function hashPassword(password) {
  const salt = crypto.randomBytes(16)
  const hash = await scrypt(password, salt, 16384, 8, 1)
  return `scrypt$16384$8$1$${salt.toString("base64")}$${hash.toString("base64")}`
}

async function verifyPassword(password, stored) {
  const [algo, N, r, p, salt, hash] = String(stored).split("$")
  if (algo !== "scrypt") return false
  const expected = Buffer.from(hash, "base64")
  const actual = await scrypt(password, Buffer.from(salt, "base64"), Number(N), Number(r), Number(p))
  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual)
}

// ── Account record ────────────────────────────

export const normalizeEmail = (email) => String(email || "").trim().toLowerCase()

export const STORAGE_ERROR =
  "The admin panel can't save data on this server. If the site is hosted on Vercel, connect a Vercel Blob store (BLOB_READ_WRITE_TOKEN) — see README."

async function getAccount() {
  const saved = await readJSON(AUTH_FILE)
  if (saved?.email && saved?.passwordHash && saved?.sessionSecret) return saved
  const account = {
    email: normalizeEmail(process.env.ADMIN_EMAIL || DEFAULT_EMAIL),
    passwordHash: DEFAULT_PASSWORD_HASH,
    passwordChangedAt: 0,
    sessionSecret: crypto.randomBytes(32).toString("base64url"),
    reset: null,
    ...(saved || {}),
  }
  try {
    await writeJSON(AUTH_FILE, account)
  } catch (err) {
    console.error("[admin] Cannot write auth data:", err)
    throw new Error(STORAGE_ERROR)
  }
  return account
}

const sessionSecret = (account) => process.env.ADMIN_SESSION_SECRET || account.sessionSecret

export async function getAdminEmail() {
  return (await getAccount()).email
}

// ── Sessions ──────────────────────────────────

function sign(payload, secret) {
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url")
}

function createSessionToken(account) {
  const payload = Buffer.from(
    JSON.stringify({ e: account.email, v: account.passwordChangedAt, x: Date.now() + SESSION_TTL_MS })
  ).toString("base64url")
  return `${payload}.${sign(payload, sessionSecret(account))}`
}

async function readSession() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value
  if (!token || !token.includes(".")) return null
  const [payload, sig] = token.split(".")
  let account
  try {
    account = await getAccount()
  } catch {
    return null
  }
  const expected = Buffer.from(sign(payload, sessionSecret(account)))
  const given = Buffer.from(sig || "")
  if (expected.length !== given.length || !crypto.timingSafeEqual(expected, given)) return null
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"))
    if (data.x < Date.now()) return null
    if (data.e !== account.email || data.v !== account.passwordChangedAt) return null
    return { email: account.email }
  } catch {
    return null
  }
}

export async function getSession() {
  return readSession()
}

// Mark the cookie Secure whenever the site is served over HTTPS.
async function isHttps() {
  const proto = (await headers()).get("x-forwarded-proto")
  if (proto) return proto.split(",")[0].trim() === "https"
  return (process.env.SITE_URL || "").startsWith("https://")
}

async function setSessionCookie(account) {
  ;(await cookies()).set(SESSION_COOKIE, createSessionToken(account), {
    httpOnly: true,
    sameSite: "lax",
    secure: await isHttps(),
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  })
}

export async function clearSession() {
  ;(await cookies()).delete(SESSION_COOKIE)
}

// ── Login (with simple brute-force protection) ─

const attempts = new Map() // key -> { count, lockedUntil }
const MAX_ATTEMPTS = 5
const LOCK_MS = 15 * 60 * 1000

async function clientKey() {
  const h = await headers()
  return (h.get("x-forwarded-for") || "").split(",")[0].trim() || h.get("x-real-ip") || "local"
}

export async function login(email, password) {
  const key = await clientKey()
  const entry = attempts.get(key)
  if (entry?.lockedUntil > Date.now()) {
    const mins = Math.ceil((entry.lockedUntil - Date.now()) / 60000)
    return { ok: false, error: `Too many failed attempts. Try again in ${mins} minute${mins === 1 ? "" : "s"}.` }
  }

  let account
  try {
    account = await getAccount()
  } catch (err) {
    return { ok: false, error: err.message }
  }
  const emailOk = normalizeEmail(email) === account.email
  const passwordOk = await verifyPassword(String(password || ""), account.passwordHash)

  if (!emailOk || !passwordOk) {
    const count = (entry?.count || 0) + 1
    attempts.set(key, count >= MAX_ATTEMPTS ? { count: 0, lockedUntil: Date.now() + LOCK_MS } : { count, lockedUntil: 0 })
    return { ok: false, error: "Incorrect email or password." }
  }

  attempts.delete(key)
  await setSessionCookie(account)
  return { ok: true }
}

// ── Password reset ────────────────────────────

const sha256 = (s) => crypto.createHash("sha256").update(s).digest("hex")

const RESET_COOLDOWN_MS = 60 * 1000

// Returns { token, email } to email out, { throttled: true } if a link was sent
// less than a minute ago, or null when the email is not the admin's.
export async function createResetToken(email) {
  const account = await getAccount()
  if (normalizeEmail(email) !== account.email) return null
  if (account.reset?.createdAt > Date.now() - RESET_COOLDOWN_MS) return { throttled: true }
  const token = crypto.randomBytes(32).toString("base64url")
  await writeJSON(AUTH_FILE, {
    ...account,
    reset: { tokenHash: sha256(token), createdAt: Date.now(), expiresAt: Date.now() + RESET_TTL_MS },
  })
  return { token, email: account.email }
}

export async function isResetTokenValid(token) {
  if (!token) return false
  const account = await getAccount()
  const r = account.reset
  if (!r || r.expiresAt < Date.now()) return false
  const a = Buffer.from(sha256(String(token)))
  const b = Buffer.from(r.tokenHash)
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

export async function resetPassword(token, newPassword) {
  if (!(await isResetTokenValid(token))) {
    return { ok: false, error: "This reset link is invalid or has expired. Please request a new one." }
  }
  const account = await getAccount()
  const updated = {
    ...account,
    passwordHash: await hashPassword(newPassword),
    passwordChangedAt: Date.now(),
    reset: null,
  }
  await writeJSON(AUTH_FILE, updated)
  // Changing passwordChangedAt invalidates every existing session; sign this browser in fresh.
  await setSessionCookie(updated)
  return { ok: true }
}

// Absolute base URL used in emailed links.
export async function getBaseUrl() {
  const fromEnv = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL
  if (fromEnv) return fromEnv.replace(/\/$/, "")
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  const h = await headers()
  const host = h.get("x-forwarded-host") || h.get("host") || "localhost:3000"
  const proto = h.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https")
  return `${proto}://${host}`
}
