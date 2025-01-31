'use client'

import { useAuth } from './providers'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

export function SignOutButton() {
  const { signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.replace('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <Button 
      variant="outline" 
      onClick={handleSignOut}
    >
      Sign Out
    </Button>
  )
}