"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type Props = {
  src: string;
  className?: string;
  simResolution?: number;
  dyeResolution?: number;
  densityDissipation?: number;
  velocityDissipation?: number;
  pressure?: number;
  pressureIterations?: number;
  curl?: number;
  splatRadius?: number;
  splatForce?: number;
  /** intensity multiplier on the dye-density alpha mask (default 4) */
  revealIntensity?: number;
};

interface FBO {
  texture: WebGLTexture;
  fbo: WebGLFramebuffer;
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  attach: (id: number) => number;
}

interface DoubleFBO {
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  read: FBO;
  write: FBO;
  swap: () => void;
}

interface Pointer {
  id: number;
  texcoordX: number;
  texcoordY: number;
  prevTexcoordX: number;
  prevTexcoordY: number;
  deltaX: number;
  deltaY: number;
  down: boolean;
  moved: boolean;
  color: { r: number; g: number; b: number };
}

function pointerPrototype(): Pointer {
  return {
    id: -1,
    texcoordX: 0,
    texcoordY: 0,
    prevTexcoordX: 0,
    prevTexcoordY: 0,
    deltaX: 0,
    deltaY: 0,
    down: false,
    moved: false,
    color: { r: 0, g: 0, b: 0 },
  };
}

export function FluidPhotoReveal({
  src,
  className,
  simResolution = 128,
  dyeResolution = 1024,
  densityDissipation = 5.5,
  velocityDissipation = 3.0,
  pressure = 0.1,
  pressureIterations = 20,
  curl = 30,
  splatRadius = 0.32,
  splatForce = 6000,
  revealIntensity = 4.0,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    let rafId = 0;

    const config = {
      SIM_RESOLUTION: simResolution,
      DYE_RESOLUTION: dyeResolution,
      DENSITY_DISSIPATION: densityDissipation,
      VELOCITY_DISSIPATION: velocityDissipation,
      PRESSURE: pressure,
      PRESSURE_ITERATIONS: pressureIterations,
      CURL: curl,
      SPLAT_RADIUS: splatRadius,
      SPLAT_FORCE: splatForce,
      REVEAL_INTENSITY: revealIntensity,
    };

    const pointers: Pointer[] = [pointerPrototype()];

    // ── WebGL context ──────────────────────────────────────────────
    const { gl, ext } = getWebGLContext(canvas);
    if (!gl || !ext) return;

    if (!ext.supportLinearFiltering) {
      config.DYE_RESOLUTION = 256;
    }

    function getWebGLContext(c: HTMLCanvasElement) {
      const params: WebGLContextAttributes = {
        alpha: true,
        depth: false,
        stencil: false,
        antialias: false,
        preserveDrawingBuffer: false,
      };
      let gl2 = c.getContext(
        "webgl2",
        params,
      ) as WebGL2RenderingContext | null;
      if (!gl2) {
        gl2 = (c.getContext("webgl", params) ||
          c.getContext(
            "experimental-webgl",
            params,
          )) as WebGL2RenderingContext | null;
      }
      if (!gl2) {
        // Cannot init WebGL — bail out
        return { gl: null, ext: null };
      }
      const isWebGL2 = "drawBuffers" in gl2;

      let supportLinearFiltering = false;
      let halfFloat: OES_texture_half_float | null = null;

      if (isWebGL2) {
        (gl2 as WebGL2RenderingContext).getExtension("EXT_color_buffer_float");
        supportLinearFiltering = !!gl2.getExtension("OES_texture_float_linear");
      } else {
        halfFloat = gl2.getExtension(
          "OES_texture_half_float",
        ) as OES_texture_half_float | null;
        supportLinearFiltering = !!gl2.getExtension(
          "OES_texture_half_float_linear",
        );
      }

      gl2.clearColor(0, 0, 0, 0);

      const halfFloatTexType = isWebGL2
        ? (gl2 as WebGL2RenderingContext).HALF_FLOAT
        : (halfFloat && halfFloat.HALF_FLOAT_OES) || 0;

      let formatRGBA: { internalFormat: number; format: number } | null;
      let formatRG: { internalFormat: number; format: number } | null;
      let formatR: { internalFormat: number; format: number } | null;

      if (isWebGL2) {
        const gl2t = gl2 as WebGL2RenderingContext;
        formatRGBA = getSupportedFormat(
          gl2t,
          gl2t.RGBA16F,
          gl2t.RGBA,
          halfFloatTexType,
        );
        formatRG = getSupportedFormat(
          gl2t,
          gl2t.RG16F,
          gl2t.RG,
          halfFloatTexType,
        );
        formatR = getSupportedFormat(
          gl2t,
          gl2t.R16F,
          gl2t.RED,
          halfFloatTexType,
        );
      } else {
        formatRGBA = getSupportedFormat(
          gl2,
          gl2.RGBA,
          gl2.RGBA,
          halfFloatTexType,
        );
        formatRG = getSupportedFormat(gl2, gl2.RGBA, gl2.RGBA, halfFloatTexType);
        formatR = getSupportedFormat(gl2, gl2.RGBA, gl2.RGBA, halfFloatTexType);
      }

      return {
        gl: gl2,
        ext: {
          formatRGBA: formatRGBA!,
          formatRG: formatRG!,
          formatR: formatR!,
          halfFloatTexType,
          supportLinearFiltering,
        },
      };
    }

    function getSupportedFormat(
      glx: WebGLRenderingContext | WebGL2RenderingContext,
      internalFormat: number,
      format: number,
      type: number,
    ): { internalFormat: number; format: number } | null {
      if (!supportRenderTextureFormat(glx, internalFormat, format, type)) {
        if ("drawBuffers" in glx) {
          const g2 = glx as WebGL2RenderingContext;
          switch (internalFormat) {
            case g2.R16F:
              return getSupportedFormat(g2, g2.RG16F, g2.RG, type);
            case g2.RG16F:
              return getSupportedFormat(g2, g2.RGBA16F, g2.RGBA, type);
            default:
              return null;
          }
        }
        return null;
      }
      return { internalFormat, format };
    }

    function supportRenderTextureFormat(
      glx: WebGLRenderingContext | WebGL2RenderingContext,
      internalFormat: number,
      format: number,
      type: number,
    ) {
      const tex = glx.createTexture();
      if (!tex) return false;
      glx.bindTexture(glx.TEXTURE_2D, tex);
      glx.texParameteri(glx.TEXTURE_2D, glx.TEXTURE_MIN_FILTER, glx.NEAREST);
      glx.texParameteri(glx.TEXTURE_2D, glx.TEXTURE_MAG_FILTER, glx.NEAREST);
      glx.texParameteri(glx.TEXTURE_2D, glx.TEXTURE_WRAP_S, glx.CLAMP_TO_EDGE);
      glx.texParameteri(glx.TEXTURE_2D, glx.TEXTURE_WRAP_T, glx.CLAMP_TO_EDGE);
      glx.texImage2D(
        glx.TEXTURE_2D,
        0,
        internalFormat,
        4,
        4,
        0,
        format,
        type,
        null,
      );
      const fbo = glx.createFramebuffer();
      if (!fbo) return false;
      glx.bindFramebuffer(glx.FRAMEBUFFER, fbo);
      glx.framebufferTexture2D(
        glx.FRAMEBUFFER,
        glx.COLOR_ATTACHMENT0,
        glx.TEXTURE_2D,
        tex,
        0,
      );
      const status = glx.checkFramebufferStatus(glx.FRAMEBUFFER);
      return status === glx.FRAMEBUFFER_COMPLETE;
    }

    // ── Shader plumbing ────────────────────────────────────────────
    function compileShader(
      type: number,
      source: string,
      keywords: string[] | null = null,
    ): WebGLShader | null {
      const src = addKeywords(source, keywords);
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, src);
      gl!.compileShader(shader);
      return shader;
    }

    function addKeywords(source: string, keywords: string[] | null) {
      if (!keywords) return source;
      let s = "";
      for (const k of keywords) s += `#define ${k}\n`;
      return s + source;
    }

    function createProgram(
      vs: WebGLShader | null,
      fs: WebGLShader | null,
    ): WebGLProgram | null {
      if (!vs || !fs) return null;
      const p = gl!.createProgram();
      if (!p) return null;
      gl!.attachShader(p, vs);
      gl!.attachShader(p, fs);
      gl!.linkProgram(p);
      return p;
    }

    function getUniforms(program: WebGLProgram) {
      const uniforms: Record<string, WebGLUniformLocation | null> = {};
      const count = gl!.getProgramParameter(program, gl!.ACTIVE_UNIFORMS);
      for (let i = 0; i < count; i++) {
        const info = gl!.getActiveUniform(program, i);
        if (info) {
          uniforms[info.name] = gl!.getUniformLocation(program, info.name);
        }
      }
      return uniforms;
    }

    class Program {
      program: WebGLProgram | null;
      uniforms: Record<string, WebGLUniformLocation | null>;
      constructor(vs: WebGLShader | null, fs: WebGLShader | null) {
        this.program = createProgram(vs, fs);
        this.uniforms = this.program ? getUniforms(this.program) : {};
      }
      bind() {
        if (this.program) gl!.useProgram(this.program);
      }
    }

    // ── Shader sources ─────────────────────────────────────────────
    const baseVertexShader = compileShader(
      gl.VERTEX_SHADER,
      `
        precision highp float;
        attribute vec2 aPosition;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform vec2 texelSize;
        void main () {
          vUv = aPosition * 0.5 + 0.5;
          vL = vUv - vec2(texelSize.x, 0.0);
          vR = vUv + vec2(texelSize.x, 0.0);
          vT = vUv + vec2(0.0, texelSize.y);
          vB = vUv - vec2(0.0, texelSize.y);
          gl_Position = vec4(aPosition, 0.0, 1.0);
        }
      `,
    );

    const copyShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;
        void main () { gl_FragColor = texture2D(uTexture, vUv); }
      `,
    );

    const clearShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;
        uniform float value;
        void main () { gl_FragColor = value * texture2D(uTexture, vUv); }
      `,
    );

    const splatShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uTarget;
        uniform float aspectRatio;
        uniform vec3 color;
        uniform vec2 point;
        uniform float radius;
        void main () {
          vec2 p = vUv - point.xy;
          p.x *= aspectRatio;
          vec3 splat = exp(-dot(p, p) / radius) * color;
          vec3 base = texture2D(uTarget, vUv).xyz;
          gl_FragColor = vec4(base + splat, 1.0);
        }
      `,
    );

    const advectionShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uVelocity;
        uniform sampler2D uSource;
        uniform vec2 texelSize;
        uniform vec2 dyeTexelSize;
        uniform float dt;
        uniform float dissipation;
        vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
          vec2 st = uv / tsize - 0.5;
          vec2 iuv = floor(st);
          vec2 fuv = fract(st);
          vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
          vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
          vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
          vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
          return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
        }
        void main () {
          #ifdef MANUAL_FILTERING
            vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
            vec4 result = bilerp(uSource, coord, dyeTexelSize);
          #else
            vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
            vec4 result = texture2D(uSource, coord);
          #endif
          float decay = 1.0 + dissipation * dt;
          gl_FragColor = result / decay;
        }
      `,
      ext.supportLinearFiltering ? null : ["MANUAL_FILTERING"],
    );

    const divergenceShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;
        void main () {
          float L = texture2D(uVelocity, vL).x;
          float R = texture2D(uVelocity, vR).x;
          float T = texture2D(uVelocity, vT).y;
          float B = texture2D(uVelocity, vB).y;
          vec2 C = texture2D(uVelocity, vUv).xy;
          if (vL.x < 0.0) { L = -C.x; }
          if (vR.x > 1.0) { R = -C.x; }
          if (vT.y > 1.0) { T = -C.y; }
          if (vB.y < 0.0) { B = -C.y; }
          float div = 0.5 * (R - L + T - B);
          gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
        }
      `,
    );

    const curlShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;
        void main () {
          float L = texture2D(uVelocity, vL).y;
          float R = texture2D(uVelocity, vR).y;
          float T = texture2D(uVelocity, vT).x;
          float B = texture2D(uVelocity, vB).x;
          float vorticity = R - L - T + B;
          gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
        }
      `,
    );

    const vorticityShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform sampler2D uVelocity;
        uniform sampler2D uCurl;
        uniform float curl;
        uniform float dt;
        void main () {
          float L = texture2D(uCurl, vL).x;
          float R = texture2D(uCurl, vR).x;
          float T = texture2D(uCurl, vT).x;
          float B = texture2D(uCurl, vB).x;
          float C = texture2D(uCurl, vUv).x;
          vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
          force /= length(force) + 0.0001;
          force *= curl * C;
          force.y *= -1.0;
          vec2 velocity = texture2D(uVelocity, vUv).xy;
          velocity += force * dt;
          velocity = min(max(velocity, -1000.0), 1000.0);
          gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
      `,
    );

    const pressureShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uDivergence;
        void main () {
          float L = texture2D(uPressure, vL).x;
          float R = texture2D(uPressure, vR).x;
          float T = texture2D(uPressure, vT).x;
          float B = texture2D(uPressure, vB).x;
          float divergence = texture2D(uDivergence, vUv).x;
          float pressure = (L + R + B + T - divergence) * 0.25;
          gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
        }
      `,
    );

    const gradientSubtractShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uVelocity;
        void main () {
          float L = texture2D(uPressure, vL).x;
          float R = texture2D(uPressure, vR).x;
          float T = texture2D(uPressure, vT).x;
          float B = texture2D(uPressure, vB).x;
          vec2 velocity = texture2D(uVelocity, vUv).xy;
          velocity.xy -= vec2(R - L, T - B);
          gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
      `,
    );

    // ── Photo-mask display shader (replaces inspira's colorful display) ──
    const photoDisplayShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uDye;
        uniform sampler2D uPhoto;
        uniform float uIntensity;
        uniform float uPhotoAspect;
        uniform float uCanvasAspect;
        void main () {
          vec3 dyeColor = texture2D(uDye, vUv).rgb;
          float density = max(dyeColor.r, max(dyeColor.g, dyeColor.b));
          density = clamp(density * uIntensity, 0.0, 1.0);

          // "object-fit: cover" sampling
          vec2 sampleUV = vUv - 0.5;
          if (uCanvasAspect > uPhotoAspect) {
            sampleUV.y *= uPhotoAspect / uCanvasAspect;
          } else {
            sampleUV.x *= uCanvasAspect / uPhotoAspect;
          }
          sampleUV += 0.5;

          vec4 photo = texture2D(uPhoto, sampleUV);
          gl_FragColor = vec4(photo.rgb, photo.a * density);
        }
      `,
    );

    // ── Programs ───────────────────────────────────────────────────
    const copyProgram = new Program(baseVertexShader, copyShader);
    const clearProgram = new Program(baseVertexShader, clearShader);
    const splatProgram = new Program(baseVertexShader, splatShader);
    const advectionProgram = new Program(baseVertexShader, advectionShader);
    const divergenceProgram = new Program(baseVertexShader, divergenceShader);
    const curlProgram = new Program(baseVertexShader, curlShader);
    const vorticityProgram = new Program(baseVertexShader, vorticityShader);
    const pressureProgram = new Program(baseVertexShader, pressureShader);
    const gradienSubtractProgram = new Program(
      baseVertexShader,
      gradientSubtractShader,
    );
    const displayProgram = new Program(baseVertexShader, photoDisplayShader);

    // ── Fullscreen quad blit ───────────────────────────────────────
    const blit = (() => {
      const buffer = gl!.createBuffer()!;
      gl!.bindBuffer(gl!.ARRAY_BUFFER, buffer);
      gl!.bufferData(
        gl!.ARRAY_BUFFER,
        new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
        gl!.STATIC_DRAW,
      );
      const elemBuffer = gl!.createBuffer()!;
      gl!.bindBuffer(gl!.ELEMENT_ARRAY_BUFFER, elemBuffer);
      gl!.bufferData(
        gl!.ELEMENT_ARRAY_BUFFER,
        new Uint16Array([0, 1, 2, 0, 2, 3]),
        gl!.STATIC_DRAW,
      );
      gl!.vertexAttribPointer(0, 2, gl!.FLOAT, false, 0, 0);
      gl!.enableVertexAttribArray(0);
      return (target: FBO | null, doClear = false) => {
        if (!gl) return;
        if (!target) {
          gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        } else {
          gl.viewport(0, 0, target.width, target.height);
          gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
        }
        if (doClear) {
          gl.clearColor(0, 0, 0, 0);
          gl.clear(gl.COLOR_BUFFER_BIT);
        }
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
      };
    })();

    // ── Framebuffers ───────────────────────────────────────────────
    let dye: DoubleFBO | undefined;
    let velocity: DoubleFBO | undefined;
    let divergenceFBO: FBO;
    let curlFBO: FBO;
    let pressureFBO: DoubleFBO;

    function createFBO(
      w: number,
      h: number,
      internalFormat: number,
      format: number,
      type: number,
      param: number,
    ): FBO {
      gl!.activeTexture(gl!.TEXTURE0);
      const texture = gl!.createTexture()!;
      gl!.bindTexture(gl!.TEXTURE_2D, texture);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, param);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, param);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
      gl!.texImage2D(
        gl!.TEXTURE_2D,
        0,
        internalFormat,
        w,
        h,
        0,
        format,
        type,
        null,
      );
      const fbo = gl!.createFramebuffer()!;
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo);
      gl!.framebufferTexture2D(
        gl!.FRAMEBUFFER,
        gl!.COLOR_ATTACHMENT0,
        gl!.TEXTURE_2D,
        texture,
        0,
      );
      gl!.viewport(0, 0, w, h);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      const texelSizeX = 1 / w;
      const texelSizeY = 1 / h;
      return {
        texture,
        fbo,
        width: w,
        height: h,
        texelSizeX,
        texelSizeY,
        attach(id: number) {
          gl!.activeTexture(gl!.TEXTURE0 + id);
          gl!.bindTexture(gl!.TEXTURE_2D, texture);
          return id;
        },
      };
    }

    function createDoubleFBO(
      w: number,
      h: number,
      internalFormat: number,
      format: number,
      type: number,
      param: number,
    ): DoubleFBO {
      const a = createFBO(w, h, internalFormat, format, type, param);
      const b = createFBO(w, h, internalFormat, format, type, param);
      return {
        width: w,
        height: h,
        texelSizeX: a.texelSizeX,
        texelSizeY: a.texelSizeY,
        read: a,
        write: b,
        swap() {
          const tmp = this.read;
          this.read = this.write;
          this.write = tmp;
        },
      };
    }

    function resizeFBO(
      target: FBO,
      w: number,
      h: number,
      internalFormat: number,
      format: number,
      type: number,
      param: number,
    ): FBO {
      const newFBO = createFBO(w, h, internalFormat, format, type, param);
      copyProgram.bind();
      if (copyProgram.uniforms.uTexture) {
        gl!.uniform1i(copyProgram.uniforms.uTexture, target.attach(0));
      }
      blit(newFBO, false);
      return newFBO;
    }

    function resizeDoubleFBO(
      target: DoubleFBO,
      w: number,
      h: number,
      internalFormat: number,
      format: number,
      type: number,
      param: number,
    ) {
      if (target.width === w && target.height === h) return target;
      target.read = resizeFBO(
        target.read,
        w,
        h,
        internalFormat,
        format,
        type,
        param,
      );
      target.write = createFBO(w, h, internalFormat, format, type, param);
      target.width = w;
      target.height = h;
      target.texelSizeX = 1 / w;
      target.texelSizeY = 1 / h;
      return target;
    }

    function initFramebuffers() {
      const simRes = getResolution(config.SIM_RESOLUTION);
      const dyeRes = getResolution(config.DYE_RESOLUTION);
      const texType = ext!.halfFloatTexType;
      const rgba = ext!.formatRGBA;
      const rg = ext!.formatRG;
      const r = ext!.formatR;
      const filtering = ext!.supportLinearFiltering ? gl!.LINEAR : gl!.NEAREST;
      gl!.disable(gl!.BLEND);
      if (!dye) {
        dye = createDoubleFBO(
          dyeRes.width,
          dyeRes.height,
          rgba.internalFormat,
          rgba.format,
          texType,
          filtering,
        );
      } else {
        dye = resizeDoubleFBO(
          dye,
          dyeRes.width,
          dyeRes.height,
          rgba.internalFormat,
          rgba.format,
          texType,
          filtering,
        );
      }
      if (!velocity) {
        velocity = createDoubleFBO(
          simRes.width,
          simRes.height,
          rg.internalFormat,
          rg.format,
          texType,
          filtering,
        );
      } else {
        velocity = resizeDoubleFBO(
          velocity,
          simRes.width,
          simRes.height,
          rg.internalFormat,
          rg.format,
          texType,
          filtering,
        );
      }
      divergenceFBO = createFBO(
        simRes.width,
        simRes.height,
        r.internalFormat,
        r.format,
        texType,
        gl!.NEAREST,
      );
      curlFBO = createFBO(
        simRes.width,
        simRes.height,
        r.internalFormat,
        r.format,
        texType,
        gl!.NEAREST,
      );
      pressureFBO = createDoubleFBO(
        simRes.width,
        simRes.height,
        r.internalFormat,
        r.format,
        texType,
        gl!.NEAREST,
      );
    }

    function getResolution(resolution: number) {
      const w = gl!.drawingBufferWidth;
      const h = gl!.drawingBufferHeight;
      const aspectRatio = w / h;
      const aspect = aspectRatio < 1 ? 1 / aspectRatio : aspectRatio;
      const min = Math.round(resolution);
      const max = Math.round(resolution * aspect);
      if (w > h) return { width: max, height: min };
      return { width: min, height: max };
    }

    function scaleByPixelRatio(input: number) {
      const pr = window.devicePixelRatio || 1;
      return Math.floor(input * pr);
    }

    // ── Photo texture ──────────────────────────────────────────────
    const photoTexture = gl.createTexture()!;
    let photoLoaded = false;
    let photoAspect = 1;
    {
      gl.bindTexture(gl.TEXTURE_2D, photoTexture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      // 1×1 placeholder so the sampler is valid before image loads
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        1,
        1,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        new Uint8Array([0, 0, 0, 0]),
      );
    }
    const photoImg = new Image();
    photoImg.crossOrigin = "anonymous";
    photoImg.onload = () => {
      if (disposed) return;
      gl.bindTexture(gl.TEXTURE_2D, photoTexture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        photoImg,
      );
      photoAspect = photoImg.naturalWidth / photoImg.naturalHeight;
      photoLoaded = true;
    };
    photoImg.src = src;

    // ── Simulation step ────────────────────────────────────────────
    initFramebuffers();

    let lastUpdateTime =
      typeof performance !== "undefined" ? performance.now() : Date.now();

    function calcDeltaTime() {
      const now =
        typeof performance !== "undefined" ? performance.now() : Date.now();
      let dt = (now - lastUpdateTime) / 1000;
      dt = Math.min(dt, 0.016666);
      lastUpdateTime = now;
      return dt;
    }

    function resizeCanvas() {
      const width = scaleByPixelRatio(canvas!.clientWidth);
      const height = scaleByPixelRatio(canvas!.clientHeight);
      if (canvas!.width !== width || canvas!.height !== height) {
        canvas!.width = width;
        canvas!.height = height;
        return true;
      }
      return false;
    }

    function applyInputs() {
      for (const p of pointers) {
        if (p.moved) {
          p.moved = false;
          splatPointer(p);
        }
      }
    }

    function step(dt: number) {
      if (!velocity || !dye) return;
      gl!.disable(gl!.BLEND);

      // Curl
      curlProgram.bind();
      if (curlProgram.uniforms.texelSize) {
        gl!.uniform2f(
          curlProgram.uniforms.texelSize,
          velocity.texelSizeX,
          velocity.texelSizeY,
        );
      }
      if (curlProgram.uniforms.uVelocity) {
        gl!.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
      }
      blit(curlFBO);

      // Vorticity
      vorticityProgram.bind();
      if (vorticityProgram.uniforms.texelSize) {
        gl!.uniform2f(
          vorticityProgram.uniforms.texelSize,
          velocity.texelSizeX,
          velocity.texelSizeY,
        );
      }
      if (vorticityProgram.uniforms.uVelocity) {
        gl!.uniform1i(
          vorticityProgram.uniforms.uVelocity,
          velocity.read.attach(0),
        );
      }
      if (vorticityProgram.uniforms.uCurl) {
        gl!.uniform1i(vorticityProgram.uniforms.uCurl, curlFBO.attach(1));
      }
      if (vorticityProgram.uniforms.curl) {
        gl!.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
      }
      if (vorticityProgram.uniforms.dt) {
        gl!.uniform1f(vorticityProgram.uniforms.dt, dt);
      }
      blit(velocity.write);
      velocity.swap();

      // Divergence
      divergenceProgram.bind();
      if (divergenceProgram.uniforms.texelSize) {
        gl!.uniform2f(
          divergenceProgram.uniforms.texelSize,
          velocity.texelSizeX,
          velocity.texelSizeY,
        );
      }
      if (divergenceProgram.uniforms.uVelocity) {
        gl!.uniform1i(
          divergenceProgram.uniforms.uVelocity,
          velocity.read.attach(0),
        );
      }
      blit(divergenceFBO);

      // Clear pressure
      clearProgram.bind();
      if (clearProgram.uniforms.uTexture) {
        gl!.uniform1i(
          clearProgram.uniforms.uTexture,
          pressureFBO.read.attach(0),
        );
      }
      if (clearProgram.uniforms.value) {
        gl!.uniform1f(clearProgram.uniforms.value, config.PRESSURE);
      }
      blit(pressureFBO.write);
      pressureFBO.swap();

      // Pressure
      pressureProgram.bind();
      if (pressureProgram.uniforms.texelSize) {
        gl!.uniform2f(
          pressureProgram.uniforms.texelSize,
          velocity.texelSizeX,
          velocity.texelSizeY,
        );
      }
      if (pressureProgram.uniforms.uDivergence) {
        gl!.uniform1i(
          pressureProgram.uniforms.uDivergence,
          divergenceFBO.attach(0),
        );
      }
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        if (pressureProgram.uniforms.uPressure) {
          gl!.uniform1i(
            pressureProgram.uniforms.uPressure,
            pressureFBO.read.attach(1),
          );
        }
        blit(pressureFBO.write);
        pressureFBO.swap();
      }

      // Gradient subtract
      gradienSubtractProgram.bind();
      if (gradienSubtractProgram.uniforms.texelSize) {
        gl!.uniform2f(
          gradienSubtractProgram.uniforms.texelSize,
          velocity.texelSizeX,
          velocity.texelSizeY,
        );
      }
      if (gradienSubtractProgram.uniforms.uPressure) {
        gl!.uniform1i(
          gradienSubtractProgram.uniforms.uPressure,
          pressureFBO.read.attach(0),
        );
      }
      if (gradienSubtractProgram.uniforms.uVelocity) {
        gl!.uniform1i(
          gradienSubtractProgram.uniforms.uVelocity,
          velocity.read.attach(1),
        );
      }
      blit(velocity.write);
      velocity.swap();

      // Advection — velocity
      advectionProgram.bind();
      if (advectionProgram.uniforms.texelSize) {
        gl!.uniform2f(
          advectionProgram.uniforms.texelSize,
          velocity.texelSizeX,
          velocity.texelSizeY,
        );
      }
      if (
        !ext!.supportLinearFiltering &&
        advectionProgram.uniforms.dyeTexelSize
      ) {
        gl!.uniform2f(
          advectionProgram.uniforms.dyeTexelSize,
          velocity.texelSizeX,
          velocity.texelSizeY,
        );
      }
      const velocityId = velocity.read.attach(0);
      if (advectionProgram.uniforms.uVelocity) {
        gl!.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);
      }
      if (advectionProgram.uniforms.uSource) {
        gl!.uniform1i(advectionProgram.uniforms.uSource, velocityId);
      }
      if (advectionProgram.uniforms.dt) {
        gl!.uniform1f(advectionProgram.uniforms.dt, dt);
      }
      if (advectionProgram.uniforms.dissipation) {
        gl!.uniform1f(
          advectionProgram.uniforms.dissipation,
          config.VELOCITY_DISSIPATION,
        );
      }
      blit(velocity.write);
      velocity.swap();

      // Advection — dye
      if (
        !ext!.supportLinearFiltering &&
        advectionProgram.uniforms.dyeTexelSize
      ) {
        gl!.uniform2f(
          advectionProgram.uniforms.dyeTexelSize,
          dye.texelSizeX,
          dye.texelSizeY,
        );
      }
      if (advectionProgram.uniforms.uVelocity) {
        gl!.uniform1i(
          advectionProgram.uniforms.uVelocity,
          velocity.read.attach(0),
        );
      }
      if (advectionProgram.uniforms.uSource) {
        gl!.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1));
      }
      if (advectionProgram.uniforms.dissipation) {
        gl!.uniform1f(
          advectionProgram.uniforms.dissipation,
          config.DENSITY_DISSIPATION,
        );
      }
      blit(dye.write);
      dye.swap();
    }

    function render() {
      if (!dye) return;
      gl!.blendFunc(gl!.ONE, gl!.ONE_MINUS_SRC_ALPHA);
      gl!.enable(gl!.BLEND);
      displayProgram.bind();
      if (displayProgram.uniforms.uDye) {
        gl!.uniform1i(displayProgram.uniforms.uDye, dye.read.attach(0));
      }
      if (displayProgram.uniforms.uPhoto) {
        gl!.activeTexture(gl!.TEXTURE1);
        gl!.bindTexture(gl!.TEXTURE_2D, photoTexture);
        gl!.uniform1i(displayProgram.uniforms.uPhoto, 1);
      }
      if (displayProgram.uniforms.uIntensity) {
        gl!.uniform1f(displayProgram.uniforms.uIntensity, config.REVEAL_INTENSITY);
      }
      if (displayProgram.uniforms.uPhotoAspect) {
        gl!.uniform1f(
          displayProgram.uniforms.uPhotoAspect,
          photoLoaded ? photoAspect : 1,
        );
      }
      if (displayProgram.uniforms.uCanvasAspect) {
        gl!.uniform1f(
          displayProgram.uniforms.uCanvasAspect,
          canvas!.width / canvas!.height,
        );
      }
      blit(null, false);
    }

    function updateFrame() {
      if (disposed) return;
      const dt = calcDeltaTime();
      if (resizeCanvas()) initFramebuffers();
      applyInputs();
      step(dt);
      render();
      rafId = requestAnimationFrame(updateFrame);
    }

    // ── Pointer handling ───────────────────────────────────────────
    function splatPointer(p: Pointer) {
      const dx = p.deltaX * config.SPLAT_FORCE;
      const dy = p.deltaY * config.SPLAT_FORCE;
      splat(p.texcoordX, p.texcoordY, dx, dy, p.color);
    }

    function splat(
      x: number,
      y: number,
      dx: number,
      dy: number,
      color: { r: number; g: number; b: number },
    ) {
      if (!velocity || !dye) return;
      splatProgram.bind();
      if (splatProgram.uniforms.uTarget) {
        gl!.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
      }
      if (splatProgram.uniforms.aspectRatio) {
        gl!.uniform1f(
          splatProgram.uniforms.aspectRatio,
          canvas!.width / canvas!.height,
        );
      }
      if (splatProgram.uniforms.point) {
        gl!.uniform2f(splatProgram.uniforms.point, x, y);
      }
      if (splatProgram.uniforms.color) {
        gl!.uniform3f(splatProgram.uniforms.color, dx, dy, 0);
      }
      if (splatProgram.uniforms.radius) {
        gl!.uniform1f(
          splatProgram.uniforms.radius,
          correctRadius(config.SPLAT_RADIUS / 100),
        );
      }
      blit(velocity.write);
      velocity.swap();

      if (splatProgram.uniforms.uTarget) {
        gl!.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));
      }
      if (splatProgram.uniforms.color) {
        gl!.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
      }
      blit(dye.write);
      dye.swap();
    }

    function correctRadius(radius: number) {
      const ar = canvas!.width / canvas!.height;
      if (ar > 1) radius *= ar;
      return radius;
    }

    function correctDeltaX(delta: number) {
      const ar = canvas!.width / canvas!.height;
      if (ar < 1) delta *= ar;
      return delta;
    }

    function correctDeltaY(delta: number) {
      const ar = canvas!.width / canvas!.height;
      if (ar > 1) delta /= ar;
      return delta;
    }

    function updatePointerMoveData(
      p: Pointer,
      posX: number,
      posY: number,
      color: { r: number; g: number; b: number },
    ) {
      p.prevTexcoordX = p.texcoordX;
      p.prevTexcoordY = p.texcoordY;
      p.texcoordX = posX / canvas!.width;
      p.texcoordY = 1 - posY / canvas!.height;
      p.deltaX = correctDeltaX(p.texcoordX - p.prevTexcoordX);
      p.deltaY = correctDeltaY(p.texcoordY - p.prevTexcoordY);
      p.moved = Math.abs(p.deltaX) > 0 || Math.abs(p.deltaY) > 0;
      p.color = color;
    }

    function updatePointerDownData(
      p: Pointer,
      id: number,
      posX: number,
      posY: number,
    ) {
      p.id = id;
      p.down = true;
      p.moved = false;
      p.texcoordX = posX / canvas!.width;
      p.texcoordY = 1 - posY / canvas!.height;
      p.prevTexcoordX = p.texcoordX;
      p.prevTexcoordY = p.texcoordY;
      p.deltaX = 0;
      p.deltaY = 0;
      // White-ish dye for high-contrast reveal (will be intensified by uIntensity)
      p.color = { r: 0.25, g: 0.25, b: 0.25 };
    }

    function pointerColor() {
      // Monochrome dye — value chosen so density saturates with movement
      return { r: 0.25, g: 0.25, b: 0.25 };
    }

    function pointerCoords(e: PointerEvent | { clientX: number; clientY: number }) {
      const rect = canvas!.getBoundingClientRect();
      const x = scaleByPixelRatio(e.clientX - rect.left);
      const y = scaleByPixelRatio(e.clientY - rect.top);
      return { x, y };
    }

    let started = false;
    const startIfNeeded = () => {
      if (started) return;
      started = true;
      lastUpdateTime =
        typeof performance !== "undefined" ? performance.now() : Date.now();
      rafId = requestAnimationFrame(updateFrame);
    };

    const onPointerEnter = (e: PointerEvent) => {
      const { x, y } = pointerCoords(e);
      const p = pointers[0];
      updatePointerDownData(p, e.pointerId, x, y);
      startIfNeeded();
    };

    const onPointerMove = (e: PointerEvent) => {
      const { x, y } = pointerCoords(e);
      const p = pointers[0];
      updatePointerMoveData(p, x, y, pointerColor());
      startIfNeeded();
    };

    const onPointerLeave = () => {
      const p = pointers[0];
      p.down = false;
      p.moved = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const rect = canvas!.getBoundingClientRect();
      const touch = e.touches[0];
      const x = scaleByPixelRatio(touch.clientX - rect.left);
      const y = scaleByPixelRatio(touch.clientY - rect.top);
      const p = pointers[0];
      updatePointerMoveData(p, x, y, pointerColor());
      startIfNeeded();
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const rect = canvas!.getBoundingClientRect();
      const touch = e.touches[0];
      const x = scaleByPixelRatio(touch.clientX - rect.left);
      const y = scaleByPixelRatio(touch.clientY - rect.top);
      const p = pointers[0];
      updatePointerDownData(p, touch.identifier, x, y);
      startIfNeeded();
    };

    canvas.addEventListener("pointerenter", onPointerEnter);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });

    // ResizeObserver — reallocate FBOs when canvas size changes
    const ro = new ResizeObserver(() => {
      if (resizeCanvas()) initFramebuffers();
    });
    ro.observe(canvas);

    // Kick off the first frame so the dye dissipates even without input
    startIfNeeded();

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("pointerenter", onPointerEnter);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      ro.disconnect();
      // WebGL resources are GC'd when the canvas is detached; explicit teardown
      // would require tracking every program/texture/FBO.
    };
  }, [
    src,
    simResolution,
    dyeResolution,
    densityDissipation,
    velocityDissipation,
    pressure,
    pressureIterations,
    curl,
    splatRadius,
    splatForce,
    revealIntensity,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("block h-full w-full", className)}
    />
  );
}
