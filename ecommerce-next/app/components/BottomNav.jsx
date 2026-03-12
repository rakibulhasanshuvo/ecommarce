"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/app/context/CartContext";

const navItems = [
  { label: "Home", icon: "home", href: "/" },
  { label: "Search", icon: "search", href: "#", action: "search" },
  { label: "Wishlist", icon: "favorite", href: "/wishlist", badge: "wishlist" },
  { label: "Cart", icon: "shopping_bag", href: "/cart", badge: "cart" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { itemCount, wishlistCount } = useCart();

  // Hide BottomNav on admin pages
  if (pathname?.startsWith("/admin")) return null;

  return (
    <nav
      id="bottom-nav"
      className="fixed bottom-0 left-0 right-0 glass-surface border-t border-border-default px-6 pb-[env(safe-area-inset-bottom,16px)] pt-2 flex items-center justify-around z-50 md:hidden"
      aria-label="Mobile navigation"
    >
      {navItems.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname?.startsWith(item.href);

        return (
          <Link
            key={item.label}
            href={item.action === "search" ? "#" : item.href}
            onClick={item.action === "search" ? (e) => { e.preventDefault(); console.log("Search clicked"); } : undefined}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all relative ${
              isActive
                ? "text-primary"
                : "text-text-muted hover:text-text-secondary"
            }`}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
          >
            <div className="relative">
              <span
                className={`material-symbols-outlined text-[22px] transition-transform ${
                  isActive ? "fill-1 -translate-y-0.5" : ""
                } group-hover:-translate-y-0.5`}
              >
                {item.icon}
              </span>
              {item.badge === "wishlist" && wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-primary text-background-dark text-[9px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
              {item.badge === "cart" && itemCount > 0 && (
                <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-primary text-background-dark text-[9px] font-bold flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </div>
            <span
              className={`text-[10px] font-medium ${
                isActive ? "font-semibold" : ""
              }`}
            >
              {item.label}
            </span>
            {isActive && (
              <span className="absolute -bottom-0 w-5 h-0.5 bg-primary rounded-full transition-all duration-300" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
