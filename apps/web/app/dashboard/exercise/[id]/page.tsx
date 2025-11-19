import ExerciseDetails from "@workspace/features/dash/ExerciseDetails";

export default async function ExerciseDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ExerciseDetails id={id} />;
}
