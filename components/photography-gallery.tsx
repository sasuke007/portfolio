"use client"

import { ParallaxGridGallery, ParallaxPhotos } from "@/components/parallax-grid-gallery"

export function PhotographyGallery({ photos }: { photos: ParallaxPhotos[] }) {
    return (
        <ParallaxGridGallery photos={photos} />
    )
}