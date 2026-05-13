"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    registerGsap();

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    document.body.classList.add("cursor-custom");

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      document.body.classList.remove("cursor-custom");
    };
  }, []);

  return <>{children}</>;
}
