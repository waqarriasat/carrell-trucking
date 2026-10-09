import ContactPageClient from "@/app/components/pages/contact/ContactPageClient"
import { getContent } from "@/app/lib/server/content"

export default async function ContactPage() {
  const { contact, site } = await getContent()
  return <ContactPageClient page={contact} site={site} />
}
