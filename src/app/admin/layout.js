export const metadata = {
  title: { absolute: "Admin Panel" },
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }) {
  return <div id="admin-root">{children}</div>
}
