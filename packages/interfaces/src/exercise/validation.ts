import { z } from "zod";
import { Category, createExerciseApiResponse, Intensity } from "./types";

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
  image: z.string().url("Enter a valid URL").optional(),
  youtubeVideo: z.string().url("Enter a valid URL").optional(),
  targetedMuscles: z.string().min(1, "Add at least one muscle"),
  user: z.string().min(1, "User id is required").optional(),
});

export type ExerciseFormValues = z.infer<typeof exerciseFormSchema>;

export const createExerciseResultSchema = z.object({
  status: z.boolean(),
  message: z.string(),
});

export function validateCreateExerciseResult(data: createExerciseApiResponse) {
  const result = createExerciseResultSchema.safeParse(data);
  if (!result.success) {
    throw new Error("Invalid create exercise response from server.");
  }
  return result.data;
}
