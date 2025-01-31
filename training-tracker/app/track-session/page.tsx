'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addDoc, collection } from 'firebase/firestore'
import { useAuth, db } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

type SessionData = {
  date: string
  duration: number
  notes: string
}

export default function TrackSession() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [sessionData, setSessionData] = useState<SessionData>({
    date: new Date().toISOString().split('T')[0],
    duration: 60,
    notes: '',
  })

  if (loading) return <div>Loading...</div>
  if (!user) {
    router.push('/login')
    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSessionData((prev) => ({ ...prev, [name]: name === 'duration' ? parseInt(value) : value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'users', user.uid, 'sessions'), {
        ...sessionData,
        timestamp: new Date(),
      })
      alert('Session logged successfully')
      setSessionData({
        date: new Date().toISOString().split('T')[0],
        duration: 60,
        notes: '',
      })
    } catch (error) {
      console.error('Error adding document: ', error)
      alert('Failed to log session. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Track Jiu Jitsu Training Session</h2>
        <div className="mb-4">
          <Input
            type="date"
            name="date"
            value={sessionData.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <Input
            type="number"
            name="duration"
            value={sessionData.duration}
            onChange={handleInputChange}
            placeholder="Duration (minutes)"
            required
          />
        </div>
        <div className="mb-6">
          <Textarea
            name="notes"
            value={sessionData.notes}
            onChange={handleInputChange}
            placeholder="Session notes (optional)"
            rows={4}
          />
        </div>
        <Button type="submit" className="w-full">Log Session</Button>
      </form>
    </div>
  )
}

