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
    default: "Ardmore Trailer, Inc. | Trailer & Container Rental Oklahoma",
    template: "%s | Ardmore Trailer, Inc.",
  },
  description: "Southern Oklahoma's trusted trailer and container rental. Reefer, dry containers, generators, office units. Call 580-226-7811.",
  keywords: ["trailer rental", "container rental", "reefer trailer", "Oklahoma", "Ardmore"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ardmoretrailer.com",
    siteName: "Ardmore Trailer, Inc.",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        
        {/* Children maps your main page sections dynamically */}
        {children}

        {/* Keeping animation layered cleanly over the footer baseline layout */}
        
        
        <Footer />

        <Convoy /> 
        
      </body>
    </html>
  );
}