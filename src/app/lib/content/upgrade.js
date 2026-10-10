// ─────────────────────────────────────────────
//  Saved-content upgrades
//
//  Content saved in the admin panel overrides the
//  defaults in defaults.js. When the defaults are
//  updated (e.g. client-confirmed wording), a copy
//  saved earlier would keep showing the old text.
//
//  upgradeContent() fixes that: any value in the
//  saved copy that still equals the OLD default is
//  replaced with the NEW default, while anything
//  someone changed in the admin is kept as is.
// ─────────────────────────────────────────────
import { DEFAULT_CONTENT } from "./defaults"
import { LEGACY_CONTENT_V1 } from "./legacy-v1"
import { LEGACY_CONTENT_V3 } from "./legacy-v3"
import { LEGACY_CONTENT_V4 } from "./legacy-v4"
import { LEGACY_CONTENT_V5 } from "./legacy-v5"
import { LEGACY_CONTENT_V6 } from "./legacy-v6"
import { LEGACY_CONTENT_V7 } from "./legacy-v7"
import { LEGACY_CONTENT_V8 } from "./legacy-v8"
import { LEGACY_CONTENT_V9 } from "./legacy-v9"

// 3: re-runs the v1 upgrade for copies an admin tab opened on an older build
//    saved after the update (they were stamped 2 while still holding old text).
// 4: regional wording + layout polish.
// 5: client changes carried over to the fleet list page and stats.
// 6: client removals (2-month minimum, Heavy-Duty, kW) applied on every page.
// 7: quote & contact forms go to Rick's email.
// 8: Refrigerated names, Ground Level badge, portable toilets, yard section,
//    sales location, rental/purchase/rent-to-own, availability in all states.
// 9: 3D fleet images, real logo, white header and fleet banner.
// 10: fleet banner becomes one well-spaced row of 5 units.
export const CONTENT_VERSION = 10

// Each step: copies saved before `upTo` that still hold `from` text get `to`.
// Version 2 holds v1 text when saved from a stale tab, so it re-runs step 1.
const STEPS = [
  { upTo: 3, from: LEGACY_CONTENT_V1, to: LEGACY_CONTENT_V3 },
  { upTo: 4, from: LEGACY_CONTENT_V3, to: LEGACY_CONTENT_V4 },
  { upTo: 5, from: LEGACY_CONTENT_V4, to: LEGACY_CONTENT_V5 },
  { upTo: 6, from: LEGACY_CONTENT_V5, to: LEGACY_CONTENT_V6 },
  { upTo: 7, from: LEGACY_CONTENT_V6, to: LEGACY_CONTENT_V7 },
  { upTo: 8, from: LEGACY_CONTENT_V7, to: LEGACY_CONTENT_V8 },
  { upTo: 9, from: LEGACY_CONTENT_V8, to: LEGACY_CONTENT_V9 },
  { upTo: 10, from: LEGACY_CONTENT_V9, to: DEFAULT_CONTENT },
]

const isPlainObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v)
const isIdList = (v) => Array.isArray(v) && v.length > 0 && v.every((x) => isPlainObject(x) && typeof x.id === "string")

function deepEqual(a, b) {
  if (a === b) return true
  if (Array.isArray(a)) return Array.isArray(b) && a.length === b.length && a.every((x, i) => deepEqual(x, b[i]))
  if (isPlainObject(a)) {
    if (!isPlainObject(b)) return false
    const ka = Object.keys(a)
    return ka.length === Object.keys(b).length && ka.every((k) => deepEqual(a[k], b[k]))
  }
  return false
}

function upgrade(saved, oldDef, newDef) {
  if (newDef === undefined) return saved
  // Untouched since the old defaults → take the new defaults.
  if (oldDef !== undefined && deepEqual(saved, oldDef)) return structuredClone(newDef)
  // Partly edited object → upgrade field by field.
  if (isPlainObject(saved) && isPlainObject(oldDef) && isPlainObject(newDef)) {
    const out = {}
    for (const k of Object.keys(saved)) out[k] = upgrade(saved[k], oldDef[k], newDef[k])
    // Fields that are new in this version (not in the old defaults) are added.
    for (const k of Object.keys(newDef)) {
      if (!(k in out) && !(k in oldDef)) out[k] = structuredClone(newDef[k])
    }
    return out
  }
  // Lists of items with an id (equipment, services) → match items by id,
  // so an edited list still gets upgraded items and newly added items.
  if (isIdList(saved) && isIdList(oldDef) && isIdList(newDef)) {
    const byId = (list) => new Map(list.map((x) => [x.id, x]))
    const oldById = byId(oldDef), newById = byId(newDef), savedIds = new Set(saved.map((x) => x.id))
    const out = saved.map((item) => upgrade(item, oldById.get(item.id), newById.get(item.id)))
    newDef.forEach((item, i) => {
      if (savedIds.has(item.id) || oldById.has(item.id)) return
      // Insert a new item after the item it follows in the new defaults.
      const prev = i > 0 ? out.findIndex((x) => x.id === newDef[i - 1].id) : -1
      out.splice(prev + 1, 0, structuredClone(item))
    })
    return out
  }
  // Lists with the same items (e.g. equipment, services) → upgrade item by item.
  if (Array.isArray(saved) && Array.isArray(oldDef) && Array.isArray(newDef) &&
      saved.length === oldDef.length && oldDef.length === newDef.length) {
    return saved.map((item, i) => upgrade(item, oldDef[i], newDef[i]))
  }
  return saved
}

// `version` is the content version the copy was written / loaded with (1 if missing).
export function upgradeContent(content, version = 1) {
  if (!isPlainObject(content)) return content
  return STEPS.reduce((c, step) => (version < step.upTo ? upgrade(c, step.from, step.to) : c), content)
}
