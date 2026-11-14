import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Footer } from "@/components/sections";
import { QuoteTrigger } from "@/components/quote-trigger";
import { quoteChecklist, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Ntama Steel about reinforcement, structural steel, roofing sheets or pipe. Send a schedule, drawing or list of material for pricing and availability.",
};

const channels = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    note: "Best for schedules, drawings and written specifications.",
  },
  {
    label: "Phone",
    value: site.phoneDisplay,
    href: site.phoneHref,
    note: "Call during working hours to talk an order through.",
  },
  {
    label: "WhatsApp",
    value: "Message the supply team",
    href: `${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`,
    note: "Send a photo of a schedule or drawing straight from site.",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <main id="main">
        <PageHero
          eyebrow="Contact"
          title="Let's talk about your next delivery."
          copy="Send us what you need and we will come back with availability, pricing and a delivery window you can plan around."
          image="/images/hero-scene-1500.webp"
          imageAlt="Steel structures on a construction site at dusk"
        >
          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            <a
              href={`${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Chat on WhatsApp
            </a>
            <QuoteTrigger className="btn btn-ghost-light">Request a Quote</QuoteTrigger>
          </div>
        </PageHero>

        <section className="bg-paper py-16 sm:py-20 lg:py-24">
          <div className="shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <p className="eyebrow text-orange" data-reveal>
                Direct lines
              </p>
              <h2 className="display-heading mt-5 max-w-[15ch] text-ink" data-reveal>
                One team, start to finish.
              </h2>

              <dl className="mt-8 border-t border-ink/10">
                {channels.map((channel) => (
                  <div key={channel.label} className="border-b border-ink/10 py-5">
                    <dt className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-steel/70">
                      {channel.label}
                    </dt>
                    <dd className="mt-1.5">
                      <a
                        href={channel.href}
                        {...(channel.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="inline-flex items-center gap-2 text-[1rem] font-medium text-ink transition-colors hover:text-orange"
                      >
                        {channel.value}
                        <svg
                          viewBox="0 0 24 24"
                          className="h-3.5 w-3.5"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M5 12h14M13 6l6 6-6 6"
                            stroke="currentColor"
                            strokeWidth="1.8"
                          />
                        </svg>
                      </a>
                      <span className="mt-1.5 block text-[0.82rem] leading-relaxed text-steel">
                        {channel.note}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-6 max-w-md text-[0.84rem] leading-relaxed text-steel">
                {site.region} We supply single orders and bulk requirements, and
                confirm stock before we commit to a date.
              </p>
            </div>

            <div className="border border-ink/10 bg-paper-2 p-6 sm:p-8" data-reveal>
              <p className="eyebrow text-orange">Before you send</p>
              <h2 className="mt-4 font-display text-[1.35rem] font-bold leading-tight tracking-tight text-ink">
                What to include
              </h2>
              <p className="mt-2 text-[0.86rem] leading-relaxed text-steel">
                The more of this you can give us, the faster we can price it.
              </p>

              <ol className="mt-6 space-y-4">
                {quoteChecklist.map((item, index) => (
                  <li key={item} className="flex gap-3.5 border-t border-ink/10 pt-4">
                    <span className="font-mono text-[0.68rem] leading-5 text-orange">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.9rem] leading-5 text-ink">{item}</span>
                  </li>
                ))}
              </ol>

              <QuoteTrigger className="btn btn-primary mt-7 w-full justify-center">
                Send your requirement
              </QuoteTrigger>
              <p className="mt-3 text-[0.72rem] leading-relaxed text-steel/80">
                Prefer email? Send the same details to {site.email}.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
