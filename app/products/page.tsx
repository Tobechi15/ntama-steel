import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { ContactBand, Footer } from "@/components/sections";
import { QuoteTrigger } from "@/components/quote-trigger";
import { products } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Reinforcement bars, steel beams, roofing sheets and steel pipes supplied to specification for contractors, developers and fabricators.",
};

export default function ProductsPage() {
  return (
    <>
      <main id="main">
        <PageHero
          eyebrow="Our products"
          title="Four lines. One reliable supply."
          copy="Structural steel, reinforcement, cladding and pipe, supplied to the specification you send us — never assumed from a catalogue."
          image="/images/product-pipes.webp"
          imageAlt="Ends of a stacked bundle of steel pipes"
        />

        <section className="bg-paper py-16 sm:py-20 lg:py-24">
          <div className="shell">
            <div className="flex flex-col gap-4 border-b border-ink/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="font-display text-[1.5rem] font-bold tracking-tight text-ink">
                The catalogue
              </h2>
              <p className="max-w-sm text-[0.85rem] leading-relaxed text-steel">
                Grades, dimensions and stock are confirmed against your order before
                dispatch.
              </p>
            </div>

            <ul>
              {products.map((product, index) => (
                <li
                  key={product.slug}
                  className="grid gap-6 border-b border-ink/10 py-8 lg:grid-cols-[13rem_1fr_auto] lg:items-center lg:gap-10 lg:py-10"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[3px] sm:max-w-[18rem] lg:max-w-none">
                    <Image
                      src={product.image}
                      alt={product.alt}
                      fill
                      sizes="(min-width: 1024px) 13rem, 90vw"
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <p className="font-mono text-[0.62rem] tracking-[0.14em] text-orange">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 font-display text-[1.35rem] font-bold leading-tight tracking-tight text-ink">
                      {product.name}
                    </h3>
                    <p className="mt-1.5 text-[0.9rem] leading-relaxed text-steel">
                      {product.short}
                    </p>
                    <p className="mt-3 max-w-xl text-[0.86rem] leading-relaxed text-steel/90">
                      {product.detail}
                    </p>
                  </div>

                  <div className="lg:justify-self-end">
                    <QuoteTrigger
                      className="btn btn-ghost-dark"
                      interest={product.name}
                      ariaLabel={`Request pricing for ${product.name}`}
                    >
                      Request pricing
                    </QuoteTrigger>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-6 max-w-2xl text-[0.8rem] leading-relaxed text-steel/80">
              Something outside these lines? Send the specification and we will tell
              you what we can source and when it can land on site.
            </p>
          </div>
        </section>

        <ContactBand />
      </main>
      <Footer />
    </>
  );
}
