

export interface Workout {
    _id: string;
    title: string;
    reps: number;
    load: number;
    createdAt: string;
  }
  
  // Define the structure of the state
  export interface WorkoutsState {
    workouts: Workout[] | null;
  }
  
  // Define the structure of the actions for the reducer
  export type WorkoutsAction =
  | { type: 'SET_WORKOUTS'; payload: Workout[] }
  | { type: 'CREATE_WORKOUT'; payload: Workout }
  | { type: 'DELETE_WORKOUT'; payload: Workout };
  
  // Define the context value
  export interface WorkoutsContextValue extends WorkoutsState {
    dispatch: React.Dispatch<WorkoutsAction>;
  }
  