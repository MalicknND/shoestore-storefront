import type { Category, Product, ProductsPage } from "@/types/product";

export const STORE_NAME = "ShoeStore";
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8081";

export const WHATSAPP_PHONE =
  process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "221XXXXXXXXX";

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2400&auto=format&fit=crop";

export const FALLBACK_PRODUCT_IMAGE =
  "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1600&auto=format&fit=crop";

export const lifestyleImages = [
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
];

export const fallbackCategories: Category[] = [
  { id: 1, name: "Sneakers" },
  { id: 2, name: "Running" },
  { id: 3, name: "Luxury" },
  { id: 4, name: "Streetwear" },
];

export const fallbackProducts: Product[] = [
  {
    id: 1,
    name: "Noir Runner Luxe",
    description:
      "Sneaker premium en cuir texture, silhouette basse et confort quotidien pour une allure urbaine precise.",
    price: 89000,
    stock: 9,
    status: "AVAILABLE",
    category: fallbackCategories[0],
    images: [
      {
        id: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1600&auto=format&fit=crop",
      },
      {
        id: 2,
        imageUrl:
          "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1600&auto=format&fit=crop",
      },
    ],
  },
  {
    id: 2,
    name: "Cream Court Essential",
    description:
      "Basket blanche minimaliste, lignes nettes, semelle dense et finitions premium.",
    price: 76000,
    stock: 14,
    status: "AVAILABLE",
    category: fallbackCategories[2],
    images: [
      {
        id: 3,
        imageUrl:
          "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1600&auto=format&fit=crop",
      },
    ],
  },
  {
    id: 3,
    name: "Volt Street Low",
    description:
      "Modele streetwear leger avec details contrastes, pense pour les sorties et contenus reels.",
    price: 68000,
    stock: 5,
    status: "AVAILABLE",
    category: fallbackCategories[3],
    images: [
      {
        id: 4,
        imageUrl:
          "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=1600&auto=format&fit=crop",
      },
    ],
  },
  {
    id: 4,
    name: "Mono Track Elite",
    description:
      "Running lifestyle monochrome, amorti souple et silhouette technique haut de gamme.",
    price: 94000,
    stock: 0,
    status: "OUT_OF_STOCK",
    category: fallbackCategories[1],
    images: [
      {
        id: 5,
        imageUrl:
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1600&auto=format&fit=crop",
      },
    ],
  },
  {
    id: 5,
    name: "Suede Avenue",
    description:
      "Suede profond, volume retro, details ton sur ton et presence premium sans effort.",
    price: 82000,
    stock: 7,
    status: "AVAILABLE",
    category: fallbackCategories[2],
    images: [
      {
        id: 6,
        imageUrl:
          "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=1600&auto=format&fit=crop",
      },
    ],
  },
  {
    id: 6,
    name: "Archive High Top",
    description:
      "High top premium avec maintien confortable, parfait pour un look denim, cargo ou tailoring.",
    price: 99000,
    stock: 3,
    status: "AVAILABLE",
    category: fallbackCategories[3],
    images: [
      {
        id: 7,
        imageUrl:
          "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=1600&auto=format&fit=crop",
      },
    ],
  },
];

export const fallbackProductsPage: ProductsPage = {
  totalElements: fallbackProducts.length,
  totalPages: 1,
  numberOfElements: fallbackProducts.length,
  first: true,
  last: true,
  size: fallbackProducts.length,
  content: fallbackProducts,
  number: 0,
  empty: false,
};
