import { readJSON, writeJSON, storageInfo, getBlobStore } from "@/app/lib/server/storage"

export const dynamic = "force-dynamic"

// GET /api/admin/storage-check — confirms the admin panel can save and read data
// on this deployment (write → read-back round trip). Reports no secrets.
let lastRun = 0

export async function GET() {
  if (Date.now() - lastRun < 5000) {
    return Response.json({ error: "Please wait a few seconds and try again." }, { status: 429 })
  }
  lastRun = Date.now()

  const { driver } = storageInfo()
  const report = {
    driver,
    blobTokenPresent: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
    blobAccessSetting: process.env.BLOB_ACCESS || "(auto-detect)",
  }

  const stamp = new Date().toISOString()
  try {
    await writeJSON("healthcheck.json", { stamp })
    report.write = "ok"
  } catch (err) {
    report.write = `FAILED: ${err?.message || err}`
  }
  try {
    const back = await readJSON("healthcheck.json")
    report.read = back?.stamp === stamp ? "ok" : `FAILED: read back ${JSON.stringify(back)}`
  } catch (err) {
    report.read = `FAILED: ${err?.message || err}`
  }
  if (driver === "vercel-blob") report.detectedStoreAccess = (await getBlobStore()).access

  report.ok = report.write === "ok" && report.read === "ok"
  return Response.json(report, { status: report.ok ? 200 : 500, headers: { "Cache-Control": "no-store" } })
}
