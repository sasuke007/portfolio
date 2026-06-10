/**
 * Minimal 2D verlet rope simulation (position-based dynamics).
 *
 * A chain of points integrated with Störmer–Verlet, held together by
 * iterative distance constraints. Point 0 is pinned to an anchor; the tail
 * point carries the hanging pill (lower constraint weight → reads as heavier).
 * `segLen` is the per-segment rest length — animating it from ~0 to its
 * target is what makes the rope "unspool" on open and wind back on close.
 */

export type RopePoint = {
  x: number;
  y: number;
  px: number;
  py: number;
  /** Constraint weight: 0 = immovable, lower = heavier. */
  w: number;
};

export class VerletRope {
  readonly pts: RopePoint[];
  /** Current per-segment rest length (tweened externally). */
  segLen: number;
  gravity = 2600; // px/s²
  damping = 0.985;
  iterations = 14;
  /**
   * Taut mode enforces segment length both ways (rod-like), keeping the
   * chain straight while it unrolls/retracts — without it the undeployed
   * slack free-falls as a curling blob. Free-flowing rope mode (one-sided
   * constraints) takes over once deployed.
   */
  taut = true;

  constructor(n: number, anchorX: number, anchorY: number) {
    this.segLen = 1;
    this.pts = Array.from({ length: n }, (_, i) => ({
      // Small offsets so constraints have a direction to resolve along; the
      // alternating x breaks collinearity (no stable vertical folds) and
      // gives the deploy a slight organic curl rather than a stiff rod.
      x: anchorX + (i % 2 ? 0.4 : -0.4),
      y: anchorY + i * 0.5,
      px: anchorX + (i % 2 ? 0.4 : -0.4),
      py: anchorY + i * 0.5,
      w: i === n - 1 ? 0.3 : 1,
    }));
  }

  get tail(): RopePoint {
    return this.pts[this.pts.length - 1];
  }

  setAnchor(x: number, y: number) {
    const p = this.pts[0];
    p.x = x;
    p.y = y;
    p.px = x;
    p.py = y;
  }

  /**
   * Advance the simulation by `dt` seconds.
   * `pin` (drag) locks any point to a position while keeping its velocity
   * history, so releasing it carries momentum. `pointer` drags nearby rope
   * points along with the cursor's motion (velocity-based, so a resting
   * cursor leaves the rope hanging undisturbed).
   */
  step(
    dt: number,
    pin: { i: number; x: number; y: number } | null,
    pointer: { x: number; y: number; vx: number; vy: number } | null,
  ) {
    const pts = this.pts;
    const last = pts.length - 1;

    for (let i = 1; i <= last; i++) {
      if (pin && i === pin.i) continue;
      const p = pts[i];
      const vx = (p.x - p.px) * this.damping;
      const vy = (p.y - p.py) * this.damping;
      p.px = p.x;
      p.py = p.y;
      p.x += vx;
      p.y += vy + this.gravity * dt * dt;

      if (pointer && (pointer.vx !== 0 || pointer.vy !== 0)) {
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        const R = 56;
        if (d2 < R * R) {
          const falloff = 1 - Math.sqrt(d2) / R;
          p.x += pointer.vx * 0.1 * falloff;
          p.y += pointer.vy * 0.1 * falloff;
        }
      }
    }

    if (pin && pin.i > 0) {
      const t = pts[pin.i];
      t.px = t.x;
      t.py = t.y;
      t.x = pin.x;
      t.y = pin.y;
    }

    for (let k = 0; k < this.iterations; k++) {
      for (let i = 0; i < last; i++) {
        const a = pts[i];
        const b = pts[i + 1];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy) || 1e-6;
        // One-sided constraint: a rope resists stretching, not compression.
        // Slack segments are left to gravity, so the chain can never lock
        // into a folded state. (Taut mode corrects both ways instead.)
        if (dist <= this.segLen && !this.taut) continue;
        const diff = (dist - this.segLen) / dist;
        const wa = i === 0 || (pin && i === pin.i) ? 0 : a.w;
        const wb = pin && i + 1 === pin.i ? 0 : b.w;
        const sum = wa + wb;
        if (sum === 0) continue;
        a.x += dx * diff * (wa / sum);
        a.y += dy * diff * (wa / sum);
        b.x -= dx * diff * (wb / sum);
        b.y -= dy * diff * (wb / sum);
      }
    }
  }
}
