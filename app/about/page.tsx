import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { About, ContactBand, Footer } from "@/components/sections";
import { processSteps } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ntama Steel supplies reinforcement, structural sections, cladding and pipe to contractors, developers and industries across the region.",
};

export default function AboutPage() {
  return (
    <>
      <main id="main">
        <PageHero
          eyebrow="About Ntama Steel"
          title="A dependable partner in steel supply."
          copy="We do one thing properly: getting the right steel to site, on the programme you have committed to. No surprises, no substitutions."
          image="/images/about-steel-frame.webp"
          imageAlt="Structural steel frame rising against a cool sky"
        />

        <About />

        <section className="bg-paper py-16 sm:py-20 lg:py-24">
          <div className="shell">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
              <div data-reveal>
                <p className="eyebrow text-orange">How we work</p>
                <h2 className="display-heading mt-5 max-w-[14ch] text-ink">
                  From enquiry to delivery.
                </h2>
              </div>
              <p
                className="max-w-md text-[0.94rem] leading-relaxed text-steel lg:justify-self-end lg:pb-1"
                data-reveal
              >
                Steel only works when it arrives as specified. These three steps are
                how we keep that promise on every order.
              </p>
            </div>

            <ol className="mt-10 grid gap-px border-y border-ink/10 bg-ink/10 sm:grid-cols-3 lg:mt-14">
              {processSteps.map((step) => (
                <li key={step.index} className="bg-paper p-6 sm:p-7">
                  <span className="font-mono text-[0.65rem] tracking-[0.12em] text-orange">
                    {step.index}
                  </span>
                  <h3 className="mt-5 font-display text-[1.02rem] font-bold leading-snug tracking-tight text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-[0.84rem] leading-relaxed text-steel">
                    {step.copy}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <ContactBand />
      </main>
      <Footer />
    </>
  );
}
