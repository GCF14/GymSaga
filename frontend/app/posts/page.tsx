"use client";

import { useEffect } from "react";
import NavigationBar from "@/components/navigation-bar";
import WorkoutDetails from "@/components/testingBackend/WorkoutDetails";
import WorkoutForm from "@/components/testingBackend/WorkoutForm";
import { useWorkoutsContext } from "@/hooks/useWorkoutsContext"; 
import { Workout } from "@/types/workout"; 
import "./style.css";
import { useAuthContext } from "@/hooks/useAuthContext";

const port = process.env.NEXT_PUBLIC_PORT;

export default function Posts() {
  const { workouts, dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(`http://localhost:${port}/api/workouts`, {
        credentials: "include",
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    if (user) {
      fetchWorkouts();
    }

    
  }, [dispatch, user]);

  
  const workoutList = workouts ?? [];

  console.log("TEST OTHER")
  return (
    <>
      <div className="w-full h-full items-center flex flex-col bg-background p-8 scrollbar-hide">
        <NavigationBar />
        <div className="mt-16 container">
          <div className="workouts">
            {workoutList.map((workout: Workout) => (
              <WorkoutDetails key={workout._id} workout={workout} />
            ))}
          </div>
          <WorkoutForm />
        </div>
      </div>
    </>
  );
}
