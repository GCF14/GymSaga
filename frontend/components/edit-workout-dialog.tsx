import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Pen } from "lucide-react"

export default function EditWorkoutDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                    <Pen />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit Workout Routine
                    </DialogTitle>
                    <DialogDescription>
                        Tailor your routine for peak performance.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}