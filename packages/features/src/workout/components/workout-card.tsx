"use client";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardHeader } from "@workspace/ui/components/card";
import { Clock, TrendingUp } from "lucide-react";
import Image from "next/image";
import { WorkoutProps } from "@workspace/interfaces/workout/types";

export default function WorkoutCard({
  title,
  description,
  image,
  exercises,
  intensity,
  duration,
}: WorkoutProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image header */}
      <div className="relative h-56 overflow-hidden bg-muted">
        <Image
          unoptimized
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        <div className="absolute top-3 right-3 bg-white rounded-2xl px-2 py-1.5 font-bold">
          {intensity}
        </div>
      </div>

      {/* Title + description */}
      <CardHeader>
        <h3 className="font-bold text-xl mb-2 text-balance">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </CardHeader>

      {/* Duration + exercises + CTA */}
      <CardContent>
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration} min</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            <span>{exercises.length} exercises</span>
          </div>
        </div>
        <Button className="w-full">Start Workout</Button>
      </CardContent>
    </Card>
  );
}
