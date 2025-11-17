"use client";

import { useCallback, useEffect, useState } from "react";
import { getTokenCookie } from "@workspace/ui/lib/token-cookie";
import ExerciseCard, { Props } from "@workspace/ui/components/exercise-card";
import { CreateExerciseDialog } from "./CreateExerciseDialog";
import { get } from "@workspace/ui/lib/https";

export default function UserDashboard() {
  const [items, setItems] = useState<Props[]>([]);

  const fetchItems = useCallback(async () => {
    const token = getTokenCookie();
    if (!token) return;
    const res = await get("/api/exercise", { token });

    if (res.ok) {
      // assuming backend response is { data: [...] }
      const data = res.data;
      setItems(Array.isArray(data?.data) ? data.data : []);
    } else {
      // optional: handle error, show toast, etc.
      console.error(res.error);
      setItems([]);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <main className="p-4">
      <div className="mb-4 flex">
        <div className="flex-1" /> {/* spacer pushes next item to the right */}
        <CreateExerciseDialog onCreated={fetchItems} />
      </div>
      <div className="flex flex-row gap-2">
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
