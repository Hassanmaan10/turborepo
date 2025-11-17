"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import ExerciseContent from "@workspace/ui/components/excercise-content";

export interface Props {
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
}

export default function ExerciseCard({
  title,
  description,
  category,
  duration,
  intensity,
  sets,
  reps,
  rest,
  image,
  youtubeVideo,
  targetedMuscles,
}: Props) {
  return (
    <Card className="w-80">
      <CardHeader className="">
        <CardTitle className="text-lg">
          {title ?? "Untitled exercise"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex flex-row gap-6">
          <ExerciseContent label="Category:" value={category} />
          <ExerciseContent label="Intensity:" value={intensity} />
        </div>
        <div className="flex flex-row gap-6">
          <ExerciseContent label="Duration:" value={duration} />
          <ExerciseContent label="Sets:" value={sets} />
        </div>
        <div className="flex flex-row gap-6">
          <ExerciseContent label="Reps:" value={reps} />
          <ExerciseContent label="Rest:" value={rest} />
        </div>

        <ExerciseContent label="Muscles:" value={targetedMuscles} />
        <ExerciseContent label="Image:" value={image} />
        <ExerciseContent label="Youtube:" value={youtubeVideo} />
        <ExerciseContent label="Description:" value={description} />
      </CardContent>
    </Card>
  );
}
