import Image from "next/image";
import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  copy,
  image,
  imageAlt,
  children,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  image: string;
  imageAlt: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0 -z-10">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
      </div>
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/90 to-ink/40"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 hatch opacity-60" aria-hidden="true" />

      <div className="shell relative pb-16 pt-[calc(7.5rem+env(safe-area-inset-top))] sm:pb-20 lg:pb-24 lg:pt-[10.5rem]">
        <p className="eyebrow text-orange-hi" data-reveal>
          {eyebrow}
        </p>
        <h1
          className="display-heading mt-5 max-w-[17ch] text-[clamp(2.4rem,6.4vw,4rem)] text-paper"
          data-reveal
        >
          {title}
        </h1>
        <p className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-mist/80" data-reveal>
          {copy}
        </p>
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
