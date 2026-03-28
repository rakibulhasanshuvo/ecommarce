"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-20 border-t border-border-default bg-background-dark/50 backdrop-blur-lg relative z-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link href="/" className="text-2xl font-black tracking-tighter text-gradient flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[28px] text-primary">
                token
              </span>
              Luxe
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed mb-6">
              Elevating your lifestyle through curated, premium products. Experience the future of online luxury shopping with unparalleled design and quality.
            </p>
            <div className="flex gap-4">
              {["language", "mail", "share"].map((icon) => (
                <button
                  key={icon}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-muted hover:text-white hover:bg-white/10 transition-colors"
                  aria-label={icon}
                >
                  <span className="material-symbols-outlined text-[20px]">{icon}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-white font-bold mb-4">Shop</h4>
            <ul className="space-y-3">
              {[
                { name: "All Collections", path: "/collections" },
                { name: "Electronics", path: "/collections/electronics" },
                { name: "Fashion", path: "/collections/fashion" },
                { name: "Home & Living", path: "/collections/home" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-sm text-text-muted hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-3">
              {[
                "Help Center",
                "Track Order",
                "Returns & Refunds",
                "Shipping Information",
              ].map((item) => (
                <li key={item}>
                  <button className="text-sm text-text-muted hover:text-primary transition-colors">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-white font-bold mb-4">Stay in the loop</h4>
            <p className="text-sm text-text-muted mb-4">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-border-default rounded-xl px-4 py-3 text-sm text-white placeholder:text-text-muted focus:ring-1 focus:ring-primary outline-none transition-shadow pr-12"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-background-dark hover:bg-white transition-colors"
                aria-label="Subscribe"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-secondary">
            &copy; {currentYear} Luxe E-Commerce. Built for demonstration.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <button key={item} className="text-xs text-text-secondary hover:text-white transition-colors">
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
