'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useAuth, db } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SignOutButton } from '@/components/SignOutButton'

type ProfileData = {
  beltRank: string
  rankDate: string
  location: string
  school: string
  trainingDuration: string
}

export default function Profile() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [profileData, setProfileData] = useState<ProfileData>({
    beltRank: '',
    rankDate: '',
    location: '',
    school: '',
    trainingDuration: '',
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    } else if (user) {
      fetchProfileData()
    }
  }, [user, loading, router])

  const fetchProfileData = async () => {
    if (user) {
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setProfileData(docSnap.data() as ProfileData)
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setProfileData((prev) => ({ ...prev, beltRank: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (user) {
      await setDoc(doc(db, 'users', user.uid), profileData)
      alert('Profile updated successfully')
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
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
          <Button type="submit" className="flex-1">Update Profile</Button>
        </div>
      </form>
    </div>
  )
}

