import "server-only"
import { randomUUID } from "crypto"
import { readJSON, writeJSON } from "./storage"

// ─────────────────────────────────────────────
//  Leads: every Contact and Quote form message,
//  kept in the admin panel (Admin → Leads) so
//  nothing is lost if an email goes to spam or
//  fails to send.
// ─────────────────────────────────────────────

const LEADS_FILE = "leads.json"
const MAX_LEADS = 2000
export const LEAD_STATUSES = ["new", "contacted", "closed"]

async function readLeads() {
  const doc = await readJSON(LEADS_FILE)
  return Array.isArray(doc?.leads) ? doc.leads : []
}

const writeLeads = (leads) => writeJSON(LEADS_FILE, { leads: leads.slice(0, MAX_LEADS) })

// Newest first.
export async function listLeads() {
  return readLeads()
}

export async function saveLead({ kind, emailed, customer, details }) {
  const lead = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    kind,
    status: "new",
    emailed,
    customer,
    details,
  }
  await writeLeads([lead, ...(await readLeads())])
  return lead
}

async function changeLead(id, change) {
  const leads = await readLeads()
  if (!leads.some((l) => l.id === id)) return false
  await writeLeads(change(leads))
  return true
}

export const setLeadStatus = (id, status) =>
  LEAD_STATUSES.includes(status)
    ? changeLead(id, (leads) => leads.map((l) => (l.id === id ? { ...l, status } : l)))
    : Promise.resolve(false)

export const deleteLead = (id) => changeLead(id, (leads) => leads.filter((l) => l.id !== id))
