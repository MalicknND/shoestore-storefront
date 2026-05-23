import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Product } from "@/types/product";
import { FALLBACK_PRODUCT_IMAGE, WHATSAPP_PHONE } from "@/constants/store";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("fr-SN", {
    style: "currency",
    currency: "XOF",
    maximumFractionDigits: 0,
  }).format(value);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function toProductSlug(product: Product) {
  return `${product.id}-${slugify(product.name)}`;
}

export function getProductIdFromSlug(slug: string) {
  const [id] = slug.split("-");
  const parsed = Number(id);
  return Number.isFinite(parsed) ? parsed : null;
}

export function getProductImage(product: Product) {
  return product.images?.[0]?.imageUrl ?? FALLBACK_PRODUCT_IMAGE;
}

export function buildWhatsAppUrl(productName: string, size: string) {
  const text = `Bonjour, je souhaite commander la paire ${productName} en taille ${size}`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}
