import "server-only"
import { cache } from "react"
import { unstable_cache } from "next/cache"
import { readJSON, writeJSON } from "./storage"
import { DEFAULT_CONTENT } from "@/app/lib/content/defaults"
import { mergeWithDefaults, resolveContent } from "@/app/lib/content/resolve"
import { upgradeContent, CONTENT_VERSION } from "@/app/lib/content/upgrade"

const CONTENT_FILE = "content.json"

// Reads the saved document, retrying briefly if storage has a hiccup.
async function readSaved() {
  let lastErr
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      return await readJSON(CONTENT_FILE)
    } catch (err) {
      lastErr = err
      await new Promise((r) => setTimeout(r, 400 * 2 ** attempt))
    }
  }
  throw lastErr
}

// During `next build` every static page asks for the content. Read it once
// per build instead of once per page (dozens of parallel storage requests
// can fail the build). At runtime each request still reads fresh content.
const isBuild = process.env.NEXT_PHASE === "phase-production-build"
let buildSaved = null

// At runtime the saved document is kept in Next's shared data cache, so the
// many pages that re-render after a save read storage once, not once each
// (each storage read is a billed "list" operation on Vercel Blob). Saving in
// the admin clears it (CONTENT_TAG); a daily refresh is the safety net.
export const CONTENT_TAG = "cms-content"
const readSavedCached = unstable_cache(readSaved, ["cms-content-doc"], { tags: [CONTENT_TAG], revalidate: 86400 })

const loadSaved = () => {
  if (!isBuild) return readSavedCached()
  buildSaved ??= readSaved().catch((err) => {
    buildSaved = null
    throw err
  })
  return buildSaved
}

// Raw content (placeholders untouched) — what the admin editor works with.
export const getRawContent = cache(async () => {
  const saved = await loadSaved()
  // Bring copies saved before a defaults update up to date (keeps admin edits).
  const content = upgradeContent(saved?.content ?? null, saved?.version ?? 1)
  return mergeWithDefaults(content, DEFAULT_CONTENT)
})

// Resolved content (placeholders filled) — what the public site renders.
// Units and industries switched off in the admin ("Show on website") are left
// out of `fleet` / `services` (menus, cards, quote form, sitemap…); their pages
// open only by direct link, as drafts, from `draftFleet` / `draftServices`.
export const getContent = cache(async () => {
  const content = resolveContent(await getRawContent())
  const isLive = (x) => x.published !== "no"
  return {
    ...content,
    fleet: content.fleet.filter(isLive),
    draftFleet: content.fleet.filter((x) => !isLive(x)),
    services: content.services.filter(isLive),
    draftServices: content.services.filter((x) => !isLive(x)),
  }
})

export async function getContentMeta() {
  const saved = await loadSaved()
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
