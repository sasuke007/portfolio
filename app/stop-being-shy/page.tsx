import type { Metadata } from "next";
import { StopShyHero } from "@/components/stop-being-shy/StopShyHero";
import { StopShySections } from "@/components/stop-being-shy/StopShySections";

const TITLE = "Stop Being Shy — Practise the conversation before you live it";
const DESCRIPTION =
  "A conversational AI you can talk to face to face. Five to ten minutes a day of real eye contact and back-and-forth — confidence training to outgrow the fear of speaking to people.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/stop-being-shy" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/stop-being-shy",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function StopBeingShyPage() {
  return (
    <>
      <StopShyHero />
      <StopShySections />
    </>
  );
}
