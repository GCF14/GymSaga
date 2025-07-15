import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function EditWorkoutDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <span className="material-symbols-rounded">edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Workout Routine</DialogTitle>
          <DialogDescription>Tailor your routine for peak performance.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
