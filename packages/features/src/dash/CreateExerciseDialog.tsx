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
import { createExercise } from "@workspace/api/exercises/create-exercise";
import {
  Category,
  exerciseFormSchema,
  ExerciseFormValues,
  Intensity,
} from "@workspace/interfaces/exercise";
import csvToArray from "@workspace/ui/components/csv-to-array";
import FormTextAreaProps from "@workspace/ui/components/form-textarea";
import { toast } from "@workspace/ui/components/sonner";

export function CreateExerciseDialog({ onCreated }: { onCreated: () => void }) {
  const [open, setOpen] = useState(false);

  const form = useForm<ExerciseFormValues>({
    resolver: zodResolver(exerciseFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: Category.CARDIO,
      duration: 5,
      intensity: Intensity.LOW,
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
    const payload: any = {
      ...values,
      targetedMuscles: csvToArray(values.targetedMuscles),
    };
    if (!payload.user) delete payload.user; // omit if empty

    try {
      const ok = await createExercise(payload);
      if (!ok) {
        toast.error("Failed to create exercise. Please try again.");
        return;
      }
      toast.success("Exercise created successfully ✅");
      setOpen(false);
      form.reset();
      onCreated();
    } catch (error) {
      console.error("Create exercise error:", error);
      toast.error("Something went wrong. Please try again.");
    }
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
                { label: "Cardio", value: Category.CARDIO },
                { label: "Strength", value: Category.STRENGTH },
                { label: "Flexibility", value: Category.FLEXIBILITY },
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
                { label: "Low", value: Intensity.LOW },
                { label: "Moderate", value: Intensity.MODERATE },
                { label: "High", value: Intensity.HIGH },
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
              <FormTextAreaProps
                name="description"
                label="Description"
                placeholder="Description"
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
