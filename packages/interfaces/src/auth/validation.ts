import { z } from "zod";
import { AuthResponseData, Goal, ISignUp } from "./types";

//Login

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, {
      message: "Password must include at least one letter and one number.",
    }),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const loginResultSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  token: z.string(),
});

export function validateLoginResult(data: AuthResponseData) {
  const result = loginResultSchema.safeParse(data);

  if (!result.success) {
    throw new Error("Invalid login response from server.");
  }

  return result.data;
}

//SignUp

export const signupFormSchema = z.object({
  // required: string
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, { message: "Name must be at most 50 characters." }),

  // required: string($email)
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: "Enter a valid email address." }),

  // required: string, minLength: 6
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." })
    .max(72, { message: "Password must be at most 72 characters." }) // safe bcrypt limit
    // OPTIONAL additive: require letter+number
    .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, {
      message: "Include at least one letter and one number.",
    }),

  // required: number($float)
  weight: z.coerce
    .number({ invalid_type_error: "Weight must be a number." })
    .positive({ message: "Weight must be greater than 0." })
    .max(500, { message: "Weight seems unrealistic." })
    // OPTIONAL additive: allow one-decimal precision
    .refine((v) => Number.isFinite(v), { message: "Invalid number." }),

  // required: string (server accepts a string; we constrain to 3 options for UX)
  goal: z.nativeEnum(Goal, {
    errorMap: () => ({ message: "Choose a goal." }),
  }),

  // required: integer
  age: z.coerce
    .number({ invalid_type_error: "Age must be a number." })
    .int({ message: "Age must be an integer." })
    .min(1, { message: "Age must be at least 1." })
    .max(120, { message: "Age seems unrealistic." }),
});

export type SignUpFormValues = z.infer<typeof signupFormSchema>;

export const signupResultSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  token: z.string(),
});

export function validateSignUpResult(data: AuthResponseData) {
  const result = signupResultSchema.safeParse(data);
  if (!result.success) {
    throw new Error("Invalid signup response from server.");
  }
  return result.data;
}
