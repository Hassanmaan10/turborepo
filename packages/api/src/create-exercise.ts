"use server";

import { post } from "./https";
import { getServerToken } from "./token-server";

export async function createExercise(payload: any): Promise<boolean> {
  const token = await getServerToken();
  if (!token) {
    console.error("❌ createExercise: Missing token. Please login again.");
    return false;
  }
  console.log("📦 [createExercise] payload:", payload);
  const res = await post("/api/exercise/create", payload, { token });

  if (!res.ok) {
    console.error("❌ [createExercise] FAILED:", res.error, res.data);
    return false;
  }
  return true;
}
