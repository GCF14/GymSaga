"use client";

import { useEffect } from "react";
import NavigationBar from "@/components/navigation-bar";
import WorkoutDetails from "@/components/backend/WorkoutDetails";
import WorkoutForm from "@/components/backend/WorkoutForm";
import { useWorkoutsContext } from "@/hooks/useWorkoutsContext"; 
import { Workout } from "@/types/workout"; 
import "./style.css";

const port = process.env.NEXT_PUBLIC_PORT;

export default function Workouts() {
  const { workouts, dispatch } = useWorkoutsContext();
  
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(`http://localhost:${port}/api/workouts`);
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  
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
