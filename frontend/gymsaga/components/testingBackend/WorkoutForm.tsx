import { useState } from "react"
import { useWorkoutsContext } from "@/hooks/useWorkoutsContext"; // Updated import

const port = process.env.NEXT_PUBLIC_PORT;

const WorkoutForm = () => {

    const { dispatch } = useWorkoutsContext ()
    const [title, setTitle] = useState('')
    const[load, setLoad] = useState('')
    const[reps, setReps] = useState('')
    const [error, setError] = useState<string | null>(null);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const workout = {title, load, reps}

        const response = await fetch(`http://localhost:${port}/api/workouts`, {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                "Content-Type": 'application/json'
            }   
        })

        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
        }

        if(response.ok) {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            console.log('new workout added', json)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }


    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exercise Title:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

            <label>Load (lbs):</label>
            <input 
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
            />

            <label>Reps:</label>
            <input 
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
            />

            <button className="workout-button">Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>


    )
}

export default WorkoutForm