"use client";

import { useEffect, useRef, useState } from "react";
import { tools } from "@/content";
import { toolLogoPaths, TOOL_LOGO_VIEWBOX } from "@/lib/tool-logos";
import { gsap, registerGsap } from "@/lib/gsap";

const TAU = Math.PI * 2;

// Theme tokens, mirrored here so the canvas can paint them.
const INK = "#1a1a1a";

const AUTO_SPIN = 0.0016; // idle rotation per frame (rad), around the Y axis
const FRICTION = 0.94; // momentum decay after a drag
const DRAG_SPEED = 0.006; // radians of rotation per px dragged
const CLICK_THRESHOLD = 6; // px of travel below which a pointer-up is a "tap"
const FOCUS_DURATION = 0.85; // seconds to ease a tapped mark to the front

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function clamp(v: number, min: number, max: number) {
  return v < min ? min : v > max ? max : v;
}

type Node = {
  name: string;
  // Unit-sphere position (Fibonacci lattice).
  px: number;
  py: number;
  pz: number;
  path: Path2D;
  // Latest projected screen geometry, refreshed every frame (for hit-testing).
  sx: number;
  sy: number;
  r: number;
  depth: number; // 0 = back of sphere, 1 = front
};

export function IconCloud() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    registerGsap();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // ---- build nodes on a Fibonacci sphere ------------------------------
    const count = tools.length;
    const offset = 2 / count;
    const increment = Math.PI * (3 - Math.sqrt(5));
    const nodes: Node[] = tools.map((tool, i) => {
      const y = i * offset - 1 + offset / 2;
      const r = Math.sqrt(1 - y * y);
      const phi = i * increment;
      return {
        name: tool.name,
        px: Math.cos(phi) * r,
        py: y,
        pz: Math.sin(phi) * r,
        path: new Path2D(toolLogoPaths[tool.logo] ?? toolLogoPaths.pipeline),
        sx: 0,
        sy: 0,
        r: 0,
        depth: 0,
      };
    });

    // ---- mutable interaction state --------------------------------------
    let w = 0;
    let h = 0;
    let dpr = 1;
    let rotX = -0.15;
    let rotY = 0;
    let velX = 0;
    let velY = reduceMotion ? 0 : AUTO_SPIN;
    let hovered = -1;

    // Hover highlight that eases in/out, so the glow fades smoothly when a
    // spinning icon drifts out from under a stationary cursor.
    let glowNode = -1;
    let glowStrength = 0;

    // Last known pointer position in canvas-local space (re-picked every
    // frame, not just on move, because the sphere keeps rotating).
    let ptrX = -1;
    let ptrY = -1;
    let ptrInside = false;

    let down = false;
    let dragging = false;
    let travel = 0;
    let lastX = 0;
    let lastY = 0;

    let focus: {
      fromX: number;
      fromY: number;
      toX: number;
      toY: number;
      start: number;
    } | null = null;

    // ---- sizing ---------------------------------------------------------
    function resize() {
      const rect = root!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(root);
    resize();

    // Project a unit vector through the current rotation (Y then X).
    function project(n: Node, R: number) {
      const cy = Math.cos(rotY);
      const sy = Math.sin(rotY);
      const cx = Math.cos(rotX);
      const sx = Math.sin(rotX);
      const x = n.px * R;
      const y = n.py * R;
      const z = n.pz * R;
      const x1 = x * cy + z * sy;
      const z1 = -x * sy + z * cy;
      const y2 = y * cx - z1 * sx;
      const z2 = y * sx + z1 * cx;
      return { x: x1, y: y2, z: z2 };
    }

    function paintNode(n: Node, faceAlpha: number, lift: number) {
      ctx!.save();
      ctx!.globalAlpha = faceAlpha;

      // Ink glyph (no chip disc/ring) with a soft drop shadow so each icon
      // reads as lifted off the page — a 3D "popping out" look. Canvas
      // shadows ignore the current transform, so offset/blur are set in
      // device pixels (× dpr) rather than the g-scaled glyph space. Closer
      // icons (and the hovered one) cast a larger, darker shadow.
      const g = (n.r * 1.2) / TOOL_LOGO_VIEWBOX;
      const d = n.depth;
      const lifted = 1 + lift * 0.5;
      ctx!.shadowColor = `rgba(0, 0, 0, ${0.18 + d * 0.16})`;
      ctx!.shadowBlur = (8 + d * 9) * dpr;
      ctx!.shadowOffsetX = 0;
      ctx!.shadowOffsetY = (5 + d * 7) * lifted * dpr;
      ctx!.translate(
        n.sx - (TOOL_LOGO_VIEWBOX / 2) * g,
        n.sy - (TOOL_LOGO_VIEWBOX / 2) * g,
      );
      ctx!.scale(g, g);
      ctx!.fillStyle = INK;
      ctx!.fill(n.path);
      ctx!.restore();
    }

    // ---- per-frame render (driven by gsap.ticker) -----------------------
    function frame(time: number) {
      // advance rotation
      if (focus) {
        const t = clamp((time - focus.start) / FOCUS_DURATION, 0, 1);
        const e = easeOutCubic(t);
        rotX = focus.fromX + (focus.toX - focus.fromX) * e;
        rotY = focus.fromY + (focus.toY - focus.fromY) * e;
        if (t >= 1) {
          focus = null;
          velX = 0;
          velY = reduceMotion ? 0 : AUTO_SPIN;
        }
      } else if (!dragging) {
        rotX += velX;
        rotY += velY;
        velX *= FRICTION;
        if (reduceMotion) {
          velY *= FRICTION;
        } else {
          velY += (AUTO_SPIN - velY) * 0.03;
        }
        // keep the poles from flipping over
        if (rotX > 1.05) {
          rotX = 1.05;
          velX = 0;
        } else if (rotX < -1.05) {
          rotX = -1.05;
          velX = 0;
        }
      }

      const R = Math.min(w, h) * 0.4;
      const ox = w / 2;
      const oy = h / 2;

      ctx!.clearRect(0, 0, w, h);

      // project + sort back-to-front
      const order = nodes.map((n, i) => {
        const p = project(n, R);
        const depth = (p.z + R) / (2 * R); // 0 = back, 1 = front
        n.sx = ox + p.x;
        n.sy = oy + p.y;
        n.r = (0.46 + depth * 0.72) * 38;
        n.depth = depth;
        return { i, z: p.z };
      });
      order.sort((a, b) => a.z - b.z);

      // Re-pick under the (possibly stationary) pointer every frame, so the
      // highlight releases as a spinning icon drifts out from under it.
      if (ptrInside && !dragging) {
        const hit = pick(ptrX, ptrY);
        if (hit !== hovered) {
          hovered = hit;
          setActive(hit >= 0 ? nodes[hit].name : null);
          canvas!.style.cursor = hit >= 0 ? "pointer" : "grab";
        }
      }

      // Ease the highlight in toward the hovered icon and out when released.
      if (hovered >= 0) glowNode = hovered;
      const target = hovered >= 0 ? 1 : 0;
      glowStrength += (target - glowStrength) * 0.16;
      if (glowStrength < 0.01 && target === 0) {
        glowStrength = 0;
        glowNode = -1;
      }
      const topNode = glowStrength > 0.001 ? glowNode : -1;

      for (const item of order) {
        if (item.i === topNode) continue; // drawn last, on top
        const n = nodes[item.i];
        const alpha = clamp(0.3 + n.depth * 0.85, 0.3, 1);
        paintNode(n, alpha, 0);
      }
      if (topNode >= 0) {
        const n = nodes[topNode];
        n.r *= 1 + 0.12 * glowStrength;
        paintNode(n, 1, glowStrength);
      }
    }

    // ---- pointer interaction --------------------------------------------
    function localPoint(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    // Topmost chip under a local point, or -1.
    function pick(lx: number, ly: number) {
      let best = -1;
      let bestZ = -Infinity;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const dx = lx - n.sx;
        const dy = ly - n.sy;
        if (dx * dx + dy * dy <= n.r * n.r) {
          // approximate depth ordering via projected radius
          if (n.r > bestZ) {
            bestZ = n.r;
            best = i;
          }
        }
      }
      return best;
    }

    function onPointerDown(e: PointerEvent) {
      down = true;
      dragging = false;
      travel = 0;
      lastX = e.clientX;
      lastY = e.clientY;
      focus = null;
      canvas!.setPointerCapture(e.pointerId);
    }

    function onPointerMove(e: PointerEvent) {
      const { x, y } = localPoint(e);
      ptrX = x;
      ptrY = y;
      ptrInside = true;

      if (down) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        lastX = e.clientX;
        lastY = e.clientY;
        travel += Math.abs(dx) + Math.abs(dy);
        if (travel > CLICK_THRESHOLD) dragging = true;
        if (dragging) {
          rotY += dx * DRAG_SPEED;
          rotX = clamp(rotX + dy * DRAG_SPEED, -1.05, 1.05);
          velX = dy * DRAG_SPEED;
          velY = dx * DRAG_SPEED;
        }
      }
      // Hover hit-testing runs in frame() so it tracks the spinning sphere.
    }

    function focusNode(i: number, time: number) {
      const n = nodes[i];
      const rho = Math.sqrt(n.px * n.px + n.pz * n.pz);
      let toY = Math.atan2(-n.px, n.pz);
      let toX = Math.atan2(n.py, rho);
      // choose the nearest equivalent angle so it eases the short way
      while (toY - rotY > Math.PI) toY -= TAU;
      while (toY - rotY < -Math.PI) toY += TAU;
      toX = clamp(toX, -1.05, 1.05);
      while (toX - rotX > Math.PI) toX -= TAU;
      while (toX - rotX < -Math.PI) toX += TAU;
      focus = { fromX: rotX, fromY: rotY, toX, toY, start: time };
    }

    function onPointerUp(e: PointerEvent) {
      if (down && !dragging) {
        const { x, y } = localPoint(e);
        const hit = pick(x, y);
        if (hit >= 0) {
          setActive(nodes[hit].name);
          focusNode(hit, gsap.ticker.time);
        }
      }
      down = false;
      dragging = false;
      if (canvas!.hasPointerCapture(e.pointerId))
        canvas!.releasePointerCapture(e.pointerId);
    }

    function onPointerLeave() {
      down = false;
      dragging = false;
      ptrInside = false;
      if (hovered !== -1) {
        hovered = -1;
        setActive(null);
        canvas!.style.cursor = "grab";
      }
    }

    canvas.style.cursor = "grab";
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerLeave);

    // ---- run loop, paused when offscreen / tab hidden -------------------
    let running = false;
    function start() {
      if (running) return;
      running = true;
      gsap.ticker.add(frame);
    }
    function stop() {
      if (!running) return;
      running = false;
      gsap.ticker.remove(frame);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) start();
        else stop();
      },
      { threshold: 0.05 },
    );
    io.observe(root);

    function onVisibility() {
      if (document.hidden) stop();
      else io.observe(root!);
    }
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative h-full w-full select-none">
      <canvas
        ref={canvasRef}
        className="h-full w-full touch-pan-y"
        role="img"
        aria-label="Interactive sphere of the tools and technologies I work with"
      />

      {/* Focused / hovered tool name — centered in the sphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span
          className={`font-display text-[clamp(1.75rem,3.5vw,2.75rem)] italic leading-none tracking-display text-accent transition-all duration-300 ease-out [text-shadow:0_2px_24px_rgba(250,250,250,0.95)] ${
            active ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
        >
          {active ?? " "}
        </span>
      </div>

      {/* Accessible, non-visual fallback list */}
      <ul className="sr-only">
        {tools.map((t) => (
          <li key={t.name}>{t.name}</li>
        ))}
      </ul>
    </div>
  );
}
