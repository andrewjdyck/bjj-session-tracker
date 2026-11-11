'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { collection, query, where, getDocs, QuerySnapshot } from 'firebase/firestore'
import { useAuth, db } from '@/components/providers'
import { monthRange } from '@/lib/dates'

// Sum session durations, ignoring any legacy non-numeric values.
function totalMinutes(snapshot: QuerySnapshot): number {
  let total = 0
  snapshot.forEach((doc) => {
    const duration = Number(doc.data().duration)
    if (Number.isFinite(duration)) total += duration
  })
  return total
}

export default function Dashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [monthlyDuration, setMonthlyDuration] = useState(0)
  const [totalDuration, setTotalDuration] = useState(0)

  useEffect(() => {
    if (loading) return
    if (!user) {
      router.push('/login')
      return
    }

    let cancelled = false
    const { start, end } = monthRange() // local calendar month
    const sessionsRef = collection(db, 'users', user.uid, 'sessions')
    Promise.all([
      getDocs(query(sessionsRef, where('date', '>=', start), where('date', '<=', end))),
      getDocs(sessionsRef),
    ])
      .then(([monthly, allTime]) => {
        if (cancelled) return
        setMonthlyDuration(totalMinutes(monthly))
        setTotalDuration(totalMinutes(allTime))
      })
      .catch((error) => console.error('Error loading session stats:', error))
    return () => {
      cancelled = true
    }
  }, [user, loading, router])

  if (loading) return <div>Loading...</div>

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Stats Dashboard</h2>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold mb-2">This Month</h3>
            <p className="text-lg">
              {monthlyDuration} minutes
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">All Time</h3>
            <p className="text-lg">
              {totalDuration} minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
