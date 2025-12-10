export enum WorkoutIntensity {
  LOW = "low",
  MODERATE = "Moderate",
  HIGH = "High",
}
export interface Workout {
  _id: string;
  title: string;
  description: string;
  exercises: string[];
  user: string;
  image: string;
  intensity: WorkoutIntensity;
  duration: number;
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
