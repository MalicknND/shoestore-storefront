"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, Ruler, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product";
import {
  buildWhatsAppUrl,
  formatPrice,
  getProductImage,
} from "@/lib/utils";

const sizes = ["39", "40", "41", "42", "43", "44", "45"];

export function ProductDetail({ product }: { product: Product }) {
  const images = product.images?.length
    ? product.images.map((image) => image.imageUrl)
    : [getProductImage(product)];
  const [activeImage, setActiveImage] = useState(images[0]);
  const [size, setSize] = useState(sizes[2]);
  const isAvailable = product.status === "AVAILABLE" && product.stock > 0;

  const whatsappUrl = useMemo(
    () => buildWhatsAppUrl(product.name, size),
    [product.name, size],
  );

  return (
    <div className="container-px mx-auto grid w-full max-w-7xl gap-8 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-14">
      <div className="space-y-4">
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100 shadow-[0_30px_100px_rgba(15,15,15,0.1)]"
          initial={{ opacity: 0, scale: 0.98 }}
          key={activeImage}
          transition={{ duration: 0.35 }}
        >
          <Image
            alt={product.name}
            className="object-cover transition duration-700 hover:scale-[1.03]"
            fill
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            src={activeImage}
          />
        </motion.div>
        <div className="grid grid-cols-4 gap-3">
          {images.map((image) => (
            <button
              aria-label={`Afficher ${product.name}`}
              className="relative aspect-square overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 transition hover:border-neutral-950"
              key={image}
              onClick={() => setActiveImage(image)}
              type="button"
            >
              <Image
                alt=""
                className="object-cover"
                fill
                sizes="25vw"
                src={image}
              />
            </button>
          ))}
        </div>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-[0_24px_90px_rgba(15,15,15,0.08)] sm:p-8"
          initial={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.45 }}
        >
          <Badge>{product.category?.name ?? "Premium"}</Badge>
          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">
            {product.name}
          </h1>
          <p className="mt-4 text-2xl font-black">{formatPrice(product.price)}</p>
          <p className="mt-6 text-base leading-8 text-neutral-600">
            {product.description ??
              "Une paire premium selectionnee pour un style moderne, net et facile a porter."}
          </p>

          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold">Taille</p>
              <span className="flex items-center gap-1 text-xs text-neutral-500">
                <Ruler size={14} aria-hidden /> Guide EU
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
              {sizes.map((item) => (
                <button
                  className={`h-12 rounded-2xl border text-sm font-semibold transition ${
                    size === item
                      ? "border-neutral-950 bg-neutral-950 text-white"
                      : "border-neutral-200 bg-white text-neutral-800 hover:border-neutral-950"
                  }`}
                  key={item}
                  onClick={() => setSize(item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-neutral-100 p-4">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <ShieldCheck size={18} aria-hidden />
              {isAvailable
                ? `${product.stock} paire(s) disponible(s)`
                : "Indisponible pour le moment"}
            </p>
          </div>

          <Button
            asChild
            className="mt-6 w-full"
            disabled={!isAvailable}
            size="lg"
            variant="whatsapp"
          >
            <Link href={whatsappUrl} target="_blank">
              <MessageCircle size={19} aria-hidden />
              Commander sur WhatsApp
            </Link>
          </Button>
        </motion.div>
      </aside>
    </div>
  );
}
