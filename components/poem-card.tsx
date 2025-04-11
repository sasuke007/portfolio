import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface PoemCardProps {
  title: string
  excerpt: string
  date: string
  slug: string
}

export function PoemCard({ title, excerpt, date, slug }: PoemCardProps) {
  return (
    <div className="group p-6 bg-dark-100 rounded-lg border border-border/50 transition-all hover:shadow-md glow-border hover-scale">
      <div className="space-y-3">
        <div className="text-sm text-gray-500">{date}</div>
        <h3 className="text-xl font-medium text-gray-200 group-hover:gradient-text transition-all duration-300">
          <Link href={slug}>{title}</Link>
        </h3>
        <p className="text-gray-400 italic whitespace-pre-line line-clamp-4">{excerpt}</p>
        <Link
          href={slug}
          className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-primary group"
        >
          Read full poem{" "}
          <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}
