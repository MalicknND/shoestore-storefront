import type { Metadata } from "next";
import { ShopExperience } from "@/components/products/shop-experience";
import { getCategories, getProducts } from "@/services/products";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Explore la grille produit ShoeStore avec recherche, categories et commande rapide.",
};

export default async function ShopPage() {
  const [productsPage, categories] = await Promise.all([
    getProducts({ page: 0, size: 48 }),
    getCategories(),
  ]);

  return (
    <div className="container-px mx-auto w-full max-w-7xl py-10 sm:py-14">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-neutral-500">
          Shop
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">
          La selection premium.
        </h1>
        <p className="mt-5 text-base leading-8 text-neutral-600">
          Recherche, filtre par categorie, ouvre une fiche et finalise la
          commande sur WhatsApp en quelques secondes.
        </p>
      </div>
      <ShopExperience products={productsPage.content} categories={categories} />
    </div>
  );
}
