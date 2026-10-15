import PickupPageClient from "@/app/components/pages/pickup/PickupPageClient"
import { getContent } from "@/app/lib/server/content"
import { pageMeta } from "@/app/lib/server/seo"

// Until it is switched on in Admin → Request Pickup, this page is a draft:
// reachable by its link for review, but not linked, not in the sitemap and hidden from Google.
export async function generateMetadata() {
  const { pickup } = await getContent()
  const meta = pageMeta({ title: pickup.metaTitle, description: pickup.metaDescription, path: "/request-pickup" })
  return pickup.published === "yes" ? meta : { ...meta, robots: { index: false, follow: false } }
}

export default async function RequestPickupPage() {
  const { pickup, site, fleet } = await getContent()
  return (
    <PickupPageClient
      page={pickup}
      site={site}
      units={fleet.map((f) => ({ name: f.name, sizes: f.sizes || [] }))}
    />
  )
}
