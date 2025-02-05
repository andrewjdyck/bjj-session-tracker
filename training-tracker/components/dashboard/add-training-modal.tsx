"use client"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function AddTrainingModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg">
          <Plus className="h-6 w-6" />
          <span className="sr-only">Add training session</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Training Session</DialogTitle>
          <DialogDescription>Log your BJJ training session details</DialogDescription>
        </DialogHeader>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input type="date" id="date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input type="number" id="duration" min="0" step="15" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Training Type</Label>
            <Input type="text" id="type" placeholder="e.g., Gi, No-Gi, Open Mat" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="What did you learn? What techniques did you practice?" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="metrics">Custom Metrics</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input type="number" placeholder="Submissions" />
              <Input type="number" placeholder="Taps" />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Save Session
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

