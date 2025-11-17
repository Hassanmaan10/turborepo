import { getTokenCookie } from "@workspace/ui/lib/token-cookie";
import { get } from "@workspace/features/api/https";
import { Props as Exercise } from "@workspace/ui/components/exercise-card";

export async function getExercises(): Promise<Exercise[]> {
  const token = getTokenCookie();
  if (!token) return [];

  const res = await get("/api/exercise", { token });

  if (!res.ok) {
    console.error(res.error);
    return [];
  }
  const data = res.data;
  return Array.isArray(data?.data) ? data.data : [];
}
