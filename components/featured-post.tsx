"use client"

import { cn, formatDate } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface FeaturedPostProps {
  title: string
  excerpt: string
  date: Date
  category: string
  slug: string
  featured_image_url?: string
}

export function FeaturedPost({
  title,
  excerpt,
  date,
  category,
  slug,
  featured_image_url
}: FeaturedPostProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link href={`/blog/${slug}`} className="group hover-scale"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <article className="flex flex-col h-full overflow-hidden rounded-lg bg-card text-card-foreground shadow transition-all hover:shadow-md group-hover:shadow-md">
        <div className={cn("flex flex-col md:flex-row p-6 h-full group-hover:scale-105 transition-transform duration-500")}>
          <div className="flex flex-col flex-1 pr-0 md:pr-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                {category}
              </span>
              <time className="text-xs text-muted-foreground">
                {formatDate(date)}
              </time>
            </div>
            <h3 className="text-xl font-bold mb-2 line-clamp-2 gradient-text">{title}</h3>
            <p className="text-muted-foreground mb-4 flex-1 line-clamp-3">
              {excerpt}
            </p>
            <div className="mt-auto">
              <span className="text-sm font-medium text-primary hover:underline">
                Read more →
              </span>
            </div>
          </div>

          {featured_image_url && (
            <div className="mt-4 md:mt-0 md:ml-auto md:w-1/3 md:flex md:items-center h-24 md:h-auto flex-shrink-0 rounded-md overflow-hidden shimmer">
              <img
                src={featured_image_url}
                className="w-full h-full object-cover border-0 outline-none"
                alt={` `}
              />
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}
