"use client";

import { useEffect, useState, useCallback } from "react";
import getWorkouts from "@workspace/api/workouts/get-workouts";
import WorkoutCard from "./components/workout-card";
import CreateWorkoutDialog from "./CreateWorkoutDialog";
import { WorkoutProps } from "./components/workout-card";
import LoadingAuth from "@workspace/ui/components/loading-auth";
import { toast } from "@workspace/ui/components/sonner";

export default function WorkoutPage() {
  const [workouts, setWorkouts] = useState<WorkoutProps[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWorkouts = useCallback(async () => {
    setLoading(true);
    try {
      const list = await getWorkouts();
      if (!list) {
        toast.error("Failed to load workouts. Please try again.");
        setWorkouts([]);
        return;
      }
      setWorkouts(list);
    } catch (error) {
      console.error("Error fetching workouts:", error);
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
            />
          ))}
        </div>
      )}
    </main>
  );
}
