"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useAuth, db } from '@/components/providers'

import { SignOutButton } from '@/components/SignOutButton'

type ProfileData = {
  beltRank: string
  rankDate: string
  location: string
  school: string
  trainingDuration: string
  stripes?: string; // Optional if not always present
  trainingStyle?: string; // Optional if not always present
  name?: string; // Add name property
  email?: string; // Add email property
}

export function UserProfile() {
  const { user, loading } = useAuth()

  const [isEditing, setIsEditing] = useState(false)

  const [profileData, setProfileData] = useState<ProfileData>({
    beltRank: '',
    rankDate: '',
    location: '',
    school: '',
    trainingDuration: '',
    stripes: '',
    trainingStyle: '',
    // name: user?.displayName || '',
    // email: user?.email || '',
  })

  const fetchProfileData = useCallback(async () => {
    if (user) {
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data() as ProfileData;
        setProfileData(data);
      } else {
        console.log("No user profile found in Firestore.");
      }
    }
  }, [user])

  useEffect(() => {
    fetchProfileData()
  }, [fetchProfileData])

  // Add this useEffect to log profileData whenever it changes
  // useEffect(() => {
  //   console.log('Updated profile data1:', profileData);
  // }, [profileData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setProfileData({ ...profileData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
    
    // Update Firestore with the new profile data
    if (user) {
      const docRef = doc(db, 'users', user.uid)
      try {
        await setDoc(docRef, profileData, { merge: true }) // Use merge to update only the fields that have changed
        console.log("Profile updated successfully")
      } catch (error) {
        console.error("Error updating profile:", error)
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={profileData.name} onChange={handleInputChange} disabled={!isEditing} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={profileData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="beltRank">Belt</Label>
            <Select
              name="beltRank"
              value={profileData.beltRank}
              onValueChange={(value) => handleSelectChange("beltRank", value)}
              disabled={!isEditing}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a belt" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="White">White</SelectItem>
                <SelectItem value="Blue">Blue</SelectItem>
                <SelectItem value="Purple">Purple</SelectItem>
                <SelectItem value="Brown">Brown</SelectItem>
                <SelectItem value="Black">Black</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="stripes">Stripes</Label>
            <Input
              id="stripes"
              name="stripes"
              type="number"
              min="0"
              max="4"
              value={profileData.stripes}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={profileData.location}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="trainingStyle">Training Style</Label>
            <Input
              id="trainingStyle"
              name="trainingStyle"
              value={profileData.trainingStyle}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          {isEditing ? (
            <div className="flex justify-end space-x-2">
              <Button type="submit">Save</Button>
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          ) : null}
        </form>
        <div className="flex justify-end space-x-2">
          <Button type="button" onClick={() => {
            console.log("Edit Profile clicked"); // Log to check if the button works
            setIsEditing(true);
          }}>
            Edit Profile
          </Button>
          <SignOutButton />
        </div>
      </CardContent>
    </Card>
  )
}

