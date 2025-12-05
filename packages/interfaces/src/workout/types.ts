export interface WorkoutProps {
  _id: string;
  title: string;
  description: string;
  exercises: string[];
  image: string;
  intensity: "Low" | "Moderate" | "High";
  duration: number;
  __v?: number;
}

export enum Intensity {
  LOW = "low",
  MODERATE = "Moderate",
  HIGH = "High",
}
