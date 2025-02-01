'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { useAuth, db } from '@/components/providers'

export default function Dashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [monthlyDuration, setMonthlyDuration] = useState(0)
  const [totalDuration, setTotalDuration] = useState(0)

  const fetchSessionStats = useCallback(async () => {
    if (user) {
      const now = new Date()
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

      const sessionsRef = collection(db, 'users', user.uid, 'sessions')
      
      // Query for monthly sessions
      const monthlyQuery = query(
        sessionsRef,
        where('date', '>=', firstDayOfMonth.toISOString().split('T')[0]),
        where('date', '<=', lastDayOfMonth.toISOString().split('T')[0])
      )

      // Query for all sessions
      const allSessionsQuery = query(sessionsRef)

      // Execute both queries
      const [monthlySnapshot, allSessionsSnapshot] = await Promise.all([
        getDocs(monthlyQuery),
        getDocs(allSessionsQuery)
      ])

      // Calculate monthly total
      let monthlyTotal = 0
      monthlySnapshot.forEach((doc) => {
        monthlyTotal += doc.data().duration
      })
      setMonthlyDuration(monthlyTotal)

      // Calculate all-time total
      let allTimeTotal = 0
      allSessionsSnapshot.forEach((doc) => {
        allTimeTotal += doc.data().duration
      })
      setTotalDuration(allTimeTotal)
    }
  }, [user])

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    } else if (user) {
      fetchSessionStats()
    }
  }, [user, loading, router, fetchSessionStats])

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
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* ... table content ... */}
        </table>
      </div>
    </div>
  )
}

