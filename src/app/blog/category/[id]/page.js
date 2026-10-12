import { notFound } from "next/navigation"
import { getContent } from "@/app/lib/server/content"
import { pageMeta, siteBaseUrl } from "@/app/lib/server/seo"
import { publishedPosts, categoryOf } from "@/app/lib/content/blog"
import JsonLd, { breadcrumbJsonLd } from "@/app/components/common/JsonLd"
import PageTitle from "@/app/components/pages/blog/PageTitle"
import PostCard from "@/app/components/pages/blog/PostCard"
import TopicNav from "@/app/components/pages/blog/TopicNav"

export async function generateStaticParams() {
  const { blog } = await getContent()
  return blog.categories.map((c) => ({ id: c.id }))
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const { blog } = await getContent()
  const cat = categoryOf(blog, id)
  if (!cat) return { title: "Not Found" }
  return pageMeta({ title: `${cat.label} — Guides & Articles`, description: cat.description, path: `/blog/category/${cat.id}` })
}

export default async function CategoryPage({ params }) {
  const { id } = await params
  const { blog, seo, site } = await getContent()
  const cat = categoryOf(blog, id)
  if (!cat) notFound()
  const posts = publishedPosts(blog).filter((p) => p.category === cat.id)
  const base = siteBaseUrl(seo)

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(base, [
          { name: blog.breadcrumbHome, path: "/" },
          { name: blog.breadcrumbCurrent, path: "/blog" },
          { name: cat.label, path: `/blog/category/${cat.id}` },
        ])}
      />
      <PageTitle
        crumbs={[{ label: blog.breadcrumbHome, href: "/" }, { label: blog.breadcrumbCurrent, href: "/blog" }, { label: cat.label }]}
        eyebrow={blog.eyebrow}
        titleStart={cat.label}
        text={cat.description}
      >
        <TopicNav blog={blog} active={cat.id} />
      </PageTitle>

      <section className="page-section wrap">
        {posts.length ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p) => <PostCard key={p.id} post={p} blog={blog} />)}
          </div>
        ) : (
          <p style={{ color: "#4a6b85" }}>New articles on this topic are coming soon.</p>
        )}
      </section>

    </>
  )
}
