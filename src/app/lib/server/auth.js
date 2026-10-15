import "server-only"
import crypto from "crypto"
import { cookies, headers } from "next/headers"
import { readJSON, writeJSON } from "./storage"

// ─────────────────────────────────────────────
//  Admin authentication
//
//  • Admin users are stored in auth.json (same
//    storage as the site content). Each person has
//    their own email and password. The first user
//    is the owner, who can add and remove people.
//  • Passwords are hashed with scrypt.
//  • Sessions are HMAC-signed cookies; changing a
//    password or removing a user signs that person
//    out everywhere.
//  • Password resets use a single-use emailed link
//    that expires after 30 minutes. New users get a
//    set-up link that lasts 7 days.
// ─────────────────────────────────────────────

const AUTH_FILE = "auth.json"
export const SESSION_COOKIE = "admin_session"
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000
const RESET_TTL_MS = 30 * 60 * 1000
const INVITE_TTL_MS = 7 * 24 * 60 * 60 * 1000

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

const newId = () => crypto.randomBytes(8).toString("hex")

// auth.json = { sessionSecret, users: [{ id, name, email, role, passwordHash, passwordChangedAt, reset, createdAt }] }.
// Older copies held a single account at the top level; they become the owner.
function fromSaved(saved) {
  if (Array.isArray(saved?.users) && saved.users.length && saved.sessionSecret) return { data: saved, changed: false }
  const owner = {
    id: newId(),
    name: "",
    email: normalizeEmail(saved?.email || process.env.ADMIN_EMAIL || DEFAULT_EMAIL),
    role: "owner",
    passwordHash: saved?.passwordHash || DEFAULT_PASSWORD_HASH,
    passwordChangedAt: saved?.passwordChangedAt || 0,
    reset: saved?.reset || null,
    createdAt: Date.now(),
  }
  return {
    data: { sessionSecret: saved?.sessionSecret || crypto.randomBytes(32).toString("base64url"), users: [owner] },
    changed: true,
  }
}

async function saveAuth(data) {
  try {
    await writeJSON(AUTH_FILE, data)
  } catch (err) {
    console.error("[admin] Cannot write auth data:", err)
    throw new Error(err?.code === "BLOB_WRITE_FAILED" ? err.message : STORAGE_ERROR)
  }
}

async function getAuth() {
  const { data, changed } = fromSaved(await readJSON(AUTH_FILE))
  if (changed) await saveAuth(data)
  return data
}

const findUser = (auth, email) => auth.users.find((u) => u.email === normalizeEmail(email))

const sessionSecret = (auth) => process.env.ADMIN_SESSION_SECRET || auth.sessionSecret

// ── Sessions ──────────────────────────────────

function sign(payload, secret) {
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url")
}

function createSessionToken(auth, user) {
  const payload = Buffer.from(
    JSON.stringify({ e: user.email, v: user.passwordChangedAt, x: Date.now() + SESSION_TTL_MS })
  ).toString("base64url")
  return `${payload}.${sign(payload, sessionSecret(auth))}`
}

async function readSession() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value
  if (!token || !token.includes(".")) return null
  const [payload, sig] = token.split(".")
  let auth
  try {
    auth = await getAuth()
  } catch {
    return null
  }
  const expected = Buffer.from(sign(payload, sessionSecret(auth)))
  const given = Buffer.from(sig || "")
  if (expected.length !== given.length || !crypto.timingSafeEqual(expected, given)) return null
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"))
    if (data.x < Date.now()) return null
    // A removed user, or one whose password changed, is signed out.
    const user = findUser(auth, data.e)
    if (!user?.passwordHash || data.v !== user.passwordChangedAt) return null
    return { id: user.id, email: user.email, name: user.name || "", role: user.role }
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

