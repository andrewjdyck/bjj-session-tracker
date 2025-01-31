'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { useAuth, db } from '../../components/providers'

export default function Dashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [totalDuration, setTotalDuration] = useState(0)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    } else if (user) {
      fetchSessionStats()
    }
  }, [user, loading, router])

  const fetchSessionStats = async () => {
    if (user) {
      const now = new Date()
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

      const sessionsRef = collection(db, 'users', user.uid, 'sessions')
      const q = query(
        sessionsRef,
        where('date', '>=', firstDayOfMonth.toISOString().split('T')[0]),
        where('date', '<=', lastDayOfMonth.toISOString().split('T')[0])
      )

      const querySnapshot = await getDocs(q)
      let total = 0
      querySnapshot.forEach((doc) => {
        total += doc.data().duration
      })
      setTotalDuration(total)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Stats Dashboard</h2>
        <p className="text-lg">
          Total training duration this month: {totalDuration} minutes
        </p>
      </div>
    </div>
  )
}

