import { IconCloud } from "@/components/IconCloud";

export function Tools() {
  return (
    <section className="relative mx-auto max-w-(--max-width) px-6 py-24 md:py-32">
      <h2 className="mb-3 font-display font-normal text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.015em]">
        Tools of the <em className="italic">Trade</em>.
      </h2>
      <p className="mb-6 max-w-md text-sm leading-relaxed text-muted">
        The stack I reach for. Drag the cloud to spin it — tap a mark to bring it
        forward.
      </p>

      <div className="relative h-[clamp(360px,60vh,560px)] w-full">
        <IconCloud />
      </div>
    </section>
  );
}
