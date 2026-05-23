"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { Category, Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductGrid } from "@/components/products/product-grid";

const PAGE_SIZE = 6;

export function ShopExperience({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase().trim();

    return products.filter((product) => {
      const matchesCategory =
        category === "all" || product.category?.name === category;
      const matchesSearch =
        normalized.length === 0 ||
        product.name.toLowerCase().includes(normalized) ||
        product.description?.toLowerCase().includes(normalized);

      return matchesCategory && matchesSearch;
    });
  }, [category, products, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visibleProducts = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function updateCategory(nextCategory: string) {
    setCategory(nextCategory);
    setPage(1);
  }

  function updateQuery(nextQuery: string) {
    setQuery(nextQuery);
    setPage(1);
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-neutral-200 bg-white p-3 shadow-[0_18px_70px_rgba(15,15,15,0.05)]">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
          <label className="relative block">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              size={18}
              aria-hidden
            />
            <Input
              className="pl-11"
              onChange={(event) => updateQuery(event.target.value)}
              placeholder="Rechercher une paire..."
              value={query}
            />
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
            <Button
              onClick={() => updateCategory("all")}
              size="sm"
              variant={category === "all" ? "default" : "secondary"}
            >
              Tout
            </Button>
            {categories.map((item) => (
              <Button
                key={item.id}
                onClick={() => updateCategory(item.name)}
                size="sm"
                variant={category === item.name ? "default" : "secondary"}
              >
                {item.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <ProductGrid products={visibleProducts} />

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-neutral-500">
          {filtered.length} produit{filtered.length > 1 ? "s" : ""} trouve
          {filtered.length > 1 ? "s" : ""}
        </p>
        <div className="flex items-center gap-2">
          <Button
            disabled={page === 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            size="sm"
            variant="secondary"
          >
            Précédent
          </Button>
          <span className="text-sm font-semibold text-neutral-700">
            {page}/{totalPages}
          </span>
          <Button
            disabled={page === totalPages}
            onClick={() =>
              setPage((current) => Math.min(totalPages, current + 1))
            }
            size="sm"
            variant="secondary"
          >
            Suivant
          </Button>
        </div>
      </div>
    </div>
  );
}
