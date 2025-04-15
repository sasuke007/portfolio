"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="w-full pt-12 pb-1 md:pt-24 md:pb-2 lg:pt-32 lg:pb-3 xl:pt-48 xl:pb-4 hero-section">
      <div className="container px-4 md:px-6 relative z-10">
        <div className={`flex flex-col items-center space-y-4 text-center ${isLoaded ? "fade-in" : "opacity-0"}`}>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none gradient-text">
              Anesthetic Coder
            </h1>
            <div className="subtitle-container relative py-3 px-8 rounded-lg mt-4">
              <div className="subtitle-bg absolute inset-0 rounded-lg"></div>
              <p className="mx-auto max-w-[700px] text-white md:text-xl relative z-10 font-medium tracking-wide">
                Programmer • Traveler • Photographer 
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
