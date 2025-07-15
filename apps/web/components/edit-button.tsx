import EditProfileDialog from './edit-profile-dialog';
import EditWorkoutDialog from './edit-workout-dialog';

import EditMealDialog from '@/components/edit-meal-dialog';

interface EditButtonProps {
  type: string;
  className?: string;
}

export default function EditButton({ type, className }: EditButtonProps) {
  return (
    <div className={`flex flex-row gap-4 ${className}`}>
      {type === 'meal' ? (
        <EditMealDialog />
      ) : type === 'workout' ? (
        <EditWorkoutDialog />
      ) : type === 'profile' ? (
        <EditProfileDialog />
      ) : null}
    </div>
  );
}
