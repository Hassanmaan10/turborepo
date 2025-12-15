"use client";

import { useEffect, useState, useCallback } from "react";
import getWorkouts from "@workspace/api/workouts/get-workouts";
import WorkoutCard from "./components/workout-card";
import CreateWorkoutDialog from "./CreateWorkoutDialog";
import { Workout } from "@workspace/interfaces/workout";
import LoadingAuth from "@workspace/ui/components/loading-auth";
import { toast } from "@workspace/ui/components/sonner";
import { UpdateWorkoutDialog } from "./UpdateWorkoutDialog";

export default function WorkoutPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Workout | null>(null);

  const fetchWorkouts = useCallback(async () => {
    setLoading(true);
    try {
      const list = await getWorkouts();
      if (!list) {
        toast.error("Failed to load workouts. Please try again.");
        setWorkouts([]);
        return;
      }
      setWorkouts(list.workouts);
    } catch (error) {
      toast.error("Something went wrong while loading workouts.");
      setWorkouts([]);
    } finally {
      setLoading(false);
    }
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

      {loading ? (
        <LoadingAuth />
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
              onEdit={() => setEditing(workout)}
              showActions
            />
          ))}
        </div>
      )}
      <UpdateWorkoutDialog
        workout={editing}
        open={!!editing}
        onClose={() => setEditing(null)}
        onUpdated={fetchWorkouts}
      />
    </main>
  );
}
