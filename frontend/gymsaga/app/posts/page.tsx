"use client"
import { useEffect, useState } from 'react'
import NavigationBar from "@/components/navigation-bar";
import WorkoutDetails from "@/components/testingBackend/WorkoutDetails";
import { Workout } from "@/types/workout"; 
import './style.css';

const port = process.env.NEXT_PUBLIC_PORT;


export default function Posts() {

  const [workouts, setWorkouts] = useState<Workout[] | null>(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(`http://localhost:${port}/api/workouts`)
      const json = await response.json()

      if(response.ok) {
        setWorkouts(json)
      } else {

      }
    }

    fetchWorkouts()
  }, [])

  return (
    <>
      <head>
        <title>GymSaga - Posts Testing Page</title>
        <meta name="description" content="GymSaga Profile" />
      </head>
      <div className="w-full h-full items-center flex flex-col bg-background p-8 scrollbar-hide">
        <NavigationBar />
        <div className="mt-16">
          <div className="workouts">
            {workouts && workouts.map((workout) => (
              <WorkoutDetails key={workout._id} workout={workout} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}