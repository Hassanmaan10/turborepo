"use server";
import { put } from "./https";
import { getServerToken } from "./token-server";

export async function updateExercise(
  id: string,
  payload: any
): Promise<boolean> {
  const token = await getServerToken();
  if (!token) {
    alert("Please login again");
    return false;
  }
  const res = await put(`/api/exercise/${id}`, payload, { token });

  if (!res.ok) {
    alert(res.error || "Failed to update exercise");
    return false;
  }
  return true;
}
