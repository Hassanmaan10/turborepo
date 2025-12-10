"use server";
import { revalidatePath } from "next/cache";
import { put } from "./https";
import { getServerToken } from "./token-server";
import {
  updateExerciseApiResponse,
  UpdateExercisePayload,
  validateUpdateExerciseResult,
} from "@workspace/interfaces/exercise";

export async function updateExercise(
  id: string,
  payload: UpdateExercisePayload
): Promise<updateExerciseApiResponse> {
  try {
    const token = await getServerToken();
    if (!token) {
      throw new Error("Please login again");
    }

    const res = await put(`/api/exercise/${id}`, payload, { token });

    const parsed = validateUpdateExerciseResult(res.data);

    revalidatePath("/exercise");
    revalidatePath(`/exercise/${id}`);
    return parsed;
  } catch (error) {
    const message =
      (error as Error).message || "Something went wrong. Please try again.";

    return {
      status: false,
      message,
      data: null,
    };
  }
}
