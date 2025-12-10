import {
  GetWorkoutByIdApiResponse,
  validateGetWorkoutByIdResult,
} from "@workspace/interfaces/workout";
import { getServerToken } from "../token-server";
import { get } from "../https";

export async function getWorkoutById(
  id: string
): Promise<GetWorkoutByIdApiResponse> {
  try {
    const token = await getServerToken();
    if (!token) {
      throw new Error("Please login again");
    }

    const res = await get(`/api/workout/${id}`, { token });

    const parsed = validateGetWorkoutByIdResult(res.data);
    return parsed;
  } catch (error) {
    return {
      status: false,
      workout: null,
    };
  }
}
