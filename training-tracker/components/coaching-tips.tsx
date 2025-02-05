import { Brain } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function CoachingTips() {
  const tips = [
    {
      title: "Consistency Pattern",
      description: "You train most consistently on Mondays and Saturdays. Consider adding a mid-week session.",
    },
    {
      title: "Skill Focus",
      description: "Based on your recent notes, focusing on guard retention could help improve your defensive game.",
    },
    {
      title: "Community Insight",
      description: "Blue belts who train 4+ times per week progress 30% faster to purple belt on average.",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Smart Coach Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tips.map((tip) => (
            <div key={tip.title} className="p-4 rounded-lg bg-muted/50">
              <h4 className="font-semibold">{tip.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">{tip.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

