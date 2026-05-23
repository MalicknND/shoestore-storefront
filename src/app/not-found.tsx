import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-px mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center text-center">
      <p className="text-sm font-bold uppercase tracking-[0.24em] text-neutral-500">
        404
      </p>
      <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
        Cette paire a quitté le rayon.
      </h1>
      <p className="mt-5 text-neutral-600">
        Retourne au shop pour trouver une autre silhouette premium.
      </p>
      <Button asChild className="mt-8">
        <Link href="/shop">Voir le shop</Link>
      </Button>
    </div>
  );
}
