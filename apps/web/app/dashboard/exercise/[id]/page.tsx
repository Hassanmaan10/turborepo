import { getServerToken } from "@/lib/server/cookies";
import ExerciseDetails from "@workspace/features/dash/ExerciseDetails";
import { Exercise } from "@workspace/ui/lib/types";
import { getExerciseById } from "@workspace/features/api/get-exercise-by-id";

export default async function ExerciseDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const token = await getServerToken();
  const exercise: Exercise | null = await getExerciseById(id, token);
  return <ExerciseDetails exercise={exercise} />;
}
