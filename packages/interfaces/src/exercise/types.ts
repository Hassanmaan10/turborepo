export interface ExerciseCardProps {
  title?: string;
  description?: string;
  category?: string;
  duration: number;
  intensity?: string;
  sets?: number;
  reps?: number;
  rest?: number;
  image?: string;
  youtubeVideo?: string;
  targetedMuscles?: string[];

  onDelete: () => Promise<void> | void;
  onEdit: () => void;

  showActions?: boolean;
}

export type Exercise = ExerciseCardProps & { _id: string };

export interface UpdateExerciseDialogProps {
  exercise: Exercise | null;
  open: boolean;
  onClose: () => void;
  onUpdated: () => void;
}
