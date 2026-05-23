import Link from "next/link";
import { Button } from "@/components/ui/button";

type ShopPaginationProps = {
  currentPage: number;
  query: string;
  category: string;
  totalProducts: number;
  totalPages: number;
};

function pageHref(page: number, query: string, category: string) {
  const params = new URLSearchParams();

  if (query) {
    params.set("q", query);
  }

  if (category !== "all") {
    params.set("category", category);
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const queryString = params.toString();
  return queryString ? `/shop?${queryString}` : "/shop";
}

export function ShopPagination({
  category,
  currentPage,
  query,
  totalPages,
  totalProducts,
}: ShopPaginationProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-sm text-neutral-500">
        {totalProducts} produit{totalProducts > 1 ? "s" : ""} trouve
        {totalProducts > 1 ? "s" : ""}
      </p>
      <div className="flex items-center gap-2">
        <Button
          asChild
          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
          size="sm"
          variant="secondary"
        >
          <Link
            aria-disabled={currentPage === 1}
            href={pageHref(Math.max(1, currentPage - 1), query, category)}
          >
            Précédent
          </Link>
        </Button>
        <span className="text-sm font-semibold text-neutral-700">
          {currentPage}/{totalPages}
        </span>
        <Button
          asChild
          className={
            currentPage === totalPages ? "pointer-events-none opacity-50" : ""
          }
          size="sm"
          variant="secondary"
        >
          <Link
            aria-disabled={currentPage === totalPages}
            href={pageHref(Math.min(totalPages, currentPage + 1), query, category)}
          >
            Suivant
          </Link>
        </Button>
      </div>
    </div>
  );
}
