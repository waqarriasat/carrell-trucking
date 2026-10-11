import QuotePageClient from "@/app/components/pages/quote/QuotePageClient"
import { getContent } from "@/app/lib/server/content"
import { pageMeta } from "@/app/lib/server/seo"

export async function generateMetadata() {
  const { quote } = await getContent()
  return pageMeta({ title: "Get a Free Quote — Trailer & Container Rental", description: quote.text, path: "/quote" })
}

export default async function QuotePage() {
  const { quote, site, fleet, services } = await getContent()
  return (
    <QuotePageClient
      page={quote}
      site={site}
      fleetOptions={fleet.map((f) => f.name)}
      serviceOptions={services.map((s) => s.label)}
    />
  )
}
