import { notFound } from "next/navigation"
import FleetDetail from "@/app/components/pages/fleet/FleetDetail"
import { getContent } from "@/app/lib/server/content"

export async function generateStaticParams() {
  const { fleet } = await getContent()
  return fleet.map((f) => ({ slug: f.id }))
}

export default async function FleetDetailPage({ params }) {
  const { slug } = await params
  const { fleet, fleetDetail, fleetPage, site } = await getContent()
  const item = fleet.find((f) => f.id === slug)
  if (!item) notFound()

  return (
    <FleetDetail
      item={item}
      fleet={fleet.map(({ id, name, sizes }) => ({ id, name, sizes }))}
      fleetDetail={fleetDetail}
      fleetPage={fleetPage}
      site={site}
    />
  )
}
