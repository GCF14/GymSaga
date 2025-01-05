"use client";
import { createContext, useReducer, ReactNode, Dispatch } from 'react';
import { WorkoutsAction, WorkoutsState } from '@/types/workout'; // Ensure to import from the correct path

// Define the initial state of the workouts context
const initialState: WorkoutsState = {
  workouts: null, // Initialize as null
};

// Reducer function
const workoutsReducer = (state: WorkoutsState, action: WorkoutsAction): WorkoutsState => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return {
        workouts: action.payload, // payload is expected to be of type Workout[]
      };
    case 'CREATE_WORKOUT':
      return {
        workouts: state.workouts ? [action.payload, ...state.workouts] : [action.payload], // Handle case where workouts might be null
      };
    default:
      return state;
  }
};

// Context value type
export interface WorkoutsContextValue extends WorkoutsState {
  dispatch: Dispatch<WorkoutsAction>;
}

// Create the context with the correct type
export const WorkoutsContext = createContext<WorkoutsContextValue | undefined>(undefined);

interface WorkoutsContextProviderProps {
  children: ReactNode;
}

export const WorkoutsContextProvider = ({ children }: WorkoutsContextProviderProps) => {
  const [state, dispatch] = useReducer(workoutsReducer, initialState);

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
