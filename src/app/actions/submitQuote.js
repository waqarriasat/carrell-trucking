"use server"

import { handleLead } from "@/app/lib/server/lead-flow"

export async function submitQuote(formData) {
  const interest = formData.get("interest")
  return handleLead({
    kind: "Quote request",
    formData,
    tag: interest,
    customer: {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      company: formData.get("company"),
    },
    fields: [
      { key: "interest", label: "Interested in", value: interest },
      { key: "equipment", label: "Equipment", value: formData.getAll("equipment").map(String).slice(0, 20), list: true },
      { key: "mods", label: "Modifications", value: formData.getAll("mods").map(String).slice(0, 20), list: true },
      { key: "modsDetails", label: "Modification details", value: formData.get("modsDetails"), block: true },
      { key: "service", label: "Service type", value: formData.get("service") },
      { key: "duration", label: "Rental duration", value: formData.get("duration") },
      { key: "location", label: "Delivery location", value: formData.get("location") },
      { key: "notes", label: "Notes", value: formData.get("notes"), block: true },
    ],
    rules: [
      { field: "name", label: "name", required: true, max: 100 },
      { field: "phone", label: "phone number", required: true, type: "phone" },
      { field: "email", label: "email", type: "email", max: 200 },
      { field: "company", label: "company name", max: 150 },
      { field: "location", label: "delivery location", required: true, max: 200 },
      { field: "modsDetails", label: "modification details", max: 2000 },
      { field: "notes", label: "notes", max: 3000 },
    ],
  })
}
