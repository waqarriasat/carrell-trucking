import Link from "next/link"
import { getContent } from "@/app/lib/server/content"
import AuthShell from "../AuthShell"
import ForgotForm from "./ForgotForm"

export default async function ForgotPasswordPage() {
  const { site } = await getContent()
  return (
    <AuthShell
      brand={site.logoTop}
      title="Reset your password"
      subtitle="Enter the admin email address and we'll send you a secure link to choose a new password."
      footer={
        <Link href="/admin/login" className="font-semibold text-slate-300 hover:text-white">
          ← Back to sign in
        </Link>
      }
    >
      <ForgotForm />
    </AuthShell>
  )
}
