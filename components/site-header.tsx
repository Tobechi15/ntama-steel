"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/logo";
import { useQuote } from "@/components/quote-provider";
import { navLinks, site } from "@/lib/site";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openQuote } = useQuote();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      toggleRef.current?.focus();
    };
  }, [menuOpen]);

  return (
    <>
    <header
      style={{ paddingTop: "env(safe-area-inset-top)" }}
      className={`fixed inset-x-0 top-0 z-50 text-white transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || menuOpen
          ? "border-b border-white/10 bg-ink/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="shell flex h-[4.5rem] items-center justify-between gap-4">
        <a href="/" aria-label="Ntama Steel — home" className="shrink-0">
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative py-1 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-white/72 transition-colors hover:text-white"
            >
              {link.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-orange transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <button
            type="button"
            className="btn btn-primary px-5 text-[0.65rem]"
            onClick={() => openQuote()}
          >
            Request a Quote
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/20 transition-colors hover:bg-white/10 lg:hidden"
        >
          <span className="flex flex-col gap-[5px]">
            <span className="block h-px w-5 bg-current" />
            <span className="block h-px w-5 bg-current" />
            <span className="block h-px w-3.5 bg-current" />
          </span>
        </button>
      </div>

    </header>

      <div
        id="mobile-menu"
        className="mobile-menu lg:hidden"
        data-open={menuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!menuOpen}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="shell flex h-[4.5rem] shrink-0 items-center justify-between">
          <Logo />
          <button
            ref={closeRef}
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/20 transition-colors hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
              <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        <nav
          aria-label="Mobile"
          className="shell hide-scrollbar flex flex-1 flex-col justify-center gap-1 overflow-y-auto py-6"
        >
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="group flex items-baseline gap-3 border-b border-white/10 py-3.5 font-display text-[1.9rem] font-bold uppercase leading-none tracking-[-0.02em] text-white/90 transition-colors hover:text-white"
            >
              <span className="text-[0.6rem] font-medium tracking-[0.2em] text-orange">
                {String(index + 1).padStart(2, "0")}
              </span>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="shell shrink-0 space-y-4 border-t border-white/10 py-6">
          <button
            type="button"
            className="btn btn-primary w-full"
            onClick={() => {
              setMenuOpen(false);
              openQuote();
            }}
          >
            Request a Quote
          </button>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-mist">
            <a href={`mailto:${site.email}`} className="hover:text-white">
              {site.email}
            </a>
            <a href={site.phoneHref} className="hover:text-white">
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
