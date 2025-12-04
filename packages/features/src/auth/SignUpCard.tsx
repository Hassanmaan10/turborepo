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
import FormSelectProps from "@workspace/ui/components/form-select";
import { post } from "@workspace/api/https";
import { toast } from "@workspace/ui/components/sonner";
import { useRouter } from "next/navigation";
import { signupFormSchema, SignUpFormValues } from "@workspace/interfaces/auth";

export default function SignUpCard() {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signupFormSchema),
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
  async function onSubmit(values: SignUpFormValues) {
    try {
      const res = await post("/api/auth/signup", values);

      if (res.ok) {
        toast.success("Signed up successfully ✅");
        router.push("/login");
      } else {
        toast.error(res.error ?? "Failed to sign up. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Something went wrong. Please try again.");
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
