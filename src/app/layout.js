import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/common/Navbar";
import Footer from "@/app/components/common/Footer";
import SiteChrome from "@/app/components/common/SiteChrome";
import { getContent } from "@/app/lib/server/content";
import Convoy from "./components/common/Convoy";
import WhatsAppButton from "@/app/components/common/WhatsAppButton";

// ─────────────────────────────────────────────
//  Root Layout
//  Wraps every page with:
//    - Google Font (Inter for body)
//    - Sticky Navbar (client component)
//    - Page content
//    - Footer (server component)
//
//  Text, links and metadata come from the
//  admin-managed content (lib/server/content.js).
// ─────────────────────────────────────────────

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export async function generateMetadata() {
  const { seo, site } = await getContent();
  return {
    title: {
      default: seo.title,
      template: seo.titleTemplate,
    },
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: seo.siteUrl,
      siteName: site.name,
    },
  };
}

export default async function RootLayout({ children }) {
  const content = await getContent();
  const { site, nav, footer, fleet, services } = content;
  const fleetLinks = fleet.map((f) => ({ id: f.id, name: f.name }));
  const serviceLinks = services.map((s) => ({ id: s.id, label: s.label }));

  return (
    <html lang="en">
      <body>
        <SiteChrome
          navbar={<Navbar site={site} nav={nav} fleet={fleetLinks} services={serviceLinks} />}
          footer={<Footer site={site} footer={footer} fleet={fleetLinks} services={serviceLinks} />}
          convoy={<Convoy />}
          whatsapp={<WhatsAppButton site={site} />}
        >
          {/* Children maps your main page sections dynamically */}
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
