'use client'

import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useAuth, db } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SignOutButton } from '@/components/SignOutButton'
import { FormMessage, FormMessageValue } from '@/components/FormMessage'

type ProfileData = {
  beltRank: string
  rankDate: string
  location: string
  school: string
  trainingDuration: string
}

const EMPTY_PROFILE: ProfileData = {
  beltRank: '',
  rankDate: '',
  location: '',
  school: '',
  trainingDuration: '',
}

// Keep only the fields this form edits, defaulting missing ones to '' so
// inputs stay controlled when a user document lacks a field.
function toProfileData(data: Record<string, unknown>): ProfileData {
  const result = { ...EMPTY_PROFILE }
  for (const key of Object.keys(EMPTY_PROFILE) as (keyof ProfileData)[]) {
    if (typeof data[key] === 'string') result[key] = data[key] as string
  }
  // Belt values are lowercase (matching the SelectItem values below). Older
  // data from the archived v2 UI used "White", "Blue", ...
  result.beltRank = result.beltRank.trim().toLowerCase()
  return result
}

export default function Profile() {
  const { user, loading } = useAuth()
  const [profileData, setProfileData] = useState<ProfileData>(EMPTY_PROFILE)
  const [message, setMessage] = useState<FormMessageValue>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!user) return
    let cancelled = false
    getDoc(doc(db, 'users', user.uid)).then((docSnap) => {
      if (!cancelled && docSnap.exists()) {
        setProfileData(toProfileData(docSnap.data()))
      }
    })
    return () => {
      cancelled = true
    }
  }, [user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
    setMessage(null)
  }

  const handleSelectChange = (value: string) => {
    setProfileData((prev) => ({ ...prev, beltRank: value }))
    setMessage(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setSaving(true)
    try {
      // merge so fields this form doesn't edit (name, email, stripes, ...) are kept
      await setDoc(doc(db, 'users', user.uid), profileData, { merge: true })
      setMessage({ type: 'success', text: 'Profile updated.' })
    } catch (error) {
      console.error('Error saving profile:', error)
      setMessage({ type: 'error', text: 'Failed to save your profile. Please try again.' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <FormMessage message={message} />
        <div className="mb-4">
          <Select onValueChange={handleSelectChange} value={profileData.beltRank}>
            <SelectTrigger>
              <SelectValue placeholder="Select belt rank" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="white">White</SelectItem>
              <SelectItem value="blue">Blue</SelectItem>
              <SelectItem value="purple">Purple</SelectItem>
              <SelectItem value="brown">Brown</SelectItem>
              <SelectItem value="black">Black</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <Input
            type="date"
            name="rankDate"
            value={profileData.rankDate}
            onChange={handleInputChange}
            placeholder="Date received current rank"
          />
        </div>
        <div className="mb-4">
          <Input
            type="text"
            name="location"
            value={profileData.location}
            onChange={handleInputChange}
            placeholder="Location"
          />
        </div>
        <div className="mb-4">
          <Input
            type="text"
            name="school"
            value={profileData.school}
            onChange={handleInputChange}
            placeholder="Jiu-jitsu school"
          />
        </div>
        <div className="mb-6">
          <Input
            type="text"
            name="trainingDuration"
            value={profileData.trainingDuration}
            onChange={handleInputChange}
            placeholder="Training duration (e.g., 2 years)"
          />
        </div>
        <div className="flex gap-4">
          <SignOutButton />
          <Button type="submit" className="flex-1" disabled={saving}>
            {saving ? 'Saving…' : 'Update Profile'}
          </Button>
        </div>
      </form>
    </div>
  )
}

