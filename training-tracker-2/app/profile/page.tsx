// import { DashboardHeader } from "@/components/dashboard-header"
import ProtectedRoute from '@/components/ProtectedRoute'
import { UserProfile } from "@/components/user-profile"

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* <DashboardHeader /> */}
        <main className="container mx-auto p-4 space-y-6">
          <UserProfile />
        </main>
      </div>
    </ProtectedRoute>
  )
}

