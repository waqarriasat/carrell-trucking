import Link from "next/link"
import { notFound } from "next/navigation"
import { FaPhone, FaArrowRight } from "react-icons/fa6"
import { getContent } from "@/app/lib/server/content"
import { pageMeta, siteBaseUrl } from "@/app/lib/server/seo"
import { publishedPosts, categoryOf, formatDate, readMinutes, resourcesEnabled } from "@/app/lib/content/blog"
import { isCutout } from "@/app/lib/content/images"
import JsonLd, { breadcrumbJsonLd } from "@/app/components/common/JsonLd"
import Breadcrumb from "@/app/components/common/Breadcrumb"
import Markdown, { parseBlocks, slugify } from "@/app/components/pages/blog/Markdown"
import PostCard from "@/app/components/pages/blog/PostCard"

export async function generateStaticParams() {
  const { blog } = await getContent()
  return publishedPosts(blog).map((p) => ({ slug: p.id }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const { blog } = await getContent()
  const post = publishedPosts(blog).find((p) => p.id === slug)
  if (!post) return { title: "Not Found" }
  const meta = pageMeta({ title: post.metaTitle || post.title, description: post.metaDescription || post.excerpt, path: `/blog/${post.id}` })
  meta.openGraph = {
    ...meta.openGraph,
    type: "article",
    publishedTime: post.date,
    images: post.image ? [{ url: post.image }] : meta.openGraph.images,
  }
  return meta
}

export default async function ArticlePage({ params }) {
  const { slug } = await params
  const { blog, fleet, seo, site } = await getContent()
  if (!resourcesEnabled(blog)) notFound()
  const posts = publishedPosts(blog)
  const post = posts.find((p) => p.id === slug)
  if (!post) notFound()

  const base = siteBaseUrl(seo)
  const cat = categoryOf(blog, post.category)
  const toc = parseBlocks(post.body).filter((b) => b.type === "h2")
  const equipment = (post.fleet || []).map((id) => fleet.find((f) => f.id === id)).filter(Boolean)
  const related = [
    ...posts.filter((p) => p.id !== post.id && p.category === post.category),
    ...posts.filter((p) => p.id !== post.id && p.category !== post.category),
  ].slice(0, 3)

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(base, [
          { name: blog.breadcrumbHome, path: "/" },
          { name: blog.breadcrumbCurrent, path: "/blog" },
          ...(cat ? [{ name: cat.label, path: `/blog/category/${cat.id}` }] : []),
          { name: post.title, path: `/blog/${post.id}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.metaDescription || post.excerpt,
          image: post.image ? `${base}${post.image}` : undefined,
          datePublished: post.date,
          dateModified: post.date,
          author: { "@type": "Organization", name: blog.author || site.name },
          publisher: { "@type": "Organization", name: site.name, "@id": `${base}/#business` },
          mainEntityOfPage: `${base}/blog/${post.id}`,
          articleSection: cat?.label,
          about: equipment.map((f) => ({ "@type": "Thing", name: f.name, url: `${base}/fleet/${f.id}` })),
        }}
      />

      {/* Title */}
      <section className="page-section wrap">
        <Breadcrumb
          crumbs={[
            { label: blog.breadcrumbHome, href: "/" },
            { label: blog.breadcrumbCurrent, href: "/blog" },
            ...(cat ? [{ label: cat.label, href: `/blog/category/${cat.id}` }] : []),
          ]}
        />
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-14 items-center">
          <div>
            {cat ? (
              <Link href={`/blog/category/${cat.id}`} className="inline-block text-xs font-bold tracking-[0.18em] uppercase mb-4 hover:underline" style={{ color: "#86671e" }}>
                {cat.label}
              </Link>
            ) : null}
            <h1 className="text-3xl md:text-[2.6rem] font-black leading-[1.15] mb-5" style={{ color: "#0f2d4a", fontFamily: "Georgia, 'Times New Roman', serif" }}>
              {post.title}
            </h1>
            <p className="text-lg leading-relaxed mb-5" style={{ color: "#4a6b85" }}>{post.excerpt}</p>
            <p className="text-sm" style={{ color: "#5b7389" }}>
              By {blog.author} · <time dateTime={post.date}>{formatDate(post.date)}</time> · {readMinutes(post.body)} min read
            </p>
          </div>
          {post.image ? (
            <div className="relative aspect-[16/10] overflow-hidden rounded-[4px]" style={{ background: "linear-gradient(180deg,#f7f9fc,#e6edf5)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt={post.title}
                className={`absolute inset-0 w-full h-full ${post.image.startsWith("/images/fleet/") ? "object-contain p-8" : "object-cover"}`}
              />
            </div>
          ) : null}
        </div>
      </section>

      {/* Article + sidebar */}
      <section className="page-section wrap">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-10 lg:gap-16">
          <article className="max-w-[760px]">
            <Markdown text={post.body} />
          </article>

          <aside className="space-y-6 lg:sticky lg:top-[110px] self-start">
            {toc.length > 1 ? (
              <nav aria-label={blog.tocLabel} className="panel p-6">
                <p className="text-xs font-bold tracking-[0.16em] uppercase mb-3" style={{ color: "#86671e" }}>{blog.tocLabel}</p>
                <ol className="space-y-2 text-sm">
                  {toc.map((h) => (
                    <li key={h.text}>
                      <a href={`#${slugify(h.text)}`} className="hover:underline" style={{ color: "#0f2d4a" }}>{h.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}
            <div className="panel-navy p-6 text-white">
              <p className="text-lg font-black mb-2" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>{blog.ctaTitle}</p>
              <p className="text-sm mb-5" style={{ color: "#cbd5e1" }}>{blog.ctaText}</p>
              <Link href="/quote" className="flex items-center justify-center gap-2 px-5 py-3 rounded-[4px] font-bold text-sm uppercase tracking-wider mb-3" style={{ backgroundColor: "#c9a84c", color: "#0f2d4a" }}>
                Get a Free Quote <FaArrowRight size={12} />
              </Link>
              <a href={site.phoneHref} className="flex items-center justify-center gap-2 px-5 py-3 rounded-[4px] font-bold text-sm border-2 border-white/80 text-white transition-colors hover:bg-white hover:text-[#0f2d4a]">
                <FaPhone size={12} /> {site.phone}
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* Equipment mentioned */}
      {equipment.length ? (
        <section className="page-section wrap">
          <h2 className="text-2xl md:text-3xl font-black mb-8" style={{ color: "#0f2d4a", fontFamily: "Georgia, 'Times New Roman', serif" }}>{blog.relatedEquipmentLabel}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {equipment.map((f) => (
              <Link key={f.id} href={`/fleet/${f.id}`} className="panel group flex flex-col overflow-hidden transition hover:-translate-y-1">
                <div className="relative h-36" style={{ background: "linear-gradient(180deg,#f7f9fc,#e6edf5)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.image} alt={f.name} loading="lazy" className={`absolute inset-0 w-full h-full ${isCutout(f.image) ? "object-contain p-4" : "object-cover"}`} />
                </div>
                <div className="p-5">
                  <p className="font-bold mb-1" style={{ color: "#0f2d4a" }}>{f.name}</p>
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#86671e" }}>View Details →</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* Related articles */}
      {related.length ? (
        <section className="page-section wrap">
          <h2 className="text-2xl md:text-3xl font-black mb-8" style={{ color: "#0f2d4a", fontFamily: "Georgia, 'Times New Roman', serif" }}>{blog.relatedPostsLabel}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => <PostCard key={p.id} post={p} blog={blog} />)}
          </div>
        </section>
      ) : null}

    </>
  )
}
