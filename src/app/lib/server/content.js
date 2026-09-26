import "server-only"
import { cache } from "react"
import { readJSON, writeJSON } from "./storage"
import { DEFAULT_CONTENT } from "@/app/lib/content/defaults"
import { mergeWithDefaults, resolveContent } from "@/app/lib/content/resolve"

const CONTENT_FILE = "content.json"

// Raw content (placeholders untouched) — what the admin editor works with.
export const getRawContent = cache(async () => {
  const saved = await readJSON(CONTENT_FILE)
  return mergeWithDefaults(saved?.content ?? null, DEFAULT_CONTENT)
})

// Resolved content (placeholders filled) — what the public site renders.
export const getContent = cache(async () => resolveContent(await getRawContent()))

export async function getContentMeta() {
  const saved = await readJSON(CONTENT_FILE)
  return { updatedAt: saved?.updatedAt ?? null, updatedBy: saved?.updatedBy ?? null }
}

export async function saveContent(content, updatedBy) {
  const clean = mergeWithDefaults(content, DEFAULT_CONTENT)
  await writeJSON(CONTENT_FILE, {
    updatedAt: new Date().toISOString(),
    updatedBy,
    content: clean,
  })
  return clean
}
