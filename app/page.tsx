import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ProductsSection } from "@/components/ProductsSection";
import { Journal } from "@/components/Journal";
import { Tools } from "@/components/Tools";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ProductsSection />
      <Journal />
      <Tools />
      <Contact />
    </>
  );
}
