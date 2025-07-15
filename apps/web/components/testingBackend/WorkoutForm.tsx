import { useState } from 'react';

import { useAuthContext } from '@/hooks/useAuthContext';
import { useWorkoutsContext } from '@/hooks/useWorkoutsContext'; // Updated import

const port = process.env.NEXT_PUBLIC_PORT;

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [emptyFields, setEmptyFields] = useState<string[]>([]);
  const { user } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');

      return;
    }

    const workout = { title, load, reps };

    const response = await fetch(`http://localhost:${port}/api/workouts`, {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
    }

    if (response.ok) {
      setTitle('');
      setLoad('');
      setReps('');
      setError(null);
      setEmptyFields([]);
      console.log('new workout added', json);
      dispatch({ type: 'CREATE_WORKOUT', payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Exercise Title:</label>
      <input
        className={emptyFields.includes('title') ? 'error' : ''}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Load (lbs):</label>
      <input
        className={emptyFields.includes('load') ? 'error' : ''}
        type="number"
        value={load}
        onChange={(e) => setLoad(e.target.value)}
      />

      <label>Reps:</label>
      <input
        className={emptyFields.includes('reps') ? 'error' : ''}
        type="number"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />

      <button className="workout-button">Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
