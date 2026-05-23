"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type MobileMenuProps = {
  children: React.ReactNode;
  items: { href: string; label: string }[];
};

export function MobileMenu({ children, items }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <div onClick={() => setOpen(true)}>{children}</div>
      <AnimatePresence>
        {open ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-neutral-950/30 backdrop-blur-sm"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-x-3 top-3 rounded-2xl bg-white p-4 shadow-2xl"
              exit={{ opacity: 0, y: -12 }}
              initial={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-[0.24em]">
                  Menu
                </span>
                <Button
                  aria-label="Fermer le menu"
                  onClick={() => setOpen(false)}
                  size="icon"
                  variant="ghost"
                >
                  <X size={18} aria-hidden />
                </Button>
              </div>
              <nav className="mt-5 grid gap-2">
                {items.map((item) => (
                  <Link
                    className="rounded-2xl px-4 py-3 text-lg font-semibold text-neutral-900 transition hover:bg-neutral-100"
                    href={item.href}
                    key={item.href}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
