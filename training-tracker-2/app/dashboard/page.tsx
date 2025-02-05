import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardStats } from "@/components/dashboard/stats"
import { TrainingHistory } from "@/components/training-history"
import { CoachingTips } from "@/components/dashboard/coaching-tips"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          <DashboardStats />
          <div className="grid gap-6 md:grid-cols-2">
            <TrainingHistory />
            <CoachingTips />
          </div>
        </div>
      </main>
    </div>
  )
}

