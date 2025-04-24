import { PageHeader } from "@/components/page-header"
import { ParallaxPhotos } from "@/components/parallax-grid-gallery"

import { PhotographyGallery } from "@/components/photography-gallery"
import { getAllPhotos, getHighlightedPhotos } from "@/lib/services/photo.service"

export default async function PhotographyPage() {
  const photos = await getAllPhotos();

  // Map PhotoDTO to the Photo type expected by ParallaxGridGallery
  const galleryPhotos: ParallaxPhotos[] = photos.map(photo => ({
    id: photo.id,
    title: photo.title || "Untitled",
    description: photo.description || "",
    category: photo.tags?.[0]?.tag?.name || "Uncategorized",
    src: photo.image_url,
    className: ""
  }))

  return (
    <div className="min-h-screen bg-dark-300">
      <div className="container px-4 py-8 md:py-16">
        <PageHeader
          title="Photography"
          description="Capturing moments through my lens — a visual journey through landscapes, people, and stories."
        />
      </div>
      <PhotographyGallery photos={galleryPhotos} />
    </div>
  )

}
