# Ntama Steel — Website

Marketing site for **Ntama Steel**, a steel supplier serving contractors, developers and industries. The site presents the product lines, representative project work and the company's approach, and gives visitors a direct route to request a quote by email or WhatsApp.

Built with Next.js and deployed as a static-first marketing site — there is no database or server-side form handling.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS v4 via `@tailwindcss/postcss`, design tokens in `app/globals.css` |
| Animation | GSAP + ScrollTrigger (hero parallax, scroll reveals, reduced-motion aware) |
| Fonts | Self-hosted Archivo (display) and Inter (body) in `app/fonts` |
| Images | WebP assets in `public/images`, served through `next/image` |

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Hero, product overview, about, differentiators, industries, contact band |
| `/products` | Full product catalogue with a quote trigger per product |
| `/projects` | Representative supply by sector |
| `/about` | Company positioning and the enquiry-to-delivery process |
| `/why-us` | Reasons to choose the supplier and sectors served |
| `/contact` | Direct channels and a checklist of what to send for pricing |

A shared header (with a mobile menu) and footer wrap every page. The "Request a Quote" flow opens a client-side dialog that composes an email in the visitor's mail app; it also offers WhatsApp as an alternative. Nothing is submitted to or stored on the website.

## Getting started

Requires **Node.js 20.9 or newer**.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |

## Project structure

```
app/
  layout.tsx          Root layout: fonts, metadata, header, quote provider, animations
  page.tsx            Home page
  globals.css         Tailwind import, theme tokens and component styles
  icon.svg            Favicon
  fonts/              Self-hosted WOFF2 files
  about|contact|products|projects|why-us/
                      Route pages with their own metadata
components/
  hero.tsx            Layered parallax hero
  sections.tsx        Shared page sections (products, about, why us, industries, contact band, footer)
  site-header.tsx     Fixed header and mobile menu
  page-hero.tsx       Inner-page hero
  quote-provider.tsx  Quote and product dialogs (mailto/WhatsApp)
  quote-trigger.tsx   Button that opens the quote dialog
  product-card.tsx    Product tile
  logo.tsx            Wordmark and brand mark
  animations.tsx      GSAP scroll and pointer animation setup
lib/
  site.ts             Single source of truth for contact details, products, projects and copy lists
public/images/        Optimised WebP imagery used by the site
assets/raw/           Original artwork used to derive the image set
tools/
  build_assets.py     Image pipeline (cutouts, crops, WebP export)
```

## Editing content

- **Contact details, products, projects, navigation and repeated copy** live in `lib/site.ts`. Update this file to change phone, email, WhatsApp, product descriptions or project entries.
- **Page-specific copy** lives in each route's `page.tsx` and the shared sections in `components/sections.tsx`.
- **Colours, typography and spacing tokens** are defined in the `@theme` block at the top of `app/globals.css`.
- **SEO metadata** (title template, description, Open Graph image, canonical base URL) is set in `app/layout.tsx`. Change `metadataBase` if the site is not hosted at `https://www.ntamasteel.com`.

The phone number and email address currently in `lib/site.ts` are placeholders — replace them with the real details before launch.

## Images and the asset pipeline

The site only reads from `public/images`. Those files were derived from the original PNG artwork in `assets/raw` with `tools/build_assets.py`, which:

- trims and exports the crane, lifting hook and industrial scene as WebP at responsive widths;
- recovers a genuine alpha channel for artwork supplied on a checkerboard background;
- composites the steel-frame and skyline crops onto generated skies;
- crops the four product photos out of the supplied design mockup and removes the baked-in labels.

Regenerating the images is optional and only needed if the source artwork changes. It requires Python 3 with extra packages (not needed to run the website):

```bash
python -m pip install pillow numpy opencv-python scipy
python tools/build_assets.py
```

## Deployment

The project deploys to [Vercel](https://vercel.com/) with no configuration: import the repository and Vercel detects Next.js.

On any Node host:

```bash
npm ci
npm run build
npm run start
```

The server listens on port 3000 by default; set `PORT` to override. Remember to update `metadataBase` in `app/layout.tsx` and the contact details in `lib/site.ts` for the production domain.

## Notes

- No environment variables are required.
- Fonts are self-hosted; Archivo and Inter are distributed under the SIL Open Font License.
- The site content and imagery belong to the project owner.
