"use server";

import {
  getExerciseApiResponse,
  validateGetExerciseResult,
} from "@workspace/interfaces/exercise";
import { getServerToken } from "./token-server";
import { get } from "./https";

export async function getExercises(): Promise<getExerciseApiResponse> {
  try {
    const token = await getServerToken();
    if (!token) {
      throw new Error("Please login again");
    }
    const res = await get("/api/exercise", { token });
    const parsed = validateGetExerciseResult(res.data);
    return parsed;
  } catch (error) {
    return {
      status: false,
      results: 0,
      data: [],
    };
  }
}
