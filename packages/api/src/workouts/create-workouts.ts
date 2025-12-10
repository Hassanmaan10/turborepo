"use server";

import { revalidatePath } from "next/cache";
import { post } from "../https";
import { getServerToken } from "../token-server";
import {
  CreateWorkoutApiResponse,
  CreateWorkoutPayload,
  validateCreateWorkoutResult,
} from "@workspace/interfaces/workout";

export async function createWorkouts(
  payload: CreateWorkoutPayload
): Promise<CreateWorkoutApiResponse> {
  try {
    const token = await getServerToken();
    if (!token) {
      throw new Error("Please login again");
    }
    const res = await post("/api/workout/create", payload, { token });
    const parsed = validateCreateWorkoutResult(res.data);
    revalidatePath("/workout");
    return parsed;
  } catch (error) {
    const message =
      (error as Error).message || "Something went wrong. Please try again.";

    return {
      status: false,
      message,
      workout: null,
    };
  }
}
