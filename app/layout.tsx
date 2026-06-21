import type React from "react";
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Geist } from "next/font/google";
import { LenisProvider } from "@/components/LenisProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { NoiseLinesBackground } from "@/components/NoiseLinesBackground";
import { DevTools } from "@/components/dev/DevTools";
import { TooltipProvider } from "@/components/ui/tooltip";
import { identity, socials } from "@/content";
import "./globals.css";
import { cn } from "@/lib/utils";

const SITE_URL = "https://www.anestheticcoder.dev";
const TITLE = "Rohit Pandit — Product Builder & Founder of Replay Chess";
const DESCRIPTION =
  "I build products I wish existed in the world. Founder of Replay Chess, with five years of large-scale engineering behind every release.";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "Rohit Pandit",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(cormorant.variable, inter.variable, "font-sans", geist.variable)}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: `${identity.firstName} ${identity.lastName}`
                .toLowerCase()
                .replace(/\b\w/g, (c) => c.toUpperCase()),
              url: SITE_URL,
              jobTitle: identity.niceRole,
              email: `mailto:${socials.email}`,
            }),
          }}
        />
        <LenisProvider>
          <TooltipProvider delayDuration={120} skipDelayDuration={80}>
            <NoiseLinesBackground className="pointer-events-none fixed inset-0 z-[0]" />
            <CustomCursor />
            <Navbar />
            <main>{children}</main>
          </TooltipProvider>
        </LenisProvider>
        <DevTools />
      </body>
    </html>
  );
}
