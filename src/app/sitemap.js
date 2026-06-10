import { FLEET, SERVICES } from "@/app/lib/constants"

export default function sitemap() {
  const baseUrl = "https://ardmoretrailer.com"

  const fleetPages = FLEET.map((f) => ({
    url: `${baseUrl}/fleet/${f.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  const servicePages = SERVICES.map((s) => ({
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