import { getWorkoutById } from "@workspace/api/workouts/get-workout-by-id";
import WorkoutDetailsCard from "@workspace/features/workout/WorkoutDetails";
export default async function WorkoutDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getWorkoutById(id);
  return <WorkoutDetailsCard workout={res.workout} />;
}
