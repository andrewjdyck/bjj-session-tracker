'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { auth } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormMessage, FormMessageValue } from '@/components/FormMessage'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<FormMessageValue>(null)
  const [submitting, setSubmitting] = useState(false)
  const [signedUpEmail, setSignedUpEmail] = useState<string | null>(null)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage(null)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await sendEmailVerification(userCredential.user)
      setSignedUpEmail(email)
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to create an account. Please try again.' })
      console.error(error)
    } finally {
      setSubmitting(false)
    }
  }

  if (signedUpEmail) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4">Check your email</h2>
          <FormMessage
            message={{ type: 'success', text: `We sent a verification email to ${signedUpEmail}. Please check your inbox.` }}
          />
          <Button asChild className="w-full">
            <Link href="/login">Go to log in</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <form onSubmit={handleSignUp} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <FormMessage message={message} />
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
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? 'Creating account…' : 'Sign Up'}
        </Button>
      </form>
    </div>
  )
}
