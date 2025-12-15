import {
  DeleteWorkoutApiResponse,
  validateDeleteWorkoutResult,
} from "@workspace/interfaces/workout";
import { getServerToken } from "../token-server";
import { del } from "../https";

export async function deleteWorkout(
  id: string
): Promise<DeleteWorkoutApiResponse> {
  try {
    const token = await getServerToken();
    if (!token) {
      throw new Error("Please login again");
    }

    const res = await del(`/api/workout/${id}`, undefined, { token });
    const parsed = validateDeleteWorkoutResult(res.data);
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
