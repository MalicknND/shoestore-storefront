import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types/product";
import { formatPrice, getProductImage } from "@/lib/utils";
import { ProductGallery } from "@/components/products/product-gallery";
import { ProductPurchaseActions } from "@/components/products/product-purchase-actions";

export function ProductDetail({ product }: { product: Product }) {
  const images = product.images?.length
    ? product.images.map((image) => image.imageUrl)
    : [getProductImage(product)];
  const isAvailable = product.status === "AVAILABLE" && product.stock > 0;

  return (
    <div className="container-px mx-auto grid w-full max-w-7xl gap-8 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-14">
      <ProductGallery images={images} productName={product.name} />

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="animate-enter rounded-2xl border border-neutral-200 bg-white p-5 shadow-[0_24px_90px_rgba(15,15,15,0.08)] sm:p-8">
          <Badge>{product.category?.name ?? "Premium"}</Badge>
          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">
            {product.name}
          </h1>
          <p className="mt-4 text-2xl font-black">
            {formatPrice(product.price)}
          </p>
          <p className="mt-6 text-base leading-8 text-neutral-600">
            {product.description ??
              "Une paire premium selectionnee pour un style moderne, net et facile a porter."}
          </p>

          <ProductPurchaseActions
            isAvailable={isAvailable}
            productName={product.name}
            stock={product.stock}
          />
        </div>
      </aside>
    </div>
  );
}
