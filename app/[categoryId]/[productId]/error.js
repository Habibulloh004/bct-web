// app/[categoryId]/error.js
"use client";

import React, { useEffect } from "react";
import ErrorState from "@/components/shared/ErrorState";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Category page error:", error);
  }, [error]);

  return (
    <main className="pt-24 min-h-[60vh] flex items-center justify-center px-4">
      <ErrorState
        onRetry={reset}
        showDetails={process.env.NODE_ENV !== "production"}
        error={error}
      />
    </main>
  );
}
