'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import { Providers, useAuth } from '@/components/providers'
import Link from 'next/link'
import { Button } from '../components/ui/button'

const inter = Inter({ subsets: ['latin'] })

// Create a client component for the navigation buttons
function NavButtons() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="space-x-4">
      <Button asChild variant="ghost">
        <Link href="/dashboard">Dashboard</Link>
      </Button>
      <Button asChild variant="ghost">
        <Link href="/track-session">Track Session</Link>
      </Button>
      <Button asChild variant="ghost">
        <Link href="/profile">Profile</Link>
      </Button>
    </div>
  )
}

// export const metadata = {
//   title: 'BJJ Tracker',
//   description: 'Track your Brazilian Jiu-Jitsu training sessions',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
              <Link href="/" className="text-xl font-bold">BJJ Tracker</Link>
              <NavButtons />
            </div>
          </nav>
          <main className="container mx-auto mt-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}

