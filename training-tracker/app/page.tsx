'use client'

import { useAuth } from '@/components/providers'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to BJJ Tracker</h1>
      <p className="text-xl mb-8">Track your Brazilian Jiu-Jitsu journey</p>
      
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

