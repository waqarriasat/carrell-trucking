import Link from "next/link";
import { isCutout } from "@/app/lib/content/images";
import { categoryOf, formatDate, readMinutes } from "@/app/lib/content/blog";

// Article card used on the blog, category, article and equipment pages.
export default function PostCard({ post, blog, large = false }) {
  const cat = categoryOf(blog, post.category);
  const cut = isCutout(post.image) && post.image.startsWith("/images/fleet/");
  return (
    <article className={`panel group flex flex-col overflow-hidden h-full ${large ? "lg:flex-row" : ""}`}>
      <Link
        href={`/blog/${post.id}`}
        className={`relative block overflow-hidden shrink-0 ${large ? "lg:w-[55%] aspect-[16/9] lg:aspect-auto lg:min-h-[340px]" : "aspect-[16/9]"}`}
        style={{ background: cut ? "linear-gradient(180deg,#f7f9fc,#e6edf5)" : "#e6edf5" }}
        tabIndex={-1}
        aria-hidden="true"
      >
        {post.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.image}
            alt=""
            loading="lazy"
            className={`absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-[1.03] ${cut ? "object-contain p-6" : "object-cover"}`}
          />
        ) : null}
      </Link>
      <div className={`flex flex-col flex-1 ${large ? "p-7 lg:p-10 justify-center" : "p-6"}`}>
        {cat ? (
          <Link href={`/blog/category/${cat.id}`} className="self-start text-[11px] font-bold tracking-[0.16em] uppercase mb-3 hover:underline" style={{ color: "#86671e" }}>
            {cat.label}
          </Link>
        ) : null}
        <h3 className={`font-black leading-snug mb-3 ${large ? "text-2xl lg:text-[1.9rem]" : "text-lg"}`} style={{ color: "#0f2d4a", fontFamily: "Georgia, 'Times New Roman', serif" }}>
          <Link href={`/blog/${post.id}`} className="hover:underline decoration-[#c9a84c] underline-offset-4">
            {post.title}
          </Link>
        </h3>
        <p className={`leading-relaxed mb-5 flex-1 ${large ? "text-base" : "text-sm"}`} style={{ color: "#4a6b85" }}>{post.excerpt}</p>
        <div className="flex items-center justify-between gap-3 text-xs pt-4 border-t" style={{ color: "#5b7389", borderColor: "#edf1f5" }}>
          <span>{formatDate(post.date)} · {readMinutes(post.body)} min read</span>
          <Link href={`/blog/${post.id}`} className="font-bold uppercase tracking-wider" style={{ color: "#0f2d4a" }}>
            {blog.readMoreLabel} →
          </Link>
        </div>
      </div>
    </article>
  );
}
