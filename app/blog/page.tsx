import type { Metadata } from "next"
import { BlogCard } from "@/components/blog-card"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Blog | John Doe",
  description: "Thoughts, stories, and ideas from John Doe.",
}

export default function BlogPage() {
  // In a real app, you would fetch this data from a CMS or API
  const posts = [
    {
      title: "The Art of Minimalism",
      excerpt: "Exploring how less can truly be more in design and life.",
      date: "April 2, 2023",
      category: "Design",
      slug: "/blog/the-art-of-minimalism",
      coverImage: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "A Journey Through Iceland",
      excerpt: "Documenting my travels through the land of fire and ice.",
      date: "March 15, 2023",
      category: "Travel",
      slug: "/blog/journey-through-iceland",
      coverImage: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "The Future of Digital Content",
      excerpt: "How technology is reshaping the way we consume media.",
      date: "February 28, 2023",
      category: "Technology",
      slug: "/blog/future-of-digital-content",
      coverImage: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Sustainable Living in the Modern World",
      excerpt: "Practical tips for reducing your environmental footprint.",
      date: "February 15, 2023",
      category: "Lifestyle",
      slug: "/blog/sustainable-living",
      coverImage: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "The Psychology of Color in Design",
      excerpt: "Understanding how colors affect our perceptions and emotions.",
      date: "January 30, 2023",
      category: "Design",
      slug: "/blog/psychology-of-color",
      coverImage: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Building a Personal Brand Online",
      excerpt: "Strategies for creating an authentic presence in the digital world.",
      date: "January 15, 2023",
      category: "Career",
      slug: "/blog/personal-brand-online",
      coverImage: "/placeholder.svg?height=400&width=600",
    },
  ]

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <PageHeader title="Blog" description="Thoughts, stories, and ideas." />
      <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <BlogCard
            key={index}
            title={post.title}
            excerpt={post.excerpt}
            date={post.date}
            category={post.category}
            slug={post.slug}
            coverImage={post.coverImage}
          />
        ))}
      </div>
    </div>
  )
}
