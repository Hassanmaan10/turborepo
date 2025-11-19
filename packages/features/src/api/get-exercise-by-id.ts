import { getTokenCookie } from "@workspace/ui/lib/token-cookie";
import { Exercise } from "@workspace/ui/lib/types";
import { get } from "@workspace/features/api/https";

export async function getExerciseById(id: string): Promise<Exercise | null> {
  const token = getTokenCookie();
  if (!token) {
    console.error("No auth token, please login");
    return null;
  }

  const res = await get(`/api/exercise/${id}`, { token });

  if (!res.ok) {
    console.error(res.error || `Failed to fetch exercise with id ${id}`);
    return null;
  }

  const body = res.data as { data?: Exercise } | null;

  if (!body?.data) {
    console.error("Response did not contain data field");
    return null;
  }

  return body.data;
}
