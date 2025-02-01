import { db } from '@/components/providers'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

export async function trackUserEvent(userId: string, eventType: string, metadata = {}) {
  try {
    await addDoc(collection(db, 'users', userId, 'events'), {
      type: eventType,
      timestamp: serverTimestamp(),
      ...metadata
    })
  } catch (error) {
    console.error('Error tracking event:', error)
  }
} 