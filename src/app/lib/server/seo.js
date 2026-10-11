import "server-only"

// ─────────────────────────────────────────────
//  SEO helpers
//  • siteBaseUrl — the website's public address. Uses Admin → SEO →
//    Website address when filled in; until the domain is live it falls
//    back to the address the site is running on (Vercel), so the sitemap,
//    robots.txt and canonical links always point to a real, working URL.
//  • pageMeta — title, description and canonical link for one page.
// ─────────────────────────────────────────────

export function siteBaseUrl(seo) {
  const fromAdmin = String(seo?.siteUrl || "").trim()
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
  const raw = fromAdmin || process.env.NEXT_PUBLIC_SITE_URL || (vercel ? `https://${vercel}` : "http://localhost:3000")
  return raw.replace(/\/+$/, "")
}

// Preview deployments must not be indexed (Google should only see the live site).
export const isPreviewDeployment = () => process.env.VERCEL_ENV === "preview"

const BRAND = /ardmore trailer/i

// Titles that already contain the company name are used as-is; others get
// the site's title template ("… | Ardmore Trailer, Inc.") added once.
export function pageMeta({ title, description, path }) {
  return {
    title: title && BRAND.test(title) ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { title: title || undefined, description, url: path },
  }
}