async function setSessionCookie(auth, user) {
  ;(await cookies()).set(SESSION_COOKIE, createSessionToken(auth, user), {
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

  let auth
  try {
    auth = await getAuth()
  } catch (err) {
    return { ok: false, error: err.message }
  }
  const user = findUser(auth, email)
  // Always check a hash, so an unknown email takes as long as a wrong password.
  const passwordOk = await verifyPassword(String(password || ""), user?.passwordHash || DEFAULT_PASSWORD_HASH)

  if (!user?.passwordHash || !passwordOk) {
    const count = (entry?.count || 0) + 1
    attempts.set(key, count >= MAX_ATTEMPTS ? { count: 0, lockedUntil: Date.now() + LOCK_MS } : { count, lockedUntil: 0 })
    return { ok: false, error: "Incorrect email or password." }
  }

  attempts.delete(key)
  await setSessionCookie(auth, user)
  return { ok: true }
}

// ── Password reset ────────────────────────────

const sha256 = (s) => crypto.createHash("sha256").update(s).digest("hex")

const RESET_COOLDOWN_MS = 60 * 1000

const newReset = (ttl) => {
  const token = crypto.randomBytes(32).toString("base64url")
  return { token, reset: { tokenHash: sha256(token), createdAt: Date.now(), expiresAt: Date.now() + ttl } }
}

const replaceUser = (auth, user) => ({ ...auth, users: auth.users.map((u) => (u.id === user.id ? user : u)) })

// Returns { token, email } to email out, { throttled: true } if a link was sent
// less than a minute ago, or null when the email is not an admin user's.
export async function createResetToken(email) {
  const auth = await getAuth()
  const user = findUser(auth, email)
  if (!user) return null
  if (user.reset?.createdAt > Date.now() - RESET_COOLDOWN_MS) return { throttled: true }
  // A new user who hasn't set a password yet keeps the longer set-up window.
  const { token, reset } = newReset(user.passwordHash ? RESET_TTL_MS : INVITE_TTL_MS)
  await saveAuth(replaceUser(auth, { ...user, reset }))
  return { token, email: user.email }
}

function userForToken(auth, token) {
  if (!token) return null
  const a = Buffer.from(sha256(String(token)))
  return (
    auth.users.find((u) => {
      const r = u.reset
      if (!r || r.expiresAt < Date.now()) return false
      const b = Buffer.from(r.tokenHash)
      return a.length === b.length && crypto.timingSafeEqual(a, b)
    }) || null
  )
}

export async function isResetTokenValid(token) {
  try {
    return Boolean(userForToken(await getAuth(), token))
  } catch {
    return false
  }
}

export async function resetPassword(token, newPassword) {
  const auth = await getAuth()
  const user = userForToken(auth, token)
  if (!user) return { ok: false, error: "This link is invalid or has expired. Please request a new one." }
  const updated = { ...user, passwordHash: await hashPassword(newPassword), passwordChangedAt: Date.now(), reset: null }
  const next = replaceUser(auth, updated)
  await saveAuth(next)
  // Changing passwordChangedAt signs this person out everywhere; sign this browser in fresh.
  await setSessionCookie(next, updated)
  return { ok: true }
}

// ── Users (managed by the owner) ──────────────

const publicUser = (u) => ({
  id: u.id,
  name: u.name || "",
  email: u.email,
  role: u.role,
  pending: !u.passwordHash,
  createdAt: u.createdAt || 0,
})

export async function listUsers() {
  return (await getAuth()).users.map(publicUser)
}

// Adds a user without a password; returns a set-up token to email to them.
export async function addUser(session, { name, email }) {
  if (session?.role !== "owner") return { ok: false, error: "Only the owner can add people." }
  const clean = normalizeEmail(email)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean) || clean.length > 200) return { ok: false, error: "Please enter a valid email address." }
  const auth = await getAuth()
  if (findUser(auth, clean)) return { ok: false, error: "This email already has a login." }
  const { token, reset } = newReset(INVITE_TTL_MS)
  const user = {
    id: newId(),
    name: String(name || "").trim().slice(0, 80),
    email: clean,
    role: "admin",
    passwordHash: null,
    passwordChangedAt: 0,
    reset,
    createdAt: Date.now(),
  }
  await saveAuth({ ...auth, users: [...auth.users, user] })
  return { ok: true, token, user: publicUser(user) }
}

// New set-up link for someone who hasn't set their password yet.
export async function renewInvite(session, id) {
  if (session?.role !== "owner") return { ok: false, error: "Only the owner can do this." }
  const auth = await getAuth()
  const user = auth.users.find((u) => u.id === id)
  if (!user) return { ok: false, error: "User not found." }
  if (user.passwordHash) return { ok: false, error: "This person has already set a password." }
  const { token, reset } = newReset(INVITE_TTL_MS)
  await saveAuth(replaceUser(auth, { ...user, reset }))
  return { ok: true, token, user: publicUser(user) }
}

export async function removeUser(session, id) {
  if (session?.role !== "owner") return { ok: false, error: "Only the owner can remove people." }
  if (session.id === id) return { ok: false, error: "You can't remove your own login." }
  const auth = await getAuth()
  const user = auth.users.find((u) => u.id === id)
  if (!user) return { ok: false, error: "User not found." }
  if (user.role === "owner") return { ok: false, error: "The owner's login can't be removed." }
  await saveAuth({ ...auth, users: auth.users.filter((u) => u.id !== id) })
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
