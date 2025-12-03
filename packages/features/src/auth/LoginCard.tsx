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
import { post } from "@workspace/api/https";
import setTokenCookie from "@workspace/ui/lib/token-cookie";
import { useRouter } from "next/navigation.js";
import { useAuth } from "@workspace/ui/hooks/use-auth";
import { toast } from "@workspace/ui/components/sonner";
import {
  LoginFormValues,
  loginFormSchema,
} from "@workspace/interfaces/auth/validation";

export default function LoginCard() {
  const router = useRouter();
  const { login } = useAuth();
  // 1. Define your form.
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const pending = form.formState.isSubmitting;

  // 2. Define a submit handler.
  async function onSubmit(values: LoginFormValues) {
    try {
      const res = await post("/api/auth/login", values);

      if (res.ok) {
        const token = (res.data as any)?.token;
        if (typeof token === "string") {
          setTokenCookie(token);
          login(token);
        }
        toast.success("Logged in successfully ✅");
        router.push("/exercise");
        return;
      }
      toast.error(res.error ?? "Invalid credentials. Please try again.");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
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
