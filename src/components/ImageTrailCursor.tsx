"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import {
  variantMap,
  type ImageTrailInstance,
  type VariantType,
} from "./image-trail/trail-variants";

/**
 * React port of Inspira UI's `ImageTrailCursor.vue`. Renders the pooled image
 * tiles and instantiates the matching variant class from `trail-variants.ts`,
 * tearing it down on unmount / variant change (the `useGSAP` cleanup replaces
 * Vue's `onBeforeUnmount` + `watch(variant)`).
 */
type ImageTrailCursorProps = {
  images: string[];
  variant?: VariantType;
  className?: string;
};

export function ImageTrailCursor({
  images,
  variant = "type1",
  className,
}: ImageTrailCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const container = containerRef.current;
      if (!container) return;

      const Variant = variantMap[variant] ?? variantMap.type1;
      let instance: ImageTrailInstance | null = new Variant(container);

      return () => {
        instance?.destroy();
        instance = null;
      };
    },
    { scope: containerRef, dependencies: [variant, images] },
  );

  return (
    <div
      ref={containerRef}
      data-image-trail
      className={cn(
        "relative z-100 h-full w-full overflow-visible rounded-lg bg-transparent",
        className,
      )}
    >
      {images.map((image, i) => (
        <div
          key={variant + i}
          className="content__img absolute top-0 left-0 aspect-[1.1] w-[190px] overflow-hidden rounded-[15px] opacity-0 will-change-[transform,filter]"
        >
          <div
            className="content__img-inner absolute top-[-10px] left-[-10px] h-[calc(100%+20px)] w-[calc(100%+20px)] bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
        </div>
      ))}
    </div>
  );
}
