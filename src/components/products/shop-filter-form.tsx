import { Search } from "lucide-react";
import Link from "next/link";
import type { Category } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ShopFilterFormProps = {
  categories: Category[];
  activeCategory: string;
  query: string;
};

function categoryHref(category: string, query: string) {
  const params = new URLSearchParams();

  if (query) {
    params.set("q", query);
  }

  if (category !== "all") {
    params.set("category", category);
  }

  const queryString = params.toString();
  return queryString ? `/shop?${queryString}` : "/shop";
}

export function ShopFilterForm({
  activeCategory,
  categories,
  query,
}: ShopFilterFormProps) {
  return (
    <form
      action="/shop"
      className="rounded-2xl border border-neutral-200 bg-white p-3 shadow-[0_18px_70px_rgba(15,15,15,0.05)]"
    >
      <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
        <label className="relative block">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            size={18}
            aria-hidden
          />
          <Input
            className="pl-11"
            defaultValue={query}
            name="q"
            placeholder="Rechercher une paire..."
          />
          {activeCategory !== "all" ? (
            <input name="category" type="hidden" value={activeCategory} />
          ) : null}
        </label>
        <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
          <Button
            aria-pressed={activeCategory === "all"}
            asChild
            size="sm"
            variant={activeCategory === "all" ? "default" : "secondary"}
          >
            <Link href={categoryHref("all", query)}>Tout</Link>
          </Button>
          {categories.map((category) => (
            <Button
              aria-pressed={activeCategory === category.name}
              asChild
              key={category.id}
              size="sm"
              variant={activeCategory === category.name ? "default" : "secondary"}
            >
              <Link href={categoryHref(category.name, query)}>
                {category.name}
              </Link>
            </Button>
          ))}
          <Button size="sm" type="submit">
            Rechercher
          </Button>
        </div>
      </div>
    </form>
  );
}
