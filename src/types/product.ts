export type ProductStatus = "AVAILABLE" | "OUT_OF_STOCK";

export type Category = {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ProductImage = {
  id: number;
  imageUrl: string;
  publicId?: string;
};

export type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  status: ProductStatus;
  category?: Category;
  images?: ProductImage[];
  createdAt?: string;
  updatedAt?: string;
};

export type ProductsPage = {
  totalElements: number;
  totalPages: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  size: number;
  content: Product[];
  number: number;
  empty: boolean;
};
