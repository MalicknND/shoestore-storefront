import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowRight, Camera, MessageCircle, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/products/product-grid";
import { ProductGridSkeleton } from "@/components/products/product-skeleton";
import {
  HERO_IMAGE,
  STORE_NAME,
  lifestyleImages,
} from "@/constants/store";
import { getCategories, getFeaturedProducts } from "@/services/products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sneakers premium a Dakar",
  description:
    "Storefront ShoeStore mobile-first pour sneakers premium, selection fashion et commande directe sur WhatsApp.",
  openGraph: {
    title: "ShoeStore - Sneakers premium a Dakar",
    description:
      "Decouvre une selection premium de chaussures modernes et commande sur WhatsApp.",
    images: [{ url: HERO_IMAGE }],
  },
};

export default function Home() {
  return (
    <div>
      <section className="container-px mx-auto w-full max-w-7xl py-5 sm:py-8">
        <div className="relative min-h-[calc(100svh-6rem)] overflow-hidden rounded-2xl bg-neutral-950 text-white shadow-[0_30px_120px_rgba(0,0,0,0.24)]">
          <Image
            alt="Sneaker premium rouge dans une scene lifestyle"
            className="object-cover opacity-72"
            fill
            priority
            sizes="100vw"
            src={HERO_IMAGE}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.76))]" />
          <div className="relative flex min-h-[calc(100svh-6rem)] flex-col justify-between p-5 sm:p-8 lg:p-10">
            <div className="animate-enter max-w-xl pt-12 sm:pt-20">
              <Badge className="border-white/20 bg-white/12 text-white">
                Drop premium 2026
              </Badge>
              <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.92] tracking-tight sm:text-7xl lg:text-8xl">
                Sneakers pour looks qui se remarquent.
              </h1>
              <p className="mt-6 max-w-lg text-base leading-8 text-white/78 sm:text-lg">
                Une selection visuelle, moderne et premium. Choisis ta paire,
                ta taille, puis commande directement sur WhatsApp.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/shop">
                    Shop now <ArrowRight size={18} aria-hidden />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="#featured">Voir le drop</Link>
                </Button>
              </div>
            </div>
            <div className="grid gap-3 pt-12 sm:grid-cols-3">
              {["Livraison Dakar", "Commande WhatsApp", "Curated fashion"].map(
                (item) => (
                  <div
                    className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md"
                    key={item}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                      {STORE_NAME}
                    </p>
                    <p className="mt-2 text-sm font-semibold">{item}</p>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<FeaturedProductsFallback />}>
        <FeaturedProductsSection />
      </Suspense>

      <Suspense fallback={<CategoriesFallback />}>
        <CategoriesSection />
      </Suspense>

      <section className="container-px mx-auto w-full max-w-7xl py-16" id="story">
        <div className="animate-enter grid overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_30px_100px_rgba(15,15,15,0.08)] lg:grid-cols-2">
          <div className="relative min-h-96">
            <Image
              alt="Editorial fashion premium"
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              src="https://images.unsplash.com/photo-1506629905607-d405d7d3b0d2?q=80&w=1600&auto=format&fit=crop"
            />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-neutral-500">
              Brand story
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
              Le luxe moderne, sans complication.
            </h2>
            <p className="mt-6 text-base leading-8 text-neutral-600">
              ShoeStore rassemble des silhouettes fortes, des textures propres
              et une experience pensee pour les clients mobile-first. Une paire,
              une taille, un message WhatsApp, et la vente avance.
            </p>
          </div>
        </div>
      </section>

      <section className="container-px mx-auto w-full max-w-7xl pb-20 pt-10" id="social">
        <div className="animate-enter rounded-2xl bg-neutral-950 p-6 text-white sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-white/45">
                Instagram / TikTok / WhatsApp
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                Fait pour convertir le trafic social.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: "Instagram drops", icon: Camera },
                { label: "TikTok styling", icon: Play },
                { label: "WhatsApp order", icon: MessageCircle },
              ].map(({ label, icon: Icon }) => (
                <div
                  className="rounded-2xl border border-white/10 bg-white/8 p-5"
                  key={label}
                >
                  <Icon className="text-white/70" size={22} aria-hidden />
                  <p className="mt-5 text-sm font-semibold">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

async function FeaturedProductsSection() {
  const products = await getFeaturedProducts();

  return (
    <section className="container-px mx-auto w-full max-w-7xl py-16" id="featured">
      <div className="animate-enter mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-neutral-500">
            Featured
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
            Paires selectionnees
          </h2>
        </div>
        <Button asChild variant="secondary">
          <Link href="/shop">
            Tout voir <ArrowRight size={16} aria-hidden />
          </Link>
        </Button>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}

function FeaturedProductsFallback() {
  return (
    <section className="container-px mx-auto w-full max-w-7xl py-16">
      <div className="mb-8">
        <div className="h-4 w-28 rounded-full bg-neutral-200" />
        <div className="mt-4 h-12 w-full max-w-md rounded-2xl bg-neutral-200" />
      </div>
      <ProductGridSkeleton />
    </section>
  );
}

async function CategoriesSection() {
  const categories = await getCategories();

  return (
    <section className="container-px mx-auto w-full max-w-7xl py-10">
      <div className="animate-enter grid gap-4 md:grid-cols-4">
        {categories.map((category, index) => (
          <Link
            className="group relative min-h-64 overflow-hidden rounded-2xl bg-neutral-950 p-5 text-white shadow-[0_20px_80px_rgba(15,15,15,0.12)]"
            href={`/shop?category=${encodeURIComponent(category.name)}`}
            key={category.id}
          >
            <Image
              alt={category.name}
              className="object-cover opacity-65 transition duration-700 group-hover:scale-105"
              fill
              sizes="(min-width: 768px) 25vw, 100vw"
              src={lifestyleImages[index % lifestyleImages.length]}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="relative flex h-full flex-col justify-end">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                Category
              </p>
              <h3 className="mt-2 text-2xl font-black tracking-tight">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function CategoriesFallback() {
  return (
    <section className="container-px mx-auto w-full max-w-7xl py-10">
      <div className="grid gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            className="min-h-64 animate-pulse rounded-2xl bg-neutral-200"
            key={index}
          />
        ))}
      </div>
    </section>
  );
}
