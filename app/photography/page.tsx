import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { PhotoGallery } from "@/components/photo-gallery"

export const metadata: Metadata = {
  title: "Photography | John Doe",
  description: "A collection of photographs by John Doe.",
}

export default function PhotographyPage() {
  // In a real app, you would fetch this data from a CMS or API
  const categories = [
    {
      title: "Urban Landscapes",
      description: "Cityscapes and architectural photography",
      slug: "urban-landscapes",
      coverImage: "/placeholder.svg?height=600&width=800",
    },
    {
      title: "Nature's Beauty",
      description: "Landscapes and wildlife photography",
      slug: "natures-beauty",
      coverImage: "/placeholder.svg?height=600&width=800",
    },
    {
      title: "Portraits",
      description: "Capturing people and their stories",
      slug: "portraits",
      coverImage: "/placeholder.svg?height=600&width=800",
    },
    {
      title: "Street Photography",
      description: "Candid moments from everyday life",
      slug: "street",
      coverImage: "/placeholder.svg?height=600&width=800",
    },
  ]

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <PageHeader title="Photography" description="Capturing moments through my lens." />
      <PhotoGallery categories={categories} />
    </div>
  )
}
