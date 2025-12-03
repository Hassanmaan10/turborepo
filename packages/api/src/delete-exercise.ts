"use server";

import { revalidatePath } from "next/cache";
import { del } from "./https";
import { getServerToken } from "./token-server";

export async function deleteExercise(id: string): Promise<boolean> {
  const token = await getServerToken();
  if (!token) {
    alert("Please try again");
    return false;
  }

  const res = await del(`/api/exercise/${id}`, undefined, { token });
  if (!res.ok) {
    alert(res.error || "Failed to delete exercise");
    return false;
  }
  revalidatePath("/exercise");
  revalidatePath(`/exercise/${id}`);
  return true;
}
