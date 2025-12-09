export interface Exercise {
  _id: string;
  title: string;
  description: string;
  category: Category;
  duration: number;
  intensity: Intensity;
  sets: number;
  reps: number;
  rest: number;
  image: string;
  youtubeVideo: string;
  targetedMuscles: string[];
}

export interface ExerciseCardProps extends Exercise {
  onDelete: () => Promise<void> | void;
  onEdit: () => void;
  showActions?: boolean;
}

export interface UpdateExerciseDialogProps {
  exercise: Exercise | null;
  open: boolean;
  onClose: () => void;
  onUpdated: () => void;
}

export enum Category {
  CARDIO = "Cardio",
  STRENGTH = "Strength",
  FLEXIBILITY = "Flexibility",
}

export enum Intensity {
  LOW = "Low",
  MODERATE = "Moderate",
  HIGH = "High",
}

export interface createExercisePayload {
  title: string;
  description: string;
  category: Category;
  duration: number;
  intensity: Intensity;
  sets: number;
  reps: number;
  rest: number;
  image?: string;
  youtubeVideo?: string;
  targtedMuscles: string;
}

export interface createExerciseApiResponse {
  status: boolean;
  message: string;
}

export interface getExerciseApiResponse {
  status: boolean;
  results: number;
  data: Exercise[];
}

export interface getExerciseByIdApiResponse {
  status: boolean;
  data: Exercise | null;
}
