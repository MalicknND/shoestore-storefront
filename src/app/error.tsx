"use client";

import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container-px mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center text-center">
      <p className="text-sm font-bold uppercase tracking-[0.24em] text-neutral-500">
        API indisponible
      </p>
      <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
        Impossible de charger la boutique.
      </h1>
      <p className="mt-5 text-neutral-600">
        Vérifie que le backend Spring Boot tourne sur{" "}
        <span className="font-semibold text-neutral-950">localhost:8081</span>
        {error.message ? ` (${error.message})` : "."}
      </p>
      <Button className="mt-8" onClick={reset}>
        <RefreshCcw size={17} aria-hidden />
        Réessayer
      </Button>
    </div>
  );
}
