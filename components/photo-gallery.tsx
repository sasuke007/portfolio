import Link from "next/link"
import Image from "next/image"

interface Category {
  title: string
  description: string
  slug: string
  coverImage: string
}

interface PhotoGalleryProps {
  categories: Category[]
}

export function PhotoGallery({ categories }: PhotoGalleryProps) {
  return (
    <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2">
      {categories.map((category, index) => (
        <Link key={index} href={`/photography/${category.slug}`} className="group">
          <div className="overflow-hidden rounded-lg transition-all group-hover:shadow-md border border-border/50 glow-border">
            <Image
              src={category.coverImage || "/placeholder.svg"}
              alt={category.title}
              width={800}
              height={600}
              className="aspect-[4/3] h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="mt-4 space-y-1">
            <h3 className="text-xl font-medium text-gray-200 group-hover:text-primary">{category.title}</h3>
            <p className="text-sm text-gray-400">{category.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
