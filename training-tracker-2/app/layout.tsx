"use client"

import { DashboardHeader } from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
// import { AnalyticsWrapper } from "@/lib/analytics"
import type React from "react"

import { Providers, useAuth } from '@/components/providers'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login') // Redirect to login if not authenticated
    }
  }, [loading, user, router])

  return (
    <html lang="en">
      <body>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="min-h-screen bg-background">
              <DashboardHeader />
              <main className="container mx-auto p-4 space-y-6">{children}</main>
            </div>
          </ThemeProvider>
          {/* <AnalyticsWrapper /> */}
        </Providers>
      </body>
    </html>
  )
}

import '@/styles/globals.css'