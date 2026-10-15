import { getContent } from "@/app/lib/server/content"
import { pageMeta, siteBaseUrl } from "@/app/lib/server/seo"
import { areasLive, liveTowns } from "@/app/lib/content/areas"
import JsonLd, { breadcrumbJsonLd } from "@/app/components/common/JsonLd"
import AreasList from "@/app/components/pages/areas/AreasList"

// Until it is switched on in Admin → Service Areas, this page is a draft:
// reachable by its link for review, but not linked, not in the sitemap and hidden from Google.
export async function generateMetadata() {
  const { areas } = await getContent()
  const meta = pageMeta({ title: areas.metaTitle, description: areas.metaDescription, path: "/areas" })
  return areasLive(areas) ? meta : { ...meta, robots: { index: false, follow: false } }
}

const C = { dark: "#0f2d4a", goldText: "#86671e", gold: "#c9a84c", text: "#4a6b85" }

export default async function AreasPage() {
  const { areas, seo } = await getContent()
  const draft = !areasLive(areas)
  // While it's a draft, show every town (marked) so the list can be reviewed.
  const towns = draft ? areas.towns : liveTowns(areas)

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(siteBaseUrl(seo), [
          { name: areas.breadcrumbHome, path: "/" },
          { name: areas.breadcrumbCurrent, path: "/areas" },
        ])}
      />
      <div className="page-section wrap">
        <div style={{ width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 28, height: 2, background: C.gold }} />
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: C.goldText }}>{areas.eyebrow}</span>
          </div>
          <h1 style={{ fontSize: "clamp(26px, 5vw, 40px)", fontWeight: 900, color: C.dark, margin: "0 0 12px", lineHeight: 1.1 }}>
            {areas.titleStart} <span style={{ color: C.goldText }}>{areas.titleAccent}</span>
          </h1>
          <p style={{ fontSize: 14, color: C.text, maxWidth: 620, lineHeight: 1.8, margin: 0 }}>{areas.text}</p>
          {draft && (
            <p className="mt-6 max-w-3xl border-l-4 px-4 py-3 text-sm font-semibold" style={{ borderColor: C.gold, background: "#fbf6e9", color: "#5c4613" }}>
              Draft for review — Service Areas is not linked on the website or shown on Google until it is switched on in Admin → Service Areas.
            </p>
          )}
        </div>
      </div>

      <div className="page-section wrap">
        <AreasList
          towns={towns.map(({ id, name, state, county, published }) => ({ id, name, state, county, hidden: published !== "yes" }))}
          stateNames={areas.stateNames}
          searchLabel={areas.searchLabel}
          searchPlaceholder={areas.searchPlaceholder}
          noResults={areas.noResults}
          showHidden={draft}
        />
      </div>

      <div className="page-section wrap band-navy">
        <div style={{ width: "100%", maxWidth: 680 }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: "#fff", margin: "0 0 8px" }}>{areas.notListedTitle}</h2>
          <p style={{ fontSize: 14, color: "#a9c1d4", lineHeight: 1.8, margin: 0 }}>{areas.notListedText}</p>
        </div>
      </div>
    </>
  )
}
