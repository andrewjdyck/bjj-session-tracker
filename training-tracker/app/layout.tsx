import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from '../components/providers'
import Link from 'next/link'
import { Button } from '../components/ui/button'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'BJJ Tracker',
  description: 'Track your Brazilian Jiu-Jitsu training sessions',
}

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
              <div className="space-x-4">
                <Button asChild variant="ghost">
                  <Link href="/profile">Profile</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href="/track-session">Track Session</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              </div>
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

