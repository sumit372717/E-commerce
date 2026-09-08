"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import ProductGrid from "@/components/ProductGrid";
import PricePledgeTicker from "@/components/PricePledgeTicker";
import CustomBuildCTA from "@/components/CustomBuildCTA";
import AIInsights from "@/components/AIInsights";
import Newsletter from "@/components/Newsletter";
import { getFeaturedProducts } from "@/lib/data";
import type { Product } from "@/lib/types";

export default function Home() {
  const [featured, setFeatured] = useState<Product[]>([]);

  useEffect(() => {
    getFeaturedProducts(8)
      .then((data: Product[]) => setFeatured(data))
      .catch(console.error);
  }, []);

  return (
    <>
      <Hero />

      {/* Middle section: live price index, custom to this store */}
      <PricePledgeTicker />

      {/* Main section 1: PC Hardware */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeader
          eyebrow="Main catalogue"
          title="PC Hardware"
          description="CPUs, GPUs, storage, and everything else that goes inside the case — filtered by real compatibility data, not guesswork."
          href="/category/component"
        />
        <ProductGrid products={featured} />
      </section>

      {/* Main section 2: Custom Built PCs */}
      <CustomBuildCTA />

      {/* Main section 3: AI & Deep PC Analysis */}
      <AIInsights />

      {/* Bottom section: newsletter, custom to this store */}
      <Newsletter />
    </>
  );
}