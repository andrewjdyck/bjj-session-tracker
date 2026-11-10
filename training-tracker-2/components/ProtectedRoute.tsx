"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from '@/components/providers'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true) // Set mounted to true after the first render
  }, [])

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login') // Redirect to login if not authenticated
    }
  }, [loading, user, router])

  if (!isMounted || loading) {
    return null; // Optionally, you can return a loading spinner or placeholder
  }

  return <>{children}</>; // Render the children if authenticated
}

export default ProtectedRoute 