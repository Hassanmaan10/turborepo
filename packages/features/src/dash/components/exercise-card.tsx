"use client";
import { Edit2, Trash2 } from "lucide-react";
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

  showActions?: boolean;
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
  showActions = true,
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
        "w-80 relative transition-opacity " + (isDeleting ? "opacity-50" : "")
      }
    >
      {showActions && (
        <div className="absolute top-2 right-2 flex items-center gap-1">
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onEdit();
            }}
            className="bg-transparent w-2.5 hover:bg-transparent cursor-pointer"
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
      )}

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

        {image ? (
          <div className=" wfull h-40 rounded-md overflow-hidden">
            <Image
              src={image}
              alt={title ?? "Exercise image"}
              width={320}
              height={160}
              className="h-40 w-full object-cover"
            />
          </div>
        ) : (
          <div className="flex w-full h-40 items-center justify-center rounded-md bg-gray-100 text-xs text-gray-500">
            No image
          </div>
        )}

        <ExerciseContent label="Youtube:" value={youtubeVideo} />
        <ExerciseContent label="Description:" value={description} />
      </CardContent>
    </Card>
  );
}
