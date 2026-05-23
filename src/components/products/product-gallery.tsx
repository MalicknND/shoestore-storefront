"use client";

import Image from "next/image";
import { useState } from "react";

type ProductGalleryProps = {
  images: string[];
  productName: string;
};

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100 shadow-[0_30px_100px_rgba(15,15,15,0.1)]">
        <Image
          alt={productName}
          className="object-cover transition duration-700 hover:scale-[1.03]"
          fill
          priority
          sizes="(min-width: 1024px) 55vw, 100vw"
          src={activeImage}
        />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {images.map((image) => (
          <button
            aria-label={`Afficher ${productName}`}
            aria-pressed={activeImage === image}
            className="relative aspect-square overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 transition hover:border-neutral-950 aria-pressed:border-neutral-950"
            key={image}
            onClick={() => setActiveImage(image)}
            type="button"
          >
            <Image alt="" className="object-cover" fill sizes="25vw" src={image} />
          </button>
        ))}
      </div>
    </div>
  );
}
