import { getContent } from "@/app/lib/server/content"
import { siteBaseUrl } from "@/app/lib/server/seo"
import { publishedPosts, resourcesEnabled } from "@/app/lib/content/blog"
import { areasLive, liveTowns } from "@/app/lib/content/areas"

export default async function sitemap() {
  const { fleet, services, seo, blog, terms, pickup, areas } = await getContent()
  const baseUrl = siteBaseUrl(seo)

  const fleetPages = fleet.map((f) => ({
    url: `${baseUrl}/fleet/${f.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  const servicePages = services.map((s) => ({
    url: `${baseUrl}/services/${s.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [
    { url: baseUrl,                    lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${baseUrl}/fleet`,         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${baseUrl}/services`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/about`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/quote`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/privacy`,       lastModified: new Date(), changeFrequency: "yearly",  priority: 0.2 },
    ...(pickup.published === "yes" ? [{ url: `${baseUrl}/request-pickup`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 }] : []),
    ...(terms.published === "yes" ? [{ url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 }] : []),
    // Blog & FAQ only when switched on (Admin → Blog & FAQ)
    ...(resourcesEnabled(blog)
      ? [
          { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
          { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
          ...blog.categories.map((c) => ({ url: `${baseUrl}/blog/category/${c.id}`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 })),
          ...publishedPosts(blog).map((p) => ({ url: `${baseUrl}/blog/${p.id}`, lastModified: new Date(`${p.date}T12:00:00`), changeFrequency: "monthly", priority: 0.7 })),
        ]
      : []),
    ...fleetPages,
    ...servicePages,
    // Service Areas only when switched on, and only towns that are shown
    ...(areasLive(areas)
      ? [
          { url: `${baseUrl}/areas`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
          ...liveTowns(areas).map((t) => ({ url: `${baseUrl}/areas/${t.id}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 })),
        ]
      : []),
  ]
}