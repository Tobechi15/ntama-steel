"use client";

import type { ReactNode } from "react";
import { useQuote } from "@/components/quote-provider";

export function QuoteTrigger({
  children,
  className = "",
  interest = "",
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  interest?: string;
  ariaLabel?: string;
}) {
  const { openQuote } = useQuote();
  return (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      onClick={() => openQuote(interest)}
    >
      {children}
    </button>
  );
}
