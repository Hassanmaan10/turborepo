"use client";

import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { Dumbbell } from "lucide-react";

interface HeaderProps {
  isAuthenticated?: boolean;
}

export function Header({ isAuthenticated }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <Dumbbell className="h-5 w-5" />
            </div>
            <span>FitUp</span>
          </Link>

          {/* Main nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/exercise"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Exercises
            </Link>
            <Link
              href="/workouts"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Workouts
            </Link>
          </nav>

          {/* Desktop auth actions */}
          <div className="hidden md:flex items-center gap-4">
            {!isAuthenticated && (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button asChild>
                  <Link href="/sign-up">Sign up</Link>
                </Button>
              </>
            )}

            {isAuthenticated && (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/dashboard">Logout</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
