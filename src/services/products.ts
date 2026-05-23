import {
  API_BASE_URL,
  fallbackCategories,
  fallbackProducts,
  fallbackProductsPage,
} from "@/constants/store";
import type { Category, Product, ProductsPage } from "@/types/product";

type ProductsQuery = {
  page?: number;
  size?: number;
  sort?: string;
};

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...init?.headers,
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getProducts(
  query: ProductsQuery = {},
): Promise<ProductsPage> {
  const params = new URLSearchParams({
    page: String(query.page ?? 0),
    size: String(query.size ?? 12),
  });

  if (query.sort) {
    params.set("sort", query.sort);
  }

  try {
    return await apiFetch<ProductsPage>(`/api/products?${params.toString()}`);
  } catch {
    return fallbackProductsPage;
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const page = await getProducts({ page: 0, size: 6 });
  return page.content.slice(0, 6);
}

export async function getProductById(id: number): Promise<Product | null> {
  try {
    return await apiFetch<Product>(`/api/products/${id}`);
  } catch {
    return fallbackProducts.find((product) => product.id === id) ?? null;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    return await apiFetch<Category[]>("/api/categories");
  } catch {
    return fallbackCategories;
  }
}
