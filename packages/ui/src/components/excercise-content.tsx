"use client";

interface ExerciseCardProps {
  label: string;
  value: React.ReactNode;
  classname?: string;
}
export default function ExerciseContent({
  label,
  value,
  classname,
}: ExerciseCardProps) {
  return (
    <div className={classname}>
      <span className="font-medium">{label}</span>
      <span className="opacity-80 wrap-break-words break-all">
        {value ?? "-"}
      </span>
    </div>
  );
}
