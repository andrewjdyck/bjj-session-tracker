import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>About BJJ Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              BJJ Tracker is a web application designed to help Brazilian Jiu-Jitsu practitioners track their training
              sessions, monitor progress, and receive personalized coaching tips. Our goal is to support your BJJ
              journey by providing insights and analytics based on your training data and the broader BJJ community.
            </p>
            <h3 className="text-lg font-semibold mt-4 mb-2">Key Features:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Log and track your BJJ training sessions</li>
              <li>View your training history and progress over time</li>
              <li>Receive AI-powered coaching tips based on your data</li>
              <li>Compare your progress with community averages</li>
              <li>Set and track training goals</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

