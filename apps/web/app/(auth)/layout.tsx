import { Toaster } from "@workspace/ui/components/sonner";

// apps/web/app/(auth)/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center min-h-dvh">
      {children}
      <Toaster richColors position="top-right" />
    </div>
  );
}
