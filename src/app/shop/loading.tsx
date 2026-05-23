import { ProductGridSkeleton } from "@/components/products/product-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function ShopLoading() {
  return (
    <div className="container-px mx-auto w-full max-w-7xl py-10 sm:py-14">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="mt-4 h-14 w-full max-w-lg" />
      <Skeleton className="mt-5 h-20 w-full max-w-2xl" />
      <Skeleton className="my-8 h-20 w-full" />
      <ProductGridSkeleton />
    </div>
  );
}
