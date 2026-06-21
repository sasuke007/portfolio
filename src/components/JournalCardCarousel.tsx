"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { journalPhotos } from "@/content";
import { cn } from "@/lib/cn";
import { gsap, registerGsap } from "@/lib/gsap";
import { CardBody, CardContainer, CardItem } from "./card-3d";

// Touch-only 3D card carousel for the Journal section. One framed photo at a
// time; the card tilts in 3D as you drag it, then settles or advances to the
// next/prev photo on release. Mirrors IconCloud's raw-pointer drag pattern
// (capture + travel threshold + touch-action: pan-y) so vertical page scroll
// keeps working. All photos are mounted (inactive hidden) so the swap mid-swipe
// never flashes a half-loaded image.

const DRAG_THRESHOLD = 6; // px of travel before a press becomes a drag
const MAX_TILT = 16; // deg of rotateY added on top of the rest tilt at full drag
const ADVANCE_RATIO = 0.25; // fraction of card width that commits a change
const FLICK = 8; // px in the last move event that counts as a flick
const REST_Y = -11; // resting rotateY — the card sits at a 3D angle at rest
const REST_X = 7; // resting rotateX

function clamp(v: number, min: number, max: number) {
  return v < min ? min : v > max ? max : v;
}

export function JournalCardCarousel() {
  const photos = journalPhotos;
  const len = photos.length;

  const trackRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    registerGsap();
    const track = trackRef.current;
    const inner = innerRef.current;
    if (!track || !inner) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const slideOut = reduced ? 0.001 : 0.26;
    const slideIn = reduced ? 0.001 : 0.34;
    const settleDur = reduced ? 0.001 : 0.4;

    // GSAP owns the transform; drop the CSS transition so it doesn't lag/double.
    inner.style.transition = "none";
    // Seat the card at a gentle 3D angle so it reads as a 3D card at rest.
    gsap.set(inner, { rotateY: REST_Y, rotateX: REST_X });
    const setX = gsap.quickSetter(inner, "x", "px");
    const setRY = gsap.quickSetter(inner, "rotateY", "deg");

    const drag = {
      down: false,
      dragging: false,
      startX: 0,
      lastX: 0,
      travel: 0,
      dx: 0,
      lastMoveX: 0,
    };

    function advance(dir: number, w: number) {
      const outX = dir < 0 ? -w * 1.2 : w * 1.2;
      const inStartX = dir < 0 ? w * 0.5 : -w * 0.5;
      gsap.to(inner, {
        x: outX,
        rotateY: REST_Y + (dir < 0 ? -MAX_TILT : MAX_TILT),
        opacity: 0,
        duration: slideOut,
        ease: "power2.in",
        onComplete: () => {
          setIndex((i) => (dir < 0 ? (i + 1) % len : (i - 1 + len) % len));
          gsap.set(inner, {
            x: inStartX,
            rotateY: REST_Y + (dir < 0 ? MAX_TILT : -MAX_TILT),
            opacity: 0,
          });
          gsap.to(inner, {
            x: 0,
            rotateY: REST_Y,
            opacity: 1,
            duration: slideIn,
            ease: "power3.out",
          });
        },
      });
    }

    function onDown(e: PointerEvent) {
      gsap.killTweensOf(inner);
      gsap.set(inner, { x: 0, rotateY: REST_Y, opacity: 1 });
      drag.down = true;
      drag.dragging = false;
      drag.travel = 0;
      drag.dx = 0;
      drag.lastMoveX = 0;
      drag.startX = drag.lastX = e.clientX;
      track!.setPointerCapture(e.pointerId);
    }

    function onMove(e: PointerEvent) {
      if (!drag.down) return;
      const moveX = e.clientX - drag.lastX;
      drag.lastX = e.clientX;
      drag.lastMoveX = moveX;
      drag.travel += Math.abs(moveX);
      if (drag.travel > DRAG_THRESHOLD) drag.dragging = true;
      if (!drag.dragging) return;
      drag.dx = e.clientX - drag.startX;
      const w = inner!.offsetWidth || 1;
      const t = clamp(drag.dx / w, -1, 1);
      setX(drag.dx * 0.6);
      setRY(REST_Y + t * MAX_TILT);
    }

    function onUp(e: PointerEvent) {
      if (!drag.down) return;
      const wasDragging = drag.dragging;
      drag.down = false;
      drag.dragging = false;
      if (track!.hasPointerCapture(e.pointerId))
        track!.releasePointerCapture(e.pointerId);
      if (!wasDragging) return; // a tap, not a swipe

      const w = inner!.offsetWidth || 1;
      const ratio = drag.dx / w;
      const flick = Math.abs(drag.lastMoveX) > FLICK;
      if ((Math.abs(ratio) > ADVANCE_RATIO || flick) && Math.abs(drag.dx) > 4) {
        const dir = (drag.dx || drag.lastMoveX) < 0 ? -1 : 1;
        advance(dir, w);
      } else {
        gsap.to(inner, {
          x: 0,
          rotateY: REST_Y,
          duration: settleDur,
          ease: "power3.out",
        });
      }
    }

    track.addEventListener("pointerdown", onDown);
    track.addEventListener("pointermove", onMove);
    track.addEventListener("pointerup", onUp);
    track.addEventListener("pointercancel", onUp);

    return () => {
      gsap.killTweensOf(inner);
      track.removeEventListener("pointerdown", onDown);
      track.removeEventListener("pointermove", onMove);
      track.removeEventListener("pointerup", onUp);
      track.removeEventListener("pointercancel", onUp);
    };
  }, [len]);

  return (
    <div className="relative z-4 mx-auto mt-12 w-full max-w-md px-6">
      <div
        ref={trackRef}
        className="flex touch-pan-y cursor-grab justify-center overflow-hidden py-6 select-none active:cursor-grabbing"
      >
        <CardContainer innerRef={innerRef} forceEntered containerClassName="w-full">
          <CardBody className="w-[78vw] max-w-[320px] rounded-[4px] bg-white p-3 shadow-[0_28px_60px_-26px_rgba(0,0,0,0.4)]">
            <CardItem translateZ={60} className="w-full">
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-[2px]">
                {photos.map((p, i) => (
                  <Image
                    key={p.src}
                    src={p.src}
                    alt={i === index ? p.alt : ""}
                    fill
                    sizes="80vw"
                    priority={i === 0}
                    aria-hidden={i === index ? undefined : true}
                    className={cn(
                      "object-cover filter-[grayscale(15%)_contrast(0.95)] transition-opacity duration-300",
                      i === index ? "opacity-100" : "opacity-0",
                    )}
                  />
                ))}
              </div>
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>

      <div
        className="mt-2 flex items-center justify-center gap-2.5"
        role="tablist"
        aria-label="Journal photos"
      >
        {photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            role="tab"
            aria-label={`Go to photo ${i + 1}`}
            aria-selected={i === index}
            onClick={() => setIndex(i)}
            className={cn(
              "h-2 w-2 rounded-full transition-all duration-300",
              i === index ? "scale-110 bg-accent" : "bg-text/25 hover:bg-text/40",
            )}
          />
        ))}
      </div>
    </div>
  );
}
