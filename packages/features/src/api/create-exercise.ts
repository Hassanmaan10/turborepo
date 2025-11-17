import { getTokenCookie } from "@workspace/ui/lib/token-cookie";
import { post } from "@workspace/features/api/https";

export async function createExercise(payload: any): Promise<boolean> {
  const token = getTokenCookie();
  if (!token) {
    alert("Please login again");
    return false;
  }
  const res = await post("/api/exercise/create", payload, { token });

  if (!res.ok) {
    alert(res.error || "Failed to create a exercise");
    return false;
  }
  return true;
}
