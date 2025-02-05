import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardStats } from "@/components/dashboard-stats"
import { TrainingHistory } from "@/components/training-history"
import { CoachingTips } from "@/components/coaching-tips"
import { AddTrainingButton } from "@/components/add-training-button"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto p-4 space-y-6">
        <DashboardStats />
        <div className="grid gap-6 md:grid-cols-2">
          <TrainingHistory />
          <CoachingTips />
        </div>
      </main>
      <AddTrainingButton />
    </div>
  )
}

