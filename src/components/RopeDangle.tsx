"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { createPortal } from "react-dom";
import { gsap } from "@/lib/gsap";
import { VerletRope, type RopePoint } from "@/lib/verlet-rope";

const PILL_THICKNESS = 32; // matches the navbar pill height (h-8)
const POINT_SPACING = 11; // px of rope per sim point
const DRAG_THRESHOLD = 6; // px of movement before a press becomes a drag

/**
 * The expanded pill itself, dropped from `anchorEl` as a free-flowing rope.
 *
 * The verlet chain is rendered as a single thick round-capped SVG stroke —
 * that stroke IS the pill. The label rides a textPath along the same path so
 * it bends with every fold, and the icon circle sits on the free end. All
 * frame updates are written imperatively from a gsap.ticker callback; React
 * renders once per open/close, never per frame.
 */
export function RopeDangle({
  open,
  anchorEl,
  length,
  href,
  ariaLabel,
  text,
  iconSrc,
  iconSize = 14,
  iconMuted = false,
  onHoverChangeAction,
}: {
  open: boolean;
  anchorEl: HTMLElement | null;
  /** Unrolled pill length in px (the old expanded width). */
  length: number;
  href: string;
  ariaLabel: string;
  /** Label that flows along the ribbon. */
  text: string;
  iconSrc: string;
  iconSize?: number;
  iconMuted?: boolean;
  /** Keeps the parent's hover state alive while the cursor is on the pill. */
  onHoverChangeAction: (hovering: boolean) => void;
}) {
  const [mounted, setMounted] = useState(false);
  const pathId = useMemo(
    () => `rope-pill-${Math.random().toString(36).slice(2, 9)}`,
    [],
  );
  const simRef = useRef<VerletRope | null>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const iconRef = useRef<SVGGElement>(null);
  const openRef = useRef(open);
  const pointerRef = useRef<{
    x: number;
    y: number;
    vx: number;
    vy: number;
  } | null>(null);
  const dragRef = useRef<{
    index: number;
    grabDx: number;
    grabDy: number;
    startX: number;
    startY: number;
    dragging: boolean;
    pin: { i: number; x: number; y: number } | null;
  } | null>(null);
  const hoverChangeRef = useRef(onHoverChangeAction);
  hoverChangeRef.current = onHoverChangeAction;
  // After a drag release the pill swings away from the cursor and fires
  // mouseleave — hold it open through the swing so the payoff is visible.
  const swingUntilRef = useRef(0);
  const pillHoveredRef = useRef(false);

  openRef.current = open;
  if (open && !mounted) setMounted(true);

  // The icon cap occupies the last half-thickness of the ribbon.
  const points = Math.max(12, Math.round(length / POINT_SPACING));
  const targetSegLen = (length - PILL_THICKNESS / 2) / (points - 1);

  // Simulation lifecycle — one ticker callback while mounted.
  // Declared before the unspool effect so the sim exists when it runs.
  useEffect(() => {
    if (!mounted || !anchorEl) return;

    let anchor = { x: 0, y: 0 };
    const measure = () => {
      const r = anchorEl.getBoundingClientRect();
      anchor = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    };
    measure();

    const sim = new VerletRope(points, anchor.x, anchor.y);
    simRef.current = sim;

    const onPointerMove = (e: PointerEvent) => {
      const prev = pointerRef.current;
      // Accumulate movement between ticks; the tick consumes and resets it.
      pointerRef.current = {
        x: e.clientX,
        y: e.clientY,
        vx: (prev?.vx ?? 0) + (prev ? e.clientX - prev.x : 0),
        vy: (prev?.vy ?? 0) + (prev ? e.clientY - prev.y : 0),
      };
      const drag = dragRef.current;
      if (drag) {
        if (
          !drag.dragging &&
          Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY) >
            DRAG_THRESHOLD
        ) {
          drag.dragging = true;
        }
        if (drag.dragging) {
          drag.pin = {
            i: drag.index,
            x: e.clientX - drag.grabDx,
            y: e.clientY - drag.grabDy,
          };
        }
      }
    };

    const tick = (_time: number, deltaMs: number) => {
      sim.setAnchor(anchor.x, anchor.y);
      const dt = Math.min(deltaMs / 1000, 1 / 30) / 2;
      const pin = dragRef.current?.pin ?? null;
      const pointer = pointerRef.current;
      sim.step(dt, pin, pointer);
      sim.step(dt, pin, pointer);
      if (pointer) {
        pointer.vx = 0;
        pointer.vy = 0;
      }

      if (pathRef.current) {
        pathRef.current.setAttribute("d", buildPath(sim.pts));
      }
      if (iconRef.current) {
        const tail = sim.tail;
        iconRef.current.setAttribute(
          "transform",
          `translate(${tail.x}, ${tail.y})`,
        );
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", measure);
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", measure);
      simRef.current = null;
      dragRef.current = null;
      hoverChangeRef.current(false);
    };
  }, [mounted, anchorEl, points]);

  // Unroll on open, wind back up on close (then unmount).
  useEffect(() => {
    const sim = simRef.current;
    if (!mounted || !sim) return;
    // back.out overshoots the rest length then returns — the rope drops past
    // its full extent and recoils back up before settling, like going taut.
    // Taut mode keeps the chain straight for the whole deploy (and the wind
    // back up); free-flowing rope constraints take over once settled.
    sim.taut = true;
    const tween = gsap.to(sim, {
      segLen: open ? targetSegLen : 0.5,
      // The wind-up takes its time — a hurried retract reads as the pill
      // being yanked away rather than reeled back in.
      duration: open ? 0.85 : 0.8,
      ease: open ? "back.out(2.2)" : "power2.inOut",
      onComplete: () => {
        if (openRef.current) sim.taut = false;
        else setMounted(false);
      },
    });
    return () => {
      tween.kill();
    };
  }, [open, mounted, targetSegLen]);

  if (!mounted || typeof document === "undefined") return null;

  const onPointerDown = (e: ReactPointerEvent<HTMLAnchorElement>) => {
    const sim = simRef.current;
    if (!sim) return;
    // Grab the nearest rope point — the ribbon can be held anywhere.
    let index = 1;
    let best = Infinity;
    for (let i = 1; i < sim.pts.length; i++) {
      const d =
        (sim.pts[i].x - e.clientX) ** 2 + (sim.pts[i].y - e.clientY) ** 2;
      if (d < best) {
        best = d;
        index = i;
      }
    }
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      index,
      grabDx: e.clientX - sim.pts[index].x,
      grabDy: e.clientY - sim.pts[index].y,
      startX: e.clientX,
      startY: e.clientY,
      dragging: false,
      pin: null,
    };
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLAnchorElement>) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    // Cleared in onClick (which fires after pointerup) so a drag can still
    // suppress navigation; cleared here too for drags ending off-element.
    if (dragRef.current && !dragRef.current.dragging) {
      dragRef.current = null;
      return;
    }
    if (dragRef.current) {
      dragRef.current.pin = null;
      const SWING_MS = 1400;
      swingUntilRef.current = performance.now() + SWING_MS;
      window.setTimeout(() => {
        if (!pillHoveredRef.current) hoverChangeRef.current(false);
      }, SWING_MS + 50);
    }
  };

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (dragRef.current?.dragging) {
      e.preventDefault();
      e.stopPropagation();
    }
    dragRef.current = null;
  };

  return createPortal(
    <svg
      data-rope-portal
      className="pointer-events-none fixed inset-0 z-[60] h-full w-full"
    >
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={ariaLabel}
        draggable={false}
        onMouseEnter={() => {
          pillHoveredRef.current = true;
          onHoverChangeAction(true);
        }}
        onMouseLeave={() => {
          pillHoveredRef.current = false;
          if (performance.now() < swingUntilRef.current) return;
          onHoverChangeAction(false);
        }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onClick={onClick}
        className="cursor-grab select-none active:cursor-grabbing"
        style={{ pointerEvents: open ? "auto" : "none" }}
      >
        {/* The ribbon body — a thick round stroke along the simulated rope. */}
        <path
          ref={pathRef}
          id={pathId}
          fill="none"
          stroke="var(--color-text)"
          strokeWidth={PILL_THICKNESS}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Label flowing along the ribbon. */}
        <text
          className="font-body"
          fontSize="12"
          fill="var(--color-bg)"
          fillOpacity="0.95"
          dominantBaseline="middle"
        >
          <textPath href={`#${pathId}`} startOffset="20">
            {text}
          </textPath>
        </text>
        {/* Icon circle riding the free end. */}
        <g ref={iconRef}>
          <circle
            r="14"
            fill="var(--color-bg)"
            fillOpacity={iconMuted ? 0.55 : 1}
          />
          <image
            href={iconSrc}
            width={iconSize}
            height={iconSize}
            x={-iconSize / 2}
            y={-iconSize / 2}
          />
        </g>
      </a>
    </svg>,
    document.body,
  );
}

/** Catmull-Rom-ish smoothing: quadratics through segment midpoints. */
function buildPath(pts: readonly RopePoint[]): string {
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i].x + pts[i + 1].x) / 2;
    const my = (pts[i].y + pts[i + 1].y) / 2;
    d += ` Q ${pts[i].x} ${pts[i].y} ${mx} ${my}`;
  }
  const last = pts[pts.length - 1];
  d += ` L ${last.x} ${last.y}`;
  return d;
}
