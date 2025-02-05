"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              <a href="/dashboard" className="text-lg font-semibold">
                Dashboard
              </a>
              <a href="/about" className="text-lg font-semibold">
                About / FAQ
              </a>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:gap-6">
          <a href="/" className="hidden md:block font-bold">
            BJJ Tracker
          </a>
          <nav className="hidden md:flex flex-1 items-center gap-6">
            <a href="/dashboard">Dashboard</a>
            <a href="/about">About</a>
          </nav>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

