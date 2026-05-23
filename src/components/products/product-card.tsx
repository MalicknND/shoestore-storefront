import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  formatPrice,
  getProductImage,
  toProductSlug,
} from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const isAvailable = product.status === "AVAILABLE" && product.stock > 0;

  return (
    <article className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_20px_80px_rgba(15,15,15,0.06)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_90px_rgba(15,15,15,0.1)]">
      <Link
        className="relative block aspect-[4/5] overflow-hidden bg-neutral-100"
        href={`/products/${toProductSlug(product)}`}
      >
        <Image
          alt={product.name}
          className="object-cover transition duration-700 group-hover:scale-105"
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          src={getProductImage(product)}
        />
        <div className="absolute left-3 top-3">
          <Badge
            className={
              isAvailable
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-neutral-300 bg-neutral-100 text-neutral-600"
            }
          >
            {isAvailable ? "En stock" : "Rupture"}
          </Badge>
        </div>
      </Link>
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
              {product.category?.name ?? "Premium"}
            </p>
            <h3 className="mt-2 text-lg font-semibold tracking-tight text-neutral-950">
              {product.name}
            </h3>
          </div>
          <p className="shrink-0 text-sm font-bold text-neutral-950">
            {formatPrice(product.price)}
          </p>
        </div>
        <Button asChild className="mt-5 w-full" variant="secondary">
          <Link href={`/products/${toProductSlug(product)}`}>
            Voir produit <ArrowUpRight size={16} aria-hidden />
          </Link>
        </Button>
      </div>
    </article>
  );
}
