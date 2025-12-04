"use server";

import { get } from "../https";
import { getServerToken } from "../token-server";

import { WorkoutProps } from "@workspace/interfaces/workout";

export default async function getWorkouts(): Promise<WorkoutProps[]> {
  const token = await getServerToken();
  if (!token) return [];

  const res = await get("/api/workout", { token });
  if (!res.ok) {
    console.error(res.error);
    return [];
  }
  const data = res.data;
  return Array.isArray(data?.workouts) ? data.workouts : [];
}
