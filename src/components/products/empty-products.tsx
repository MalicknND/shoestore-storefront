import { SearchX } from "lucide-react";

export function EmptyProducts() {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-white p-8 text-center">
      <SearchX className="text-neutral-400" size={36} aria-hidden />
      <h2 className="mt-4 text-xl font-semibold tracking-tight">
        Aucune paire trouvée
      </h2>
      <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-500">
        Ajuste la recherche ou explore toutes les catégories disponibles.
      </p>
    </div>
  );
}
