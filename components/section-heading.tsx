import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface SectionHeadingProps {
  title: string
  description: string
  link?: string
  linkText?: string
}

export function SectionHeading({ title, description, link, linkText }: SectionHeadingProps) {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl gradient-text">{title}</h2>
        <p className="text-gray-400">{description}</p>
      </div>
      {link && linkText && (
        <Link
          href={link}
          className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-primary group"
        >
          {linkText} <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  )
}
