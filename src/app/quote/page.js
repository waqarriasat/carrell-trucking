import QuotePageClient from "@/app/components/pages/quote/QuotePageClient"
import { getContent } from "@/app/lib/server/content"

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
