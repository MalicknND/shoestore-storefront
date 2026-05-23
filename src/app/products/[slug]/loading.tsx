import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <div className="container-px mx-auto grid w-full max-w-7xl gap-8 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-14">
      <div>
        <Skeleton className="aspect-[4/5] w-full" />
        <div className="mt-4 grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton className="aspect-square w-full" key={index} />
          ))}
        </div>
      </div>
      <div>
        <Skeleton className="h-96 w-full" />
      </div>
    </div>
  );
}
