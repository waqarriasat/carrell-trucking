import Link from "next/link";

// Topic links (all articles + each category)
export default function TopicNav({ blog, active }) {
  const items = [{ id: "", label: blog.allLabel, href: "/blog" }, ...blog.categories.map((c) => ({ id: c.id, label: c.label, href: `/blog/category/${c.id}` }))]
  return (
    <nav aria-label="Article topics" className="flex flex-wrap gap-2 mt-8">
      {items.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          aria-current={active === it.id ? "page" : undefined}
          className={active === it.id ? "px-4 py-2 rounded-[3px] text-xs font-bold uppercase tracking-wider" : "pill-outline-navy px-4 py-2 rounded-[3px] text-xs font-bold uppercase tracking-wider"}
          style={active === it.id ? { backgroundColor: "#0f2d4a", color: "#ffffff", border: "1px solid #0f2d4a" } : undefined}
        >
          {it.label}
        </Link>
      ))}
      <Link href="/faq" className="pill-outline-navy px-4 py-2 rounded-[3px] text-xs font-bold uppercase tracking-wider">FAQ</Link>
    </nav>
  )
}

