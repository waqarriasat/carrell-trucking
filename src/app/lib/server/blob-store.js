// ─────────────────────────────────────────────
//  Vercel Blob driver (the SDK is passed in so
//  this logic can be tested without a network).
//
//  • A Blob store is either "public" or "private"
//    (chosen when it was created). We don't assume
//    one: BLOB_ACCESS is tried first if set, then
//    the other mode, and whichever works is kept.
//  • JSON documents are saved as a NEW file on
//    every write (cms/<doc>/<timestamp>-<rand>.json)
//    and read back by listing the folder through
//    the API. A new URL per save means the Blob CDN
//    can never serve an outdated copy.
// ─────────────────────────────────────────────

const KEEP_VERSIONS = 5

export const accessFromUrl = (url) => (/\.private\.blob\.vercel-storage\.com/i.test(String(url)) ? "private" : "public")

const other = (a) => (a === "public" ? "private" : "public")

async function streamToString(stream) {
  const chunks = []
  for await (const chunk of stream) chunks.push(Buffer.from(chunk))
  return Buffer.concat(chunks).toString("utf8")
}

export function createBlobStore(sdk, { preferredAccess = null, log = console } = {}) {
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

  return {
    get access() {
      return access
    },

    async readJSON(name) {
      const doc = name.replace(/\.json$/, "")
      const [latest] = await versions(doc)
      if (!latest) return null
      const text = await fetchText(latest.url)
      return text == null ? null : JSON.parse(text)
    },

    async writeJSON(name, data) {
      const doc = name.replace(/\.json$/, "")
      // Strictly increasing, so two saves in the same millisecond still sort correctly.
      lastStamp = Math.max(Date.now(), lastStamp + 1)
      const stamp = String(lastStamp).padStart(15, "0")
      const rand = Math.random().toString(36).slice(2, 8)
      await put(`cms/${doc}/${stamp}-${rand}.json`, JSON.stringify(data, null, 2), {
        addRandomSuffix: false,
        contentType: "application/json",
      })
      // Tidy up old versions (best effort — never fails the save).
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
