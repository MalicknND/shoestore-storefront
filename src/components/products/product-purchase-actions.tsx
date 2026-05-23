"use client";

import Link from "next/link";
import { MessageCircle, Ruler, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/utils";

const sizes = ["39", "40", "41", "42", "43", "44", "45"];

type ProductPurchaseActionsProps = {
  isAvailable: boolean;
  productName: string;
  stock: number;
};

export function ProductPurchaseActions({
  isAvailable,
  productName,
  stock,
}: ProductPurchaseActionsProps) {
  const [size, setSize] = useState(sizes[2]);
  const whatsappUrl = useMemo(
    () => buildWhatsAppUrl(productName, size),
    [productName, size],
  );

  return (
    <>
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
            ? `${stock} paire(s) disponible(s)`
            : "Indisponible pour le moment"}
        </p>
      </div>

      <Button
        asChild
        className={`mt-6 w-full ${!isAvailable ? "pointer-events-none opacity-50" : ""}`}
        size="lg"
        variant="whatsapp"
      >
        <Link
          aria-disabled={!isAvailable}
          href={isAvailable ? whatsappUrl : "#"}
          target={isAvailable ? "_blank" : undefined}
        >
          <MessageCircle size={19} aria-hidden />
          Commander sur WhatsApp
        </Link>
      </Button>
    </>
  );
}
