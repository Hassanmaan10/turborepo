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
import { SignUp } from "@workspace/api/auth/sign-up";
import { toast } from "@workspace/ui/components/sonner";
import { useRouter } from "next/navigation";
import {
  Goal,
  signupFormSchema,
  SignUpFormValues,
} from "@workspace/interfaces/auth";

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
      goal: Goal.MAINTAIN_WEIGHT,
    },
  });

  const pending = form.formState.isSubmitting;

  // 2. Define a submit handler.
  async function onSubmit(values: SignUpFormValues) {
    try {
      const res = await SignUp(values);
      if (!res.status) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message || "Signed up successfully ✅");
      router.push("/login");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
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
                  { label: "Lose Weight", value: Goal.LOSE_WEIGHT },
                  { label: "Gain Weight", value: Goal.GAIN_WEIGHT },
                  { label: "Maintain Weight", value: Goal.MAINTAIN_WEIGHT },
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
