"use client"

import { useState } from "react"
import { useAuth } from '@/components/providers'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SignupModal({ onClose }: { onClose: () => void }) {
  const { signUp } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signUp(email, password)
      onClose() // Close the modal on successful signup
    } catch (err) {
      setError("Failed to sign up. Please try again.")
    }
  }

  return (
    <div className="modal bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold">Sign Up</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSignup}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Sign Up</Button>
        <Button type="button" onClick={onClose}>Cancel</Button>
      </form>
    </div>
  )
} 