import { cn } from "@/lib/utils";

// Common card styles
export const cardStyles = "rounded-lg bg-dark-100/40 border border-border/20 hover:border-border/40 transition-all";

// Common section styles
export const sectionStyles = "w-full py-1 md:py-2 lg:py-3";
export const sectionStylesAlt = "w-full py-1 md:py-2 lg:py-3 bg-dark-200/50";

// Common gradient styles
export const gradientOverlay = "bg-gradient-to-r from-[#9333ea]/3 via-[#3b82f6]/3 to-[#06b6d4]/3";

// Common container styles
export const containerStyles = "container px-4 md:px-6";

// Common heading styles
export const headingStyles = (size: 'sm' | 'md' | 'lg' = 'md') => {
  const baseStyles = "font-bold tracking-tighter";
  
  const sizeClasses = {
    sm: "text-xl sm:text-2xl",
    md: "text-2xl sm:text-3xl md:text-4xl",
    lg: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl/none"
  };
  
  return cn(baseStyles, sizeClasses[size]);
};

// Common button styles
export const buttonGlowPurple = "rounded-full border-glow-purple hover:border-transparent hover:bg-glow-purple/10 hover-scale";
export const buttonGlowBlue = "rounded-full border-glow-blue hover:border-transparent hover:bg-glow-blue/10 hover-scale";

// Common grid layouts
export const gridLayouts = {
  standard: "grid grid-cols-1 gap-6",
  tablet: "grid grid-cols-1 gap-6 md:grid-cols-2",
  desktop: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
  gallery: "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
}; 