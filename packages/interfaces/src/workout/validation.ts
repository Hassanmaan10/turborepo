import { z } from "zod";
import { CreateWorkoutApiResponse, WorkoutIntensity } from "./types";

//workout schema
export const workoutFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  exercises: z.array(z.string()).min(1, "Select at least one exercise"),
  image: z.string().url("Enter a valid image URL"),
  intensity: z.nativeEnum(WorkoutIntensity),
  duration: z.coerce.number().positive().int(),
});

export type WorkoutFormValues = z.infer<typeof workoutFormSchema>;

const workoutShape = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  exercises: z.array(z.string()),
  user: z.string(),
  image: z.string(),
  intensity: z.nativeEnum(WorkoutIntensity),
  duration: z.number(),
});

export const createWorkoutResultSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  workout: workoutShape.nullable(),
});

export function validateCreateExerciseResult(data: CreateWorkoutApiResponse) {
  return createWorkoutResultSchema.parse(data);
}
