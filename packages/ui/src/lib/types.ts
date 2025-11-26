import { z } from "zod";
import { Props as ExerciseCardProps } from "@workspace/features/dash/components/exercise-card";

//exercise shcema
export const exerciseFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.enum(["Cardio", "Strength", "Flexibility"]),
  duration: z.coerce.number().positive().int(),
  intensity: z.enum(["Low", "Moderate", "High"]),
  sets: z.coerce.number().positive().int(),
  reps: z.coerce.number().positive().int(),
  rest: z.coerce.number().positive().int(),
  image: z.string().url("Enter a valid URL").optional(),
  youtubeVideo: z.string().url("Enter a valid URL").optional(),
  targetedMuscles: z.string().min(1, "Add at least one muscle"),
  user: z.string().min(1, "User id is required").optional(),
});

export type ExerciseFormValues = z.infer<typeof exerciseFormSchema>;

//workout schema
export const workoutFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  exercises: z.string().min(1, "At least one exercise ID is required"),
  user: z.string().optional(),
  image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  intensity: z.enum(["Low", "Moderate", "High"], {
    required_error: "Intensity is required",
  }),
  duration: z.coerce
    .number()
    .int("Duration must be an integer")
    .positive("Duration must be positive"),
});

export type WorkoutFormValues = z.infer<typeof workoutFormSchema>;

//
export type Exercise = ExerciseCardProps & { _id: string };
