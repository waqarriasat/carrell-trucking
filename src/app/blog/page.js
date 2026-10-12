import { getContent } from "@/app/lib/server/content"
import { pageMeta, siteBaseUrl } from "@/app/lib/server/seo"
import { publishedPosts } from "@/app/lib/content/blog"
import JsonLd, { breadcrumbJsonLd } from "@/app/components/common/JsonLd"
import PageTitle from "@/app/components/pages/blog/PageTitle"
import PostCard from "@/app/components/pages/blog/PostCard"
import TopicNav from "@/app/components/pages/blog/TopicNav"

export async function generateMetadata() {
  const { blog } = await getContent()
  return pageMeta({ title: blog.metaTitle, description: blog.metaDescription, path: "/blog" })
}

export default async function BlogPage() {
  const { blog, seo, site } = await getContent()
  const posts = publishedPosts(blog)
  const [first, ...rest] = posts
  const base = siteBaseUrl(seo)

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(base, [{ name: blog.breadcrumbHome, path: "/" }, { name: blog.breadcrumbCurrent, path: "/blog" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: blog.metaTitle,
          url: `${base}/blog`,
          blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${base}/blog/${p.id}`, datePublished: p.date })),
        }}
      />
      <PageTitle
        crumbs={[{ label: blog.breadcrumbHome, href: "/" }, { label: blog.breadcrumbCurrent }]}
        eyebrow={blog.eyebrow}
        titleStart={blog.titleStart}
        titleAccent={blog.titleAccent}
        text={blog.text}
      >
        <TopicNav blog={blog} active="" />
      </PageTitle>

      <section className="page-section wrap">
        {first ? <PostCard post={first} blog={blog} large /> : null}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {rest.map((p) => <PostCard key={p.id} post={p} blog={blog} />)}
        </div>
      </section>

    </>
  )
}
