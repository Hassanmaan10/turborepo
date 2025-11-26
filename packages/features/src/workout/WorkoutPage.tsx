"use client";

import CreateWorkoutDialog from "./CreateWorkoutDialog";

export default function WorkoutPage() {
  return (
    <div className="min-h-screen">
      <CreateWorkoutDialog
        onCreated={() => {
          console.log("Workout created ✅");
        }}
      />
    </div>
  );
}
