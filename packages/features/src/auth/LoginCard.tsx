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
import { post } from "@workspace/ui/lib/https";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, {
      message: "Password must include at least one letter and one number.",
    }),
});

export default function LoginCard() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await post("/api/auth/login", values);
    if (res.ok) {
      alert("Logged in!");
    } else {
      alert(res.error);
    }
  }
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Log in</CardTitle>
      </CardHeader>
      <CardContent>
        {" "}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
