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
import { z } from "zod";
import { Form } from "@workspace/ui/components/form";
import FormFieldProps from "@workspace/ui/components/form-field";
import FormSelectProps from "@workspace/ui/components/form-select";
import { useState } from "react";
import { getTokenCookie } from "@workspace/ui/lib/token-cookie";
import { post } from "@workspace/ui/lib/https";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.enum(["Cardio", "Strength", "Flexibility"]),
  duration: z.coerce.number().positive().int(),
  intensity: z.enum(["Low", "Moderate", "High"]),
  sets: z.coerce.number().positive().int(),
  reps: z.coerce.number().positive().int(),
  rest: z.coerce.number().positive().int(),
  image: z.string().url("Enter a valid URL").optional(),
  youtubeVideo: z.string().url("Enter a valid URL").optional(),
  targetedMuscles: z.string().min(1, "Add at least one muscle"),
  user: z.string().min(1, "User id is required").optional(),
});

export function CreateExerciseDialog({ onCreated }: { onCreated: () => void }) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
      user: "",
    },
  });

  const pending = form.formState.isSubmitting;

  function csvToArray(s: string) {
    return s
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
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

    const res = await post("/api/exercise/create", payload, { token });

    if (res.ok) {
      setOpen(false);
      form.reset();
      onCreated(); // still the same: refresh dashboard
    } else {
      alert(res.error || "Failed to create exercise");
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
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
                name="description"
                label="Description"
                placeholder="Description"
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
            <div className="flex flex-row gap-4">
              <FormFieldProps
                name="targetedMuscles"
                label="Targeted muscles"
                placeholder="Pectoral, Triceps, Deltoids"
                type="text"
              />

              <FormFieldProps
                name="user"
                label="User ID"
                placeholder="e.g. 6912dd3778ec..."
                type="text"
              />
            </div>
            <Button type="submit"> {pending ? "Creating…" : "Submit"}</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
