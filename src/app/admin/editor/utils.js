// Small helpers for the admin editor.

export const toPath = (p) => (Array.isArray(p) ? p : String(p || "").split(".").filter(Boolean))

export function getAt(obj, path) {
  let cur = obj
  for (const k of path) {
    if (cur == null) return undefined
    cur = cur[k]
  }
  return cur
}

// Immutable set: returns a new object with `value` at `path`.
export function setAt(obj, path, value) {
  if (path.length === 0) return value
  const [k, ...rest] = path
  const base = Array.isArray(obj) ? [...obj] : { ...(obj || {}) }
  base[k] = setAt(base[k], rest, value)
  return base
}

export function slugify(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
}

export function uniqueSlug(base, taken) {
  const root = slugify(base) || "item"
  let slug = root
  let n = 2
  while (taken.includes(slug)) slug = `${root}-${n++}`
  return slug
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

// Problems that would break the public site if saved.
export function validateContent(content) {
  const errors = []
  const checkIds = (items, what) => {
    const seen = new Set()
    items.forEach((item, i) => {
      const name = item.name || item.label || `${what} #${i + 1}`
      if (!item.id) errors.push(`${what} “${name}” needs a page address.`)
      else if (!SLUG_RE.test(item.id)) errors.push(`${what} “${name}”: the page address may only use lowercase letters, numbers and dashes.`)
      else if (seen.has(item.id)) errors.push(`${what} “${name}”: the page address “${item.id}” is used twice.`)
      seen.add(item.id)
    })
  }
  checkIds(content.fleet || [], "Equipment")
  checkIds(content.services || [], "Service")
  return errors
}

export function formatDate(iso) {
  if (!iso) return null
  try {
    return new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })
  } catch {
    return iso
  }
}

// ── Search index ──────────────────────────────
// Walks the schema + current content and returns one entry per text value,
// so the admin can type text they see on the website and jump straight to it.
export function buildSearchIndex(pages, content) {
  const out = []

  const walk = (fields, basePath, ctx) => {
    for (const f of fields) {
      if (f.type === "subheading") continue
      if (f.type === "group") {
        walk(f.fields, f.key ? [...basePath, f.key] : basePath, { ...ctx, trail: [...ctx.trail, f.label] })
        continue
      }
      const path = [...basePath, f.key]
      const value = getAt(content, path)
      const trail = [...ctx.trail, f.label]
      if (f.type === "list" && Array.isArray(value)) {
        value.forEach((item, i) => {
          const title = (f.itemTitle && f.itemTitle(item)) || `${f.itemName || "item"} ${i + 1}`
          walk(f.fields, [...path, i], { ...ctx, trail: [...ctx.trail, f.label, title], focus: [...path, i].join(".") })
        })
      } else if ((f.type === "strings" || f.type === "images") && Array.isArray(value)) {
        value.forEach((v) => out.push({ ...ctx, label: trail.join(" › "), text: String(v ?? ""), focus: ctx.focus }))
      } else if (f.type === "button" && value) {
        out.push({ ...ctx, label: trail.join(" › "), text: `${value.label ?? ""} ${value.href ?? ""}`, focus: ctx.focus })
      } else {
        out.push({ ...ctx, label: trail.join(" › "), text: String(value ?? ""), focus: ctx.focus })
      }
    }
  }

  pages.forEach((page) =>
    page.sections.forEach((section, sectionIdx) =>
      walk(section.fields, toPath(section.path), {
        pageId: page.id,
        pageLabel: page.label,
        sectionIdx,
        sectionTitle: section.title,
        trail: [],
        focus: null,
      })
    )
  )
  return out
}
