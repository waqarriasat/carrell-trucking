import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/common/Navbar";
import Footer from "@/app/components/common/Footer";
import { SITE } from "@/app/lib/constants";
import Convoy from "./components/common/Convoy";

// ─────────────────────────────────────────────
//  Root Layout
//  Wraps every page with:
//    - Google Font (Inter for body)
//    - Sticky Navbar (client component)
//    - Page content
//    - Footer (server component)
//
//  Metadata uses SITE constants so it stays
//  in sync with lib/constants.js automatically.
// ─────────────────────────────────────────────

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "trailer rental",
    "container rental",
    "reefer trailer rental",
    "storage container rental",
    "Ardmore Oklahoma",
    "Southern Oklahoma equipment rental",
    "mobile office rental",
    "generator rental",
    "mud lab trailer",
    "Carrell Trucking",
  ],
  authors: [{ name: SITE.president.name }],
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
  },
  metadataBase: new URL("https://ardmoretrailer.com"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        
        {/* Children maps your main page sections dynamically */}
        {children}

        {/* Keeping animation layered cleanly over the footer baseline layout */}
        <Convoy /> 
        
        <Footer />
      </body>
    </html>
  );
}