// ─────────────────────────────────────────────
//  Service Areas helpers (/areas, /areas/[town])
//
//  Hidden until Admin → Service Areas is set to
//  Live. After that, only towns switched to
//  "Shown" appear in lists, menus and the sitemap;
//  the others open only by direct link as drafts.
// ─────────────────────────────────────────────
import { fill } from "./resolve"

export const areasLive = (areas) => areas?.published === "yes"

export const isTownLive = (areas, town) => areasLive(areas) && town?.published === "yes"

// Towns visitors can see (none while the section is hidden).
export const liveTowns = (areas) => (areasLive(areas) ? (areas.towns || []).filter((t) => t.published === "yes") : [])

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
