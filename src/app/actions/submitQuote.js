"use server"

import { getContent } from "@/app/lib/server/content"
import { sendMail } from "@/app/lib/server/mailer"
import { buildLeadEmail } from "@/app/lib/server/lead-email"

export async function submitQuote(formData) {
  const data = {
    name:      formData.get("name"),
    phone:     formData.get("phone"),
    email:     formData.get("email"),
    company:   formData.get("company"),
    interest:  formData.get("interest"),
    equipment: formData.getAll("equipment"),
    service:   formData.get("service"),
    duration:  formData.get("duration"),
    location:  formData.get("location"),
    notes:     formData.get("notes"),
  }

  if (!data.name || !data.phone) {
    return { success: false, error: "Name and phone are required." }
  }

  const { site } = await getContent()

  try {
    const mail = buildLeadEmail({
      kind: "Quote request",
      site,
      customer: data,
      tag: data.interest,
      fields: [
        { label: "Interested in", value: data.interest },
        { label: "Equipment", value: data.equipment, list: true },
        { label: "Service type", value: data.service },
        { label: "Rental duration", value: data.duration },
        { label: "Delivery location", value: data.location },
        { label: "Notes", value: data.notes, block: true },
      ],
    })
    await sendMail({ to: site.formRecipient, fromName: `${site.name} Website`, ...mail })
    return { success: true }
  } catch (err) {
    console.error("Quote email error:", err)
    return { success: false, error: `Sorry, your request could not be sent. Please call us at ${site.phone}.` }
  }
}
