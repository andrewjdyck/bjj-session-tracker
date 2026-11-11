import { getCommunityStats } from '@/lib/communityStats'

// Run per request so the cached value (and its revalidation) is always used,
// rather than a copy frozen at build time.
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    return Response.json(await getCommunityStats())
  } catch (error) {
    console.error('Failed to load community stats:', error)
    const detail = process.env.NODE_ENV === 'development' ? String(error) : undefined
    return Response.json({ error: 'Community stats unavailable', detail }, { status: 503 })
  }
}
