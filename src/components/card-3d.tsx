"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ElementType,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { cn } from "@/lib/cn";

/**
 * React port of inspira-ui's `card-3d` (CardContainer / CardBody / CardItem).
 * The Vue original shares its "mouse entered" state through provide/inject; here
 * that's a small React context. Two additions let a touch carousel reuse the
 * same primitives without a real pointer hover:
 *   - `innerRef` lets the parent own the tilting element and write its transform
 *     directly each frame (no mousemove on touch).
 *   - `forceEntered` keeps `CardItem` children "popped out" without mouseenter.
 */

const Card3DContext = createContext<{ isMouseEntered: boolean }>({
  isMouseEntered: false,
});

type CardContainerProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  /** When set, the parent owns this element's transform (carousel drag). */
  innerRef?: RefObject<HTMLDivElement | null>;
  /** Seed "entered" so CardItem children stay lifted without a hover. */
  forceEntered?: boolean;
};

export function CardContainer({
  children,
  className,
  containerClassName,
  innerRef,
  forceEntered = false,
}: CardContainerProps) {
  const localRef = useRef<HTMLDivElement>(null);
  const ref = innerRef ?? localRef;
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  // When the parent drives the transform we skip the built-in hover tilt.
  const controlled = innerRef != null;

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    el.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  }

  function handleMouseEnter() {
    setIsMouseEntered(true);
  }

  function handleMouseLeave() {
    const el = ref.current;
    setIsMouseEntered(false);
    if (el) el.style.transform = `rotateY(0deg) rotateX(0deg)`;
  }

  return (
    <Card3DContext.Provider
      value={{ isMouseEntered: forceEntered || isMouseEntered }}
    >
      <div
        className={cn("flex items-center justify-center", containerClassName)}
        style={{ perspective: "1000px" }}
      >
        <div
          ref={ref}
          onMouseEnter={controlled ? undefined : handleMouseEnter}
          onMouseMove={controlled ? undefined : handleMouseMove}
          onMouseLeave={controlled ? undefined : handleMouseLeave}
          className={cn(
            "relative flex items-center justify-center transition-all duration-200 ease-linear",
            className,
          )}
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </div>
      </div>
    </Card3DContext.Provider>
  );
}

export function CardBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)} style={{ transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
}

type CardItemProps = {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
  translateX?: number;
  translateY?: number;
  translateZ?: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
} & Record<string, unknown>;

export function CardItem({
  as: Tag = "div",
  className,
  children,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: CardItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { isMouseEntered } = useContext(Card3DContext);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = isMouseEntered
      ? `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
      : "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)";
  }, [
    isMouseEntered,
    translateX,
    translateY,
    translateZ,
    rotateX,
    rotateY,
    rotateZ,
  ]);

  return (
    <Tag
      ref={ref}
      className={cn("w-fit transition duration-500 ease-in-out", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
