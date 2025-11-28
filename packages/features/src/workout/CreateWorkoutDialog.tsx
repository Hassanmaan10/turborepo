"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import csvToArray from "@workspace/ui/components/csv-to-array";
import { getTokenCookie } from "@workspace/ui/lib/token-cookie";
import { workoutFormSchema, WorkoutFormValues } from "@workspace/ui/lib/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createWorkouts } from "@workspace/api/workouts/create-workouts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Form } from "@workspace/ui/components/form";
import FormFieldProps from "@workspace/ui/components/form-field";
import FormSelectProps from "@workspace/ui/components/form-select";
import FormTextAreaProps from "@workspace/ui/components/form-textarea";

export default function CreateWorkoutDialog({
  onCreated,
}: {
  onCreated: () => void;
}) {
  const [open, setOpen] = useState(false);
  const form = useForm<WorkoutFormValues>({
    resolver: zodResolver(workoutFormSchema),
    defaultValues: {
      title: "",
      description: "",
      exercises: "",
      user: "",
      image: "",
      intensity: "Low",
      duration: 30,
    },
  });

  const pending = form.formState.isSubmitting;

  async function onSubmit(values: WorkoutFormValues) {
    const token = getTokenCookie();
    if (!token) {
      alert("Please login again");
      return;
    }

    const payload: any = {
      ...values,
      exercises: csvToArray(values.exercises),
    };
    if (!payload.user) delete payload.user; // omit if empty

    const ok = await createWorkouts(payload);
    if (!ok) return;

    setOpen(false);
    form.reset();
    onCreated;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (pending) return;
        setOpen(nextOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">Create Workout</Button>
      </DialogTrigger>

      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Workout</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-row gap-4">
              <FormFieldProps
                name="title"
                label="Title"
                placeholder="Full Body Beginner"
                type="text"
              />
              <FormFieldProps
                name="exercises"
                label="Exercise IDs"
                placeholder="691d959ecd83e01bdbc23188, 69202dd0be506108637601cc"
                type="text"
              />
            </div>

            <FormTextAreaProps
              name="description"
              label="Description"
              placeholder="A simple full body workout for beginners."
            />

            <FormFieldProps
              name="duration"
              label="Duration in minutes"
              placeholder="45"
              type="number"
            />

            <FormSelectProps
              name="intensity"
              label="Intensity"
              options={[
                { label: "Low", value: "Low" },
                { label: "Moderate", value: "Moderate" },
                { label: "High", value: "High" },
              ]}
            />

            <FormFieldProps
              name="image"
              label="Image URL"
              placeholder="https://example.com/images/full-body-beginner.png"
              type="url"
            />

            <Button type="submit" disabled={pending}>
              {pending ? "Creating…" : "Submit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
