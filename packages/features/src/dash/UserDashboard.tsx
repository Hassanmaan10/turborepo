"use client";

import { useEffect, useState } from "react";
import { getTokenCookie } from "@workspace/ui/lib/token-cookie";
import ExerciseCard, { Props } from "@workspace/ui/components/exercise-card";

export default function UserDashboard() {
  const [items, setItems] = useState<Props[]>([]);

  useEffect(() => {
    const token = getTokenCookie();
    if (!token) return;

    fetch("https://fitupapi-942q.onrender.com/api/exercise", {
      headers: { authorization: `Bearer ${token}` },
    })
      .then((r) => r.json().catch(() => null)) // <- PARSE: turns the HTTP body into a JS object
      .then((json) => {
        setItems(Array.isArray(json?.data) ? json.data : []);
      }) //check if json.data exists and its an array
      .catch(() => ({}));
  }, []);

  // later card
  if (!items.length) return <div className="p-4">No exercise yet.</div>;

  return (
    <main className="p-4 space-y-6">
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
    </main>
  );
}
