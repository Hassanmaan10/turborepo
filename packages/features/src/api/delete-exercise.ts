import { getTokenCookie } from "@workspace/ui/lib/token-cookie";
import { del } from "./https";

export async function deleteExercise(id: string): Promise<boolean> {
  const token = getTokenCookie();
  if (!token) {
    alert("Please try again");
    return false;
  }

  const res = await del(`/api/exercise/${id}`, undefined, { token });
  if (!res.ok) {
    alert(res.error || "Failed to delete exercise");
    return false;
  }
  return true;
}
