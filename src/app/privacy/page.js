import { getContent } from "@/app/lib/server/content"
import { pageMeta, siteBaseUrl } from "@/app/lib/server/seo"
import JsonLd, { breadcrumbJsonLd } from "@/app/components/common/JsonLd"
import PageTitle from "@/app/components/pages/blog/PageTitle"
import Markdown from "@/app/components/pages/blog/Markdown"

export async function generateMetadata() {
  const { privacy } = await getContent()
  return pageMeta({ title: privacy.metaTitle, description: privacy.metaDescription, path: "/privacy" })
}

export default async function PrivacyPage() {
  const { privacy, seo } = await getContent()
  const base = siteBaseUrl(seo)

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(base, [{ name: privacy.breadcrumbHome, path: "/" }, { name: privacy.breadcrumbCurrent, path: "/privacy" }])} />
      <PageTitle
        crumbs={[{ label: privacy.breadcrumbHome, href: "/" }, { label: privacy.breadcrumbCurrent }]}
        eyebrow={privacy.eyebrow}
        titleStart={privacy.titleStart}
        titleAccent={privacy.titleAccent}
        text={privacy.updated ? `Last updated: ${privacy.updated}` : ""}
      />
      <section className="page-section wrap">
        <div className="max-w-[820px]">
          <Markdown text={privacy.body} />
        </div>
      </section>
    </>
  )
}
