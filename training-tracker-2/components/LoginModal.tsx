"use client"

import { useState } from "react"
import { useAuth } from '@/components/providers'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import '@/styles/modal.css'; 

import { signInWithEmailAndPassword } from 'firebase/auth'

export function LoginModal({ onClose }: { onClose: () => void }) {
  const { signIn } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  console.log('Running in login modal')
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signIn(email, password)
      onClose() // Close the modal on successful login
    } catch (err) {
      setError("Failed to log in. Please check your credentials.")
    }
  }

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleLogin}>
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
          <Button type="submit">Log In</Button>
          <Button type="button" onClick={onClose}>Cancel</Button>
        </form>
      </div>
    </>
  )
} 