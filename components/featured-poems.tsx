import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface PoemCardProps {
  title: string
  content: string
  date: string
  slug: string
}

export function FeaturedPoems({ title, content, date, slug }: PoemCardProps) {
  return (
    <div className="group p-4 bg-dark-100 rounded-lg border border-border/50 transition-all hover:shadow-md hover-scale">
      <div className="space-y-3">
        <div className="text-sm text-gray-500">{date}</div>
        <h3 className="text-xl font-medium gradient-text transition-all duration-300">
          <Link href={`/poem/${slug}`}>{title}</Link>
        </h3>
        <p className="text-gray-400 italic whitespace-pre-line line-clamp-3">{content}</p>
        <Link
          href={slug}
          className="inline-flex items-center text-sm font-medium text-gray-400"
        >
          Read full poem
          <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}
