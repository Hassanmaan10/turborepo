"use client";

import { useCallback, useEffect, useState } from "react";
import { Exercise } from "@workspace/ui/lib/types";
import { CreateExerciseDialog } from "./CreateExerciseDialog";
import { getExercises } from "@workspace/api/get-exercise";
import { deleteExercise } from "@workspace/api/delete-exercise";
import { UpdateExerciseDialog } from "./UpdateExerciseDialog";
import ExerciseCard from "@workspace/features/dash/components/exercise-card";
import Link from "next/link";
import { useAuth } from "@workspace/ui/hooks/use-auth";
import { useRouter } from "next/navigation";

export default function UserDashboard() {
  const [items, setItems] = useState<Exercise[]>([]);
  const [editing, setEditing] = useState<Exercise | null>(null);

  const { isAuthenticated, authChecked } = useAuth();
  const router = useRouter();

  const fetchItems = useCallback(async () => {
    const list = await getExercises();
    setItems(list as Exercise[]);
  }, []);

  const handleDelete = useCallback(
    async (id: string) => {
      const ok = await deleteExercise(id);
      if (ok) {
        fetchItems(); // refresh list after successful delete
      }
    },
    [fetchItems]
  );

  useEffect(() => {
    if (!authChecked) return; // wait until we know auth state

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    // only runs when authenticated
    fetchItems();
  }, [authChecked, isAuthenticated, fetchItems, router]);

  if (!authChecked) {
    return null; // or a loader
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="p-4">
      <div className="flex">
        <div className="flex-1" /> {/* spacer pushes next item to the right */}
        <CreateExerciseDialog onCreated={fetchItems} />
      </div>

      <div className="flex gap-2 mt-4">
        {items.map((ex) => (
          <Link
            key={ex._id}
            href={`/exercise/${ex._id}`}
            className="cursor-pointer"
          >
            <ExerciseCard
              key={ex._id}
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
              onDelete={() => handleDelete(ex._id)}
              onEdit={() => setEditing(ex)}
            />
          </Link>
        ))}
      </div>
      <UpdateExerciseDialog
        exercise={editing} // the selected exercise (or null)
        open={!!editing} // open when editing is not null
        onClose={() => setEditing(null)} // close dialog + clear selection
        onUpdated={fetchItems} // refresh list after successful update
      />
    </main>
  );
}
