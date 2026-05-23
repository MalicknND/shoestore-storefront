import { Skeleton } from "@/components/ui/skeleton";

export function ProductGridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          className="overflow-hidden rounded-2xl border border-neutral-200 bg-white p-3"
          key={index}
        >
          <Skeleton className="aspect-[4/5] w-full" />
          <Skeleton className="mt-4 h-4 w-1/3" />
          <Skeleton className="mt-3 h-6 w-3/4" />
          <Skeleton className="mt-5 h-12 w-full" />
        </div>
      ))}
    </div>
  );
}
