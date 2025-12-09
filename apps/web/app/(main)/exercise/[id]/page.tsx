import ExerciseDetails from "@workspace/features/dash/ExerciseDetails";
import { getExerciseById } from "@workspace/api/get-exercise-by-id";
import { getServerToken } from "@workspace/api/token-server";

export default async function ExerciseDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const token = await getServerToken();
  const res = await getExerciseById(id, token);
  return <ExerciseDetails exercise={res.data} />;
}
