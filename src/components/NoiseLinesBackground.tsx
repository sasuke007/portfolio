"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  scale?: number;
  speed?: number;
  distortScale?: number;
  distortIntensity?: number;
  cursorIntensity?: number;
  cursorScale?: number;
  cursorBounce?: number;
  lineColor?: string;
  thicknessPx?: number;
};

const SIMPLEX_GLSL = `
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0,0.5,1.0,2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

function hexToRgb01(hex: string): [number, number, number] {
  const m = hex.replace("#", "");
  const r = parseInt(m.slice(0, 2), 16) / 255;
  const g = parseInt(m.slice(2, 4), 16) / 255;
  const b = parseInt(m.slice(4, 6), 16) / 255;
  return [r, g, b];
}

export function NoiseLinesBackground({
  className,
  scale = 2.2,
  speed = 0.1,
  distortScale = 1.0,
  distortIntensity = 0.5,
  cursorIntensity = 0,
  cursorScale = 3.0,
  cursorBounce = -0.75,
  lineColor = "#CBCBB9",
  thicknessPx = 1.5,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    let rafId = 0;

    const params: WebGLContextAttributes = {
      alpha: true,
      depth: false,
      stencil: false,
      antialias: false,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
    };
    const gl =
      (canvas.getContext("webgl2", params) as WebGL2RenderingContext | null) ||
      (canvas.getContext("webgl", params) as WebGL2RenderingContext | null);
    if (!gl) return;

    const lineColorRGB = hexToRgb01(lineColor);

    // ── Shader plumbing ────────────────────────────────────────────
    function compile(type: number, src: string): WebGLShader | null {
      const sh = gl!.createShader(type);
      if (!sh) return null;
      gl!.shaderSource(sh, src);
      gl!.compileShader(sh);
      return sh;
    }
    function link(
      vsSrc: string,
      fsSrc: string,
    ): { prog: WebGLProgram; uniforms: Record<string, WebGLUniformLocation | null> } | null {
      const vs = compile(gl!.VERTEX_SHADER, vsSrc);
      const fs = compile(gl!.FRAGMENT_SHADER, fsSrc);
      if (!vs || !fs) return null;
      const prog = gl!.createProgram();
      if (!prog) return null;
      gl!.attachShader(prog, vs);
      gl!.attachShader(prog, fs);
      gl!.linkProgram(prog);
      const uniforms: Record<string, WebGLUniformLocation | null> = {};
      const count = gl!.getProgramParameter(prog, gl!.ACTIVE_UNIFORMS);
      for (let i = 0; i < count; i++) {
        const info = gl!.getActiveUniform(prog, i);
        if (info) {
          uniforms[info.name] = gl!.getUniformLocation(prog, info.name);
        }
      }
      return { prog, uniforms };
    }

    // ── Shaders ────────────────────────────────────────────────────
    const baseVS = `
      precision highp float;
      attribute vec2 aPos;
      varying vec2 vUv;
      void main () {
        vUv = aPos * 0.5 + 0.5;
        gl_Position = vec4(aPos, 0.0, 1.0);
      }
    `;

    const noiseFS = `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;
      uniform float uAspect;
      uniform vec2 uMouse;
      uniform float uMousePace;
      uniform float uScale;
      uniform float uSpeed;
      uniform float uDistortScale;
      uniform float uDistortIntensity;
      uniform float uCursorIntensity;
      uniform float uCursorScale;
      uniform float uCursorBounce;
      ${SIMPLEX_GLSL}
      void main () {
        vec2 uv = vUv;
        uv.x *= uAspect;

        float cursor = clamp(1.0 - distance(uMouse, vUv) * uCursorScale, uCursorBounce, 1.0);
        cursor *= uMousePace;

        float noiseDistort = 0.5 + snoise(vec3(uv * uDistortScale, uTime * uSpeed * 0.1)) * 0.5;

        vec2 warped = uv
                    + vec2(cursor * uCursorIntensity)
                    + vec2(noiseDistort * uDistortIntensity);
        float noiseFinal = 0.5 + snoise(vec3(warped * uScale, uTime * uSpeed)) * 0.5;

        float noiseBase = step(0.5, noiseFinal);
        gl_FragColor = vec4(noiseBase, noiseFinal, 0.0, 1.0);
      }
    `;

    const compositionFS = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D tNoise;
      uniform vec2 uThickness;
      uniform vec3 uOutlineColor;
      void main () {
        vec4 c = texture2D(tNoise, vUv);
        vec4 r = texture2D(tNoise, vUv + vec2(uThickness.x, 0.0));
        vec4 l = texture2D(tNoise, vUv - vec2(uThickness.x, 0.0));
        vec4 t = texture2D(tNoise, vUv + vec2(0.0, uThickness.y));
        vec4 b = texture2D(tNoise, vUv - vec2(0.0, uThickness.y));
        float diff = abs(r.r - c.r) + abs(l.r - c.r) + abs(t.r - c.r) + abs(b.r - c.r);
        if (diff > 0.0) {
          gl_FragColor = vec4(uOutlineColor, 1.0);
        } else {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      }
    `;

    const noise = link(baseVS, noiseFS);
    const comp = link(baseVS, compositionFS);
    if (!noise || !comp) return;

    // ── Geometry (single fullscreen quad shared by both programs) ──
    const quadVBO = gl.createBuffer();
    const quadIBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadVBO);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]),
      gl.STATIC_DRAW,
    );
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, quadIBO);
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array([0, 1, 2, 0, 2, 3]),
      gl.STATIC_DRAW,
    );

    function bindQuad(prog: WebGLProgram) {
      gl!.bindBuffer(gl!.ARRAY_BUFFER, quadVBO);
      gl!.bindBuffer(gl!.ELEMENT_ARRAY_BUFFER, quadIBO);
      const loc = gl!.getAttribLocation(prog, "aPos");
      gl!.enableVertexAttribArray(loc);
      gl!.vertexAttribPointer(loc, 2, gl!.FLOAT, false, 0, 0);
    }

    // ── FBO for noise pass ─────────────────────────────────────────
    let fbo: WebGLFramebuffer | null = null;
    let fboTex: WebGLTexture | null = null;
    let fboW = 0;
    let fboH = 0;

    function destroyFBO() {
      if (fbo) gl!.deleteFramebuffer(fbo);
      if (fboTex) gl!.deleteTexture(fboTex);
      fbo = null;
      fboTex = null;
    }

    function ensureFBO(w: number, h: number) {
      if (fbo && fboW === w && fboH === h) return;
      destroyFBO();
      fboTex = gl!.createTexture();
      gl!.bindTexture(gl!.TEXTURE_2D, fboTex);
      gl!.texImage2D(
        gl!.TEXTURE_2D,
        0,
        gl!.RGBA,
        w,
        h,
        0,
        gl!.RGBA,
        gl!.UNSIGNED_BYTE,
        null,
      );
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.NEAREST);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.NEAREST);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);

      fbo = gl!.createFramebuffer();
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo);
      gl!.framebufferTexture2D(
        gl!.FRAMEBUFFER,
        gl!.COLOR_ATTACHMENT0,
        gl!.TEXTURE_2D,
        fboTex,
        0,
      );
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
      fboW = w;
      fboH = h;
    }

    // ── Sizing ─────────────────────────────────────────────────────
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(canvas!.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas!.clientHeight * dpr));
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
      }
      ensureFBO(w, h);
    }
    resize();

    // ── Pointer tracking (window-level so we get cursor anywhere) ──
    const mouseTarget = { x: 0.5, y: 0.5 };
    const mousePrev = { x: 0.5, y: 0.5 };
    const mouseCurrent = { x: 0.5, y: 0.5 };
    let paceTarget = 0;
    let paceCurrent = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas!.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = 1 - (e.clientY - rect.top) / rect.height; // flip Y to match UV
      mouseTarget.x = nx;
      mouseTarget.y = ny;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // ── Animation loop ─────────────────────────────────────────────
    const start =
      typeof performance !== "undefined" ? performance.now() : Date.now();

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    // Cap the slow ambient field at ~30fps — half the frames are imperceptible
    // for a drifting noise field but halve its always-on main-thread/GPU cost.
    let lastFrame = 0;
    const FRAME_MS = 1000 / 32;

    function tick() {
      if (disposed) return;
      rafId = requestAnimationFrame(tick);
      const nowMs =
        typeof performance !== "undefined" ? performance.now() : Date.now();
      if (nowMs - lastFrame < FRAME_MS) return;
      lastFrame = nowMs;
      resize();

      // Smooth mouse position
      mousePrev.x = mouseCurrent.x;
      mousePrev.y = mouseCurrent.y;
      mouseCurrent.x = lerp(mouseCurrent.x, mouseTarget.x, 0.08);
      mouseCurrent.y = lerp(mouseCurrent.y, mouseTarget.y, 0.08);

      // Pace = magnitude of frame delta, smoothed (decays toward 0 when still).
      const dx = mouseCurrent.x - mousePrev.x;
      const dy = mouseCurrent.y - mousePrev.y;
      paceTarget = Math.min(1, Math.hypot(dx, dy) * 40);
      paceCurrent = lerp(paceCurrent, paceTarget, 0.12);

      const now =
        typeof performance !== "undefined" ? performance.now() : Date.now();
      const time = (now - start) / 1000;

      const w = canvas!.width;
      const h = canvas!.height;
      const aspect = w / h;

      // Pass 1: noise → FBO
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo);
      gl!.viewport(0, 0, w, h);
      gl!.disable(gl!.BLEND);
      gl!.useProgram(noise!.prog);
      bindQuad(noise!.prog);
      gl!.uniform1f(noise!.uniforms.uTime, time);
      gl!.uniform1f(noise!.uniforms.uAspect, aspect);
      gl!.uniform2f(noise!.uniforms.uMouse, mouseCurrent.x, mouseCurrent.y);
      gl!.uniform1f(noise!.uniforms.uMousePace, paceCurrent);
      gl!.uniform1f(noise!.uniforms.uScale, scale);
      gl!.uniform1f(noise!.uniforms.uSpeed, speed);
      gl!.uniform1f(noise!.uniforms.uDistortScale, distortScale);
      gl!.uniform1f(noise!.uniforms.uDistortIntensity, distortIntensity);
      gl!.uniform1f(noise!.uniforms.uCursorIntensity, cursorIntensity);
      gl!.uniform1f(noise!.uniforms.uCursorScale, cursorScale);
      gl!.uniform1f(noise!.uniforms.uCursorBounce, cursorBounce);
      gl!.drawElements(gl!.TRIANGLES, 6, gl!.UNSIGNED_SHORT, 0);

      // Pass 2: composition (edge detection) → screen
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
      gl!.viewport(0, 0, w, h);
      gl!.enable(gl!.BLEND);
      gl!.blendFunc(gl!.ONE, gl!.ONE_MINUS_SRC_ALPHA);
      gl!.clearColor(0, 0, 0, 0);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      gl!.useProgram(comp!.prog);
      bindQuad(comp!.prog);
      gl!.activeTexture(gl!.TEXTURE0);
      gl!.bindTexture(gl!.TEXTURE_2D, fboTex);
      gl!.uniform1i(comp!.uniforms.tNoise, 0);
      gl!.uniform2f(
        comp!.uniforms.uThickness,
        thicknessPx / w,
        thicknessPx / h,
      );
      gl!.uniform3f(
        comp!.uniforms.uOutlineColor,
        lineColorRGB[0],
        lineColorRGB[1],
        lineColorRGB[2],
      );
      gl!.drawElements(gl!.TRIANGLES, 6, gl!.UNSIGNED_SHORT, 0);
    }

    // Stop entirely while the tab is hidden (no point animating a background
    // no one can see); resume and render immediately when it returns.
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      } else if (!rafId && !disposed) {
        lastFrame = 0;
        rafId = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    rafId = requestAnimationFrame(tick);

    // ResizeObserver to handle viewport changes
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      ro.disconnect();
      destroyFBO();
      if (quadVBO) gl.deleteBuffer(quadVBO);
      if (quadIBO) gl.deleteBuffer(quadIBO);
      if (noise) gl.deleteProgram(noise.prog);
      if (comp) gl.deleteProgram(comp.prog);
    };
  }, [
    scale,
    speed,
    distortScale,
    distortIntensity,
    cursorIntensity,
    cursorScale,
    cursorBounce,
    lineColor,
    thicknessPx,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("block h-full w-full", className)}
    />
  );
}
