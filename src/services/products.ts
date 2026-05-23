import { cache } from "react";
import { API_BASE_URL } from "@/constants/store";
import type { Category, Product, ProductsPage } from "@/types/product";

type ProductsQuery = {
  page?: number;
  size?: number;
  sort?: string;
};

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = process.env.SHOESTORE_API_TOKEN;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new ApiError(`API request failed: ${response.status}`, response.status);
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

  return apiFetch<ProductsPage>(`/api/products?${params.toString()}`);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const page = await getProducts({ page: 0, size: 6 });
  return page.content.slice(0, 6);
}

export const getProductById = cache(
  async (id: number): Promise<Product | null> => {
    try {
      return await apiFetch<Product>(`/api/products/${id}`);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return null;
      }

      throw error;
    }
  },
);

export async function getCategories(): Promise<Category[]> {
  return apiFetch<Category[]>("/api/categories");
}
