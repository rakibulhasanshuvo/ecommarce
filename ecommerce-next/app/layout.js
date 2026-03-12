import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import BottomNav from "@/app/components/BottomNav";
import { CartProvider } from "@/app/context/CartContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "LuxeCommerce — Premium E-Commerce Platform",
  description:
    "Discover curated premium tech and lifestyle products. Shop luxury watches, audio gear, laptops, and accessories with exclusive member pricing.",
  keywords: ["ecommerce", "premium", "luxury tech", "watches", "audio", "laptops"],
  openGraph: {
    title: "LuxeCommerce — Premium E-Commerce Platform",
    description: "Experience luxury shopping at its finest.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} antialiased font-sans`} suppressHydrationWarning>
        <CartProvider>
          {/* Sticky Header */}
          <Header />

          {/* Main Content */}
          <main className="pb-20 md:pb-0 min-h-screen">{children}</main>

          {/* Footer */}
          <Footer />

          {/* Mobile Bottom Nav */}
          <BottomNav />
        </CartProvider>
      </body>
    </html>
  );
}
