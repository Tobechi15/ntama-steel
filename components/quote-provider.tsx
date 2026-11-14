"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { products, quoteChecklist, site, type Product } from "@/lib/site";

type QuoteContextValue = {
  openQuote: (interest?: string) => void;
  openProduct: (slug: string) => void;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function useQuote() {
  const value = useContext(QuoteContext);
  if (!value) throw new Error("useQuote must be used inside QuoteProvider");
  return value;
}

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [productSlug, setProductSlug] = useState<string | null>(null);
  const [interest, setInterest] = useState("");

  const openQuote = useCallback((nextInterest = "") => {
    setProductSlug(null);
    setInterest(nextInterest);
    setQuoteOpen(true);
  }, []);

  const openProduct = useCallback((slug: string) => {
    setProductSlug(slug);
  }, []);

  const value = useMemo(
    () => ({ openQuote, openProduct }),
    [openQuote, openProduct],
  );

  const selected = products.find((product) => product.slug === productSlug) ?? null;

  return (
    <QuoteContext.Provider value={value}>
      {children}
      <QuoteDialog
        open={quoteOpen}
        interest={interest}
        onClose={() => setQuoteOpen(false)}
      />
      <ProductDialog
        product={selected}
        onClose={() => setProductSlug(null)}
        onRequest={(name) => {
          setProductSlug(null);
          setInterest(name);
          setQuoteOpen(true);
        }}
      />
    </QuoteContext.Provider>
  );
}

function Dialog({
  open,
  onClose,
  labelledBy,
  children,
  className = "",
}: {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    const handleCancel = (event: Event) => {
      event.preventDefault();
      onClose();
    };
    const handleClick = (event: globalThis.MouseEvent) => {
      if (event.target === dialog) onClose();
    };

    dialog.addEventListener("cancel", handleCancel);
    dialog.addEventListener("click", handleClick);
    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      dialog.removeEventListener("click", handleClick);
    };
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={`site-dialog ${className}`}
      aria-labelledby={labelledBy}
      onClose={onClose}
    >
      {children}
    </dialog>
  );
}

function CloseButton({ onClose, tone = "light" }: { onClose: () => void; tone?: "light" | "dark" }) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label="Close dialog"
      className={`grid h-9 w-9 place-items-center rounded-full border transition-colors ${
        tone === "light"
          ? "border-white/20 text-white hover:bg-white/10"
          : "border-ink/15 text-ink hover:bg-ink hover:text-white"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
        <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </button>
  );
}

function QuoteDialog({
  open,
  interest,
  onClose,
}: {
  open: boolean;
  interest: string;
  onClose: () => void;
}) {
  const [sent, setSent] = useState(false);
  const [product, setProduct] = useState(interest || "General enquiry");

  useEffect(() => {
    if (open) {
      setSent(false);
      setProduct(interest || "General enquiry");
    }
  }, [open, interest]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = [
      `Name: ${data.get("name")}`,
      `Company: ${data.get("company") || "—"}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone") || "—"}`,
      `Product: ${data.get("product")}`,
      "",
      `${data.get("message") || "Please get in touch about supply."}`,
      "",
      "Sent from the Ntama Steel website.",
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `Quote request — ${data.get("product")}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <Dialog open={open} onClose={onClose} labelledBy="quote-title">
      <div className="bg-ink px-5 py-4 text-white sm:px-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow text-orange-hi">Request a quote</p>
            <h2 id="quote-title" className="mt-3 font-display text-2xl font-extrabold tracking-tight">
              Tell us what the project needs.
            </h2>
          </div>
          <CloseButton onClose={onClose} />
        </div>
      </div>

      {sent ? (
        <div className="px-5 py-7 sm:px-7">
          <h3 className="font-display text-xl font-bold">Your email draft is ready.</h3>
          <p className="mt-3 text-sm leading-relaxed text-steel">
            We have opened your mail app with the request addressed to{" "}
            <span className="font-medium text-ink">{site.email}</span>. If nothing opened,
            write to us directly or send the same details on WhatsApp.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              className="btn btn-primary"
              href={`${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </a>
            <a className="btn btn-ghost-dark" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </div>
          <button
            type="button"
            className="mt-6 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-steel underline underline-offset-4 hover:text-ink"
            onClick={() => setSent(false)}
          >
            Edit the request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="px-5 py-5 sm:px-7">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="field">
              <label htmlFor="quote-name">Name</label>
              <input id="quote-name" name="name" autoComplete="name" required />
            </div>
            <div className="field">
              <label htmlFor="quote-company">Company</label>
              <input id="quote-company" name="company" autoComplete="organization" />
            </div>
            <div className="field">
              <label htmlFor="quote-email">Email</label>
              <input id="quote-email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="field">
              <label htmlFor="quote-phone">Phone</label>
              <input id="quote-phone" name="phone" type="tel" autoComplete="tel" />
            </div>
          </div>

          <div className="field mt-3">
            <label htmlFor="quote-product">What do you need?</label>
            <select id="quote-product" name="product" value={product} onChange={(event) => setProduct(event.target.value)}>
              <option>General enquiry</option>
              {products.map((item) => (
                <option key={item.slug} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="field mt-3">
            <label htmlFor="quote-message">Project details</label>
            <textarea
              id="quote-message"
              name="message"
              placeholder="Sections, quantities, delivery location and timing…"
            />
          </div>

          <p className="mt-3 text-xs leading-relaxed text-steel">
            This form builds an email in your own mail app. Nothing is stored on the
            website.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button type="submit" className="btn btn-primary">
              Prepare email
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
            <a
              href={site.phoneHref}
              className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-steel underline underline-offset-4 hover:text-ink"
            >
              Or call {site.phoneDisplay}
            </a>
          </div>
        </form>
      )}
    </Dialog>
  );
}

function ProductDialog({
  product,
  onClose,
  onRequest,
}: {
  product: Product | null;
  onClose: () => void;
  onRequest: (name: string) => void;
}) {
  return (
    <Dialog open={Boolean(product)} onClose={onClose} labelledBy="product-title">
      {product && (
        <div>
          <div className="relative aspect-[16/10] w-full bg-ink">
            <Image
              src={product.image}
              alt={product.alt}
              fill
              sizes="(min-width: 640px) 34rem, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/20" />
            <div className="absolute inset-x-0 top-0 flex justify-end p-4">
              <CloseButton onClose={onClose} />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <p className="eyebrow text-orange-hi">Product</p>
              <h2 id="product-title" className="mt-2 font-display text-2xl font-extrabold text-white sm:text-3xl">
                {product.name}
              </h2>
            </div>
          </div>

          <div className="px-5 py-6 sm:px-7">
            <p className="text-sm leading-relaxed text-steel">{product.detail}</p>

            <p className="mt-6 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ink">
              Confirmed with every order
            </p>
            <ul className="mt-3 grid gap-2 text-sm text-steel sm:grid-cols-2">
              {quoteChecklist.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-orange" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-5 border-t border-ink/10 pt-4 text-xs leading-relaxed text-steel">
              We do not publish grades or stock levels online — they change by project.
              Send your specification and we will confirm what can be supplied.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onRequest(product.name)}
              >
                Request pricing
              </button>
              <a
                href={`${site.whatsapp}?text=${encodeURIComponent(
                  `Hello Ntama Steel, I would like to ask about ${product.name}.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost-dark"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
}
