"use server";
import { ExerciseCardProps } from "@workspace/interfaces/exercise/types";
import { get } from "./https";

export async function getExerciseById(
  id: string,
  token: string | undefined
): Promise<ExerciseCardProps | null> {
  if (!token) {
    console.error("No auth token, please login");
    return null;
  }

  const res = await get(`/api/exercise/${id}`, { token });
  console.log("the get by id", res.data);

  if (!res.ok) {
    console.error(res.error || `Failed to fetch exercise with id ${id}`);
    return null;
  }

  const body = res.data as { data?: ExerciseCardProps } | null;

  if (!body?.data) {
    console.error("Response did not contain data field");
    return null;
  }

  return body.data;
}
