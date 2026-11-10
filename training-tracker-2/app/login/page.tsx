'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      // alert('Login successful: ' + userCredential.user.email)
      // console.log("Login successful:", userCredential)
      router.push('/dashboard')
    } catch (error) {
      setError('Failed to log in. Please check your credentials.')
      alert('login error: ' + (error as any).message)
      console.error('Login error:', error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <form onSubmit={handleLogin} className="bg-background p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Log In</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-between mt-4">
          <Button type="submit" className="w-full mr-2">Log In</Button>
          <Button type="button" className="w-full" onClick={() => router.push('/')}>Cancel</Button>
        </div>
      </form>
    </div>
  )
}

