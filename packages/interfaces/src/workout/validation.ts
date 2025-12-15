import { z } from "zod";
import {
  CreateWorkoutApiResponse,
  GetWorkoutsApiResponse,
  GetWorkoutByIdApiResponse,
  WorkoutIntensity,
  UpdateWorkoutsApiResponse,
  DeleteWorkoutApiResponse,
} from "./types";

import { exerciseShape } from "../exercise";

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

export function validateCreateWorkoutResult(data: CreateWorkoutApiResponse) {
  return createWorkoutResultSchema.parse(data);
}

export const getWorkoutsResultSchema = z.object({
  status: z.boolean(),
  workouts: z.array(workoutShape),
});

export function validateGetWorkoutResult(data: GetWorkoutsApiResponse) {
  return getWorkoutsResultSchema.parse(data);
}

export const workoutDetailShape = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  exercises: z.array(exerciseShape),
  user: z.string(),
  image: z.string(),
  intensity: z.nativeEnum(WorkoutIntensity),
  duration: z.number(),
});

export const getWorkoutByIdResultSchema = z.object({
  status: z.boolean(),
  workout: workoutDetailShape.nullable(),
});

export function validateGetWorkoutByIdResult(data: GetWorkoutByIdApiResponse) {
  return getWorkoutByIdResultSchema.parse(data);
}

export const updateWorkoutResultSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  workout: workoutShape.nullable(),
});

export function validateUpdateWorkoutResult(data: UpdateWorkoutsApiResponse) {
  return updateWorkoutResultSchema.parse(data);
}

export const deleteWorkoutResultSchema = z.object({
  status: z.boolean(),
  message: z.string(),
});

export function validateDeleteWorkoutResult(data: DeleteWorkoutApiResponse) {
  return deleteWorkoutResultSchema.parse(data);
}
