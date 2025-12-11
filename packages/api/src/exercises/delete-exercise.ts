"use server";

import { revalidatePath } from "next/cache";

import {
  deleteExerciseApiResponse,
  validateDeleteExerciseResult,
} from "@workspace/interfaces/exercise";
import { getServerToken } from "../token-server";
import { del } from "../https";

export async function deleteExercise(
  id: string
): Promise<deleteExerciseApiResponse> {
  try {
    const token = await getServerToken();
    if (!token) {
      throw new Error("Please login again");
    }

    const res = await del(`/api/exercise/${id}`, undefined, { token });
    const parsed = validateDeleteExerciseResult(res.data);

    revalidatePath("/exercise");
    revalidatePath(`/exercise/${id}`);

    return parsed;
  } catch (error) {
    const message =
      (error as Error).message || "Something went wrong. Please try again.";

    return {
      status: false,
      message,
    };
  }
}
