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

// 3: re-runs the v1 upgrade for copies an admin tab opened on an older build
//    saved after the update (they were stamped 2 while still holding old text).
export const CONTENT_VERSION = 3

const isPlainObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v)

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
  if (!isPlainObject(content) || version >= CONTENT_VERSION) return content
  return upgrade(content, LEGACY_CONTENT_V1, DEFAULT_CONTENT)
}
