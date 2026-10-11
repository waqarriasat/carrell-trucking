// next/image can only optimize images from hosts listed in next.config.mjs.
// Anything else (admin uploads, pasted links) is rendered as-is.
export function imageProps(src) {
  const optimizable =
    typeof src === "string" &&
    (src.startsWith("https://images.unsplash.com/") || (src.startsWith("/images/") && !src.includes("?")))
  return optimizable ? {} : { unoptimized: true }
}

// Product renders with a transparent background (e.g. /images/fleet/*.webp, PNG uploads)
// are shown whole ("contain") on a light backdrop instead of being cropped like photos.
export function isCutout(src) {
  return typeof src === "string" && (src.startsWith("/images/fleet/") || /\.(png|webp)(\?|$)/i.test(src))
}
