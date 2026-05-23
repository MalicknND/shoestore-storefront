import type { Product } from "@/types/product";
import { ProductCard } from "@/components/products/product-card";
import { EmptyProducts } from "@/components/products/empty-products";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return <EmptyProducts />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
