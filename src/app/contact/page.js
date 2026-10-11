import ContactPageClient from "@/app/components/pages/contact/ContactPageClient"
import { getContent } from "@/app/lib/server/content"
import { pageMeta } from "@/app/lib/server/seo"

export async function generateMetadata() {
  const { contact } = await getContent()
  return pageMeta({ title: "Contact Us — Ardmore, Oklahoma", description: contact.text, path: "/contact" })
}

export default async function ContactPage() {
  const { contact, site } = await getContent()
  return <ContactPageClient page={contact} site={site} />
}
