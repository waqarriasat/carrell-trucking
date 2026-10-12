import { getContent } from "@/app/lib/server/content"
import { pageMeta, siteBaseUrl } from "@/app/lib/server/seo"
import { faqItems } from "@/app/lib/content/blog"
import JsonLd, { breadcrumbJsonLd } from "@/app/components/common/JsonLd"
import PageTitle from "@/app/components/pages/blog/PageTitle"
import FaqList from "@/app/components/pages/blog/FaqList"
import { plainText } from "@/app/components/pages/blog/Markdown"

export async function generateMetadata() {
  const { faq } = await getContent()
  return pageMeta({ title: faq.metaTitle, description: faq.metaDescription, path: "/faq" })
}

export default async function FaqPage() {
  const { faq, seo, site } = await getContent()
  const base = siteBaseUrl(seo)
  const groups = faq.groups.filter((g) => (g.items || []).some((it) => it.q && it.a))

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(base, [{ name: faq.breadcrumbHome, path: "/" }, { name: faq.breadcrumbCurrent, path: "/faq" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems(faq).map((it) => ({
            "@type": "Question",
            name: it.q,
            acceptedAnswer: { "@type": "Answer", text: plainText(it.a) },
          })),
        }}
      />
      <PageTitle
        crumbs={[{ label: faq.breadcrumbHome, href: "/" }, { label: faq.breadcrumbCurrent }]}
        eyebrow={faq.eyebrow}
        titleStart={faq.titleStart}
        titleAccent={faq.titleAccent}
        text={faq.text}
      >
        <nav aria-label="FAQ topics" className="flex flex-wrap gap-2 mt-8">
          {groups.map((g) => (
            <a key={g.id} href={`#${g.id}`} className="pill-outline-navy px-4 py-2 rounded-[3px] text-xs font-bold uppercase tracking-wider">
              {g.label}
            </a>
          ))}
        </nav>
      </PageTitle>

      <section className="page-section wrap">
        <div className="grid lg:grid-cols-[260px_minmax(0,1fr)] gap-10 lg:gap-16">
          <aside className="hidden lg:block">
            <nav aria-label="FAQ topics" className="sticky top-[110px] border-l-2" style={{ borderColor: "#e3e9f0" }}>
              {groups.map((g) => (
                <a key={g.id} href={`#${g.id}`} className="block pl-4 py-2 text-sm font-semibold hover:text-[#86671e]" style={{ color: "#0f2d4a" }}>
                  {g.label}
                </a>
              ))}
            </nav>
          </aside>
          <div className="space-y-14 max-w-[880px]">
            {groups.map((g) => (
              <div key={g.id} id={g.id} style={{ scrollMarginTop: 110 }}>
                <h2 className="text-2xl md:text-3xl font-black mb-5" style={{ color: "#0f2d4a", fontFamily: "Georgia, 'Times New Roman', serif" }}>{g.label}</h2>
                <FaqList items={g.items.filter((it) => it.q && it.a)} />
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}
