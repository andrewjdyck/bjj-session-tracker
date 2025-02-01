'use client'

import { useAuth } from '@/components/providers'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/components/providers'

export default function Home() {
  const { user } = useAuth()
  const [totalMinutes, setTotalMinutes] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTotalMinutes() {
      try {
        setLoading(true)
        const statsDoc = await getDoc(doc(db, 'stats', 'global'))
        console.log("Stats doc exists:", statsDoc.exists());
        if (statsDoc.exists()) {
          const data = statsDoc.data();
          console.log("Stats data:", data);
          setTotalMinutes(data.totalTrainingMinutes || 0)
        } else {
          console.log("No stats document found");
        }
      } catch (error) {
        console.error('Error fetching total minutes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTotalMinutes()
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to BJJ Tracker (Alpha)</h1>
      <p className="text-xl mb-4">Track your Brazilian Jiu-Jitsu journey</p>
      
      <div className="text-lg mb-8 text-gray-600">
        {loading ? (
          <span>Loading community stats...</span>
        ) : (
          <>
            <span className="font-bold">{totalMinutes.toLocaleString()}</span> training minutes logged by our community
          </>
        )}
      </div>
      
      {!user ? (
        <div className="space-x-4">
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      ) : (
        <Button asChild>
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      )}
    </div>
  )
}

