"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getCategories } from '@/lib/data';

export default function CategoryMegaMenu() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  return (
    <nav
      className="relative hidden lg:block border-t border-line bg-surface"
      onMouseLeave={() => setOpenSlug(null)}
    >
      <ul className="mx-auto flex max-w-7xl items-center gap-1 px-6">
        {categories.map((cat, i) => (
          <li key={cat.slug} className="relative flex items-center">
            {i > 0 && <span className="mx-1 h-1 w-1 rounded-full bg-line" aria-hidden />}
            <button
              onMouseEnter={() => setOpenSlug(cat.slug)}
              onFocus={() => setOpenSlug(cat.slug)}
              className="whitespace-nowrap px-2.5 py-3 font-mono text-[13px] uppercase tracking-wide text-muted transition-colors hover:text-trace aria-expanded:text-trace"
              aria-expanded={openSlug === cat.slug}
            >
              {cat.label}
            </button>

            {openSlug === cat.slug && cat.subcategories && (
              <div className="absolute left-0 top-full z-40 w-64 border border-line bg-surface-2 p-2 shadow-2xl">
                <ul>
                  {cat.subcategories.map((sub: string) => (
                    <li key={sub}>
                      <Link
                        href={`/category/${cat.slug}`}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-ink/80 hover:bg-base hover:text-trace"
                      >
                        <span className="pin-dot" />
                        {sub}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/category/${cat.slug}`}
                  className="mt-1 block border-t border-line px-3 py-2 text-xs font-mono uppercase tracking-wide text-trace"
                >
                  View all {cat.label} →
                </Link>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}