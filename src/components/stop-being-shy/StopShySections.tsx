"use client";

import {
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Eye,
  HeartHandshake,
  Lock,
  MessageSquare,
  Repeat2,
} from "lucide-react";
import { socials } from "@/content";
import { AnimatedRule } from "@/components/AnimatedRule";
import { Reveal } from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "Sit down for five minutes",
    body: "Open a session the moment the nerves show up. No scheduling, no audience, and no excuses left to hide behind.",
  },
  {
    n: "02",
    title: "Speak, and get met",
    body: "The AI listens, holds your gaze, and answers like a patient stranger who's genuinely curious about what you have to say.",
  },
  {
    n: "03",
    title: "Leave a little braver",
    body: "Each rep softens the reflex. The dread gets quieter, the words come quicker, and the door outside starts to feel lighter.",
  },
];

const FEATURES = [
  {
    Icon: Eye,
    title: "Real eye contact",
    body: "A face that meets your gaze instead of glancing away — so you rehearse the exact part that makes your stomach drop.",
  },
  {
    Icon: AudioLines,
    title: "It talks back, out loud",
    body: "Natural voice, natural pauses. It feels like a conversation, not a questionnaire with a timer running.",
  },
  {
    Icon: HeartHandshake,
    title: "Zero judgement",
    body: "Nobody's keeping score. Fumble, restart, go quiet for a while — the AI just stays with you and waits.",
  },
  {
    Icon: Repeat2,
    title: "Built for repetition",
    body: "Short enough to do every day. Confidence isn't a personality trait — it's reps. This is the gym for them.",
  },
  {
    Icon: MessageSquare,
    title: "Real scenarios",
    body: "Order the coffee, make the small talk, ask them out. Rehearse the moment before you have to live it.",
  },
  {
    Icon: Lock,
    title: "Yours alone",
    body: "Every session stays private. The only person who ever needs to watch you practising is you.",
  },
];

function Why() {
  return (
    <section className="relative mx-auto max-w-(--max-width) px-6 py-24 md:py-32">
      <Reveal>
        <p className="label-micro">Why it works</p>
      </Reveal>
      <Reveal delay={90}>
        <h2 className="mt-6 max-w-4xl m-0 font-display font-normal text-[clamp(1.9rem,4.4vw,3.4rem)] leading-[1.12] tracking-[-0.015em]">
          The fear is real. The stakes,{" "}
          <em className="italic text-accent">for once</em>, aren't. You can't
          think your way out of being shy — but you can practise your way
          through it.
        </h2>
      </Reveal>
    </section>
  );
}

function HowItWorks() {
  return (
    <section
      id="how"
      className="relative mx-auto max-w-(--max-width) scroll-mt-28 px-6 py-24 md:scroll-mt-32 md:py-32"
    >
      <Reveal>
        <p className="label-micro">How it works</p>
      </Reveal>
      <Reveal delay={90}>
        <h2 className="mt-6 max-w-2xl m-0 font-display font-normal text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.1] tracking-[-0.015em]">
          Three steps to a <em className="italic text-accent">steadier</em>{" "}
          voice.
        </h2>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <Reveal key={step.n} delay={i * 110}>
            <div className="flex flex-col">
              <span className="font-display text-[clamp(2.5rem,5vw,3.5rem)] leading-none text-accent">
                {step.n}
              </span>
              <AnimatedRule className="mt-5 text-text" delay={i * 110 + 200} />
              <h3 className="mt-5 font-display font-normal text-[1.5rem] leading-[1.2] tracking-[-0.01em]">
                {step.title}
              </h3>
              <p className="body-editorial mt-3 normal-case tracking-normal text-[14px] leading-[1.65]">
                {step.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="relative mx-auto max-w-(--max-width) px-6 py-24 md:py-32">
      <Reveal>
        <p className="label-micro">What's inside</p>
      </Reveal>
      <Reveal delay={90}>
        <h2 className="mt-6 max-w-2xl m-0 font-display font-normal text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.1] tracking-[-0.015em]">
          A patient room to{" "}
          <em className="italic text-accent">get it wrong</em> in.
        </h2>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, i) => (
          <Reveal key={feature.title} delay={(i % 3) * 100}>
            <div className="flex flex-col">
              <feature.Icon
                size={26}
                strokeWidth={1.25}
                className="text-accent"
              />
              <h3 className="mt-5 font-display font-normal text-[1.4rem] leading-[1.2] tracking-[-0.01em]">
                {feature.title}
              </h3>
              <p className="body-editorial mt-2.5 normal-case tracking-normal text-[14px] leading-[1.65]">
                {feature.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ClosingCTA() {
  const requestAccess = `mailto:${socials.email}?subject=${encodeURIComponent(
    "Stop Being Shy — early access",
  )}&body=${encodeURIComponent(
    "Hey Rohit — I'd like to try Stop Being Shy when it opens up.",
  )}`;

  return (
    <section
      id="start"
      className="relative mx-auto max-w-(--max-width) scroll-mt-28 px-6 py-32 md:scroll-mt-32 md:py-44"
    >
      <div className="flex flex-col items-center text-center">
        <Reveal>
          <p className="label-micro">Get started</p>
        </Reveal>
        <Reveal delay={90}>
          <h2 className="mt-6 m-0 max-w-3xl lowercase font-display font-normal text-[clamp(2.6rem,7vw,5.5rem)] leading-[1.02] tracking-display">
            your next conversation is{" "}
            <em className="italic text-accent">waiting</em>.
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="body-editorial mt-7 max-w-md normal-case tracking-normal text-[15px] leading-[1.7]">
            Stop Being Shy is in private beta. Send me a note and I'll hand you
            the keys to the first sessions.
          </p>
        </Reveal>

        <Reveal delay={320}>
          <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row">
            <a
              href={requestAccess}
              className="group inline-flex items-center gap-2 rounded-full bg-text px-7 py-3.5 font-body text-[12px] uppercase tracking-[0.14em] text-bg transition-transform duration-300 ease-soft hover:scale-[1.04]"
            >
              Request early access
              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-300 ease-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              href="/"
              className="link-underline inline-flex items-center gap-1.5 font-body text-[12px] uppercase tracking-[0.14em] text-text"
            >
              <ArrowRight size={14} strokeWidth={1.5} className="rotate-180" />
              Back to the portfolio
            </a>
          </div>
        </Reveal>
      </div>

      <footer className="mt-32 flex items-center justify-between border-t border-border pt-6">
        <p className="label-micro m-0">&copy; 2026 Rohit Pandit</p>
        <p className="label-micro m-0">Stop Being Shy · Private beta</p>
      </footer>
    </section>
  );
}

export function StopShySections() {
  return (
    <>
      <Why />
      <HowItWorks />
      <Features />
      <ClosingCTA />
    </>
  );
}
