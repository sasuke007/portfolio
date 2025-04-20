"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface FeaturedWorkProps {
  image: string
  title: string
  slug?: string
}

export function FeaturedPhotos({ image, title, slug: photosPage = "/photography" }: FeaturedWorkProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  // TODO: If image is not available, use shimmer not gradient
  return (
    <Link href={photosPage} className="group hover-scale"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className="overflow-hidden rounded-lg transition-all group-hover:shadow-md border border-border/50 bg-dark-100 shimmer">
        <Image
          src={image}
          alt={title}
          width={600}
          height={400}
          className={`aspect-[4/3] h-auto w-full object-cover transition-transform duration-500 group-hover:scale-110 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setIsLoaded(true)}
        />
      </div>
      <h3 className={cn(`mt-2 text-sm font-medium group-hover:gradient-text transition-all duration-300`,`gradient-text`)}>
        {title}
      </h3>
    </Link>
  )
}
