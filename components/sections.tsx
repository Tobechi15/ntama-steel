import Image from "next/image";
import { ProductCard } from "@/components/product-card";
import { QuoteTrigger } from "@/components/quote-trigger";
import { aboutPoints, products, sectors, site } from "@/lib/site";

const reasons = [
  {
    title: "Quality-assured materials",
    copy: "Every consignment is matched to the specification you send us, with documentation where it is required.",
    icon: (
      <>
        <path d="M12 3 5 6v5.5c0 4.2 2.8 7.5 7 9.5 4.2-2 7-5.3 7-9.5V6l-7-3Z" />
        <path d="m9 12 2.2 2.2L15.5 10" />
      </>
    ),
  },
  {
    title: "Reliable supply & support",
    copy: "A direct line to the people handling your order, from first enquiry through to delivery.",
    icon: (
      <>
        <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
        <path d="M4 13h2.5v5H5a1 1 0 0 1-1-1v-4ZM20 13h-2.5v5H19a1 1 0 0 0 1-1v-4Z" />
        <path d="M17.5 18v.5a2.5 2.5 0 0 1-2.5 2.5h-2" />
      </>
    ),
  },
  {
    title: "On-time delivery",
    copy: "Delivery slots agreed up front and coordinated with your site programme.",
    icon: (
      <>
        <path d="M3 7h11v10H3z" />
        <path d="M14 10h4l3 3v4h-7z" />
        <circle cx="7" cy="18" r="1.6" />
        <circle cx="17.5" cy="18" r="1.6" />
      </>
    ),
  },
  {
    title: "Bulk order support",
    copy: "Volume supply, staged releases and consolidated loads for larger projects.",
    icon: (
      <>
        <path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" />
        <path d="m4 12 8 4.5 8-4.5M4 16.5 12 21l8-4.5" />
      </>
    ),
  },
];

