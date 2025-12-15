"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateWorkoutDialogProps,
  UpdateWorkoutPayload,
  workoutFormSchema,
  WorkoutFormValues,
  WorkoutIntensity,
} from "@workspace/interfaces/workout";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { updateWorkout } from "@workspace/api/workouts/update-workout";
import { toast } from "@workspace/ui/components/sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { Form } from "@workspace/ui/components/form";
import FormFieldProps from "@workspace/ui/components/form-field";
import FormSelectProps from "@workspace/ui/components/form-select";
import { Button } from "@workspace/ui/components/button";

export function UpdateWorkoutDialog({
  workout,
  open,
  onClose,
  onUpdated,
}: UpdateWorkoutDialogProps) {
  const form = useForm<WorkoutFormValues>({
    resolver: zodResolver(workoutFormSchema),
    defaultValues: {
      title: "",
      description: "",
      exercises: [],
      image: "",
      intensity: WorkoutIntensity.LOW,
      duration: 30,
    },
  });

  useEffect(() => {
    if (!workout) return;

    form.reset({
      title: workout.title,
      description: workout.description,
      exercises: workout.exercises,
      image: workout.image,
      intensity: workout.intensity,
      duration: workout.duration,
    });
  }, [workout, form]);

  const pending = form.formState.isSubmitting;

  async function onSubmit(values: WorkoutFormValues) {
    if (!workout?._id) return;

    const payload: UpdateWorkoutPayload = {
      title: values.title,
      description: values.description,
      exercises: values.exercises,
      image: values.image,
      intensity: values.intensity,
      duration: values.duration,
    };

    try {
      const res = await updateWorkout(workout._id, payload);
      if (!res.status) {
        toast.error(res.message);
        return;
      }
      toast.success("Workout updated successfully");
      onUpdated();
      onClose();
    } catch (error) {
      toast.error("Something wen wrong. Please try again");
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent className="max-w-[452px]">
        <DialogHeader>
          <DialogTitle>Edit Workout</DialogTitle>
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
            </div>

            <FormFieldProps
              name="description"
              label="Description"
              placeholder="A simple full body workout for beginners."
              type="text"
            />

            <FormFieldProps
              name="image"
              label="Image URL"
              placeholder="https://example.com/images/full-body-beginner.png"
              type="url"
            />

            <FormSelectProps
              name="intensity"
              label="Intensity"
              options={[
                { label: "Low", value: WorkoutIntensity.LOW },
                { label: "Moderate", value: WorkoutIntensity.MODERATE },
                { label: "High", value: WorkoutIntensity.HIGH },
              ]}
            />

            <FormFieldProps
              name="duration"
              label="Duration in minutes"
              placeholder="45"
              type="number"
            />

            <Button type="submit" disabled={pending}>
              {pending ? "Updating…" : "Save changes"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
