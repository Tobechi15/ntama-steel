import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ContactBand, Footer, WhyUs } from "@/components/sections";
import { sectors } from "@/lib/site";

export const metadata: Metadata = {
  title: "Why Us",
  description:
    "Quality-assured steel, reliable supply, on-time delivery and bulk order support for contractors, developers and industries.",
};

const sectorNotes: Record<string, string> = {
  Residential: "Reinforcement and sections for house builders and housing estates.",
  Commercial: "Frames, beams and cladding for offices, retail and mixed-use.",
  Infrastructure: "Pipe, reinforcement and heavy sections for civil works.",
  Industrial: "Structural steel, sheeting and pipe for plants and warehouses.",
};

export default function WhyUsPage() {
  return (
    <>
      <main id="main">
        <PageHero
          eyebrow="Why choose us"
          title="Built on trust. Driven by quality."
          copy="Anyone can quote a price. We are judged on whether the steel turns up as specified, when the programme needs it — and that is the standard we hold ourselves to."
          image="/images/industries-skyline.webp"
          imageAlt="City skyline under construction at dusk"
        />

        <WhyUs />

        <section className="bg-ink text-paper">
          <div className="shell grid gap-10 py-16 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:py-24">
            <div data-reveal>
              <p className="eyebrow text-orange-hi">Sectors we supply</p>
              <h2 className="display-heading mt-5 max-w-[14ch] text-paper">
                Steel for every kind of site.
              </h2>
              <p className="mt-5 max-w-md text-[0.94rem] leading-relaxed text-mist/80">
                The requirement changes with the sector, but the questions stay the
                same: what grade, what section, what quantity, and when does it need
                to be there.
              </p>
            </div>

            <ul
              data-reveal-group
              className="grid gap-px border-y border-white/10 bg-white/10 sm:grid-cols-2"
            >
              {sectors.map((sector) => (
                <li key={sector} className="bg-ink p-6">
                  <h3 className="font-display text-[1rem] font-bold tracking-tight text-paper">
                    {sector}
                  </h3>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-mist/65">
                    {sectorNotes[sector]}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ContactBand />
      </main>
      <Footer />
    </>
  );
}
