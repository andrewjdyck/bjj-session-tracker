'use client'

import { useAuth } from '@/components/providers'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/components/providers'
import { LoginModal } from "@/components/LoginModal"
import { SignupModal } from "@/components/SignupModal"

// import { DashboardHeader } from "@/components/dashboard-header"
// import { DashboardStats } from "@/components/dashboard-stats"
// import { TrainingHistory } from "@/components/training-history"
// import { CoachingTips } from "@/components/coaching-tips"
// import { AddTrainingButton } from "@/components/add-training-button"

export default function Home() {
  const { user } = useAuth()
  const [totalMinutes, setTotalMinutes] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)

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
    <div className="min-h-screen bg-background">
      {/* <DashboardHeader /> */}
      <main className="container mx-auto p-4 space-y-6">

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
          
          <div className="space-x-4">
            {!user ? (
              <>
                {/* <Button type="button" onClick={() => setShowLoginModal(true)}>Log In</Button>
                <Button type="button" onClick={() => setShowSignupModal(true)}>Sign Up</Button> */}
                <div className="space-y-4">
                  <Button asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild variant="outline" className="ml-4">
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </div>
              </>
            ) : (
              <Button asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            )}
          </div>
        </div>



        {/* <DashboardStats /> */}
        {/* <div className="grid gap-6 md:grid-cols-2"> */}
          {/* <TrainingHistory /> */}
          {/* <CoachingTips /> */}
        {/* </div> */}
      </main>
      {/* <AddTrainingButton /> */}

      {/* Modals */}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
      {showSignupModal && (
        <SignupModal onClose={() => setShowSignupModal(false)} />
      )}
    </div>
  )
}

