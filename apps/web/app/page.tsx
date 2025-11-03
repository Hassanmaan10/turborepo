import Link from "next/link";
import { Button } from "@workspace/ui/components/button";

export default function HomePage() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center gap-4 p-6">
      {/* Big primary CTA */}
      <Button asChild size="lg" className="px-8">
        <Link href="/sign-up" aria-label="Create account">
          Create account
        </Link>
      </Button>

      {/* Smaller secondary action */}
      <Button asChild size="sm" variant="outline" className="px-4">
        <Link href="/login" aria-label="Login">
          Login
        </Link>
      </Button>
    </main>
  );
}
