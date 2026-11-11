'use client'

import { useAuth } from '@/components/providers'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { CommunityStats } from '@/lib/communityStats'

export default function Home() {
  const { user } = useAuth()
  const [totalMinutes, setTotalMinutes] = useState<number | null>(null) // null = unavailable
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetch('/api/community-stats')
      .then((res) => (res.ok ? (res.json() as Promise<CommunityStats>) : Promise.reject(res.status)))
      .then((stats) => {
        if (!cancelled) setTotalMinutes(stats.totalMinutes)
      })
      .catch((error) => console.error('Error fetching community stats:', error))
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to BJJ Tracker (Alpha)</h1>
      <p className="text-xl mb-4">Track your Brazilian Jiu-Jitsu journey</p>
      
      <div className="text-lg mb-8 text-gray-600">
        {loading ? (
          <span>Loading community stats...</span>
        ) : totalMinutes !== null ? (
          <>
            <span className="font-bold">{totalMinutes.toLocaleString()}</span> training minutes logged by our community
          </>
        ) : null}
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

