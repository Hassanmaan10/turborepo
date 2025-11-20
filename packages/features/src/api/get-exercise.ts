"use server";
import { get } from "@workspace/features/api/https";
import { Props as Exercise } from "@workspace/features/dash/components/exercise-card";
import { getServerToken } from "./token-server";

export async function getExercises(): Promise<Exercise[]> {
  const token = await getServerToken();
  if (!token) return [];

  const res = await get("/api/exercise", { token });

  if (!res.ok) {
    console.error(res.error);
    return [];
  }
  const data = res.data;
  return Array.isArray(data?.data) ? data.data : [];
}
