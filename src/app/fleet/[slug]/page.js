import { notFound } from "next/navigation"
import FleetDetail from "@/app/components/pages/fleet/FleetDetail"
import { getContent } from "@/app/lib/server/content"
import { pageMeta, siteBaseUrl } from "@/app/lib/server/seo"
import JsonLd, { breadcrumbJsonLd } from "@/app/components/common/JsonLd"

export async function generateStaticParams() {
  const { fleet } = await getContent()
  return fleet.map((f) => ({ slug: f.id }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const { fleet } = await getContent()
  const item = fleet.find((f) => f.id === slug)
  if (!item) return { title: "Not Found" }
  return pageMeta({
    title: `${item.name} for Rent — Southern Oklahoma & North Texas`,
    description: item.description,
    path: `/fleet/${item.id}`,
  })
}

export default async function FleetDetailPage({ params }) {
  const { slug } = await params
  const { fleet, fleetDetail, fleetPage, site, services, seo } = await getContent()
  const item = fleet.find((f) => f.id === slug)
  if (!item) notFound()

  const base = siteBaseUrl(seo)
  // Industries whose recommended equipment includes this unit (cross-links)
  const usedIn = services.filter((s) => (s.fleet || []).includes(item.id)).map(({ id, label }) => ({ id, label }))

  return (
    <>
    <JsonLd
      data={breadcrumbJsonLd(base, [
        { name: fleetPage.breadcrumbHome, path: "/" },
        { name: fleetPage.breadcrumbCurrent, path: "/fleet" },
        { name: item.name, path: `/fleet/${item.id}` },
      ])}
    />
    <FleetDetail
      usedIn={usedIn}
      item={item}
      fleet={fleet.map(({ id, name, sizes }) => ({ id, name, sizes }))}
      fleetDetail={fleetDetail}
      fleetPage={fleetPage}
      site={site}
    />
    </>
  )
}
