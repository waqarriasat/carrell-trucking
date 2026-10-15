import { redirect } from "next/navigation"
import { getSession, listUsers } from "@/app/lib/server/auth"
import { getRawContent, getContentMeta } from "@/app/lib/server/content"
import { CONTENT_VERSION } from "@/app/lib/content/upgrade"
import { listLeads } from "@/app/lib/server/leads"
import AdminApp from "./editor/AdminApp"

export default async function AdminPage({ searchParams }) {
  const session = await getSession()
  if (!session) redirect("/admin/login")

  const [content, meta, params, leads, users] = await Promise.all([
    getRawContent(),
    getContentMeta(),
    searchParams,
    listLeads().catch(() => []),
    listUsers().catch(() => []),
  ])

  return (
    <AdminApp
      initialContent={content}
      contentVersion={CONTENT_VERSION}
      adminEmail={session.email}
      me={session}
      initialUsers={users}
      lastSaved={meta.updatedAt}
      initialLeads={leads}
      notice={params?.passwordChanged ? "Your password has been changed." : null}
    />
  )
}
