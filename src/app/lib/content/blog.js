// Helpers for the blog & FAQ content (safe on server and client).

export const publishedPosts = (blog) =>
  (blog?.posts || [])
    .filter((p) => p && p.id && p.title && p.published !== "no")
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));

export const categoryOf = (blog, id) => (blog?.categories || []).find((c) => c.id === id);

export function readMinutes(text) {
  const words = String(text || "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function formatDate(iso) {
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso || "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

// FAQ items, optionally only those tagged with a fleet id
export function faqItems(faq, fleetId) {
  const all = (faq?.groups || []).flatMap((g) => (g.items || []).map((it) => ({ ...it, group: g.id })));
  const valid = all.filter((it) => it.q && it.a);
  return fleetId ? valid.filter((it) => (it.fleet || []).includes(fleetId)) : valid;
}
