import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { FaCheck, FaPhone } from "react-icons/fa"
import { FaFileInvoice, FaLocationDot } from "react-icons/fa6"
import Breadcrumb from "@/app/components/common/Breadcrumb"
import JsonLd, { breadcrumbJsonLd } from "@/app/components/common/JsonLd"
import FaqList from "@/app/components/pages/blog/FaqList"
import { plainText } from "@/app/components/pages/blog/Markdown"
import { getContent } from "@/app/lib/server/content"
import { pageMeta, siteBaseUrl } from "@/app/lib/server/seo"
import { hasPoint, isTownLive, liveTowns, nearbyTowns, townLabel, townText } from "@/app/lib/content/areas"
import { imageProps, isCutout } from "@/app/lib/content/images"
import { fill } from "@/app/lib/content/resolve"

// Town pages are drafts (reachable by link, hidden from Google) until both
// Service Areas and the town are switched on in Admin → Service Areas.
export async function generateStaticParams() {
  const { areas } = await getContent()
  return liveTowns(areas).map((t) => ({ town: t.id }))
}

async function findTown(id) {
  const { areas } = await getContent()
  return { areas, town: (areas.towns || []).find((t) => t.id === id) }
}

export async function generateMetadata({ params }) {
  const { town: id } = await params
  const { areas, town } = await findTown(id)
  if (!town) return { title: "Not Found" }
  const meta = pageMeta({
    title: townText(areas.townMetaTitle, town),
    description: townText(areas.townMetaDescription, town),
    path: `/areas/${town.id}`,
  })
  return isTownLive(areas, town) ? meta : { ...meta, robots: { index: false, follow: false } }
}

const C = {
  dark: "#0f2d4a",
  navy: "#1e4d7b",
  gold: "#c9a84c",
  goldText: "#86671e",
  muted: "#a9c1d4",
  light: "#f0f6fb",
  border: "#d6e8f5",
  text: "#4a6b85",
}

// OpenStreetMap embed centred on the town (no API key, no cookies).
function mapUrl(town) {
  const dLat = 0.09, dLng = 0.12
  const box = [town.lng - dLng, town.lat - dLat, town.lng + dLng, town.lat + dLat].map((n) => n.toFixed(4)).join(",")
  return `https://www.openstreetmap.org/export/embed.html?bbox=${box}&layer=mapnik&marker=${town.lat},${town.lng}`
}

function Label({ children, light }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
      <div style={{ width: 24, height: 2, background: C.gold }} />
      <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: light ? C.gold : C.goldText }}>{children}</span>
    </div>
  )
}

