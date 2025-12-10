import { z } from "zod";
import {
  Category,
  deleteExerciseApiResponse,
  getExerciseApiResponse,
  getExerciseByIdApiResponse,
  Intensity,
  updateExerciseApiResponse,
} from "./types";

//exercise shcema
export const exerciseFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.nativeEnum(Category),
  duration: z.coerce.number().positive().int(),
  intensity: z.nativeEnum(Intensity),
  sets: z.coerce.number().positive().int(),
  reps: z.coerce.number().positive().int(),
  rest: z.coerce.number().positive().int(),
  image: z.string().url("Enter a valid URL"),
  youtubeVideo: z.string().url("Enter a valid URL"),
  targetedMuscles: z.string().min(1, "Add at least one muscle"),
  user: z.string().min(1, "User id is required").optional(),
});

const exerciseShape = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.nativeEnum(Category),
  duration: z.number(),
  intensity: z.nativeEnum(Intensity),
  sets: z.number(),
  reps: z.number(),
  rest: z.number(),
  image: z.string(),
  youtubeVideo: z.string(),
  targetedMuscles: z.array(z.string()),
});

export type ExerciseFormValues = z.infer<typeof exerciseFormSchema>;

export const createExerciseResultSchema = z.object({
  status: z.boolean(),
  message: z.string(),
});

export function validateCreateExerciseResult(data: unknown) {
  return createExerciseResultSchema.parse(data);
}

export const getExerciseResultSchema = z.object({
  status: z.boolean(),
  results: z.number(),
  data: z.array(exerciseShape),
});

export function validateGetExerciseResult(data: getExerciseApiResponse) {
  return getExerciseResultSchema.parse(data);
}

export const getExerciseByIdResultSchema = z.object({
  status: z.boolean(),
  data: exerciseShape.nullable(),
});

export function validateGetExerciseByIdResult(
  data: getExerciseByIdApiResponse
) {
  return getExerciseByIdResultSchema.parse(data);
}

export const updateExerciseResultSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  data: exerciseShape.nullable(),
});

export function validateUpdateExerciseResult(data: updateExerciseApiResponse) {
  return updateExerciseResultSchema.parse(data);
}

export const deleteExerciseResultSchema = z.object({
  status: z.boolean(),
  message: z.string(),
});

export function validateDeleteExerciseResult(data: deleteExerciseApiResponse) {
  return deleteExerciseResultSchema.parse(data);
}
