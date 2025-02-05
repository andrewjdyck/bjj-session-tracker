import { Card, CardContent } from "@/components/ui/card"
import { Clock, Target, Trophy, Users } from "lucide-react"

export function DashboardStats() {
  const stats = [
    {
      title: "Total Training Hours",
      value: "123.5",
      change: "+2.1% from last month",
      icon: Clock,
    },
    {
      title: "Sessions This Month",
      value: "12",
      change: "4 sessions to goal",
      icon: Target,
    },
    {
      title: "Current Belt",
      value: "Blue Belt",
      change: "2 stripes • 8 months",
      icon: Trophy,
    },
    {
      title: "Community Average",
      value: "4.2",
      change: "sessions per week",
      icon: Users,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{stat.title}</p>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-2">
              <h2 className="text-2xl font-bold">{stat.value}</h2>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

