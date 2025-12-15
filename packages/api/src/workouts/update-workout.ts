"use client";

import {
  UpdateWorkoutPayload,
  UpdateWorkoutsApiResponse,
  validateUpdateWorkoutResult,
} from "@workspace/interfaces/workout";
import { getServerToken } from "../token-server";
import { put } from "../https";

export async function updateWorkout(
  id: string,
  payload: UpdateWorkoutPayload
): Promise<UpdateWorkoutsApiResponse> {
  try {
    const token = await getServerToken();
    if (!token) {
      throw new Error("Please login again");
    }

    const res = await put(`/api/workout/${id}`, payload, { token });

    const parsed = validateUpdateWorkoutResult(res.data);
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
