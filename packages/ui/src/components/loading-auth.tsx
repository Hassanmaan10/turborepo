import React from "react";

export default function LoadingAuth() {
  return (
    <main className="min-h-dvh grid place-items-center p-6">
      <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-lg dark:bg-neutral-900">
        <span className="animate-spin inline-block size-4 rounded-full border-2 border-current border-r-transparent" />
        <span className="text-sm font-medium">Loading…</span>
      </div>
    </main>
  );
}
