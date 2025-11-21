"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@workspace/ui/components/form";
import FormFieldProps from "@workspace/ui/components/form-field";
import FormSelectProps from "@workspace/ui/components/form-select";
import { useState } from "react";
import { getTokenCookie } from "@workspace/ui/lib/token-cookie";
import { createExercise } from "@workspace/api/create-exercise";
import {
  exerciseFormSchema,
  ExerciseFormValues,
} from "@workspace/ui/lib/types";
import csvToArray from "@workspace/ui/components/csv-to-array";

export function CreateExerciseDialog({ onCreated }: { onCreated: () => void }) {
  const [open, setOpen] = useState(false);

  const form = useForm<ExerciseFormValues>({
    resolver: zodResolver(exerciseFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "Cardio",
      duration: 5,
      intensity: "Low",
      sets: 3,
      reps: 10,
      rest: 60,
      image: "",
      youtubeVideo: "",
      targetedMuscles: "Pectoral, Triceps, Deltoids",
    },
  });

  const pending = form.formState.isSubmitting;

  // 2. Define a submit handler.
  async function onSubmit(values: ExerciseFormValues) {
    const token = getTokenCookie();
    if (!token) {
      alert("Please login again.");
      return;
    }

    const payload: any = {
      ...values,
      targetedMuscles: csvToArray(values.targetedMuscles),
    };
    if (!payload.user) delete payload.user; // omit if empty

    const ok = await createExercise(payload);
    if (!ok) return;

    setOpen(false);
    form.reset();
    onCreated();
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
        <Button variant="outline">Create Excercises</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>Create Exercise</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-row gap-4">
              <FormFieldProps
                name="title"
                label="Title"
                placeholder="Title"
                type="text"
              />
              <FormFieldProps
                name="targetedMuscles"
                label="Targeted muscles"
                placeholder="Pectoral, Triceps, Deltoids"
                type="text"
              />
            </div>
            <FormSelectProps
              name="category"
              label="Category"
              options={[
                { label: "Cardio", value: "Cardio" },
                { label: "Strength", value: "Strength" },
                { label: "Flexibility", value: "Flexibility" },
              ]}
            />
            <FormFieldProps
              name="duration"
              label="Duration in minutes"
              placeholder="Duration"
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

            <div className="flex flex-row gap-4">
              <FormFieldProps
                name="sets"
                label="Sets"
                placeholder="Sets"
                type="number"
              />
              <FormFieldProps
                name="reps"
                label="Reps"
                placeholder="Reps"
                type="number"
              />
            </div>
            <FormFieldProps
              name="rest"
              label="Rest in seconds"
              placeholder="Rest"
              type="number"
            />
            <div className="flex flex-row gap-4">
              <FormFieldProps
                name="image"
                label="Image"
                placeholder="Image"
                type="url"
              />
              <FormFieldProps
                name="youtubeVideo"
                label="Youtube Video"
                placeholder="Youtube Video"
                type="url"
              />
            </div>
            <div>
              <FormFieldProps
                name="description"
                label="Description"
                placeholder="Description"
                type="text"
              />
            </div>

            <Button type="submit" disabled={pending}>
              {" "}
              {pending ? "Creating…" : "Submit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
