import "server-only"
import { cache } from "react"
import { readJSON, writeJSON } from "./storage"
import { DEFAULT_CONTENT } from "@/app/lib/content/defaults"
import { mergeWithDefaults, resolveContent } from "@/app/lib/content/resolve"
import { upgradeContent, CONTENT_VERSION } from "@/app/lib/content/upgrade"

const CONTENT_FILE = "content.json"

// Raw content (placeholders untouched) — what the admin editor works with.
export const getRawContent = cache(async () => {
  const saved = await readJSON(CONTENT_FILE)
  // Bring copies saved before a defaults update up to date (keeps admin edits).
  const content = upgradeContent(saved?.content ?? null, saved?.version ?? 1)
  return mergeWithDefaults(content, DEFAULT_CONTENT)
})

// Resolved content (placeholders filled) — what the public site renders.
export const getContent = cache(async () => resolveContent(await getRawContent()))

export async function getContentMeta() {
  const saved = await readJSON(CONTENT_FILE)
  return { updatedAt: saved?.updatedAt ?? null, updatedBy: saved?.updatedBy ?? null }
}

// `loadedVersion` is the content version the editor loaded; an editor opened on an
// older build sends old text, so upgrade it before it is stamped as current.
export async function saveContent(content, updatedBy, loadedVersion = 1) {
  const clean = mergeWithDefaults(upgradeContent(content, loadedVersion), DEFAULT_CONTENT)
  await writeJSON(CONTENT_FILE, {
    version: CONTENT_VERSION,
    updatedAt: new Date().toISOString(),
    updatedBy,
    content: clean,
  })
  return clean
}
