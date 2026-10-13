import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/common/Navbar";
import Footer from "@/app/components/common/Footer";
import SiteChrome from "@/app/components/common/SiteChrome";
import { getContent } from "@/app/lib/server/content";
import { siteBaseUrl } from "@/app/lib/server/seo";
import { publishedPosts, resourcesEnabled, isResourcesHref } from "@/app/lib/content/blog";
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
    metadataBase: new URL(siteBaseUrl(seo)),
    title: {
      default: seo.title,
      template: seo.titleTemplate,
    },
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "/",
      siteName: site.name,
    },
    twitter: { card: "summary_large_image" },
  };
}

// Browser bar colour on phones (matches the navy header).
export const viewport = {
  themeColor: "#0f2d4a",
};

export default async function RootLayout({ children }) {
  const content = await getContent();
  const { site, nav, footer, fleet, services, seo, blog } = content;
  // Header "Resources" menu + footer links (blog & FAQ) — hidden when switched off
  const showResources = resourcesEnabled(blog);
  const siteNav = showResources ? nav : { ...nav, links: (nav.links || []).filter((l) => !isResourcesHref(l.href)) };
  const posts = publishedPosts(blog);
  const resources = showResources && {
    ...blog.menu,
    guides: (posts.filter((p) => p.featured === "yes").length ? posts.filter((p) => p.featured === "yes") : posts)
      .slice(0, 6)
      .map(({ id, title }) => ({ id, title })),
    categories: blog.categories.map(({ id, label }) => ({ id, label })),
  };
  const base = siteBaseUrl(seo);
  const digits = (p) => String(p || "").replace(/[^\d+]/g, "");
  // Business details for search engines (Google business / Maps results)
  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${base}/#business`,
    name: site.name,
    url: base,
    description: seo.description,
    telephone: digits(site.phone),
    email: site.email || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.street,
      addressLocality: site.city,
      addressRegion: site.state,
      postalCode: site.zip,
      addressCountry: "US",
    },
    location: site.salesStreet
      ? {
          "@type": "Place",
          name: "Sales & Yard",
          address: {
            "@type": "PostalAddress",
            streetAddress: site.salesStreet,
            addressLocality: site.salesCity,
            addressRegion: site.salesState,
            postalCode: site.salesZip,
            addressCountry: "US",
          },
        }
      : undefined,
    areaServed: ["Southern Oklahoma", "North Texas", "United States"],
    makesOffer: fleet.map((f) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: `${f.name} rental`, url: `${base}/fleet/${f.id}` },
    })),
  };
  const fleetLinks = fleet.map((f) => ({ id: f.id, name: f.name, image: f.image, badge: f.badge }));
  // Small links in the header's top bar (only shown when there is at least one).
  const topLinks = content.pickup.published === "yes"
    ? [{ label: content.pickup.linkLabel, href: "/request-pickup" }, { label: nav.contactLabel || "Contact Us", href: "/contact" }]
    : [];
  const serviceLinks = services.map((s) => ({ id: s.id, label: s.label, description: s.description }));

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd).replace(/</g, "\\u003c") }}
        />
        <SiteChrome
          navbar={<Navbar site={site} nav={siteNav} fleet={fleetLinks} services={serviceLinks} resources={resources} topLinks={topLinks} />}
          footer={<Footer site={site} footer={footer} fleet={fleetLinks} services={serviceLinks} resources={resources} termsPublished={content.terms.published === "yes"} pickupLabel={content.pickup.published === "yes" ? content.pickup.linkLabel : ""} />}
          convoy={<Convoy fleet={fleet} />}
          whatsapp={<WhatsAppButton site={site} />}
        >
          {/* Children maps your main page sections dynamically */}
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
