'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import { Providers, useAuth } from '@/components/providers'
import Link from 'next/link'
import { Button } from '../components/ui/button'
import Script from 'next/script'

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

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-end">
        <Button asChild variant="ghost" className="text-white hover:text-gray-300">
          <Link href="/about">About</Link>
        </Button>
      </div>
    </footer>
  )
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <nav className="bg-gray-800 text-white p-4">
              <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">BJJ Tracker</Link>
                <NavButtons />
              </div>
            </nav>
            <main className="container mx-auto px-4 flex-grow py-8">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}

