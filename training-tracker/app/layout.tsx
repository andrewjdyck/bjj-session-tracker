'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import { Providers, useAuth } from '@/components/providers'
import Link from 'next/link'
import { Button } from '../components/ui/button'
import Script from 'next/script'
import { useState } from 'react'
import { MenuIcon } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

// Add mobile menu
function MobileNav() {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  if (!user) return null

  return (
    <div className="md:hidden">
      <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
        <MenuIcon className="h-6 w-6" />
      </Button>
      
      {isOpen && (
        <div className="absolute top-16 right-0 w-full bg-gray-800 p-4">
          <div className="flex flex-col space-y-2">
            <Link 
              href="/dashboard" 
              className="text-white hover:text-gray-300"
              onClick={handleLinkClick}
            >
              Dashboard
            </Link>
            <Link 
              href="/track-session" 
              className="text-white hover:text-gray-300"
              onClick={handleLinkClick}
            >
              Track Session
            </Link>
            <Link 
              href="/profile" 
              className="text-white hover:text-gray-300"
              onClick={handleLinkClick}
            >
              Profile
            </Link>
          </div>
        </div>
      )}
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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
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
                <div className="md:space-x-4 hidden md:flex">
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
                <MobileNav />
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

