import { redirect } from "next/navigation"
import { getSession } from "@/app/lib/server/auth"
import { getContent } from "@/app/lib/server/content"
import AuthShell from "../AuthShell"
import LoginForm from "./LoginForm"

export default async function LoginPage() {
  if (await getSession()) redirect("/admin")
  const { site } = await getContent()

  return (
    <AuthShell brand={site.logoTop} title="Sign in" subtitle="Sign in to edit your website's content.">
      <LoginForm />
    </AuthShell>
  )
}
