import { Toaster } from "@workspace/ui/components/sonner";
import { Header } from "@workspace/ui/layout/Navbar";
import type { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>
        {children}
        <Toaster richColors position="top-right" />
      </main>
    </>
  );
}
