"use client";

import { type WorkoutDetails } from "@workspace/interfaces/workout";
import WorkoutCard from "./components/workout-card";

export default function WorkoutDetailsCard({
  workout,
}: {
  workout: WorkoutDetails | null;
}) {
  if (!workout) {
    return <main className="p-4">Workout not found.</main>;
  }

  return (
    <main className="p-4 flex flex-col items-center justify-center min-h-dvh gap-3">
      <h1 className="text-2xl font-semibold">Workout details</h1>
      <WorkoutCard
        _id={workout._id}
        title={workout.title}
        description={workout.description}
        image={workout.image}
        exercises={workout.exercises.map((ex) => ex._id)}
        intensity={workout.intensity}
        duration={workout.duration}
      />
    </main>
  );
}
