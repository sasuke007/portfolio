"use client";

import { useEffect, useRef } from "react";
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl";
import { cn } from "@/lib/cn";

/**
 * React/OGL port of a curved ("bending") image gallery, adapted from the Vue
 * `CircularGallery`/`BendingGallery` component.
 *
 * Differences from the original, because here it's an *ambient background* that
 * sits behind the Journal section's hover image-trail:
 *   - No wheel / drag / touch hijacking. The page owns scroll (Lenis); this just
 *     drifts on its own at `autoScrollSpeed` so the images keep flowing.
 *   - `pointer-events: none` so the hover trail (and the page) receive the input.
 *   - Resize is observed on the container (not `window`), since it lives inside a
 *     section rather than filling the viewport.
 *   - Rendering pauses while the section is offscreen (IntersectionObserver).
 */

type BendingGalleryProps = {
  images: string[];
  bend?: number;
  borderRadius?: number;
  /** Constant drift added to the scroll target each frame. */
  autoScrollSpeed?: number;
  className?: string;
};

type GL = Renderer["gl"];

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

type ScreenSize = { width: number; height: number };
type Viewport = { width: number; height: number };

class Media {
  extra = 0;
  program!: Program;
  plane!: Mesh;
  scale!: number;
  padding = 2;
  width!: number;
  widthTotal!: number;
  x!: number;
  speed = 0;
  isBefore = false;
  isAfter = false;

  constructor(
    private gl: GL,
    private geometry: Plane,
    private scene: Transform,
    private image: string,
    private index: number,
    private length: number,
    private screen: ScreenSize,
    private viewport: Viewport,
    private bend: number,
    private borderRadius: number,
  ) {
    this.createShader();
    this.createMesh();
    this.onResize();
  }

  private createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: false });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: /* glsl */ `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: /* glsl */ `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;

        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }

        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          if (d > 0.0) discard;
          gl_FragColor = vec4(color.rgb, 1.0);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * (this.index / Math.max(this.length, 1)) },
        uBorderRadius: { value: this.borderRadius },
      },
      transparent: true,
    });

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  }

  private createMesh() {
    this.plane = new Mesh(this.gl, { geometry: this.geometry, program: this.program });
    this.plane.setParent(this.scene);
  }

  update(scroll: { current: number; last: number }, direction: "right" | "left") {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const H = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);
      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
      }
    }

    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    if (direction === "right" && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === "left" && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }

  onResize(opts: { screen?: ScreenSize; viewport?: Viewport } = {}) {
    if (opts.screen) this.screen = opts.screen;
    if (opts.viewport) this.viewport = opts.viewport;
    this.scale = this.screen.height / 1500;
    this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width;
    this.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

class Gallery {
  private renderer: Renderer;
  private gl: GL;
  private camera: Camera;
  private scene: Transform;
  private planeGeometry: Plane;
  private medias: Media[] = [];
  private screen: ScreenSize = { width: 0, height: 0 };
  private viewport: Viewport = { width: 0, height: 0 };
  private scroll = { ease: 0.05, current: 0, target: 0, last: 0 };
  private raf = 0;
  private running = true;
  private autoScrollSpeed: number;
  private resizeObserver: ResizeObserver;
  private intersectionObserver: IntersectionObserver;
  private boundUpdate: () => void;

  constructor(
    private container: HTMLElement,
    config: {
      images: string[];
      bend: number;
      borderRadius: number;
      autoScrollSpeed: number;
    },
  ) {
    this.autoScrollSpeed = config.autoScrollSpeed;
    this.boundUpdate = this.update.bind(this);

    this.renderer = new Renderer({
      alpha: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas as HTMLCanvasElement);

    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;

    this.scene = new Transform();
    this.planeGeometry = new Plane(this.gl, { heightSegments: 50, widthSegments: 100 });

    this.onResize();
    this.createMedias(config.images, config.bend, config.borderRadius);

    this.resizeObserver = new ResizeObserver(() => this.onResize());
    this.resizeObserver.observe(this.container);

    // Only burn GPU while the gallery is actually on screen.
    this.intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        if (visible && !this.running) {
          this.running = true;
          this.raf = requestAnimationFrame(this.boundUpdate);
        } else if (!visible) {
          this.running = false;
          cancelAnimationFrame(this.raf);
        }
      },
      { threshold: 0 },
    );
    this.intersectionObserver.observe(this.container);

    this.raf = requestAnimationFrame(this.boundUpdate);
  }

  private createMedias(images: string[], bend: number, borderRadius: number) {
    // Duplicate so the loop has no visible seam.
    const loop = images.concat(images);
    this.medias = loop.map(
      (image, index) =>
        new Media(
          this.gl,
          this.planeGeometry,
          this.scene,
          image,
          index,
          loop.length,
          this.screen,
          this.viewport,
          bend,
          borderRadius,
        ),
    );
  }

  private onResize() {
    this.screen = {
      width: this.container.clientWidth || 1,
      height: this.container.clientHeight || 1,
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect: this.screen.width / this.screen.height });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    this.medias.forEach((m) => m.onResize({ screen: this.screen, viewport: this.viewport }));
  }

  private update() {
    this.scroll.target += this.autoScrollSpeed;
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? "right" : "left";
    this.medias.forEach((m) => m.update(this.scroll, direction));
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    if (this.running) this.raf = requestAnimationFrame(this.boundUpdate);
  }

  destroy() {
    this.running = false;
    cancelAnimationFrame(this.raf);
    this.resizeObserver.disconnect();
    this.intersectionObserver.disconnect();
    const canvas = this.gl.canvas as HTMLCanvasElement;
    canvas.parentNode?.removeChild(canvas);
    this.gl.getExtension("WEBGL_lose_context")?.loseContext();
  }
}

export function BendingGallery({
  images,
  bend = 2,
  borderRadius = 0.1,
  autoScrollSpeed = 0.025,
  className,
}: BendingGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const gallery = new Gallery(container, { images, bend, borderRadius, autoScrollSpeed });
    return () => gallery.destroy();
  }, [images, bend, borderRadius, autoScrollSpeed]);

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none h-full w-full overflow-hidden", className)}
    />
  );
}
