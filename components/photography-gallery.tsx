"use client"

import { useEffect, useState } from "react"
import { ParallaxGridGallery, ParallaxPhotos } from "@/components/parallax-grid-gallery"

export function PhotographyGallery({ photos }: { photos: ParallaxPhotos[] }) {
    return (
        <ParallaxGridGallery photos={photos} />
    )
}