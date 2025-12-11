"use server";
import { getExerciseByIdApiResponse } from "@workspace/interfaces/exercise/types";
import { get } from "../https";
import { validateGetExerciseByIdResult } from "@workspace/interfaces/exercise";

export async function getExerciseById(
  id: string,
  token: string | undefined
): Promise<getExerciseByIdApiResponse> {
  try {
    if (!token) {
      throw new Error("Login again");
    }

    const res = await get(`/api/exercise/${id}`, { token });

    const parsed = validateGetExerciseByIdResult(res.data);
    return parsed;
  } catch (error) {
    return {
      status: false,
      data: null,
    };
  }
}
