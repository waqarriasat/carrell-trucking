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
const blobAccess = () => (process.env.BLOB_ACCESS === "public" ? "public" : "private")
const dataDir = () => process.env.CMS_DATA_DIR || path.join(/*turbopackIgnore: true*/ process.cwd(), "data")
// Runtime-only paths — tell the bundler not to trace them.
const dataPath = (...parts) => path.join(/*turbopackIgnore: true*/ dataDir(), ...parts)

const SAFE_NAME = /^[a-z0-9][a-z0-9._-]{0,120}$/i

export function isSafeName(name) {
  return SAFE_NAME.test(name) && !name.includes("..")
}

async function streamToBuffer(stream) {
  const chunks = []
  for await (const chunk of stream) chunks.push(Buffer.from(chunk))
  return Buffer.concat(chunks)
}

// ── JSON documents ────────────────────────────

export async function readJSON(name) {
  if (!isSafeName(name)) throw new Error("Invalid document name")
  try {
    if (blobEnabled()) {
      const { get } = await import("@vercel/blob")
      const res = await get(`cms/${name}`, { access: blobAccess(), useCache: false })
      if (!res || !res.stream) return null
      return JSON.parse((await streamToBuffer(res.stream)).toString("utf8"))
    }
    const raw = await fs.readFile(dataPath(name), "utf8")
    return JSON.parse(raw)
  } catch (err) {
    if (err?.code === "ENOENT" || err?.name === "BlobNotFoundError") return null
    console.error(`[cms] Failed to read ${name}:`, err)
    return null
  }
}

export async function writeJSON(name, data) {
  if (!isSafeName(name)) throw new Error("Invalid document name")
  const body = JSON.stringify(data, null, 2)
  if (blobEnabled()) {
    const { put } = await import("@vercel/blob")
    await put(`cms/${name}`, body, {
      access: blobAccess(),
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
      cacheControlMaxAge: 60,
    })
    return
  }
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
    const { put } = await import("@vercel/blob")
    await put(`media/${name}`, buffer, {
      access: blobAccess(),
      addRandomSuffix: false,
      contentType,
    })
  } else {
    await fs.mkdir(dataPath("uploads"), { recursive: true })
    await fs.writeFile(dataPath("uploads", name), buffer)
  }
  return `/media/${name}`
}

export async function readMedia(name) {
  if (!isSafeName(name)) return null
  try {
    if (blobEnabled()) {
      const { get } = await import("@vercel/blob")
      const res = await get(`media/${name}`, { access: blobAccess() })
      if (!res || !res.stream) return null
      return { body: res.stream, contentType: res.blob.contentType }
    }
    const body = await fs.readFile(dataPath("uploads", name))
    return { body, contentType: null }
  } catch (err) {
    if (err?.code === "ENOENT" || err?.name === "BlobNotFoundError") return null
    console.error(`[cms] Failed to read media ${name}:`, err)
    return null
  }
}
