"use client";
import { Edit2, Pencil, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import ExerciseContent from "@workspace/ui/components/excercise-content";
import { Button } from "@workspace/ui/components/button";
import Image from "next/image";
import { useState } from "react";

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

  onDelete: () => Promise<void> | void;
  onEdit: () => void;
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
  image = "",
  youtubeVideo = "",
  targetedMuscles,
  onDelete,
  onEdit,
}: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDeleteClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await onDelete();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Card
      className={
        "w-80 relative transition-opacity " +
        (isDeleting ? "opacity-50 pointer-events-none" : "")
      }
    >
      <div className="absolute top-2 right-2 flex items-center gap-1">
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onEdit();
          }}
          className="bg-transparent w-2.5  hover:bg-transparent cursor-pointer"
        >
          <Edit2 color="black" />
        </Button>
        <Button
          onClick={handleDeleteClick}
          className="bg-transparent w-2.5 hover:bg-transparent cursor-pointer"
          disabled={isDeleting}
        >
          <Trash2 color="black" />
        </Button>
      </div>

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

        <div className="flex flex-col gap-1">
          <span className="font-medium">Image:</span>
          <div className="relative w-full aspect-1/4 rounded-md overflow-hidden">
            <Image
              src={image}
              unoptimized
              alt={title ?? "Exercise image"}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <ExerciseContent label="Youtube:" value={youtubeVideo} />
        <ExerciseContent label="Description:" value={description} />
      </CardContent>
    </Card>
  );
}
