"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { getTokenCookie } from "@workspace/ui/lib/token-cookie";
import { Exercise } from "@workspace/interfaces/exercise/types";
import {
  workoutFormSchema,
  WorkoutFormValues,
} from "@workspace/interfaces/workout/validation";
import { useEffect, useState } from "react";
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
import { getExercises } from "@workspace/api/get-exercise";
import FormDropDownMenu from "@workspace/ui/components/from-dropdown-menu";
import { toast } from "@workspace/ui/components/sonner";
import { Intensity } from "@workspace/interfaces/workout";

export default function CreateWorkoutDialog({
  onCreated,
}: {
  onCreated: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [exerciseOptions, setExerciseOptions] = useState<Exercise[]>([]);
  const form = useForm<WorkoutFormValues>({
    resolver: zodResolver(workoutFormSchema),
    defaultValues: {
      title: "",
      description: "",
      exercises: [],
      user: "",
      image: "",
      intensity: Intensity.LOW,
      duration: 30,
    },
  });

  const pending = form.formState.isSubmitting;

  useEffect(() => {
    async function fetchExercises() {
      const list = await getExercises();
      setExerciseOptions(list as Exercise[]);
    }
    fetchExercises();
  }, []);

  async function onSubmit(values: WorkoutFormValues) {
    const token = getTokenCookie();
    if (!token) {
      toast.error("Please log in again.");
      return;
    }

    const payload: any = {
      ...values,
    };
    if (!payload.user) delete payload.user; // omit if empty

    try {
      const ok = await createWorkouts(payload);

      if (!ok) {
        toast.error("Failed to create workout. Please try again.");
        return;
      }

      toast.success("Workout created successfully ✅");
      setOpen(false);
      form.reset();
      onCreated();
    } catch (error) {
      console.error("Create workout error:", error);
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

              <FormDropDownMenu
                name="exercises"
                label="Exercise"
                trigger="Select exercise"
                options={exerciseOptions.map((ex) => ({
                  label: ex.title ?? "Untitled exercise",
                  value: ex._id,
                }))}
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
