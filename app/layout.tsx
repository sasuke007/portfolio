import type React from "react";
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { LenisProvider } from "@/components/LenisProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { NoiseLinesBackground } from "@/components/NoiseLinesBackground";
import { DevTools } from "@/components/dev/DevTools";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"] as const,
  weight: ["400", "600"] as const,
  style: ["normal", "italic"] as const,
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"] as const,
  weight: ["300", "400", "500"] as const,
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rohit Pandit — Full Stack Engineer & AI Product Builder",
  description:
    "Crafting elegant systems at the intersection of code, design, and intelligence.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <LenisProvider>
          <NoiseLinesBackground className="pointer-events-none fixed inset-0 z-[0]" />
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
        </LenisProvider>
        <DevTools />
      </body>
    </html>
  );
}
