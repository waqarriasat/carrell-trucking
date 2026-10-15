import { getContent } from "@/app/lib/server/content"
import { pageMeta, siteBaseUrl } from "@/app/lib/server/seo"
import JsonLd, { breadcrumbJsonLd } from "@/app/components/common/JsonLd"
import PageTitle from "@/app/components/pages/blog/PageTitle"
import Markdown from "@/app/components/pages/blog/Markdown"

// Until "Published" is set in Admin → Terms & Conditions, this page is a draft:
// reachable by its link for review, but not linked, not in the sitemap and hidden from Google.
export async function generateMetadata() {
  const { terms } = await getContent()
  const meta = pageMeta({ title: terms.metaTitle, description: terms.metaDescription, path: "/terms" })
  return terms.published === "yes" ? meta : { ...meta, robots: { index: false, follow: false } }
}

export default async function TermsPage() {
  const { terms, seo } = await getContent()
  const base = siteBaseUrl(seo)
  const draft = terms.published !== "yes"

  return (
    <>
      {!draft && (
        <JsonLd data={breadcrumbJsonLd(base, [{ name: terms.breadcrumbHome, path: "/" }, { name: terms.breadcrumbCurrent, path: "/terms" }])} />
      )}
      <PageTitle
        crumbs={[{ label: terms.breadcrumbHome, href: "/" }, { label: terms.breadcrumbCurrent }]}
        eyebrow={terms.eyebrow}
        titleStart={terms.titleStart}
        titleAccent={terms.titleAccent}
        text={terms.updated ? `Last updated: ${terms.updated}` : ""}
      >
      </PageTitle>
      <section className="page-section wrap">
        <div className="max-w-[820px]">
          <Markdown text={terms.body} />
        </div>
      </section>
    </>
  )
}
