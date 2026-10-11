import { getContent } from "@/app/lib/server/content"
import { siteBaseUrl, isPreviewDeployment } from "@/app/lib/server/seo"

// robots.txt — lets search engines crawl every public page, keeps them out
// of the admin panel and points them to the sitemap. Preview deployments
// are closed to crawlers so only the live site is indexed.
export default async function robots() {
  const { seo } = await getContent()
  const base = siteBaseUrl(seo)
  if (isPreviewDeployment()) {
    return { rules: { userAgent: "*", disallow: "/" } }
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
