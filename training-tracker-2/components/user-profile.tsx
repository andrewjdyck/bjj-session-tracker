"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    belt: "Blue",
    stripes: "2",
    location: "New York, NY",
    trainingStyle: "Gi and No-Gi",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setProfile({ ...profile, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
    // Here you would typically send the updated profile to your backend
    console.log("Updated profile:", profile)
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
            <Input id="name" name="name" value={profile.name} onChange={handleInputChange} disabled={!isEditing} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="belt">Belt</Label>
            <Select
              name="belt"
              value={profile.belt}
              onValueChange={(value) => handleSelectChange("belt", value)}
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
              value={profile.stripes}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={profile.location}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="trainingStyle">Training Style</Label>
            <Input
              id="trainingStyle"
              name="trainingStyle"
              value={profile.trainingStyle}
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
          ) : (
            <Button type="button" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

