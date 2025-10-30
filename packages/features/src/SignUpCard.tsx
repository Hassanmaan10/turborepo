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

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, { message: "Name must be at most 50 characters." }),

  email: z.string().email({ message: "Please enter a valid email address." }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, {
      message: "Password must include at least one letter and one number.",
    }),

  weight: z.coerce
    .number()
    .min(1, { message: "Enter a valid weight (kg)." })
    .max(500, { message: "Weight seems unrealistic." }),

  age: z.coerce
    .number()
    .int({ message: "Age must be an integer." })
    .min(1, { message: "Age must be at least 1." })
    .max(120, { message: "Age seems unrealistic." }),

  goal: z.enum(["Lose Weight", "Gain Weight", "Maintain Weight"]),
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

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
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
            />

            <FormFieldProps
              name="email"
              label="Email"
              placeholder="Email"
              type="email"
            />

            <FormFieldProps
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
            />

            <FormFieldProps
              name="weight"
              label="Weight"
              placeholder="Weight"
              type="number"
            />

            <FormSelectProps
              name="goal"
              label="Goal"
              options={[
                { label: "Lose Weight", value: "Lose Weight" },
                { label: "Gain Weight", value: "Gain Weight" },
                { label: "Maintain Weight", value: "Maintain Weight" },
              ]}
            />

            <FormFieldProps
              name="age"
              label="Age"
              placeholder="Age"
              type="number"
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
