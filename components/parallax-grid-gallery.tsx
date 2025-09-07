"use client"

import { useState, useRef } from "react"
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react"
import Image from "next/image"
import { UnsplashPhotoPopup, UnsplashPhoto } from "./unsplash-photo-popup"

export type ParallaxPhotos = {
  id: string | undefined
  title: string
  description: string
  category: string
  src: string
  className?: string
}

export const ParallaxGridGallery = ({ photos }: { photos: ParallaxPhotos[] }) => {
  const [selected, setSelected] = useState<UnsplashPhoto | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Increase the intensity of these values for stronger parallax effect
  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200])
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 150])
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -500])

  // Split photos into three columns
  const third = Math.ceil(photos.length / 3)
  const firstColumn = photos.slice(0, third)
  const secondColumn = photos.slice(third, 2 * third)
  const thirdColumn = photos.slice(2 * third)

  const handleClick = (photo: ParallaxPhotos) => {
    // Convert ParallaxPhotos to UnsplashPhoto format
    const unsplashPhoto: UnsplashPhoto = {
      id: photo.id,
      title: photo.title,
      description: photo.description,
      category: photo.category,
      src: photo.src,
      photographer: {
        name: "Rohit Pandit",
        username: "rohitpandit",
        avatar: "/profile_photo.jpeg" // Using the existing profile photo
      },
      stats: {
        views: Math.floor(Math.random() * 500000) + 50000, // Random but realistic views
        downloads: Math.floor(Math.random() * 10000) + 1000, // Random but realistic downloads
      },
      metadata: {
        location: "Mumbai, India", // You can make this dynamic per photo if needed
        publishedDate: "3 weeks ago", // You can make this dynamic if you have creation dates
        camera: "SONY, ILCE-7RM3", // Default camera, can be made dynamic
        license: "Free to use under the Unsplash License"
      }
    }
    setSelected(unsplashPhoto)
  }

  const handleClose = () => {
    setSelected(null)
  }

  return (
    <div className="relative min-h-screen bg-dark-300" ref={containerRef}>
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-radial from-dark-200/30 via-dark-300/50 to-dark-300 z-0"></div>

      {/* Main container */}
      <div className="relative z-10 py-12 px-4 max-w-7xl mx-auto">
        {/* Gallery grid - further reduced gap */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {/* First column - Apply motion to the entire column */}
          <motion.div key="first-column" className="space-y-2" style={{ y: translateFirst }}>
            {firstColumn.map((photo) => (
              <motion.div
                key={photo.id}
                className="relative overflow-hidden rounded-lg border border-border/50 shimmer hover-scale cursor-pointer group"
                onClick={() => handleClick(photo)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div key={`card-inner-${photo.id}`} layoutId={`card-${photo.id}`} className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={photo.src || "/placeholder.svg"}
                    alt={photo.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={(Math.random()*10) < 3}
                  />
                  <div key={`overlay-${photo.id}`} className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div key={`content-${photo.id}`} className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-lg font-semibold gradient-text mb-1 drop-shadow-lg">{photo.title}</h3>
                    <p className="text-sm text-white/90 drop-shadow-md">{photo.category}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Second column - Apply motion to the entire column */}
          <motion.div key="second-column" className="space-y-2 mt-[-80px]" style={{ y: translateSecond }}>
            {secondColumn.map((photo) => (
              <motion.div
                key={photo.id}
                className="relative overflow-hidden rounded-lg border border-border/50 shimmer hover-scale cursor-pointer group"
                onClick={() => handleClick(photo)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div key={`card-inner-${photo.id}`} layoutId={`card-${photo.id}`} className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={photo.src || "/placeholder.svg"}
                    alt={photo.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={(Math.random()*10) < 6 && (Math.random()*10) >= 3}
                  />
                  <div key={`overlay-${photo.id}`} className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div key={`content-${photo.id}`} className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-lg font-semibold gradient-text mb-1 drop-shadow-lg">{photo.title}</h3>
                    <p className="text-sm text-white/90 drop-shadow-md">{photo.category}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Third column - Apply motion to the entire column */}
          <motion.div key="third-column" className="space-y-2 mt-[40px]" style={{ y: translateThird }}>
            {thirdColumn.map((photo) => (
              <motion.div
                key={photo.id}
                className="relative overflow-hidden rounded-lg border border-border/50 shimmer hover-scale cursor-pointer group"
                onClick={() => handleClick(photo)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div key={`card-inner-${photo.id}`} layoutId={`card-${photo.id}`} className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={photo.src || "/placeholder.svg"}
                    alt={photo.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={(Math.random()*10) < 9 && (Math.random()*10) >= 6}
                  />
                  <div key={`overlay-${photo.id}`} className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div key={`content-${photo.id}`} className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-lg font-semibold gradient-text mb-1 drop-shadow-lg">{photo.title}</h3>
                    <p className="text-sm text-white/90 drop-shadow-md">{photo.category}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Unsplash-style photo popup */}
      <UnsplashPhotoPopup 
        photo={selected} 
        onClose={handleClose} 
      />
    </div>
  )
}
