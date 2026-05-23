import Link from "next/link";
import { Camera, MessageCircle, Music2 } from "lucide-react";
import { STORE_NAME } from "@/constants/store";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-950 text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.28em]">
            {STORE_NAME}
          </p>
          <p className="mt-5 max-w-sm text-sm leading-7 text-neutral-400">
            Curated footwear pour une génération qui achète vite, partage fort
            et choisit mieux.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">Boutique</p>
          <div className="mt-4 grid gap-3 text-sm text-neutral-400">
            <Link href="/shop">Nouveautés</Link>
            <Link href="/shop">Sneakers</Link>
            <Link href="/shop">Premium picks</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold">Social commerce</p>
          <div className="mt-4 flex gap-3">
            {[Camera, Music2, MessageCircle].map((Icon, index) => (
              <Link
                aria-label={`Social link ${index + 1}`}
                className="flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-neutral-950"
                href="#social"
                key={Icon.displayName ?? index}
              >
                <Icon size={18} aria-hidden />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
