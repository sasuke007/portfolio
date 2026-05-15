"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
  type PanInfo,
} from "motion/react";
import { cn } from "@/lib/cn";
import type {
  ContributionCalendar,
  ContributionLevel,
  ContributionWeek,
  YearsData,
} from "@/lib/github-contributions";

function bucketClass(level: ContributionLevel): string {
  switch (level) {
    case "FIRST_QUARTILE":
      return "bg-accent/30";
    case "SECOND_QUARTILE":
      return "bg-accent/55";
    case "THIRD_QUARTILE":
      return "bg-accent/80";
    case "FOURTH_QUARTILE":
      return "bg-accent";
    case "NONE":
    default:
      return "bg-text/[0.07]";
  }
}

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

type YearItem = {
  year: number;
  calendar: ContributionCalendar;
};

function CarouselItem({
  item,
  index,
  itemWidth,
  trackItemOffset,
  x,
  transition,
  maxWeeks,
  isActive,
  profileUrl,
}: {
  item: YearItem;
  index: number;
  itemWidth: number;
  trackItemOffset: number;
  x: MotionValue<number>;
  transition: typeof SPRING_OPTIONS | { duration: number };
  maxWeeks: number;
  isActive: boolean;
  profileUrl: string;
}) {
  const range = [
    -(index + 1) * trackItemOffset,
    -index * trackItemOffset,
    -(index - 1) * trackItemOffset,
  ];
  const outputRange = [90, 0, -90];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  const paddedWeeks = useMemo<ContributionWeek[]>(() => {
    const weeks = [...item.calendar.weeks];
    while (weeks.length < maxWeeks) {
      weeks.push({
        contributionDays: Array.from({ length: 7 }, () => ({
          contributionCount: 0,
          contributionLevel: "NONE" as const,
          date: "",
        })),
      });
    }
    return weeks;
  }, [item.calendar.weeks, maxWeeks]);

  return (
    <motion.div
      className="relative shrink-0 flex flex-col items-start justify-between rounded-[12px] border border-border bg-bg overflow-hidden cursor-grab active:cursor-grabbing"
      style={{
        width: itemWidth,
        height: "100%",
        rotateY,
      }}
      transition={transition}
    >
      <div className="flex w-full items-baseline justify-between gap-4 p-5 pb-3">
        <span className="font-display italic text-accent text-[clamp(1.8rem,3vw,2.6rem)] leading-none">
          {item.year}
        </span>
        <span className="font-display italic text-[clamp(0.85rem,1.05vw,1rem)] text-muted">
          <em className="not-italic font-normal text-accent">
            {item.calendar.totalContributions.toLocaleString()}
          </em>{" "}
          contributions
        </span>
      </div>

      <div className="flex w-full gap-[3px] px-5">
        {paddedWeeks.map((week, wi) => (
          <div key={wi} className="flex flex-1 flex-col gap-[3px]">
            {week.contributionDays.map((day, di) => (
              <span
                key={`${wi}-${di}`}
                className={cn(
                  "block aspect-square rounded-[2px]",
                  bucketClass(day.contributionLevel),
                )}
                title={
                  day.date
                    ? `${day.contributionCount} ${
                        day.contributionCount === 1
                          ? "contribution"
                          : "contributions"
                      } on ${day.date}`
                    : undefined
                }
              />
            ))}
          </div>
        ))}
      </div>

      <a
        href={profileUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open GitHub profile`}
        tabIndex={isActive ? 0 : -1}
        className={cn(
          "mt-4 px-5 pb-5 font-display italic text-[clamp(0.85rem,1.05vw,1rem)] text-muted underline-offset-4 hover:text-accent hover:underline",
          !isActive && "pointer-events-none",
        )}
        draggable={false}
      >
        view on github →
      </a>
    </motion.div>
  );
}

export function GithubContributionsCarousel({
  yearsData,
  profileUrl,
  baseWidth = 960,
}: {
  yearsData: YearsData;
  profileUrl: string;
  baseWidth?: number;
}) {
  const items = useMemo<YearItem[]>(
    () =>
      Object.keys(yearsData)
        .map(Number)
        .sort((a, b) => b - a)
        .map((year) => ({ year, calendar: yearsData[year] })),
    [yearsData],
  );

  const maxWeeks = useMemo(
    () => Math.max(...Object.values(yearsData).map((c) => c.weeks.length)),
    [yearsData],
  );

  const itemWidth = baseWidth;
  const trackItemOffset = itemWidth + GAP;

  const [position, setPosition] = useState(0);
  const x = useMotionValue(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    setPosition(0);
    x.set(0);
  }, [items.length, trackItemOffset, x]);

  const effectiveTransition = reducedMotion
    ? { duration: 0 }
    : SPRING_OPTIONS;

  function handleDragEnd(
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) {
    const { offset, velocity } = info;
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
          ? -1
          : 0;
    if (direction === 0) return;
    setPosition((prev) => {
      const next = prev + direction;
      const max = items.length - 1;
      return Math.max(0, Math.min(next, max));
    });
  }

  const dragProps = {
    dragConstraints: {
      left: -trackItemOffset * Math.max(items.length - 1, 0),
      right: 0,
    },
  };

  return (
    <div
      ref={containerRef}
      className="relative mx-auto"
      style={{ width: `${baseWidth}px`, maxWidth: "100%" }}
    >
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          drag={isAnimating ? false : "x"}
          {...dragProps}
          style={{
            width: itemWidth,
            gap: `${GAP}px`,
            perspective: 1000,
            perspectiveOrigin: `${
              position * trackItemOffset + itemWidth / 2
            }px 50%`,
            x,
          }}
          onDragEnd={handleDragEnd}
          animate={{ x: -(position * trackItemOffset) }}
          transition={effectiveTransition}
          onAnimationStart={() => setIsAnimating(true)}
          onAnimationComplete={() => setIsAnimating(false)}
        >
          {items.map((item, index) => (
            <CarouselItem
              key={item.year}
              item={item}
              index={index}
              itemWidth={itemWidth}
              trackItemOffset={trackItemOffset}
              x={x}
              transition={effectiveTransition}
              maxWeeks={maxWeeks}
              isActive={index === position}
              profileUrl={profileUrl}
            />
          ))}
        </motion.div>
      </div>

      <div className="mt-6 flex w-full justify-center gap-3 py-1">
        {items.map((item, index) => (
          <motion.button
            key={item.year}
            type="button"
            aria-label={`Go to ${item.year}`}
            className={cn(
              "h-2 w-2 rounded-full transition-colors duration-150",
              index === position ? "bg-accent" : "bg-border",
            )}
            animate={{ scale: index === position ? 1.3 : 1 }}
            onClick={() => setPosition(index)}
            transition={{ duration: 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}
