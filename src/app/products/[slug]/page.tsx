import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/products/product-detail";
import { getProductIdFromSlug } from "@/lib/utils";
import { getProductById } from "@/services/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const id = getProductIdFromSlug(slug);

  if (!id) {
    return { title: "Produit introuvable" };
  }

  const product = await getProductById(id);

  if (!product) {
    return { title: "Produit introuvable" };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images?.[0]?.imageUrl
        ? [{ url: product.images[0].imageUrl }]
        : undefined,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const id = getProductIdFromSlug(slug);

  if (!id) {
    notFound();
  }

  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
