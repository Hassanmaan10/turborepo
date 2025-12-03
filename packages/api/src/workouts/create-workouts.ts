"use server";

import { revalidatePath } from "next/cache";
import { post } from "../https";
import { getServerToken } from "../token-server";

export async function createWorkouts(payload: any): Promise<boolean> {
  const token = await getServerToken();
  if (!token) {
    alert("Please login again");
    return false;
  }
  const res = await post("/api/workout/create", payload, { token });

  if (!res.ok) {
    alert(res.error || "Failed to create a exercise");
    return false;
  }
  revalidatePath("/workout");
  return true;
}
