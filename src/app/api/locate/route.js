// GET /api/locate?lat=..&lon=.. — turns a visitor's position (from the
// "Use my location" button, only after they allow it) into a street address,
// using OpenStreetMap's free address lookup. Called through our server so the
// lookup is identified properly and the visitor's IP isn't passed on.

export const dynamic = "force-dynamic"

const LOOKUP_URL = process.env.GEOCODE_URL || "https://nominatim.openstreetmap.org/reverse"
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 20
const recent = new Map()

function tooMany(key) {
  const now = Date.now()
  const times = (recent.get(key) || []).filter((t) => now - t < WINDOW_MS)
  times.push(now)
  recent.set(key, times)
  if (recent.size > 5000) recent.clear()
  return times.length > MAX_PER_WINDOW
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const lat = Number(searchParams.get("lat"))
  const lon = Number(searchParams.get("lon"))
  if (!searchParams.get("lat") || !searchParams.get("lon") || !Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) {
    return Response.json({ error: "Invalid position." }, { status: 400 })
  }
  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown"
  if (tooMany(ip)) return Response.json({ error: "Too many lookups. Please type the address." }, { status: 429 })

  const url = `${LOOKUP_URL}?${new URLSearchParams({ format: "jsonv2", lat: lat.toFixed(6), lon: lon.toFixed(6), addressdetails: "1", zoom: "18" })}`
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "ArdmoreTrailerWebsite/1.0 (delivery address lookup)", "Accept-Language": "en" },
      signal: AbortSignal.timeout(6000),
      cache: "no-store",
    })
    if (!res.ok) throw new Error(`lookup ${res.status}`)
    const a = (await res.json())?.address || {}
    const street = [a.house_number, a.road].filter(Boolean).join(" ")
    const city = a.city || a.town || a.village || a.hamlet || a.municipality || a.county || ""
    const result = { street, city, state: a.state || "", zip: a.postcode || "", country: a.country_code || "" }
    if (!result.city && !result.state) throw new Error("no address")
    return Response.json(result)
  } catch (err) {
    console.error("[locate] address lookup failed:", err?.message || err)
    return Response.json({ error: "We couldn't find your address. Please type it in." }, { status: 502 })
  }
}
