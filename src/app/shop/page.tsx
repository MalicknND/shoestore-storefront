import type { Metadata } from "next";
import { ProductGrid } from "@/components/products/product-grid";
import { ShopFilterForm } from "@/components/products/shop-filter-form";
import { ShopPagination } from "@/components/products/shop-pagination";
import { getCategories, getProducts } from "@/services/products";
import type { Product } from "@/types/product";

const PAGE_SIZE = 6;
export const dynamic = "force-dynamic";

type ShopPageProps = {
  searchParams: Promise<{
    category?: string | string[];
    page?: string | string[];
    q?: string | string[];
  }>;
};

function getParam(value: string | string[] | undefined, fallback = "") {
  if (Array.isArray(value)) {
    return value[0] ?? fallback;
  }

  return value ?? fallback;
}

function filterProducts(products: Product[], query: string, category: string) {
  const normalizedQuery = query.toLowerCase().trim();

  return products.filter((product) => {
    const matchesCategory =
      category === "all" || product.category?.name === category;
    const matchesSearch =
      normalizedQuery.length === 0 ||
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.description?.toLowerCase().includes(normalizedQuery);

    return matchesCategory && matchesSearch;
  });
}

export async function generateMetadata({
  searchParams,
}: ShopPageProps): Promise<Metadata> {
  const params = await searchParams;
  const query = getParam(params.q);
  const category = getParam(params.category, "all");
  const titleParts = ["Shop"];

  if (category !== "all") {
    titleParts.push(category);
  }

  if (query) {
    titleParts.push(`Recherche "${query}"`);
  }

  return {
    title: titleParts.join(" - "),
    description:
      category === "all"
        ? "Explore les chaussures premium ShoeStore avec recherche, categories et commande rapide sur WhatsApp."
        : `Explore la selection ${category} ShoeStore et commande ta paire premium sur WhatsApp.`,
    openGraph: {
      title: titleParts.join(" - "),
      description:
        "Chaussures premium, grille serveur optimisee SEO et commande WhatsApp.",
    },
  };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const query = getParam(params.q);
  const category = getParam(params.category, "all");
  const currentPage = Math.max(1, Number(getParam(params.page, "1")) || 1);

  const [productsPage, categories] = await Promise.all([
    getProducts({ page: 0, size: 48 }),
    getCategories(),
  ]);
  const filteredProducts = filterProducts(productsPage.content, query, category);
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const visibleProducts = filteredProducts.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

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
      <div className="space-y-8">
        <ShopFilterForm
          activeCategory={category}
          categories={categories}
          query={query}
        />
        <ProductGrid products={visibleProducts} />
        <ShopPagination
          category={category}
          currentPage={safePage}
          query={query}
          totalPages={totalPages}
          totalProducts={filteredProducts.length}
        />
      </div>
    </div>
  );
}
