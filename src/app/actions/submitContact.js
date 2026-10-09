"use server"

import { getContent } from "@/app/lib/server/content"
import { sendMail } from "@/app/lib/server/mailer"
import { buildLeadEmail } from "@/app/lib/server/lead-email"

export async function submitContact(formData) {
  const data = {
    name:    formData.get("name"),
    phone:   formData.get("phone"),
    email:   formData.get("email"),
    message: formData.get("message"),
  }

  if (!data.name || !data.phone || !data.message) {
    return { success: false, error: "Name, phone and message are required." }
  }

  const { site } = await getContent()

  try {
    const mail = buildLeadEmail({
      kind: "Contact message",
      site,
      customer: data,
      fields: [{ label: "Message", value: data.message, block: true }],
    })
    await sendMail({ to: site.formRecipient, fromName: `${site.name} Website`, ...mail })
    return { success: true }
  } catch (err) {
    console.error("Contact email error:", err)
    return { success: false, error: `Failed to send. Please call us at ${site.phone}.` }
  }
}
