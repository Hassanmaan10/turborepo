"use server";

import { Exercise } from "@workspace/interfaces/exercise";
import { getServerToken } from "./token-server";
import { get } from "./https";

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
