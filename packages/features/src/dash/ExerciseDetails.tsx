"use client";
import { Exercise } from "@workspace/interfaces/exercise/types";
import ExerciseCard from "@workspace/features/dash/components/exercise-card";

export default function ExerciseDetails({
  exercise,
}: {
  exercise: Exercise | null;
}) {
  if (!exercise) {
    return <main className="p-4">Exercise not found.</main>;
  }

  return (
    <main className="p-4 flex flex-col items-center justify-center  min-h-dvh gap-3">
      <h1 className="text-2xl font-semibold">Exercise details</h1>
      <ExerciseCard
        _id={exercise._id}
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
        showActions={false}
      />
    </main>
  );
}
