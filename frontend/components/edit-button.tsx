import { Button } from "@/components/ui/button"
import EditMealDialog from "@/components/edit-meal-dialog";
import EditWorkoutDialog from "./edit-workout-dialog";

interface EditSaveButtonProps {
    type: string;
}

export default function EditSaveButton({ type }: EditSaveButtonProps) {
    return(
        <div className="flex flex-row gap-4">
            {type === "meal" ? (
                <EditMealDialog />
            ) : type === "workout" ? (
                <EditWorkoutDialog />
            ) : null}
        </div>
    )
}