export function Products() {
  return (
    <section id="products" className="bg-paper py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between md:gap-16">
          <div data-reveal>
            <p className="eyebrow text-orange">Our products</p>
            <h2 className="display-heading mt-5 max-w-[14ch] text-ink">
              Steel for every project.
            </h2>
          </div>
          <div className="md:max-w-[21rem] md:pb-1" data-reveal>
            <p className="text-[0.94rem] leading-relaxed text-steel">
              Premium quality steel products, sourced and delivered with care.
            </p>
            <QuoteTrigger className="arrow-link mt-5 text-ink">
              Ask about availability
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" />
              </svg>
            </QuoteTrigger>
          </div>
        </div>

        <div
          data-reveal-group
          className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4"
        >
          {products.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-ink/10 pt-5 text-xs text-steel sm:flex-row sm:items-center sm:justify-between">
          <p>
            Grades, dimensions and stock are confirmed against your order — never
            assumed.
          </p>
          <p className="text-steel/80">Open a product for what we need from you.</p>
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-ink text-paper">
      <div className="pointer-events-none absolute inset-0 hatch opacity-70" aria-hidden="true" />
      <div className="shell relative grid items-center gap-10 py-20 sm:py-24 lg:grid-cols-[1.06fr_0.94fr] lg:gap-16 lg:py-28">
        <div data-reveal className="relative">
          <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[3px]">
            <Image
              src="/images/about-steel-frame.webp"
              alt="Structural steel frame rising against a dusk sky"
              fill
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-5 left-5 hidden items-center gap-4 bg-orange px-5 py-3.5 text-white sm:flex">
            <span className="font-display text-[1.6rem] font-extrabold leading-none">4</span>
            <span className="max-w-[9rem] text-[0.62rem] font-semibold uppercase leading-[1.5] tracking-[0.16em]">
              Core product lines supplied
            </span>
          </div>
        </div>

        <div>
          <p className="eyebrow text-orange-hi" data-reveal>
            About Ntama Steel
          </p>
          <h2 className="display-heading mt-5 text-paper" data-reveal>
            A dependable partner in steel supply.
          </h2>
          <p className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-mist/85" data-reveal>
            With a strong commitment to quality and reliable delivery, Ntama Steel
            serves contractors, developers and industries across the region.
          </p>

          <ul className="mt-9 border-t border-white/10" data-reveal>
            {aboutPoints.map((point) => (
              <li
                key={point.index}
                className="flex gap-5 border-b border-white/10 py-4 sm:gap-7"
              >
                <span className="pt-0.5 font-mono text-[0.65rem] tracking-[0.1em] text-orange">
                  {point.index}
                </span>
                <div>
                  <h3 className="font-display text-[0.98rem] font-semibold tracking-tight text-paper">
                    {point.title}
                  </h3>
                  <p className="mt-1 max-w-md text-[0.82rem] leading-relaxed text-mist/65">
                    {point.copy}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <a href="/why-us" className="arrow-link mt-8 text-paper">
            Why teams work with us
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export function WhyUs() {
  return (
    <section id="why" className="bg-paper-2 py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
          <div data-reveal>
            <p className="eyebrow text-orange">Why choose us</p>
            <h2 className="display-heading mt-5 max-w-[12ch] text-ink">
              Built on trust. Driven by quality.
            </h2>
          </div>
          <p className="max-w-md text-[0.94rem] leading-relaxed text-steel lg:justify-self-end lg:pb-1" data-reveal>
            Steel is only useful when it arrives as specified and on schedule. That
            is the standard we hold ourselves to, on every order.
          </p>
        </div>

        <div
          data-reveal-group
          className="mt-10 grid gap-px border-y border-ink/10 bg-ink/10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4"
        >
          {reasons.map((reason, index) => (
            <div key={reason.title} className="bg-paper-2 p-6 sm:p-7 lg:min-h-[16rem]">
              <div className="flex items-start justify-between gap-4">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 text-orange"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.35"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {reason.icon}
                </svg>
                <span className="font-mono text-[0.6rem] tracking-[0.12em] text-steel/60">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-7 font-display text-[1.02rem] font-bold leading-snug tracking-tight text-ink">
                {reason.title}
              </h3>
              <p className="mt-2.5 text-[0.82rem] leading-relaxed text-steel">
                {reason.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Industries() {
  return (
    <section id="industries" className="bg-ink text-paper">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[18rem] overflow-hidden sm:min-h-[24rem] lg:min-h-[34rem]">
          <Image
            src="/images/industries-skyline.webp"
            alt="City skyline under construction at sunset, seen across a steel frame"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/20 lg:from-ink/35" />
          <p className="absolute bottom-5 left-5 text-[0.6rem] font-medium uppercase tracking-[0.22em] text-white/70">
            Mixed-use development · structural steel
          </p>
        </div>

        <div className="relative flex flex-col justify-center px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
          <div className="pointer-events-none absolute inset-0 hatch opacity-60" aria-hidden="true" />
          <div className="relative">
            <p className="eyebrow text-orange-hi" data-reveal>
              Our impact
            </p>
            <h2 className="display-heading mt-5 max-w-[14ch] text-paper" data-reveal>
              Powering modern construction.
            </h2>
            <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-mist/80" data-reveal>
              From residential buildings to large-scale infrastructure, Ntama Steel is
              part of the progress. Contractors, developers and fabricators rely on our
              supply for frames, reinforcement and cladding.
            </p>

            <ul className="mt-8 flex flex-wrap gap-2" data-reveal>
              {sectors.map((sector) => (
                <li
                  key={sector}
                  className="rounded-full border border-white/15 px-3.5 py-1.5 text-[0.62rem] font-medium uppercase tracking-[0.15em] text-mist"
                >
                  {sector}
                </li>
              ))}
            </ul>

            <QuoteTrigger
              className="arrow-link mt-9 text-paper"
              interest="Project supply"
            >
              Discuss your project
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" />
              </svg>
            </QuoteTrigger>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactBand() {
  return (
    <section id="contact" className="relative overflow-hidden bg-charcoal text-white">
      <div className="pointer-events-none absolute inset-0 hatch opacity-80" aria-hidden="true" />
      <div className="absolute -right-16 -top-24 hidden h-72 w-72 rounded-full border border-white/10 lg:block" aria-hidden="true" />
      <div className="shell relative py-16 sm:py-20 lg:py-24">
        <div className="grid gap-9 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <div data-reveal>
            <p className="eyebrow text-orange-hi">Start a project</p>
            <h2 className="display-heading mt-5 max-w-[16ch]">
              Have a project in mind?
            </h2>
            <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-mist/80">
              Let&apos;s talk. Get in touch for a quote or expert advice. Send your
              drawings, schedule or a simple list of what you need.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch" data-reveal>
            <a
              href={`${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary flex-1"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.94.56 3.74 1.54 5.26L2 22l5.02-1.7a9.84 9.84 0 0 0 5.02 1.36c5.44 0 9.84-4.4 9.84-9.84S17.48 2 12.04 2Zm0 17.9c-1.62 0-3.12-.48-4.38-1.3l-.32-.2-2.98 1 1.02-2.9-.22-.34a8.06 8.06 0 0 1-1.28-4.32c0-4.48 3.66-8.12 8.16-8.12 4.48 0 8.12 3.64 8.12 8.12 0 4.5-3.64 8.16-8.12 8.16Zm4.46-6.1c-.24-.12-1.44-.7-1.66-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.42-1.34-1.66-.14-.24-.02-.36.1-.48.12-.12.26-.3.38-.44.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.46-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.68 2.68 4.08 3.66 2.4.98 2.4.66 2.84.62.44-.04 1.44-.58 1.64-1.16.2-.56.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
              </svg>
              Chat on WhatsApp
            </a>
            <QuoteTrigger className="btn btn-ghost-light flex-1">
              Request a Quote
            </QuoteTrigger>
          </div>
        </div>

        <div className="mt-12 grid gap-4 border-t border-white/10 pt-6 text-sm sm:grid-cols-3">
          <a href={`mailto:${site.email}`} className="group">
            <span className="block text-[0.6rem] uppercase tracking-[0.2em] text-white/40">
              Email
            </span>
            <span className="mt-1.5 block text-[0.9rem] text-white/85 transition-colors group-hover:text-orange-hi">
              {site.email}
            </span>
          </a>
          <a href={site.phoneHref} className="group">
            <span className="block text-[0.6rem] uppercase tracking-[0.2em] text-white/40">
              Phone
            </span>
            <span className="mt-1.5 block text-[0.9rem] text-white/85 transition-colors group-hover:text-orange-hi">
              {site.phoneDisplay}
            </span>
          </a>
          <div>
            <span className="block text-[0.6rem] uppercase tracking-[0.2em] text-white/40">
              Supply
            </span>
            <span className="mt-1.5 block text-[0.9rem] text-white/85">
              Regional projects &amp; bulk orders
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#0c0f11] text-white">
      <div className="shell py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.7fr_1fr]">
          <div>
            <a href="/" className="inline-flex text-white">
              <span className="inline-flex items-center gap-3">
                <svg viewBox="0 0 40 40" aria-hidden="true" className="h-9 w-9" fill="none">
                  <path d="M3 35.5V10.2L14.6 2v25.3L3 35.5Z" fill="#E9721E" />
                  <path
                    d="M17.1 2h8.2l11.7 8.2v25.3h-7.4V15.4l-12.5-8.7V2Z"
                    fill="#F3F2EE"
                  />
                </svg>
                <span className="flex flex-col leading-none">
                  <span className="font-display text-base font-extrabold tracking-[0.04em]">
                    NTAMA
                  </span>
                  <span className="mt-1 text-[0.55rem] tracking-[0.42em] text-mist">
                    STEEL
                  </span>
                </span>
              </span>
            </a>
            <p className="mt-5 max-w-[18rem] text-[0.82rem] leading-relaxed text-mist/60">
              {site.region}
            </p>
          </div>

          <div>
            <p className="text-[0.6rem] uppercase tracking-[0.22em] text-white/35">Explore</p>
            <ul className="mt-4 space-y-2.5 text-[0.82rem] text-mist/75">
              <li><a className="hover:text-white" href="/products">Products</a></li>
              <li><a className="hover:text-white" href="/about">About</a></li>
              <li><a className="hover:text-white" href="/why-us">Why us</a></li>
              <li><a className="hover:text-white" href="/projects">Projects</a></li>
              <li><a className="hover:text-white" href="/contact">Contact</a></li>
            </ul>
          </div>

          <div>
            <p className="text-[0.6rem] uppercase tracking-[0.22em] text-white/35">Catalogue</p>
            <ul className="mt-4 space-y-2.5 text-[0.82rem] text-mist/75">
              {products.map((product) => (
                <li key={product.slug}>
                  <a className="hover:text-white" href="/products">
                    {product.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[0.6rem] uppercase tracking-[0.22em] text-white/35">Contact</p>
            <ul className="mt-4 space-y-2.5 text-[0.82rem] text-mist/75">
              <li>
                <a className="hover:text-white" href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <a className="hover:text-white" href={site.phoneHref}>{site.phoneDisplay}</a>
              </li>
              <li>
                <a
                  className="hover:text-white"
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
            <p className="mt-5 text-[0.66rem] leading-relaxed text-mist/40">
              Material, size, quantity and delivery — the four details
              that speed up a quote.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-[0.68rem] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Ntama Steel. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Built for projects that matter.</span>
            <a href="/#top" className="inline-flex items-center gap-2 uppercase tracking-[0.16em] hover:text-white">
              Top
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" aria-hidden="true">
                <path d="M12 19V5M6 11l6-6 6 6" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
