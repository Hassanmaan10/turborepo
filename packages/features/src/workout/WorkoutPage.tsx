"use client";

import { useEffect, useState, useCallback } from "react";
import getWorkouts from "@workspace/api/workouts/get-workouts";
import WorkoutCard from "./components/workout-card";
import CreateWorkoutDialog from "./CreateWorkoutDialog";
import { WorkoutProps } from "./components/workout-card";

export default function WorkoutPage() {
  const [workouts, setWorkouts] = useState<WorkoutProps[]>([]);

  const fetchWorkouts = useCallback(async () => {
    const list = await getWorkouts();
    setWorkouts(list);
  }, []);

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  return (
    <main className="p-6">
      {/* TOP RIGHT BUTTON */}
      <div className="flex mb-6">
        <div className="flex-1" />
        <CreateWorkoutDialog onCreated={fetchWorkouts} />
      </div>

      {/* WORKOUT GRID */}
      {workouts.length === 0 ? (
        <p className="text-muted-foreground">No workouts found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout._id}
              _id={workout._id}
              title={workout.title}
              description={workout.description}
              image={workout.image}
              exercises={workout.exercises}
              intensity={workout.intensity}
              duration={workout.duration}
            />
          ))}
        </div>
      )}
    </main>
  );
}
