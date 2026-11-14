import { Hero } from "@/components/hero";
import {
  About,
  ContactBand,
  Footer,
  Industries,
  Products,
  WhyUs,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <main id="main">
        <Hero />
        <Products />
        <About />
        <WhyUs />
        <Industries />
        <ContactBand />
      </main>
      <Footer />
    </>
  );
}
