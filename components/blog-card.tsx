import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

interface BlogCardProps {
  title: string
  excerpt: string
  date: string
  category: string
  slug: string
  coverImage: string
}

export function BlogCard({ title, excerpt, date, category, slug, coverImage }: BlogCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border/50 bg-dark-100 transition-all hover:shadow-md glow-border hover-scale">
      <Link href={slug} className="overflow-hidden">
        <Image
          src={coverImage || "/placeholder.svg"}
          alt={title}
          width={600}
          height={400}
          className="aspect-video h-auto w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </Link>
      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{date}</span>
            <span>•</span>
            <span>{category}</span>
          </div>
          <h3 className="font-medium leading-tight group-hover:gradient-text transition-all duration-300">
            <Link href={slug}>{title}</Link>
          </h3>
          <p className="text-sm text-gray-400 line-clamp-3">{excerpt}</p>
        </div>
        <Link
          href={slug}
          className="mt-4 inline-flex items-center text-sm font-medium text-gray-400 hover:text-primary group"
        >
          Read more <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}
