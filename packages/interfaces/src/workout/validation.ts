import { z } from "zod";
import { Intensity } from "./types";

//workout schema
export const workoutFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  exercises: z.array(z.string()).min(1, "select at least one exercise"),
  user: z.string().optional(),
  image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  intensity: z.nativeEnum(Intensity, {
    required_error: "Intensity is required",
  }),
  duration: z.coerce
    .number()
    .int("Duration must be an integer")
    .positive("Duration must be positive"),
});

export type WorkoutFormValues = z.infer<typeof workoutFormSchema>;
