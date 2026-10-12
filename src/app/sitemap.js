import { getContent } from "@/app/lib/server/content"
import { siteBaseUrl } from "@/app/lib/server/seo"
import { publishedPosts } from "@/app/lib/content/blog"

export default async function sitemap() {
  const { fleet, services, seo, blog } = await getContent()
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
    { url: `${baseUrl}/blog`,          lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${baseUrl}/faq`,           lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    ...blog.categories.map((c) => ({ url: `${baseUrl}/blog/category/${c.id}`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 })),
    ...publishedPosts(blog).map((p) => ({ url: `${baseUrl}/blog/${p.id}`, lastModified: new Date(`${p.date}T12:00:00`), changeFrequency: "monthly", priority: 0.7 })),
    ...fleetPages,
    ...servicePages,
  ]
}