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
import { ExerciseCardProps } from "@workspace/interfaces/exercise";

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
}: ExerciseCardProps) {
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
        "w-80 overflow-hidden relative transition-opacity " +
        (isDeleting ? "opacity-50" : "")
      }
    >
      {/* Image header */}
      <div className="relative h-33 w-full bg-muted">
        {image ? (
          <>
            <Image
              src={image}
              alt={title ?? "Exercise image"}
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
            No image
          </div>
        )}

        {/* Actions */}
        {showActions && (
          <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
            <Button
              type="button"
              variant="outline"
              className="h-9 w-9 rounded-full bg-white cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEdit();
              }}
            >
              <Edit2 className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              variant="destructive"
              className="h-9 w-9 rounded-full cursor-pointer"
              onClick={handleDeleteClick}
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Title overlay */}
        <div className="absolute bottom-3 left-3 right-3 z-10">
          <div className="text-white font-semibold text-lg leading-tight line-clamp-2">
            {title ?? "Untitled exercise"}
          </div>
        </div>
      </div>

      {/* Body */}
      <CardHeader className="pb-2sa">
        <CardTitle className="sr-only">
          {title ?? "Untitled exercise"}
        </CardTitle>

        {/* Quick chips */}
        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted">
            {category}
          </span>
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted">
            {intensity}
          </span>
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted">
            {duration}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 text-sm">
        {/* Metrics grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          <ExerciseContent label="Sets:" value={sets} />
          <ExerciseContent label="Reps:" value={reps} />
          <ExerciseContent label="Rest:" value={rest} />
          <ExerciseContent label="Duration:" value={duration} />
        </div>

        <div className="space-y-2">
          <ExerciseContent label="Muscles:" value={targetedMuscles} />
          <ExerciseContent label="Youtube:" value={youtubeVideo} />
        </div>

        {/* Description block */}
        <div className="rounded-lg bg-muted/50 p-3">
          <div className="text-xs font-semibold mb-1">Description</div>
          <div className="text-sm text-muted-foreground leading-relaxed">
            {description || "No description"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
