"use client";
import { Exercise } from "@workspace/ui/lib/types";
import { useEffect, useState } from "react";
import { getExerciseById } from "../api/get-exercise-by-id";
import ExerciseCard from "@workspace/features/dash/components/exercise-card";

export default function ExerciseDetails({ id }: { id: string }) {
  const [exercise, setExercise] = useState<Exercise | null | undefined>(
    undefined
  );

  useEffect(() => {
    if (!id) return;

    (async () => {
      const item = await getExerciseById(id);
      setExercise(item);
    })();
  }, [id]);

  if (exercise === undefined) {
    return null;
  }

  if (!exercise) {
    return <main className="p-4">Exercise not found.</main>;
  }

  return (
    <main className="p-4 flex flex-col items-center justify-center  min-h-dvh gap-3">
      <h1 className="text-2xl font-semibold">Exercise details</h1>
      <ExerciseCard
        title={exercise.title}
        description={exercise.description}
        category={exercise.category}
        duration={exercise.duration}
        intensity={exercise.intensity}
        sets={exercise.sets}
        reps={exercise.reps}
        rest={exercise.rest}
        image={exercise.image}
        youtubeVideo={exercise.youtubeVideo}
        targetedMuscles={exercise.targetedMuscles}
        onDelete={() => {}}
        onEdit={() => {}}
      />
    </main>
  );
}
