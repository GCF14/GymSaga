import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';

import { useAuthContext } from '@/hooks/useAuthContext';
import { useWorkoutsContext } from '@/hooks/useWorkoutsContext';
import { Workout } from '@/types/workout';

const port = process.env.NEXT_PUBLIC_PORT;

const WorkoutDetails = ({ workout }: { workout: Workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(`http://localhost:${port}/api/workouts/${workout._id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (lbs): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={() => handleClick()}>
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
