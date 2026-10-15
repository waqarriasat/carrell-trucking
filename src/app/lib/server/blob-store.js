// ─────────────────────────────────────────────
//  Vercel Blob driver (the SDK is passed in so
//  this logic can be tested without a network).
//
//  • A Blob store is either "public" or "private"
//    (chosen when it was created). We don't assume
//    one: BLOB_ACCESS is tried first if set, then
//    the other mode, and whichever works is kept.
//  • JSON documents are saved as a NEW file on
//    every write (cms/<doc>/<timestamp>-<rand>.json),
//    so the Blob CDN can never serve an outdated copy.
//  • A small pointer (cms-latest/<doc>.json) names the
//    newest file. Reading downloads the pointer, then
//    the file — two "simple" operations. Listing the
//    folder is an "advanced" operation (2,000 a month
//    on the free plan), so it is only the fallback
//    when the pointer is missing or out of date.
// ─────────────────────────────────────────────

const KEEP_VERSIONS = 5
const PRUNE_CHANCE = 0.25

export const accessFromUrl = (url) => (/\.private\.blob\.vercel-storage\.com/i.test(String(url)) ? "private" : "public")

const other = (a) => (a === "public" ? "private" : "public")

const pointerPath = (doc) => `cms-latest/${doc}.json`

async function streamToString(stream) {
  const chunks = []
  for await (const chunk of stream) chunks.push(Buffer.from(chunk))
  return Buffer.concat(chunks).toString("utf8")
}

export function createBlobStore(sdk, { preferredAccess = null, storeId = "", log = console } = {}) {
  let access = preferredAccess === "public" || preferredAccess === "private" ? preferredAccess : null
  let lastStamp = 0

  // put() with automatic access detection.
  async function put(pathname, body, options) {
    const order = access ? [access, other(access)] : ["public", "private"]
    const errors = []
    for (const a of order) {
      try {
        const result = await sdk.put(pathname, body, { ...options, access: a })
        access = accessFromUrl(result.url)
        return result
      } catch (err) {
        errors.push(`${a}: ${err?.message || err}`)
      }
    }
    const error = new Error(`Vercel Blob upload failed (${errors.join(" | ")})`)
    error.code = "BLOB_WRITE_FAILED"
    throw error
  }

  async function versions(doc) {
    const { blobs } = await sdk.list({ prefix: `cms/${doc}/` })
    // Pathnames start with a zero-padded timestamp → newest first.
    return [...blobs].sort((x, y) => (x.pathname < y.pathname ? 1 : x.pathname > y.pathname ? -1 : 0))
  }

  async function fetchText(url) {
    const a = accessFromUrl(url)
    access = access || a
    const res = await sdk.get(url, { access: a })
    if (!res || res.statusCode !== 200 || !res.stream) return null
    return streamToString(res.stream)
  }

  // The pointer is overwritten on every save, so it is always read fresh:
  // private stores skip the cache, public ones get a unique query string.
  async function readPointer(doc) {
    const pathname = pointerPath(doc)
    for (const a of access ? [access] : ["private", "public"]) {
      try {
        const target = a === "public" && storeId
          ? `https://${storeId}.public.blob.vercel-storage.com/${pathname}?v=${Date.now()}`
          : pathname
        const res = await sdk.get(target, { access: a, useCache: false })
        if (res && res.statusCode === 200 && res.stream) {
          access = a
          return JSON.parse(await streamToString(res.stream))
        }
      } catch {
        // Wrong access mode or not created yet — fall back to listing.
      }
    }
    return null
  }

  function writePointer(doc, blob) {
    return put(pointerPath(doc), JSON.stringify({ pathname: blob.pathname, url: blob.url }), {
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 60,
      contentType: "application/json",
    })
  }

  return {
    get access() {
      return access
    },

    async readJSON(name) {
      const doc = name.replace(/\.json$/, "")
      const pointer = await readPointer(doc)
      if (pointer?.url) {
        const text = await fetchText(pointer.url)
        if (text != null) return JSON.parse(text)
      }
      // No pointer yet (or it names a removed file): list once, then create it.
      const [latest] = await versions(doc)
      if (!latest) return null
      const text = await fetchText(latest.url)
      if (text == null) return null
      writePointer(doc, latest).catch((err) => log.warn?.(`[cms] Could not save the ${doc} pointer:`, err?.message || err))
      return JSON.parse(text)
    },

    async writeJSON(name, data) {
      const doc = name.replace(/\.json$/, "")
      // Strictly increasing, so two saves in the same millisecond still sort correctly.
      lastStamp = Math.max(Date.now(), lastStamp + 1)
      const stamp = String(lastStamp).padStart(15, "0")
      const rand = Math.random().toString(36).slice(2, 8)
      const saved = await put(`cms/${doc}/${stamp}-${rand}.json`, JSON.stringify(data, null, 2), {
        addRandomSuffix: false,
        contentType: "application/json",
      })
      try {
        await writePointer(doc, saved)
      } catch (err) {
        // An outdated pointer would hide this save — remove it so reads fall back to listing.
        log.warn?.(`[cms] Could not update the ${doc} pointer:`, err?.message || err)
        await sdk.del(pointerPath(doc)).catch(() => {})
      }
      // Tidy up old versions now and then (listing is an "advanced" operation;
      // best effort — never fails the save).
      if (Math.random() >= PRUNE_CHANCE) return
      try {
        const old = (await versions(doc)).slice(KEEP_VERSIONS).map((b) => b.url)
        if (old.length) await sdk.del(old)
      } catch (err) {
        log.warn?.(`[cms] Could not prune old ${doc} versions:`, err?.message || err)
      }
    },

    async saveMedia(name, buffer, contentType) {
      await put(`media/${name}`, buffer, { addRandomSuffix: false, contentType })
    },

    async readMedia(name) {
      let info
      try {
        info = await sdk.head(`media/${name}`)
      } catch (err) {
        if (err?.name === "BlobNotFoundError" || /does not exist/i.test(err?.message || "")) return null
        throw err
      }
      const res = await sdk.get(info.url, { access: accessFromUrl(info.url) })
      if (!res || res.statusCode !== 200 || !res.stream) return null
      return { body: res.stream, contentType: res.blob?.contentType || info.contentType }
    },
  }
}
