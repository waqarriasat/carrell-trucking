// next/image can only optimize images from hosts listed in next.config.mjs.
// Anything else (admin uploads, pasted links) is rendered as-is.
export function imageProps(src) {
  const optimizable =
    typeof src === "string" &&
    (src.startsWith("https://images.unsplash.com/") || (src.startsWith("/images/") && !src.includes("?")))
  return optimizable ? {} : { unoptimized: true }
}
