import { z } from "zod";
import { Category, getExerciseApiResponse, Intensity } from "./types";

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
  data: z.array(
    z.object({
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
    })
  ),
});

export function validateGetExerciseResult(data: getExerciseApiResponse) {
  return getExerciseResultSchema.parse(data);
}
