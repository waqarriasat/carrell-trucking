// ─────────────────────────────────────────────
//  Built-in videos (public/videos) come in more than one file:
//  WebM first (smaller, plays everywhere except old Safari), MP4
//  as the fallback, and for some a 720p pair that phones get
//  instead of 1080p. Any other address (e.g. an uploaded video
//  pasted in the admin) is used as it is.
// ─────────────────────────────────────────────

const PHONE = "(max-width: 767px)"

const BUILT_IN = {
  "/videos/about-story.mp4": { webm: true, small: true },
  "/videos/hero-yard.mp4": { webm: true, small: true },
}

export function videoSources(src) {
  const info = BUILT_IN[src]
  if (!info) return [{ src }]
  const base = src.replace(/\.mp4$/, "")
  const list = []
  if (info.small) {
    list.push({ src: `${base}-720.webm`, type: "video/webm", media: PHONE })
    list.push({ src: `${base}-720.mp4`, type: "video/mp4", media: PHONE })
  }
  if (info.webm) list.push({ src: `${base}.webm`, type: "video/webm" })
  list.push({ src, type: "video/mp4" })
  return list
}
