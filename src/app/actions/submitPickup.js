"use server"

import { handleLead } from "@/app/lib/server/lead-flow"

// "2026-10-20" → "Tue, Oct 20, 2026" (left as typed if it isn't a date)
function readableDate(value) {
  const v = String(value || "").trim()
  const d = /^\d{4}-\d{2}-\d{2}$/.test(v) ? new Date(`${v}T12:00:00`) : null
  return d && !Number.isNaN(d.getTime()) ? d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }) : v
}

export async function submitPickup(formData) {
  const unitType = formData.get("unitType")
  // The address is checked part by part (each box shows its own message) and sent as one line.
  const parts = Object.fromEntries(["street", "city", "state", "zip"].map((k) => [k, formData.get(k)]))
  const [street, city, state, zip] = Object.values(parts).map((v) => String(v || "").trim())
  const address = [street, city, [state, zip].filter(Boolean).join(" ")].filter(Boolean).join(", ")
  return handleLead({
    kind: "Pickup request",
    formData,
    tag: unitType,
    checks: parts,
    customer: {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
    },
    fields: [
      { key: "unitType", label: "Unit type", value: unitType },
      { key: "length", label: "Length / size", value: formData.get("length") },
      { key: "unitNumber", label: "Unit number", value: formData.get("unitNumber") },
      { key: "address", label: "Pickup address", value: address },
      { key: "ready", label: "Empty and ready", value: formData.get("ready") },
      { key: "date", label: "Preferred pickup date", value: readableDate(formData.get("date")) },
      { key: "notes", label: "Notes", value: formData.get("notes"), block: true },
    ],
    rules: [
      { field: "name", label: "name", required: true, max: 100 },
      { field: "phone", label: "phone number", required: true, type: "phone" },
      { field: "email", label: "email", type: "email", max: 200 },
      { field: "street", label: "street address", required: true, max: 200 },
      { field: "city", label: "city", required: true, max: 100 },
      { field: "state", label: "state", required: true, max: 50 },
      { field: "zip", label: "ZIP code", max: 12 },
      { field: "unitType", label: "unit type", required: true, max: 100, message: "Please choose the unit type." },
      { field: "length", label: "length", max: 50 },
      { field: "unitNumber", label: "unit number", max: 50 },
      { field: "ready", label: "answer", required: true, max: 100, message: "Please tell us if the unit is empty and ready." },
      { field: "date", label: "pickup date", max: 20 },
      { field: "notes", label: "notes", max: 2000 },
    ],
  })
}
