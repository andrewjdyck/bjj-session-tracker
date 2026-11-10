"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from '@/components/providers'

export function DashboardHeader() {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { href: "/about", label: "About" },
  ]

  return (
    <header className="border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px] sm:w-[300px]">
                <nav className="flex flex-col space-y-4">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-lg font-semibold"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  {user && (
                    <>
                      <Link
                        href="/dashboard"
                        className="text-lg font-semibold"
                        onClick={() => setIsOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        className="text-lg font-semibold"
                        onClick={() => setIsOpen(false)}
                      >
                        Profile
                      </Link>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="font-semibold">
              BJJ Tracker
            </Link>
            <ModeToggle />
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <Button key={item.href} variant="ghost" asChild>
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
            {user && (
              <>
                <Button key="/dashboard" variant="ghost" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button key="/profile" variant="ghost" asChild>
                  <Link href="/profile">Profile</Link>
                </Button>
              </>
            )}
          </nav>          
        </div>
      </div>
    </header>
  )
}

