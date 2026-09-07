"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { categories } from "@/lib/data";
import CategoryMegaMenu from "./CategoryMegaMenu";
import { getStoredUser, clearStoredUser } from "@/lib/auth";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }

    const handleStorageChange = () => {
      const updatedUser = getStoredUser();
      setUser(updatedUser);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    clearStoredUser();
    setUser(null);
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 bg-base">
      {/* Utility bar */}
      <div className="hidden items-center justify-between border-b border-line bg-surface px-6 py-1.5 text-xs text-muted md:flex">
        <div className="flex items-center gap-4">
          <span>Built by engineers, since 2010</span>
          <span className="flex items-center gap-1.5">
            <span className="pin-dot" /> 4.8 rating &middot; 12,400+ reviews
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/track-order" className="hover:text-trace">Track Order</Link>
          <Link href="/help" className="hover:text-trace">Help Centre</Link>
          <Link href="/business" className="hover:text-trace">Business Accounts</Link>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-4">
        <button
          className="text-ink lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="block h-0.5 w-6 bg-ink mb-1.5" />
          <span className="block h-0.5 w-6 bg-ink mb-1.5" />
          <span className="block h-0.5 w-6 bg-ink" />
        </button>

        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-ink">
          <span className="flex h-8 w-8 items-center justify-center border border-trace text-trace">
            <span className="pin-dot" />
          </span>
          Circuit<span className="text-trace">Forge</span>
        </Link>

        <form className="hidden flex-1 items-center md:flex" role="search">
          <input
            type="search"
            placeholder="Search by part number, brand, or keyword…"
            className="w-full border border-line bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:border-trace"
            aria-label="Search products"
          />
          <button
            type="submit"
            className="border border-l-0 border-line bg-trace px-4 py-2.5 text-sm font-semibold text-base"
          >
            Search
          </button>
        </form>

        <div className="ml-auto flex items-center gap-5 text-ink">
          {user ? (
            <div className="flex items-center gap-3 text-sm">
              <span className="text-muted">Welcome,</span>
              <span className="font-medium">{user.name}</span>
              {user.role === "admin" && (
                <Link href="/admin" className="text-xs text-trace hover:underline">
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="text-xs text-muted hover:text-red-500"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="hidden text-sm sm:flex sm:flex-col sm:leading-tight">
              <span className="text-muted text-xs">Account</span>
              <span className="font-medium">Sign in</span>
            </Link>
          )}
          <Link href="/cart" className="relative flex items-center gap-2">
            <span aria-hidden>🛒</span>
            <span className="hidden text-sm font-mono sm:inline">৳0</span>
            <span className="sr-only">Cart</span>
          </Link>
        </div>
      </div>

      <CategoryMegaMenu />

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-line bg-surface px-6 py-4 lg:hidden">
          <ul className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/category/${cat.slug}`}
                  className="block px-3 py-2 text-sm text-ink/80 hover:text-trace"
                  onClick={() => setMobileOpen(false)}
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
