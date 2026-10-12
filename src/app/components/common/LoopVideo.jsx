"use client"

import { useEffect, useRef, useState } from "react"

// ─────────────────────────────────────────────
//  Silent looping video that only downloads when
//  it scrolls near the screen, and never for
//  visitors who prefer reduced motion (they keep
//  seeing the photo underneath).
// ─────────────────────────────────────────────

export default function LoopVideo({ src, className, style }) {
  const ref = useRef(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true)
          io.disconnect()
        }
      },
      { rootMargin: "300px 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // A .webm next to a /videos/*.mp4 (same name) is offered first, for browsers without H.264.
  const webm = /^\/videos\/.+\.mp4$/i.test(src) ? src.replace(/\.mp4$/i, ".webm") : null

  return (
    <video
      ref={ref}
      key={show ? src : "idle"}
      className={className}
      style={style}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
    >
      {show && webm && <source src={webm} type="video/webm" />}
      {show && <source src={src} />}
    </video>
  )
}
