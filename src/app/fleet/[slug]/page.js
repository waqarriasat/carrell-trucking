import Link from "next/link"
import { notFound } from "next/navigation"
import FleetDetail from "@/app/components/pages/fleet/FleetDetail"
import { getContent } from "@/app/lib/server/content"
import { publishedPosts, faqItems, resourcesEnabled } from "@/app/lib/content/blog"
import FaqList from "@/app/components/pages/blog/FaqList"
import PostCard from "@/app/components/pages/blog/PostCard"
import { plainText } from "@/app/components/pages/blog/Markdown"
import { pageMeta, siteBaseUrl } from "@/app/lib/server/seo"
import JsonLd, { breadcrumbJsonLd } from "@/app/components/common/JsonLd"

export async function generateStaticParams() {
  const { fleet } = await getContent()
  return fleet.map((f) => ({ slug: f.id }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const { fleet, draftFleet } = await getContent()
  const item = fleet.find((f) => f.id === slug) || draftFleet.find((f) => f.id === slug)
  if (!item) return { title: "Not Found" }
  const meta = pageMeta({
    title: `${item.name} for Rent — Southern Oklahoma & North Texas`,
    description: item.description,
    path: `/fleet/${item.id}`,
  })
  // A unit not shown on the website yet is a draft: reachable by link, hidden from Google.
  return item.published === "no" ? { ...meta, robots: { index: false, follow: false } } : meta
}

export default async function FleetDetailPage({ params }) {
  const { slug } = await params
  const { fleet, draftFleet, fleetDetail, fleetPage, site, services, seo, blog, faq } = await getContent()
  const item = fleet.find((f) => f.id === slug) || draftFleet.find((f) => f.id === slug)
  if (!item) notFound()

  const base = siteBaseUrl(seo)
  // Industries whose recommended equipment includes this unit (cross-links)
  // Questions and guides only when Blog & FAQ are switched on
  const showResources = resourcesEnabled(blog)
  const faqs = showResources ? faqItems(faq, item.id) : []
  const posts = showResources ? publishedPosts(blog).filter((p) => (p.fleet || []).includes(item.id)).slice(0, 3) : []
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

    {/* Questions about this unit (also in the FAQ page) */}
    {faqs.length ? (
      <section className="page-section wrap">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((it) => ({ "@type": "Question", name: it.q, acceptedAnswer: { "@type": "Answer", text: plainText(it.a) } })),
          }}
        />
        <div className="grid lg:grid-cols-[320px_minmax(0,1fr)] gap-8 lg:gap-16">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: "#86671e" }}>{faq.equipmentFaqLabel}</p>
            <h2 className="text-2xl md:text-3xl font-black leading-tight mb-4" style={{ color: "#0f2d4a", fontFamily: "Georgia, 'Times New Roman', serif" }}>
              {item.name}: Common Questions
            </h2>
            <Link href="/faq" className="text-sm font-bold uppercase tracking-wider" style={{ color: "#0f2d4a" }}>All FAQs →</Link>
          </div>
          <FaqList items={faqs} />
        </div>
      </section>
    ) : null}

    {/* Guides that cover this unit */}
    {posts.length ? (
      <section className="page-section wrap">
        <h2 className="text-2xl md:text-3xl font-black mb-8" style={{ color: "#0f2d4a", fontFamily: "Georgia, 'Times New Roman', serif" }}>
          {item.name}: Guides & Advice
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => <PostCard key={p.id} post={p} blog={blog} />)}
        </div>
      </section>
    ) : null}
    </>
  )
}
