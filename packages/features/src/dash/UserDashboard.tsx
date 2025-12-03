"use client";

import { useCallback, useEffect, useState } from "react";
import { Exercise } from "@workspace/interfaces/exercise/types";
import { CreateExerciseDialog } from "./CreateExerciseDialog";
import { getExercises } from "@workspace/api/get-exercise";
import { deleteExercise } from "@workspace/api/delete-exercise";
import { UpdateExerciseDialog } from "./UpdateExerciseDialog";
import ExerciseCard from "@workspace/features/dash/components/exercise-card";
import Link from "next/link";
import { useAuth } from "@workspace/ui/hooks/use-auth";
import { useRouter } from "next/navigation";
import LoadingAuth from "@workspace/ui/components/loading-auth";
import { toast } from "@workspace/ui/components/sonner";

export default function UserDashboard() {
  const [items, setItems] = useState<Exercise[]>([]);
  const [editing, setEditing] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);

  const { isAuthenticated, authChecked } = useAuth();
  const router = useRouter();

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const list = await getExercises();
      if (!list) {
        toast.error("Failed to load exercises. Please try again.");
        setItems([]);
        return;
      }
      setItems(list as Exercise[]);
    } catch (error) {
      console.error("Error fetching exercises:", error);
      toast.error("Something went wrong while loading exercises.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        const ok = await deleteExercise(id);
        if (!ok) {
          toast.error("Failed to delete exercise. Please try again.");
          return;
        }
        toast.success("Exercise deleted successfully ✅");
        await fetchItems(); // refresh list
      } catch (error) {
        console.error("Delete exercise error:", error);
        toast.error("Something went wrong while deleting the exercise.");
      }
    },
    [fetchItems]
  );

  useEffect(() => {
    if (!authChecked) return;

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    fetchItems();
  }, [authChecked, isAuthenticated, fetchItems, router]);

  if (!authChecked) return null;
  if (!isAuthenticated) return null;

  return (
    <main className="p-4">
      <div className="flex">
        <div className="flex-1" />
        <CreateExerciseDialog onCreated={fetchItems} />
      </div>

      {loading ? (
        <LoadingAuth />
      ) : items.length === 0 ? (
        <p className="text-muted-foreground mt-4">No exercises found.</p>
      ) : (
        <div className="flex gap-2 mt-4 flex-wrap">
          {items.map((ex) => (
            <Link
              key={ex._id}
              href={`/exercise/${ex._id}`}
              className="cursor-pointer"
            >
              <ExerciseCard
                {...ex}
                onDelete={() => handleDelete(ex._id)}
                onEdit={() => setEditing(ex)}
              />
            </Link>
          ))}
        </div>
      )}

      <UpdateExerciseDialog
        exercise={editing}
        open={!!editing}
        onClose={() => setEditing(null)}
        onUpdated={fetchItems}
      />
    </main>
  );
}
