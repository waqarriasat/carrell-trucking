"use server"

import { handleLead } from "@/app/lib/server/lead-flow"

export async function submitContact(formData) {
  return handleLead({
    kind: "Contact message",
    formData,
    customer: {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
    },
    fields: [{ key: "message", label: "Message", value: formData.get("message"), block: true }],
    rules: [
      { field: "name", label: "name", required: true, max: 100 },
      { field: "phone", label: "phone number", required: true, type: "phone" },
      { field: "email", label: "email", type: "email", max: 200 },
      { field: "message", label: "message", required: true, min: 5, max: 3000 },
    ],
  })
}
