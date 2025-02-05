import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TrainingHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Training History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium">No-Gi Training</p>
                <p className="text-sm text-muted-foreground">2 hours • Guard passing focus</p>
              </div>
              <p className="text-sm text-muted-foreground">2 days ago</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

