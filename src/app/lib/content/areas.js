// ─────────────────────────────────────────────
//  Service Areas helpers (/areas, /areas/[town])
//
//  Hidden until Admin → Service Areas is set to
//  Live. After that, only towns switched to
//  "Shown" appear in lists, menus and the sitemap;
//  the others open only by direct link as drafts.
// ─────────────────────────────────────────────
import { fill } from "./resolve"

// Live = switched on AND at least one town shown (no empty page, menu link or footer column).
export const areasLive = (areas) => areas?.published === "yes" && (areas.towns || []).some((t) => t.published === "yes")

export const isTownLive = (areas, town) => areasLive(areas) && town?.published === "yes"

// Towns visitors can see (none while the section is hidden).
export const liveTowns = (areas) => (areas?.published === "yes" ? (areas.towns || []).filter((t) => t.published === "yes") : [])

export const townLabel = (town) => `${town.name}, ${town.state}`

// Fills {town}, {state}, {county}, {miles}, {direction} in a label.
export function townText(str, town) {
  return fill(str, {
    town: town.name,
    state: town.state,
    county: town.county,
    miles: String(town.miles ?? ""),
    direction: town.direction || "",
  })
}

// Towns closest to this one (straight-line), with distance and direction from it.
const DIRECTIONS = ["north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest"]
const rad = (d) => (d * Math.PI) / 180
// A town has a map point once both numbers are filled in (new towns start at 0, 0).
export const hasPoint = (t) => Number.isFinite(t?.lat) && Number.isFinite(t?.lng) && !(t.lat === 0 && t.lng === 0)
export function nearbyTowns(town, towns, { maxMiles = 40, limit = 6 } = {}) {
  if (!hasPoint(town)) return []
  return towns
    .filter((t) => t.id !== town.id && hasPoint(t))
    .map((t) => {
      const dLat = rad(t.lat - town.lat), dLng = rad(t.lng - town.lng)
      const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(town.lat)) * Math.cos(rad(t.lat)) * Math.sin(dLng / 2) ** 2
      const miles = Math.round(3958.8 * 2 * Math.asin(Math.sqrt(a)))
      const y = Math.sin(dLng) * Math.cos(rad(t.lat))
      const x = Math.cos(rad(town.lat)) * Math.sin(rad(t.lat)) - Math.sin(rad(town.lat)) * Math.cos(rad(t.lat)) * Math.cos(dLng)
      const bearing = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360
      return { town: t, miles, direction: DIRECTIONS[Math.round(bearing / 45) % 8] }
    })
    .filter((n) => n.miles > 0 && n.miles <= maxMiles)
    .sort((a, b) => a.miles - b.miles)
    .slice(0, limit)
}

// A short list for the footer: closest towns from each state in turn (so
// Oklahoma and Texas both show), then A–Z. "All service areas" links the rest.
export function footerTowns(areas, count) {
  const byState = new Map()
  for (const t of [...liveTowns(areas)].sort((a, b) => (a.miles || 0) - (b.miles || 0))) {
    if (!byState.has(t.state)) byState.set(t.state, [])
    byState.get(t.state).push(t)
  }
  const queues = [...byState.values()], picked = []
  while (picked.length < count && queues.some((q) => q.length)) {
    for (const q of queues) if (q.length && picked.length < count) picked.push(q.shift())
  }
  return picked.sort((a, b) => a.name.localeCompare(b.name))
}
