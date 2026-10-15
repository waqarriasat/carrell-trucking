import "server-only"
import { promises as fs } from "fs"
import path from "path"

// ─────────────────────────────────────────────
//  Storage driver for admin-managed data.
//
//  • Default: local disk, in ./data (override with
//    CMS_DATA_DIR). Works on any Node host / VPS.
//  • Vercel Blob: used automatically when
//    BLOB_READ_WRITE_TOKEN is set (Vercel's disk is
//    read-only, so this is required there).
//
//  Uploaded images are always served through the
//  /media/<file> route, so the storage backend is
//  never exposed to visitors.
// ─────────────────────────────────────────────

const blobEnabled = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN)

// One Blob driver per server instance (it remembers the store's access mode).
let blobStorePromise = null
function blobStore() {
  blobStorePromise ??= Promise.all([import("@vercel/blob"), import("./blob-store")]).then(([sdk, { createBlobStore }]) =>
    createBlobStore(sdk, { preferredAccess: process.env.BLOB_ACCESS })
  )
  return blobStorePromise
}

export function storageInfo() {
  return { driver: blobEnabled() ? "vercel-blob" : "filesystem" }
}

export { blobStore as getBlobStore }

const dataDir = () => process.env.CMS_DATA_DIR || path.join(/*turbopackIgnore: true*/ process.cwd(), "data")
// Runtime-only paths — tell the bundler not to trace them.
const dataPath = (...parts) => path.join(/*turbopackIgnore: true*/ dataDir(), ...parts)

const SAFE_NAME = /^[a-z0-9][a-z0-9._-]{0,120}$/i

export function isSafeName(name) {
  return SAFE_NAME.test(name) && !name.includes("..")
}

// ── JSON documents ────────────────────────────

// Returns the document, or null if it has never been saved.
// Any other failure throws — callers must not mistake an outage for "empty".
export async function readJSON(name) {
  if (!isSafeName(name)) throw new Error("Invalid document name")
  if (blobEnabled()) return (await blobStore()).readJSON(name)
  try {
    return JSON.parse(await fs.readFile(dataPath(name), "utf8"))
  } catch (err) {
    if (err?.code === "ENOENT") return null
    throw err
  }
}

export async function writeJSON(name, data) {
  if (!isSafeName(name)) throw new Error("Invalid document name")
  if (blobEnabled()) return (await blobStore()).writeJSON(name, data)
  const body = JSON.stringify(data, null, 2)
  await fs.mkdir(dataPath(), { recursive: true })
  // Write to a temp file then rename, so a crash never leaves half a file.
  const target = dataPath(name)
  const tmp = `${target}.${process.pid}.${Date.now()}.tmp`
  await fs.writeFile(tmp, body, "utf8")
  await fs.rename(tmp, target)
}

// ── Uploaded media ────────────────────────────

export async function saveMedia(name, buffer, contentType) {
  if (!isSafeName(name)) throw new Error("Invalid file name")
  if (blobEnabled()) {
    await (await blobStore()).saveMedia(name, buffer, contentType)
  } else {
    await fs.mkdir(dataPath("uploads"), { recursive: true })
    await fs.writeFile(dataPath("uploads", name), buffer)
  }
  return `/media/${name}`
}

export async function readMedia(name) {
  if (!isSafeName(name)) return null
  try {
    if (blobEnabled()) return await (await blobStore()).readMedia(name)
    const body = await fs.readFile(dataPath("uploads", name))
    return { body, contentType: null }
  } catch (err) {
    if (err?.code === "ENOENT") return null
    console.error(`[cms] Failed to read media ${name}:`, err)
    return null
  }
}
