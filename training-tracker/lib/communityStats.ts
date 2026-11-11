import 'server-only'
import { unstable_cache } from 'next/cache'
import { AggregateField, getFirestore } from 'firebase-admin/firestore'
import { adminApp } from '@/lib/firebaseAdmin'

export const COMMUNITY_STATS_TAG = 'community-stats'

export type CommunityStats = {
  totalMinutes: number
  sessionCount: number
  calculatedAt: string
}

// Sums duration across every user's sessions with a server-side aggregation
// query (billed as about 1 read per 1,000 sessions). The result is cached and
// recalculated when:
//   - a session is saved (POST /api/community-stats/revalidate), or
//   - a day has passed, as a backstop.
export const getCommunityStats = unstable_cache(
  async (): Promise<CommunityStats> => {
    const snapshot = await getFirestore(adminApp())
      .collectionGroup('sessions')
      .aggregate({
        totalMinutes: AggregateField.sum('duration'),
        sessionCount: AggregateField.count(),
      })
      .get()
    const { totalMinutes, sessionCount } = snapshot.data()
    return {
      totalMinutes: totalMinutes ?? 0,
      sessionCount,
      calculatedAt: new Date().toISOString(),
    }
  },
  ['community-stats'],
  { tags: [COMMUNITY_STATS_TAG], revalidate: 60 * 60 * 24 }
)
