import crypto from "crypto"
import { getSession, STORAGE_ERROR } from "@/app/lib/server/auth"
import { saveMedia } from "@/app/lib/server/storage"
import { IMAGE_TYPES, sniffImageType } from "@/app/lib/server/media-types"

const MAX_BYTES = 8 * 1024 * 1024

export async function POST(request) {
  // Only same-origin requests (blocks cross-site form posts).
  const origin = request.headers.get("origin")
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host")
  if (origin && host && new URL(origin).host !== host) {
    return Response.json({ error: "Bad origin." }, { status: 403 })
  }

  if (!(await getSession())) {
    return Response.json({ error: "Your session has expired. Please sign in again." }, { status: 401 })
  }

  let file
  try {
    file = (await request.formData()).get("file")
  } catch {
    return Response.json({ error: "Upload failed — the file may be too large." }, { status: 400 })
  }
  if (!file || typeof file === "string") {
    return Response.json({ error: "No file received." }, { status: 400 })
  }
  if (file.size > MAX_BYTES) {
    return Response.json({ error: "Image is too large. Please use an image under 8 MB." }, { status: 413 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const ext = sniffImageType(buffer)
  if (!ext) {
    return Response.json({ error: "Please upload a PNG, JPG, WEBP, GIF or AVIF image." }, { status: 415 })
  }

  const base =
    String(file.name || "image")
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "image"
  const name = `${base}-${Date.now().toString(36)}${crypto.randomBytes(3).toString("hex")}.${ext}`

  try {
    const url = await saveMedia(name, buffer, IMAGE_TYPES[ext])
    return Response.json({ url })
  } catch (err) {
    console.error("[admin] Upload failed:", err)
    const readOnly = ["EROFS", "EACCES", "EPERM"].includes(err?.code)
    return Response.json(
      { error: readOnly ? STORAGE_ERROR : "Could not save the image. Please try again." },
      { status: 500 }
    )
  }
}
