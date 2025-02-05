"use client"

import { Brain } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function CoachingTips() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Smart Coach Tips
        </CardTitle>
        <CardDescription>Personalized insights based on your progress</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg bg-muted p-4">
          <h4 className="font-semibold">Consistency Pattern</h4>
          <p className="text-sm text-muted-foreground mt-1">
            You train most consistently on Mondays and Saturdays. Consider adding a mid-week session to maintain
            momentum.
          </p>
        </div>
        <div className="rounded-lg bg-muted p-4">
          <h4 className="font-semibold">Skill Focus</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Based on your recent notes, focusing on guard retention could help improve your defensive game.
          </p>
        </div>
        <div className="rounded-lg bg-muted p-4">
          <h4 className="font-semibold">Community Insight</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Blue belts who train 4+ times per week progress 30% faster to purple belt on average.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

