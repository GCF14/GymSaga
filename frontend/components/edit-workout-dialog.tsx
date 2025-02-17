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

export default function EditWorkoutDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                    <span className="material-symbols-rounded">edit</span>
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