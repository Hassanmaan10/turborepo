"use server";

import { revalidatePath } from "next/cache";
import { post } from "./https";
import { getServerToken } from "./token-server";
import {
  createExerciseApiResponse,
  createExercisePayload,
  validateCreateExerciseResult,
} from "@workspace/interfaces/exercise";

export async function createExercise(
  payload: createExercisePayload
): Promise<createExerciseApiResponse> {
  const token = await getServerToken();
  try {
    if (!token) {
      throw new Error("Please login again");
    }
    const res = await post("/api/exercise/create", payload, { token });

    const { status, message } = validateCreateExerciseResult(res.data);

    revalidatePath("/exercise");
    return {
      status,
      message: message ?? "Exercise created sucessfully.",
    };
  } catch (error) {
    const message =
      (error as Error).message || "Something went wrong. Please try again.";

    return {
      status: false,
      message,
    };
  }
}
