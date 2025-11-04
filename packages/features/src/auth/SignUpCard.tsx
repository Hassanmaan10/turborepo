"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@workspace/ui/components/form";
import FormFieldProps from "@workspace/ui/components/form-field";
import FormSelectProps from "@workspace/ui/components/form-select";
import { post } from "@workspace/ui/lib/https";

const formSchema = z.object({
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
  goal: z.enum(["Lose Weight", "Gain Weight", "Maintain Weight"], {
    errorMap: () => ({ message: "Choose a goal." }),
  }),

  // required: integer
  age: z.coerce
    .number({ invalid_type_error: "Age must be a number." })
    .int({ message: "Age must be an integer." })
    .min(1, { message: "Age must be at least 1." })
    .max(120, { message: "Age seems unrealistic." }),
});

export default function SignUpCard() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      weight: 60,
      age: 18,
      goal: "Maintain Weight",
    },
  });

  const pending = form.formState.isSubmitting;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await post("/api/auth/signup", values);

    if (res.ok) {
      alert("Signed up successfully!");
    } else {
      alert(res.error);
    }
  }

  return (
    <>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
        </CardHeader>
        <CardContent>
          {" "}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormFieldProps
                name="name"
                label="Name"
                placeholder="Name"
                type="text"
                disabled={pending}
              />

              <FormFieldProps
                name="email"
                label="Email"
                placeholder="Email"
                type="email"
                disabled={pending}
              />

              <FormFieldProps
                name="password"
                label="Password"
                placeholder="Password"
                type="password"
                disabled={pending}
              />

              <FormFieldProps
                name="weight"
                label="Weight"
                placeholder="Weight"
                type="number"
                disabled={pending}
              />

              <FormSelectProps
                name="goal"
                label="Goal"
                options={[
                  { label: "Lose Weight", value: "Lose Weight" },
                  { label: "Gain Weight", value: "Gain Weight" },
                  { label: "Maintain Weight", value: "Maintain Weight" },
                ]}
                disabled={pending}
              />

              <FormFieldProps
                name="age"
                label="Age"
                placeholder="Age"
                type="number"
                disabled={pending}
              />

              <Button type="submit" className="w-full" disabled={pending}>
                {pending ? <>Submitting...</> : "Submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
