import { db } from '@/components/providers'
import { doc, getDoc, setDoc, runTransaction } from 'firebase/firestore'

export async function updateGlobalStats(minutesChange: number) {
  try {
    await runTransaction(db, async (transaction) => {
      const statsRef = doc(db, 'stats', 'global')
      const statsDoc = await transaction.get(statsRef)
      
      const currentTotal = statsDoc.exists() 
        ? (statsDoc.data().totalTrainingMinutes || 0) 
        : 0

      transaction.set(statsRef, {
        totalTrainingMinutes: Number(currentTotal) + minutesChange,
        lastUpdated: new Date()
      }, { merge: true })
    })
  } catch (error) {
    console.error('Error updating global stats:', error)
  }
} 