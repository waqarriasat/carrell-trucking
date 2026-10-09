import { readMedia } from "@/app/lib/server/storage"
import { IMAGE_TYPES } from "@/app/lib/server/media-types"

// Serves images uploaded through the admin panel.
// File names are unique per upload, so they can be cached forever.
export async function GET(request, { params }) {
  const { name } = await params
  const ext = name.split(".").pop().toLowerCase()
  const type = IMAGE_TYPES[ext]
  if (!type) return new Response("Not found", { status: 404 })

  const file = await readMedia(name)
  if (!file) return new Response("Not found", { status: 404 })

  return new Response(file.body, {
    headers: {
      "Content-Type": type,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  })
}
