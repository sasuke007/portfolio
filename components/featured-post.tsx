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
}

export function FeaturedPost({ title, excerpt, date, category, slug }: FeaturedPostProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group space-y-3 hover-scale"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden rounded-lg bg-dark-100 transition-all group-hover:shadow-md border border-border/50 glow-border">
        <div className="aspect-video bg-dark-100 shimmer" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>{formatDate(date)}</span>
          <span>•</span>
          <span>{category}</span>
        </div>
        <h3
          className={cn(
            "font-medium leading-tight text-gray-200 transition-all duration-300",
            isHovered && "gradient-text"
          )}
        >
          <Link href={slug}>{title}</Link>
        </h3>
        <p className="text-sm text-gray-400 line-clamp-2">{excerpt}</p>
        <Link
          href={slug}
          className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-primary group"
        >
          Read more <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}
