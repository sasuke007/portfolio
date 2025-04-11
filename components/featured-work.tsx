"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

interface FeaturedWorkProps {
  image: string
  title: string
  slug: string
}

export function FeaturedWork({ image, title, slug }: FeaturedWorkProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <Link href={slug} className="group hover-scale">
      <div className="overflow-hidden rounded-lg transition-all group-hover:shadow-md border border-border/50 glow-border">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={600}
          height={400}
          className={`aspect-[4/3] h-auto w-full object-cover transition-transform duration-500 group-hover:scale-110 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setIsLoaded(true)}
        />
      </div>
      <h3 className="mt-2 text-sm font-medium text-gray-300 group-hover:gradient-text transition-all duration-300">
        {title}
      </h3>
    </Link>
  )
}
