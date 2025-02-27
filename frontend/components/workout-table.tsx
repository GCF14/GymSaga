"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter
  } from "@/components/ui/table"
import { useEffect } from "react";
import { useWorkoutsContext } from "@/hooks/useWorkoutsContext";
import { Workout } from "@/types/workout";

export default function WorkoutTable() {
    const port = process.env.NEXT_PUBLIC_PORT
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

    return (
        <Table>
            <TableCaption></TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead>Workout Name</TableHead>
                <TableHead>Sets</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Reps</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {workoutList.map((workout: Workout) => (
                    <TableRow key={workout._id}>
                        <TableCell>{workout.title}</TableCell>
                        <TableCell>{workout.title}</TableCell>
                        <TableCell>{workout.load}</TableCell>
                        <TableCell>{workout.reps}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}