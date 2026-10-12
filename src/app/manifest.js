import { getContent } from "@/app/lib/server/content"

// Name, colours and icons used when the site is saved to a phone's home screen.
export default async function manifest() {
  const { site, seo } = await getContent()
  return {
    name: site.name,
    short_name: site.name.replace(/,?\s*Inc\.?$/i, ""),
    description: seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f2d4a",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  }
}
