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
import { post } from "@workspace/features/api/https";
import setTokenCookie from "@workspace/ui/lib/token-cookie";
import { useRouter } from "next/navigation.js";

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
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const pending = form.formState.isSubmitting;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await post("/api/auth/login", values);

    console.log("LOGIN DATA:", res.data);
    if (res.ok) {
      const token = (res.data as any)?.token;
      if (typeof token === "string") {
        setTokenCookie(token);
      }
      router.push("/dashboard");
      return;
    }
    alert(res.error);
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
              disabled={pending}
            />

            <FormFieldProps
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
              disabled={pending}
            />

            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? <>Submitting...</> : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
