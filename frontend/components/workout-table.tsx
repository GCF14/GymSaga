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
import { useAuthContext } from "@/hooks/useAuthContext";

export default function WorkoutTable() {
    const { workouts, dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchWorkouts = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workouts`, {
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