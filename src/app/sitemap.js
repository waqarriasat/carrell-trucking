import { getContent } from "@/app/lib/server/content"

export default async function sitemap() {
  const { fleet, services, seo } = await getContent()
  const baseUrl = seo.siteUrl.replace(/\/$/, "")

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
    ...fleetPages,
    ...servicePages,
  ]
}