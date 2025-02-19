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

export default function EditMealDialog() {
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
                        Edit Meal Plan
                    </DialogTitle>
                    <DialogDescription>
                        Plan your meals and fuel your day!
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}