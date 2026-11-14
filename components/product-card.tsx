"use client";

import Image from "next/image";
import { useQuote } from "@/components/quote-provider";
import type { Product } from "@/lib/site";

export function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const { openProduct } = useQuote();

  return (
    <button
      type="button"
      onClick={() => openProduct(product.slug)}
      aria-label={`View ${product.name} details`}
      className="group relative block w-full overflow-hidden rounded-[3px] bg-ink text-left focus-visible:outline-offset-4"
    >
      <div className="relative aspect-[5/4] w-full">
        <Image
          src={product.image}
          alt={product.alt}
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute left-3 top-3 text-[0.6rem] font-semibold tracking-[0.18em] text-white/55">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-white/25 bg-black/10 text-white transition-all duration-300 group-hover:border-orange group-hover:bg-orange">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
            <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </span>
        <span className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3">
          <span className="font-display text-[0.98rem] font-semibold leading-tight text-white">
            {product.name}
          </span>
          <span className="h-[2px] w-6 shrink-0 translate-y-[-0.35rem] bg-orange opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </span>
      </div>
    </button>
  );
}
