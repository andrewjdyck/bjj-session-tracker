import { revalidateTag } from 'next/cache'
import { getAuth } from 'firebase-admin/auth'
import { adminApp } from '@/lib/firebaseAdmin'
import { COMMUNITY_STATS_TAG } from '@/lib/communityStats'

// Called by the app after a signed-in user saves a session. Requires a valid
// Firebase ID token so anonymous visitors can't force recalculations.
export async function POST(request: Request) {
  const token = request.headers.get('authorization')?.match(/^Bearer (.+)$/)?.[1]
  if (!token) {
    return Response.json({ error: 'Missing ID token' }, { status: 401 })
  }
  try {
    await getAuth(adminApp()).verifyIdToken(token)
  } catch {
    return Response.json({ error: 'Invalid ID token' }, { status: 401 })
  }

  // Expire immediately so the next request recalculates the total.
  revalidateTag(COMMUNITY_STATS_TAG, { expire: 0 })
  return Response.json({ revalidated: true })
}
