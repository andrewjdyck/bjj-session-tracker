'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { addDoc, collection } from 'firebase/firestore'
import { useAuth, db } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormMessage, FormMessageValue } from '@/components/FormMessage'
import { MAX_SESSION_MINUTES, parseDuration } from '@/lib/duration'
import { todayLocal } from '@/lib/dates'

type SessionData = {
  date: string
  duration: string // as typed; parsed and validated on submit
  notes: string
}

const emptySession = (): SessionData => ({ date: todayLocal(), duration: '60', notes: '' })

export default function TrackSession() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [sessionData, setSessionData] = useState<SessionData>(emptySession)
  const [message, setMessage] = useState<FormMessageValue>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!loading && !user) router.push('/login')
  }, [user, loading, router])

  if (loading) return <div>Loading...</div>
  if (!user) return null // redirecting to /login

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSessionData((prev) => ({ ...prev, [name]: value }))
    setMessage(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const duration = parseDuration(sessionData.duration)
    if (duration === null) {
      setMessage({ type: 'error', text: `Duration must be a whole number of minutes between 1 and ${MAX_SESSION_MINUTES}.` })
      return
    }
    setSaving(true)
    try {
      await addDoc(collection(db, 'users', user.uid, 'sessions'), {
        ...sessionData,
        duration,
        timestamp: new Date(),
      })
      // Ask the server to recalculate the community total. Best effort: the
      // session is already saved, and the total also refreshes daily.
      user
        .getIdToken()
        .then((token) =>
          fetch('/api/community-stats/revalidate', {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
          })
        )
        .catch((error) => console.error('Failed to refresh community stats:', error))
      setMessage({ type: 'success', text: `Logged a ${duration}-minute session on ${sessionData.date}.` })
      setSessionData(emptySession())
    } catch (error) {
      console.error('Error adding session:', error)
      setMessage({ type: 'error', text: 'Failed to log session. Please try again.' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white p-4 md:p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Track Jiu Jitsu Training Session</h2>
        <FormMessage message={message} />
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
            min={1}
            max={MAX_SESSION_MINUTES}
            step={1}
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
        <Button type="submit" className="w-full" disabled={saving}>
          {saving ? 'Saving…' : 'Log Session'}
        </Button>
      </form>
    </div>
  )
}
