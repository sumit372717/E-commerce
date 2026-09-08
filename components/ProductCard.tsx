import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";

const badgeColor: Record<NonNullable<Product["badge"]>, string> = {
  New: "text-circuit border-circuit/40",
  Sale: "text-alert border-alert/40",
  "Best Seller": "text-trace border-trace/40",
  Deal: "text-alert border-alert/40",
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="chip-card group flex flex-col p-4 transition-colors hover:border-trace"
    >
      <div className="relative mb-4 aspect-square w-full overflow-hidden bg-base">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {product.badge && (
          <span
            className={`absolute left-2 top-2 border bg-surface px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ${badgeColor[product.badge]}`}
          >
            {product.badge}
          </span>
        )}
        {!product.in_stock && (
          <span className="absolute right-2 top-2 border border-line bg-surface px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted">
            Out of stock
          </span>
        )}
      </div>

      <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-medium text-ink group-hover:text-trace">
        {product.name}
      </h3>

      {product.rating && (
        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted">
          <span className="text-trace">★ {product.rating.toFixed(1)}</span>
          <span>({product.review_count})</span>
        </div>
      )}

      <div className="mt-3 flex items-baseline gap-2 font-mono">
        <span className="text-lg font-semibold text-ink">
          {formatPrice(product.price)}
        </span>
        {product.compare_at_price && (
          <span className="text-xs text-muted line-through">
            {formatPrice(product.compare_at_price)}
          </span>
        )}
      </div>

      {product.specs && (
        <ul className="mt-3 space-y-1 border-t border-line pt-3 font-mono text-[11px] text-muted">
          {product.specs.map((s) => (
            <li key={s.label} className="flex justify-between">
              <span>{s.label}</span>
              <span className="text-ink/70">{s.value}</span>
            </li>
          ))}
        </ul>
      )}
    </Link>
  );
}