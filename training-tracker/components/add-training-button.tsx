"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function AddTrainingButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg">
          <Plus className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Training Session</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Input type="date" id="date" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input type="number" id="duration" min="0" step="15" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="type">Training Type</Label>
            <Input id="type" placeholder="e.g., Gi, No-Gi, Open Mat" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="What did you learn? What techniques did you practice?" />
          </div>
          <div className="grid gap-2">
            <Label>Custom Metrics</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input type="number" placeholder="Submissions" />
              <Input type="number" placeholder="Times Tapped" />
            </div>
          </div>
          <Button className="w-full">Save Session</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

