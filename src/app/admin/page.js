import { redirect } from "next/navigation"
import { getSession } from "@/app/lib/server/auth"
import { getRawContent, getContentMeta } from "@/app/lib/server/content"
import AdminApp from "./editor/AdminApp"

export default async function AdminPage({ searchParams }) {
  const session = await getSession()
  if (!session) redirect("/admin/login")

  const [content, meta, params] = await Promise.all([getRawContent(), getContentMeta(), searchParams])

  return (
    <AdminApp
      initialContent={content}
      adminEmail={session.email}
      lastSaved={meta.updatedAt}
      notice={params?.passwordChanged ? "Your password has been changed." : null}
    />
  )
}
