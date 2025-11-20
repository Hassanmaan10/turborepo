import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@workspace/ui/components/form";
import { updateExercise } from "../api/update-exercise";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import FormFieldProps from "@workspace/ui/components/form-field";
import FormSelectProps from "@workspace/ui/components/form-select";
import { Button } from "@workspace/ui/components/button";
import csvToArray from "@workspace/ui/components/csv-to-array";
import {
  Exercise,
  exerciseFormSchema,
  ExerciseFormValues,
} from "@workspace/ui/lib/types";

interface UpdateExerciseDialogProps {
  exercise: Exercise | null;
  open: boolean;
  onClose: () => void;
  onUpdated: () => void;
}

export function UpdateExerciseDialog({
  exercise,
  open,
  onClose,
  onUpdated,
}: UpdateExerciseDialogProps) {
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

  useEffect(() => {
    if (!exercise) return;

    form.reset({
      title: exercise.title ?? "",
      description: exercise.description ?? "",
      category: (exercise.category as any) ?? "Cardio",
      duration: exercise.duration ?? 5,
      intensity: (exercise.intensity as any) ?? "Low",
      sets: exercise.sets ?? 3,
      reps: exercise.reps ?? 10,
      rest: exercise.rest ?? 60,
      image: exercise.image ?? "",
      youtubeVideo: exercise.youtubeVideo ?? "",
      targetedMuscles: (exercise.targetedMuscles || []).join(", "),
    });
  }, [exercise, form]);

  const pending = form.formState.isSubmitting;

  async function onSubmit(values: ExerciseFormValues) {
    if (!exercise?._id) return;

    const payload: any = {
      ...values,
      targetedMuscles: csvToArray(values.targetedMuscles),
    };
    if (!payload.user) delete payload.user;

    const ok = await updateExercise(exercise._id, payload);
    if (!ok) return;

    onUpdated();
    onClose();
  }
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent className="max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>Edit Exercise</DialogTitle>
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

            <FormFieldProps
              name="targetedMuscles"
              label="Targeted muscles"
              placeholder="Pectoral, Triceps, Deltoids"
              type="text"
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