export default async function TownPage({ params }) {
  const { town: id } = await params
  const { areas, fleet, site, seo } = await getContent()
  const town = (areas.towns || []).find((t) => t.id === id)
  if (!town) notFound()

  const draft = !isTownLive(areas, town)
  const label = townLabel(town)
  const units = (town.fleet || []).map((fid) => fleet.find((f) => f.id === fid)).filter(Boolean)
  // The town's own questions first, then the ones every town page shares.
  const faqs = [...(town.faqs || []), ...(areas.commonFaqs || []).map((f) => ({ q: townText(f.q, town), a: townText(f.a, town) }))].filter((f) => f.q && f.a)
  // Other towns: the live ones (or every town while reviewing drafts).
  const others = (draft ? areas.towns : liveTowns(areas)).filter((t) => t.id !== town.id)
  const nearby = nearbyTowns(town, others)
  const hasMap = hasPoint(town)
  const quoteHref = `/quote?${new URLSearchParams({ location: label }).toString()}`
  const base = siteBaseUrl(seo)

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(base, [
          { name: areas.breadcrumbHome, path: "/" },
          { name: areas.breadcrumbCurrent, path: "/areas" },
          { name: label, path: `/areas/${town.id}` },
        ])}
      />
      {!draft && faqs.length ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((it) => ({ "@type": "Question", name: it.q, acceptedAnswer: { "@type": "Answer", text: plainText(it.a) } })),
          }}
        />
      ) : null}

      {/* Hero */}
      <div className="page-section wrap">
        <div style={{ width: "100%" }}>
          <Breadcrumb crumbs={[{ label: areas.breadcrumbHome, href: "/" }, { label: areas.breadcrumbCurrent, href: "/areas" }, { label }]} />
          <Label>{areas.townEyebrow}</Label>
          <h1 style={{ fontSize: "clamp(26px, 5vw, 40px)", fontWeight: 900, color: C.dark, margin: "0 0 10px", lineHeight: 1.1 }}>
            {areas.townTitle} <span style={{ color: C.goldText }}>{label}</span>
          </h1>
          <p style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: C.text, margin: "0 0 16px" }}>
            <FaLocationDot style={{ color: C.gold, flexShrink: 0 }} aria-hidden="true" />
            {townText(town.miles ? areas.distanceText : areas.homeText, town)}
          </p>
          {(town.intro || []).map((p, i) => (
            <p key={i} style={{ fontSize: 14, color: C.text, maxWidth: 680, lineHeight: 1.8, margin: "0 0 12px" }}>{p}</p>
          ))}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 18 }}>
            <Link href={quoteHref} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 800, padding: "12px 18px", borderRadius: 4, background: C.gold, color: C.dark, textDecoration: "none" }}>
              <FaFileInvoice size={14} /> {townText(areas.quoteButtonLabel, town)}
            </Link>
            <a href={site.phoneHref} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 800, padding: "12px 18px", borderRadius: 4, border: `2px solid ${C.navy}`, color: C.navy, textDecoration: "none" }}>
              <FaPhone size={13} /> {areas.callButtonLabel}
            </a>
          </div>
        </div>
      </div>

      {/* Points + units */}
      <div className="page-section wrap">
        <div style={{ width: "100%", display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", alignItems: "start" }}>
          {(town.points || []).length ? (
            <div style={{ background: "#fff", borderRadius: 4, padding: 20, border: `1.5px solid ${C.border}` }}>
              <Label>{townText(areas.pointsLabel, town)}</Label>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {town.points.map((p, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: C.text }}>
                    <FaCheck size={11} style={{ color: C.goldText, flexShrink: 0 }} aria-hidden="true" /> {p}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {units.length ? (
            <div style={{ background: "#fff", borderRadius: 4, padding: 20, border: `1.5px solid ${C.border}` }}>
              <Label>{townText(areas.unitsLabel, town)}</Label>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {units.map((f) => (
                  <Link key={f.id} href={`/fleet/${f.id}`} style={{ display: "flex", gap: 12, alignItems: "center", padding: 10, borderRadius: 4, border: `1.5px solid ${C.border}`, textDecoration: "none", background: C.light }}>
                    {f.image ? (
                      <span style={{ position: "relative", width: 92, height: 64, flexShrink: 0, borderRadius: 4, overflow: "hidden", background: "#fff" }}>
                        <Image src={f.image} alt="" fill sizes="92px" {...imageProps(f.image)} style={{ objectFit: isCutout(f.image) ? "contain" : "cover" }} />
                      </span>
                    ) : null}
                    <span style={{ minWidth: 0 }}>
                      <span style={{ display: "block", fontSize: 13, fontWeight: 700, color: C.dark }}>
                        {f.name} <span style={{ fontWeight: 600, fontSize: 11, color: C.text }}>{(f.sizes || []).join(" · ")}</span>
                      </span>
                      {f.listDescription ? <span style={{ display: "block", fontSize: 12, color: C.text, lineHeight: 1.5, marginTop: 2 }}>{f.listDescription}</span> : null}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* How delivery works */}
      {(areas.steps || []).length ? (
        <div className="page-section wrap">
          <div style={{ width: "100%" }}>
            <Label>{areas.stepsLabel}</Label>
            <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              {areas.steps.map((s, i) => (
                <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: C.light, border: `1.5px solid ${C.border}`, borderRadius: 4, padding: 16 }}>
                  <span style={{ width: 28, height: 28, borderRadius: 4, background: C.dark, color: C.gold, fontWeight: 900, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</span>
                  <span style={{ fontSize: 13, color: C.text, lineHeight: 1.6 }}>{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      ) : null}

      {/* Rent, buy or rent-to-own + getting the site ready */}
      {(areas.options || []).length || (areas.prepItems || []).length ? (
        <div className="page-section wrap">
          <div style={{ width: "100%", display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", alignItems: "start" }}>
            {(areas.options || []).length ? (
              <div>
                <Label>{townText(areas.optionsLabel, town)}</Label>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {areas.options.map((o, i) => (
                    <div key={i} style={{ background: "#fff", border: `1.5px solid ${C.border}`, borderLeft: `4px solid ${C.gold}`, borderRadius: 4, padding: "12px 16px" }}>
                      <div style={{ fontSize: 14, fontWeight: 800, color: C.dark, marginBottom: 3 }}>{o.title}</div>
                      <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6 }}>{townText(o.text, town)}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            {(areas.prepItems || []).length ? (
              <div style={{ background: C.light, border: `1.5px solid ${C.border}`, borderRadius: 4, padding: 20 }}>
                <Label>{townText(areas.prepLabel, town)}</Label>
                {areas.prepText ? <p style={{ fontSize: 13, color: C.text, lineHeight: 1.7, margin: "0 0 12px" }}>{townText(areas.prepText, town)}</p> : null}
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {areas.prepItems.map((p, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: C.text, lineHeight: 1.6 }}>
                      <FaCheck size={11} style={{ color: C.goldText, flexShrink: 0, marginTop: 5 }} aria-hidden="true" /> {townText(p, town)}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* Map + nearby towns */}
      {hasMap || nearby.length ? (
        <div className="page-section wrap">
          <div style={{ width: "100%", display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", alignItems: "start" }}>
            {hasMap ? (
              <div>
                <Label>{townText(areas.mapLabel, town)}</Label>
                <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 10", borderRadius: 4, overflow: "hidden", border: `1.5px solid ${C.border}`, background: C.light }}>
                  <iframe
                    title={townText(areas.mapLabel, town)}
                    src={mapUrl(town)}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
                  />
                </div>
                {areas.mapNote ? <p style={{ fontSize: 12, color: C.text, lineHeight: 1.6, margin: "8px 0 0" }}>{townText(areas.mapNote, town)}</p> : null}
              </div>
            ) : null}
            {nearby.length ? (
              <div>
                <Label>{townText(areas.nearbyLabel, town)}</Label>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {nearby.map(({ town: t, miles, direction }) => (
                    <li key={t.id}>
                      <Link href={`/areas/${t.id}`} style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "10px 14px", borderRadius: 4, border: `1.5px solid ${C.border}`, background: "#fff", textDecoration: "none" }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{townLabel(t)}</span>
                        <span style={{ fontSize: 12, color: C.text }}>{fill(areas.nearbyDistance, { miles: String(miles), direction })}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* Questions */}
      {faqs.length ? (
        <section className="page-section wrap">
          <div className="grid lg:grid-cols-[320px_minmax(0,1fr)] gap-8 lg:gap-16" style={{ width: "100%" }}>
            <h2 className="text-2xl md:text-3xl font-black leading-tight" style={{ color: C.dark, fontFamily: "Georgia, 'Times New Roman', serif" }}>
              {label}: {areas.faqLabel}
            </h2>
            <FaqList items={faqs} />
          </div>
        </section>
      ) : null}

      {/* Other towns */}
      {others.length ? (
        <div className="page-section wrap band-navy">
          <div style={{ width: "100%" }}>
            <Label light>{areas.otherLabel}</Label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {others.map((t) => (
                <Link key={t.id} href={`/areas/${t.id}`} style={{ fontSize: 13, fontWeight: 600, color: "#fff", textDecoration: "none", border: `1px solid ${C.navy}`, borderRadius: 4, padding: "8px 12px" }}>
                  {townLabel(t)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
