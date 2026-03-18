"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/app/context/CartContext";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount, wishlist } = useCart();
  const wishlistCount = wishlist.length;
  const pathname = usePathname();

  // Handle scroll effect for glass navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setMobileMenuOpen(false);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Collections", path: "/collections" },
    { name: "Audio", path: "/collections/audio" },
    { name: "Computers", path: "/collections/computers" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "glass py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-b border-border-default backdrop-blur-xl"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="text-2xl font-black tracking-tighter text-gradient flex items-center gap-2 relative z-50">
            <span className="material-symbols-outlined text-[28px] text-primary">
              token
            </span>
            Luxe
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 border border-border-default rounded-full px-8 py-2.5 bg-background-dark/50 backdrop-blur-md">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm font-semibold transition-colors duration-200 ${
                  pathname === link.path
                    ? "text-primary"
                    : "text-text-secondary hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Icons & Actions */}
          <div className="flex items-center gap-2 md:gap-4 relative z-50">
            <Link
              href="/search"
              className="hidden sm:flex w-10 h-10 rounded-full items-center justify-center hover:bg-white/5 transition-colors text-text-muted hover:text-white relative overflow-hidden"
              aria-label="Search"
            >
              <span className="material-symbols-outlined text-[22px]">search</span>
            </Link>
            
            <Link
              href="/wishlist"
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors relative text-text-muted hover:text-white group"
              aria-label="Wishlist"
            >
              <span className={`material-symbols-outlined text-[22px] group-hover:scale-110 transition-transform ${wishlistCount > 0 ? 'text-primary' : ''}`}>
                favorite
              </span>
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-primary text-background-dark text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors relative text-text-muted hover:text-white group"
              aria-label="Cart"
            >
              <span className="material-symbols-outlined text-[22px] group-hover:-translate-y-0.5 transition-transform">
                shopping_bag
              </span>
              {itemCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-primary text-background-dark text-[10px] font-bold flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors text-text-muted"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background-dark/95 backdrop-blur-xl transition-all duration-300 md:hidden flex items-center justify-center ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-2xl font-bold transition-colors ${
                pathname === link.path
                  ? "text-primary text-gradient glow-box"
                  : "text-text-muted hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
