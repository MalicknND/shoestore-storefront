import Link from "next/link";
import { Menu, ShoppingBag } from "lucide-react";
import { STORE_NAME } from "@/constants/store";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "@/components/layout/mobile-menu";

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/shop", label: "Shop" },
  { href: "/#story", label: "Histoire" },
  { href: "/#social", label: "Social" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link className="flex items-center gap-2" href="/">
          <span className="flex size-9 items-center justify-center rounded-2xl bg-neutral-950 text-white">
            <ShoppingBag size={18} aria-hidden />
          </span>
          <span className="text-sm font-black uppercase tracking-[0.24em]">
            {STORE_NAME}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {navItems.map((item) => (
            <Link
              className="text-sm font-medium text-neutral-600 transition hover:text-neutral-950"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild size="sm">
            <Link href="/shop">Découvrir</Link>
          </Button>
        </div>

        <MobileMenu items={navItems}>
          <Button aria-label="Ouvrir le menu" size="icon" variant="secondary">
            <Menu size={18} aria-hidden />
          </Button>
        </MobileMenu>
      </div>
    </header>
  );
}
