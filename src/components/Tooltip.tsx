"use client";

import type { ReactNode } from "react";
import {
  Tooltip as ShadTooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Tooltip({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <ShadTooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex">{children}</span>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        align="center"
        sideOffset={-3}
        avoidCollisions={false}
        className="font-body text-[10px] uppercase tracking-[0.08em]"
      >
        {label}
      </TooltipContent>
    </ShadTooltip>
  );
}
