"use client";

import { useCallback, useEffect, useState } from "react";
import ExerciseCard, { Props } from "@workspace/ui/components/exercise-card";
import { CreateExerciseDialog } from "./CreateExerciseDialog";
import { getExercises } from "../api/get-exercise";

export default function UserDashboard() {
  const [items, setItems] = useState<Props[]>([]);

  const fetchItems = useCallback(async () => {
    const list = await getExercises();
    setItems(list);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <main className="p-4">
      <div className="flex">
        <div className="flex-1" /> {/* spacer pushes next item to the right */}
        <CreateExerciseDialog onCreated={fetchItems} />
      </div>

      <div className="flex flex-row gap-2 mt-4">
        {items.map((ex, i) => (
          <ExerciseCard
            key={i}
            title={ex.title}
            description={ex.description}
            category={ex.category}
            duration={ex.duration}
            intensity={ex.intensity}
            sets={ex.sets}
            reps={ex.reps}
            rest={ex.rest}
            image={ex.image}
            youtubeVideo={ex.youtubeVideo}
            targetedMuscles={ex.targetedMuscles}
          />
        ))}
      </div>
    </main>
  );
}
