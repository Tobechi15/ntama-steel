import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { ContactBand, Footer, Industries } from "@/components/sections";
import { projects } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Representative steel supply across residential, commercial, infrastructure and industrial projects: reinforcement, structural sections, cladding and pipe.",
};

export default function ProjectsPage() {
  return (
    <>
      <main id="main">
        <PageHero
          eyebrow="Our projects"
          title="Supply that keeps sites moving."
          copy="From residential blocks to large-scale infrastructure, our material is part of the progress. Here is the kind of supply we handle."
          image="/images/industries-skyline.webp"
          imageAlt="City skyline under construction at dusk"
        />

        <section className="bg-paper py-16 sm:py-20 lg:py-24">
          <div className="shell">
            <div className="flex flex-col gap-4 border-b border-ink/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="font-display text-[1.5rem] font-bold tracking-tight text-ink">
                Representative supply
              </h2>
              <p className="max-w-sm text-[0.85rem] leading-relaxed text-steel">
                Scope and quantities are confirmed per order — no two programmes are
                the same.
              </p>
            </div>

            <div
              data-reveal-group
              className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-12"
            >
              {projects.map((project) => (
                <article
                  key={project.slug}
                  className="group overflow-hidden rounded-[3px] border border-ink/10 bg-paper-2"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.alt}
                      fill
                      sizes="(min-width: 1024px) 38vw, 92vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-3 text-[0.6rem] font-medium uppercase tracking-[0.18em]">
                      <span className="text-orange">{project.sector}</span>
                      <span className="text-steel/60">{project.scope}</span>
                    </div>
                    <h3 className="mt-4 font-display text-[1.15rem] font-bold tracking-tight text-ink">
                      {project.name}
                    </h3>
                    <p className="mt-2 text-[0.85rem] leading-relaxed text-steel">
                      {project.summary}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Industries />
        <ContactBand />
      </main>
      <Footer />
    </>
  );
}
