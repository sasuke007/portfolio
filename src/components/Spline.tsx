"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type SplineApp = import("@splinetool/runtime").Application;

type SplineProps = {
  /** URL of an exported `.splinecode` scene. */
  scene: string;
  className?: string;
  /**
   * CSS color for the scene background. Pass `"transparent"` to let the page
   * show through (useful when the scene sits behind other content).
   */
  backgroundColor?: string;
  /**
   * - `auto` (default): render only when the scene needs it.
   * - `continuous`: render every frame.
   * - `manual`: render only on `requestRender()`.
   */
  renderMode?: "auto" | "manual" | "continuous";
  /** Stop rendering while the canvas is scrolled out of view. Default: true. */
  pauseWhenOffscreen?: boolean;
  /**
   * Track the cursor from anywhere on the window rather than only over the
   * canvas. Needed for mouse-follow scenes when the canvas is
   * `pointer-events-none`. Default: false.
   */
  globalEvents?: boolean;
  /** Mark the canvas as decorative for assistive tech. Default: false. */
  decorative?: boolean;
};

export function Spline({
  scene,
  className,
  backgroundColor,
  renderMode = "auto",
  pauseWhenOffscreen = true,
  globalEvents = false,
  decorative = false,
}: SplineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let app: SplineApp | null = null;
    let disposed = false;
    let resizeObserver: ResizeObserver | undefined;
    let intersectionObserver: IntersectionObserver | undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Mouse-follow scenes (globalEvents) recompute their look-at only on
    // `pointermove`. While the page scrolls, the cursor holds still but the
    // scene slides on screen, so the gaze freezes until the next real mouse
    // move. Re-feed the last cursor position to Spline on scroll so the eyes
    // keep tracking it. Spline (with global events) listens for `pointermove`
    // on `window`; we re-dispatch the same screen coords, so the custom cursor
    // — already there — doesn't jump.
    let onScreen = true;
    let lastPointer: { x: number; y: number } | null = null;
    let scrollRaf = 0;
    const trackPointer = (e: PointerEvent) => {
      if (e.isTrusted) lastPointer = { x: e.clientX, y: e.clientY };
    };
    const refeedPointer = () => {
      scrollRaf = 0;
      if (!lastPointer || !onScreen) return;
      window.dispatchEvent(
        new PointerEvent("pointermove", {
          clientX: lastPointer.x,
          clientY: lastPointer.y,
          pointerType: "mouse",
          bubbles: true,
        }),
      );
    };
    const onScroll = () => {
      if (!scrollRaf) scrollRaf = requestAnimationFrame(refeedPointer);
    };
    const trackCursorWhileScrolling = globalEvents && !reduceMotion;
    if (trackCursorWhileScrolling) {
      window.addEventListener("pointermove", trackPointer, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    void (async () => {
      // Loaded lazily so the runtime stays out of the main bundle and never
      // touches `window` during SSR.
      const { Application: SplineApplication } = await import(
        "@splinetool/runtime"
      );
      if (disposed) return;

      app = new SplineApplication(canvas, { renderMode });
      await app.load(scene);
      if (disposed) {
        app.dispose();
        app = null;
        return;
      }

      if (backgroundColor) app.setBackgroundColor(backgroundColor);
      if (globalEvents) app.setGlobalEvents(true);

      // `setSize()` opts the canvas out of Spline's automatic window resizing,
      // so we drive it from the container size ourselves.
      const fit = () => {
        if (!app) return;
        app.setSize(container.clientWidth, container.clientHeight);
        app.requestRender();
      };
      fit();

      resizeObserver = new ResizeObserver(fit);
      resizeObserver.observe(container);

      if (reduceMotion) {
        // Honour the motion preference: paint one static frame, then idle.
        app.requestRender();
        app.stop();
      } else if (pauseWhenOffscreen) {
        intersectionObserver = new IntersectionObserver(
          ([entry]) => {
            onScreen = entry.isIntersecting;
            if (!app) return;
            if (entry.isIntersecting) {
              app.play();
              fit();
            } else {
              app.stop();
            }
          },
          { threshold: 0 },
        );
        intersectionObserver.observe(canvas);
      }
    })();

    return () => {
      disposed = true;
      if (trackCursorWhileScrolling) {
        if (scrollRaf) cancelAnimationFrame(scrollRaf);
        window.removeEventListener("pointermove", trackPointer);
        window.removeEventListener("scroll", onScroll);
      }
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      app?.dispose();
    };
  }, [scene, backgroundColor, renderMode, pauseWhenOffscreen, globalEvents]);

  return (
    <div
      ref={containerRef}
      aria-hidden={decorative || undefined}
      className={cn("relative h-full w-full overflow-hidden", className)}
    >
      <canvas ref={canvasRef} className="block h-full w-full" tabIndex={-1} />
    </div>
  );
}
