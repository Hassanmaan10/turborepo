"use server";

import { post } from "./https";
import { getServerToken } from "./token-server";

export async function createExercise(payload: any): Promise<boolean> {
  const token = await getServerToken();
  if (!token) {
    alert("Please login again");
    return false;
  }
  const res = await post("/api/exercise/create", payload, { token });

  if (!res.ok) {
    alert(res.error || "Failed to create a exercise");
    return false;
  }
  return true;
}
