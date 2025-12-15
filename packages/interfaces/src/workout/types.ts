import { Exercise } from "../exercise";

export interface UpdateWorkoutDialogProps {
  workout: Workout | null;
  open: boolean;
  onClose: () => void;
  onUpdated: () => void;
}

export enum WorkoutIntensity {
  LOW = "Low",
  MODERATE = "Moderate",
  HIGH = "High",
}
export interface Workout {
  _id: string;
  title: string;
  description: string;
  exercises: string[];
  user?: string;
  image: string;
  intensity: WorkoutIntensity;
  duration: number;
}

export interface WorkoutCard extends Workout {
  showActions?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export interface CreateWorkoutPayload {
  title: string;
  description: string;
  exercises: string[];
  image: string;
  intensity: WorkoutIntensity;
  duration: number;
}

export interface CreateWorkoutApiResponse {
  status: boolean;
  message: string;
  workout: Workout | null;
}

export interface GetWorkoutsApiResponse {
  status: boolean;
  workouts: Workout[];
}

export interface WorkoutDetails {
  _id: string;
  title: string;
  description: string;
  exercises: Exercise[];
  user: string;
  image: string;
  intensity: WorkoutIntensity;
  duration: number;
}

export interface GetWorkoutByIdApiResponse {
  status: boolean;
  workout: WorkoutDetails | null;
}

export interface UpdateWorkoutPayload {
  title: string;
  description: string;
  exercises: string[];
  image: string;
  intensity: string;
  duration: number;
}

export interface UpdateWorkoutsApiResponse {
  status: boolean;
  message: string;
  workout: Workout | null;
}

export interface DeleteWorkoutApiResponse {
  status: boolean;
  message: string;
}
