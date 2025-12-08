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

    if (!res.ok) {
      throw new Error(
        res.error ?? "Failed to create exercise. Please try again"
      );
    }

    const { status, message } = validateCreateExerciseResult(res.data);

    if (!status) {
      throw new Error(message ?? "Invalid credentials. Please try again");
    }

    revalidatePath("/exercise");
    return {
      status: true,
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
