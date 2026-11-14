import { QuoteTrigger } from "@/components/quote-trigger";

export function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          data-parallax="scene"
          className="hero__scene"
          src="/images/hero-scene-1500.webp"
          srcSet="/images/hero-scene-900.webp 900w, /images/hero-scene-1500.webp 1500w"
          sizes="(min-width: 1024px) 76vw, 175vw"
          width={1500}
          height={844}
          alt=""
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <div className="hero__veil" aria-hidden="true" />
      <div className="hero__top-scrim" aria-hidden="true" />
      <div className="hero__grid-glow" aria-hidden="true" />

      
      <div className="hero__content">
        <p className="eyebrow text-orange-hi" data-hero-el>
          Engineered for strength
        </p>
        <h1
          id="hero-title"
          className="mt-4 max-w-[13ch] font-display text-[clamp(2.5rem,10.6vw,3.9rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em] lg:mt-5 lg:max-w-none lg:text-[clamp(3.2rem,5.1vw,4.75rem)]"
          data-hero-el
        >
          Strength in{" "}
          <br className="hidden lg:block" />
          every <span className="text-orange">structure.</span>
        </h1>
        <p
          className="mt-4 max-w-[22rem] text-[0.95rem] leading-relaxed text-white/70 lg:mt-6 lg:text-[1.06rem]"
          data-hero-el
        >
          Reliable steel supply for projects that matter.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3 lg:mt-7" data-hero-el>
          <a href="/products" className="btn btn-primary">
            Explore Products
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </a>
          <QuoteTrigger className="btn btn-ghost-light">Get a Quote</QuoteTrigger>
        </div>
      </div>

      <div className="hero__rig" aria-hidden="true">
        <img
          data-parallax="crane"
          className="hero__crane"
          src="/images/hero-crane-1800.webp"
          srcSet="/images/hero-crane-1000.webp 1000w, /images/hero-crane-1800.webp 1800w"
          sizes="(min-width: 1024px) 63vw, 168vw"
          width={1800}
          height={620}
          alt=""
          decoding="async"
        />
        <div data-parallax="lift" className="hero__lift">
          <div className="hero__lift-sway">
            <img
              className="hero__lift-img"
              src="/images/hero-lift-1100.webp"
              srcSet="/images/hero-lift-720.webp 720w, /images/hero-lift-1100.webp 1100w"
              sizes="(min-width: 1024px) 58vw, 92vw"
              width={1100}
              height={733}
              alt=""
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 lg:pb-[max(2rem,env(safe-area-inset-bottom))]">
        <div className="shell flex items-center justify-center gap-4 sm:justify-between text-[0.6rem] font-medium uppercase tracking-[0.24em] text-white/45">
          <span className="hidden sm:inline">Steel distribution · Regional supply</span>
          <a
            href="#products"
            className="group inline-flex items-center gap-3 transition-colors hover:text-white/80"
          >
            Scroll to explore
            <span className="relative block h-8 w-px overflow-hidden bg-white/20">
              <span className="absolute inset-x-0 top-0 h-3 animate-[scrollcue_2.2s_ease-in-out_infinite] bg-orange" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
