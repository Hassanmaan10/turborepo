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
import { Form } from "@workspace/ui/components/form";
import FormFieldProps from "@workspace/ui/components/form-field";
import { useRouter } from "next/navigation.js";
import { useAuth } from "@workspace/ui/hooks/use-auth";
import { toast } from "@workspace/ui/components/sonner";
import { LoginFormValues, loginFormSchema } from "@workspace/interfaces/auth";
import { Login } from "@workspace/api/auth/login";

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
      const res = await Login(values);
      if (!res.status) {
        toast.error(res.message);
        return;
      }
      if (res.token) {
        login(res.token);
      }
      toast.success(res.message);
      router.push("/exercise");
    } catch (error) {
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
