export const site = {
  name: "Ntama Steel",
  tagline: "Strength in every structure.",
  email: "hello@ntamasteel.com",
  phoneDisplay: "+250 788 000 000",
  phoneHref: "tel:+250788000000",
  whatsapp: "https://wa.me/250788000000",
  whatsappMessage:
    "Hello Ntama Steel, I would like to talk about steel supply for a project.",
  region: "Serving contractors, developers and industries across the region.",
};

export type Product = {
  slug: string;
  name: string;
  short: string;
  detail: string;
  image: string;
  alt: string;
};

export const products: Product[] = [
  {
    slug: "reinforcement-bars",
    name: "Reinforcement Bars",
    short: "Deformed bar for reinforced concrete structures.",
    detail:
      "Reinforcement bars for slabs, columns, beams and foundations. Supply is planned around your bar bending schedule, so the steel arrives in the form your site can fix.",
    image: "/images/product-rebar.webp",
    alt: "Bundle of ribbed reinforcement bars",
  },
  {
    slug: "steel-beams",
    name: "Steel Beams",
    short: "Structural sections for frames and load-bearing steelwork.",
    detail:
      "Structural beam sections for building frames, mezzanines and load-bearing steelwork. Section sizes and lengths are matched to your structural drawings before dispatch.",
    image: "/images/product-beams.webp",
    alt: "Stacked steel I-beams",
  },
  {
    slug: "roofing-sheets",
    name: "Roofing Sheets",
    short: "Profiled sheeting for roof and wall cladding.",
    detail:
      "Profiled steel sheeting for roof and wall cladding. Cover width, profile and finish are confirmed against your roofing design and site programme.",
    image: "/images/product-roofing.webp",
    alt: "Stack of profiled steel roofing sheets",
  },
  {
    slug: "steel-pipes",
    name: "Steel Pipes",
    short: "Round steel pipe for structural and fabrication work.",
    detail:
      "Round steel pipe for structural, mechanical and fabrication applications. Diameter, wall thickness and length are confirmed with your order.",
    image: "/images/product-pipes.webp",
    alt: "Ends of a stacked bundle of steel pipes",
  },
];

export const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/why-us", label: "Why Us" },
  { href: "/contact", label: "Contact" },
];

export const aboutPoints = [
  {
    index: "01",
    title: "Premium quality",
    copy: "Material checked against the specification before it leaves us.",
  },
  {
    index: "02",
    title: "Reliable supply",
    copy: "Stock and scheduling planned around live site requirements.",
  },
  {
    index: "03",
    title: "Competitive pricing",
    copy: "Straightforward pricing on single orders and bulk supply.",
  },
];

export const sectors = ["Residential", "Commercial", "Infrastructure", "Industrial"];

export const processSteps = [
  {
    index: "01",
    title: "Send the requirement",
    copy: "A schedule, drawing or a simple list of material, sizes and quantities is enough to start.",
  },
  {
    index: "02",
    title: "Confirm the specification",
    copy: "We check grades, sections and lengths against what your site can actually fix.",
  },
  {
    index: "03",
    title: "Supply and follow through",
    copy: "Delivery is booked to the programme, with one point of contact until the last load lands.",
  },
];

export type Project = {
  slug: string;
  name: string;
  sector: string;
  scope: string;
  summary: string;
  image: string;
  alt: string;
};

export const projects: Project[] = [
  {
    slug: "mixed-use-frame",
    name: "Mixed-use frame",
    sector: "Commercial",
    scope: "Structural beams · reinforcement",
    summary:
      "Structural sections and reinforcement scheduled against the frame programme, released in phases as each floor was struck.",
    image: "/images/industries-skyline.webp",
    alt: "City skyline under construction at dusk",
  },
  {
    slug: "residential-blocks",
    name: "Residential blocks",
    sector: "Residential",
    scope: "Reinforcement bars · mesh",
    summary:
      "Reinforcement supplied to a bar bending schedule, so bundles arrived cut and labelled for the fixing gang.",
    image: "/images/about-steel-frame.webp",
    alt: "Steel frame rising against a cool sky",
  },
  {
    slug: "warehouse-envelope",
    name: "Warehouse envelope",
    sector: "Industrial",
    scope: "Roofing sheets · purlins",
    summary:
      "Profiled sheeting delivered in cover-width order, matched to the roofing contractor's fixing sequence.",
    image: "/images/product-roofing.webp",
    alt: "Stack of profiled steel roofing sheets",
  },
  {
    slug: "services-and-drainage",
    name: "Services and drainage",
    sector: "Infrastructure",
    scope: "Steel pipes · fabrication",
    summary:
      "Pipe supplied by diameter and wall thickness, with cut lengths agreed before the fabrication shop started.",
    image: "/images/product-pipes.webp",
    alt: "Ends of a stacked bundle of steel pipes",
  },
];

export const quoteChecklist = [
  "Material grade or standard",
  "Section, diameter or profile",
  "Quantity and cut lengths",
  "Delivery location and dates",
];
