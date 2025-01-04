import { Workout } from "@/types/workout"; 

const WorkoutDetails = ({ workout }: { workout: Workout }) => {
    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (lbs): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p><strong>Created at: </strong>{workout.createdAt}</p>
        </div>
    )
}

export default WorkoutDetails;