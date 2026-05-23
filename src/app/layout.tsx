import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { STORE_NAME } from "@/constants/store";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${STORE_NAME} | Sneakers premium a Dakar`,
    template: `%s | ${STORE_NAME}`,
  },
  description:
    "Storefront e-commerce premium pour chaussures modernes, streetwear elegant et commande directe sur WhatsApp.",
  metadataBase: new URL("https://shoestore.local"),
  openGraph: {
    title: `${STORE_NAME} | Sneakers premium`,
    description:
      "Chaussures premium, selection visuelle et commande rapide sur WhatsApp.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      lang="fr"
    >
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
