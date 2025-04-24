"use client"

import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

// Predefine image data to avoid recreating objects during renders
const HERO_IMAGES = [
  { src: "/nature_lover.jpeg", alt: "Good lighting portrait" },
  { src: "/good_lighting.jpeg", alt: "Nature lover" },
  { src: "/stylish_pic.jpeg", alt: "Stylish portrait" },
]

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, []);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
      {/* Image Collage */}
      <div className="absolute inset-0 w-full h-full flex">
        {HERO_IMAGES.map((image, index) => (
          <div key={index} className="w-1/3 h-full relative">
            <Image
              src={image.src}
              alt={``}
              height={1000}
              width={1000}
              sizes="33vw"
              className="object-cover"
              priority
              loading="eager"
            />
            <div className="absolute inset-0 bg-dark-300/60"></div>
          </div>
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-300/80 via-dark-300/50 to-dark-300"></div>

      {/* Updated Content with new styling */}
      <div className="container px-4 md:px-6 relative z-10">
        <div className={`flex flex-col items-center space-y-4 text-center ${isLoaded ? "slow-fade-in" : "opacity-0"}`}>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none gradient-text">
              Rohit Pandit
            </h1>
            <div className="subtitle-container relative py-3 px-8 rounded-lg mt-4">
              <div className="subtitle-bg absolute inset-0 rounded-lg"></div>
              <p className="mx-auto max-w-[700px] text-white md:text-xl relative z-10 font-medium tracking-wide">
                Writer • Photographer • Filmmaker
              </p>
            </div>
          </div>
          <div className="space-x-4 mt-6">
            <Link href="/about">
              <Button
                variant="outline"
                className="rounded-full border-glow-purple hover:border-transparent hover:bg-glow-purple/10 hover-scale"
              >
                About Me
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="rounded-full border-glow-blue hover:border-transparent hover:bg-glow-blue/10 hover-scale"
              >
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
