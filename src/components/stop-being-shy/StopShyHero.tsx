"use client";

import { useRef } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";
import {
  ACCESS_BODY,
  ACCESS_SUBJECT,
  CONTACT_EMAIL,
  gmailCompose,
} from "./contact";

const START_HREF = gmailCompose(ACCESS_SUBJECT, ACCESS_BODY);

/**
 * The "presence" — a calm breathing glow with concentric rings and a pupil that
 * holds your gaze, then drifts and settles back. Abstract eye-contact motif that
 * sits behind the headline. Pure GSAP so it respects reduced-motion.
 */
function PresenceOrb({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const q = gsap.utils.selector(ref);

      // Breathing core glow.
      gsap.to(q(".orb-core"), {
        scale: 1.1,
        opacity: 0.95,
        duration: 3.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Outermost ring slowly rotates — a faint sense of a living presence.
      gsap.to(q(".orb-rotor"), {
        rotate: 360,
        duration: 90,
        ease: "none",
        repeat: -1,
      });

      // The pupil holds contact, glances away, then returns to center.
      gsap
        .timeline({ repeat: -1, defaults: { ease: "sine.inOut" } })
        .to(q(".orb-pupil"), { x: 7, y: -4, duration: 2.4 }, "+=1.6")
        .to(q(".orb-pupil"), { x: -6, y: 5, duration: 2.8 }, "+=1.3")
        .to(q(".orb-pupil"), { x: 0, y: 0, duration: 2.2 }, "+=1.8");
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "h-[clamp(380px,72vw,720px)] w-[clamp(380px,72vw,720px)]",
        className,
      )}
    >
      {/* Soft glow */}
      <div
        className="orb-core absolute inset-0 rounded-full opacity-70 will-change-transform"
        style={{
          background:
            "radial-gradient(circle at 50% 46%, rgba(240,192,64,0.42), rgba(240,192,64,0.10) 40%, transparent 66%)",
        }}
      />

      {/* Concentric rings — iris */}
      <div className="absolute inset-[20%] rounded-full border border-accent/25" />
      <div className="absolute inset-[31%] rounded-full border border-accent/20" />
      <div className="absolute inset-[42%] rounded-full border border-[color:var(--color-text)]/10" />

      {/* Slowly rotating dashed ring */}
      <div className="orb-rotor absolute inset-[20%] rounded-full border border-dashed border-[color:var(--color-text)]/10 will-change-transform" />

      {/* Pupil — holds your gaze */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="orb-pupil h-3.5 w-3.5 rounded-full bg-accent shadow-[0_0_24px_6px_rgba(240,192,64,0.45)] will-change-transform" />
      </div>
    </div>
  );
}

export function StopShyHero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-24 text-center"
    >
      <PresenceOrb className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 flex max-w-3xl flex-col items-center">
        <Reveal>
          <p className="label-micro">A conversational confidence trainer</p>
        </Reveal>

        <Reveal delay={90}>
          <h1 className="mt-7 m-0 lowercase font-display font-normal text-[clamp(3.5rem,12vw,9rem)] leading-[0.95] tracking-display">
            stop being <em className="italic text-accent">shy.</em>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mx-auto mt-8 max-w-xl font-display font-normal text-[clamp(1.25rem,2.4vw,1.8rem)] leading-[1.3] text-text/80">
            Five to ten minutes, face to face with an AI that holds your gaze and
            talks back — so the conversations out there stop feeling so heavy.
          </p>
        </Reveal>

        <Reveal delay={320}>
          <div className="mt-11 flex flex-col items-center gap-4">
            <a
              href={START_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-text px-8 py-4 font-body text-[12px] uppercase tracking-[0.14em] text-bg transition-transform duration-300 ease-soft hover:scale-[1.04]"
            >
              Email me to start
              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-300 ease-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <p className="label-micro opacity-70">
              Opens Gmail to{" "}
              <a
                href={START_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-text"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </Reveal>

        <Reveal delay={440}>
          <p className="label-micro mt-9 opacity-70">
            No downloads · No scripts · No one watching
          </p>
        </Reveal>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <ChevronDown size={20} strokeWidth={1.25} className="chevron-bounce" />
      </div>
    </section>
  );
}
