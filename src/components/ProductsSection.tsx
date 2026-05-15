import { ProductsTimeline } from "./ProductsTimeline";

export function ProductsSection() {
  return (
    <section
      id="products"
      className="relative mx-auto max-w-(--max-width) px-6 py-16 md:py-24"
    >
      <h2 className="m-0 max-w-3xl font-display font-normal text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.1] tracking-[-0.015em]">
        Built to be{" "}
        <em className="italic font-normal text-accent">used</em>, not just
        seen.
      </h2>

      <ProductsTimeline />
    </section>
  );
}
