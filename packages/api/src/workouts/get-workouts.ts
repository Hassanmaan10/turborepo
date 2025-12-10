"use server";

import {
  GetWorkoutsApiResponse,
  validateGetWorkoutResult,
} from "@workspace/interfaces/workout";
import { get } from "../https";
import { getServerToken } from "../token-server";

export default async function getWorkouts(): Promise<GetWorkoutsApiResponse> {
  try {
    const token = await getServerToken();
    if (!token) {
      throw new Error("Please login again");
    }

    const res = await get("/api/workout", { token });
    const parsed = validateGetWorkoutResult(res.data);
    return parsed;
  } catch (error) {
    return {
      status: false,
      workouts: [],
    };
  }
}
