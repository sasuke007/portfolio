"use client"

import { useState, useRef } from "react"
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react"
import Image from "next/image"

export type ParallaxPhotos = {
  id: number
  title: string
  description: string
  category: string
  src: string
  className?: string
}

export const ParallaxGridGallery = ({ photos }: { photos: ParallaxPhotos[] }) => {
  const [selected, setSelected] = useState<ParallaxPhotos | null>(null)
  const [lastSelected, setLastSelected] = useState<ParallaxPhotos | null>(null)
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
    setLastSelected(selected)
    setSelected(photo)
  }

  const handleOutsideClick = () => {
    setLastSelected(selected)
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
          <motion.div className="space-y-2" style={{ y: translateFirst }}>
            {firstColumn.map((photo) => (
              <motion.div
                key={photo.id}
                className="relative overflow-hidden rounded-lg border border-border/50 shimmer hover-scale"
                onClick={() => handleClick(photo)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div layoutId={`card-${photo.id}`} className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={photo.src || "/placeholder.svg"}
                    alt={photo.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={photo.id < 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-300/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-lg font-medium gradient-text">{photo.title}</h3>
                    <p className="text-sm gradient-text">{photo.category}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Second column - Apply motion to the entire column */}
          <motion.div className="space-y-2 mt-[-80px]" style={{ y: translateSecond }}>
            {secondColumn.map((photo) => (
              <motion.div
                key={photo.id}
                className="relative overflow-hidden rounded-lg border border-border/50 shimmer hover-scale"
                onClick={() => handleClick(photo)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div layoutId={`card-${photo.id}`} className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={photo.src || "/placeholder.svg"}
                    alt={photo.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={photo.id < 6 && photo.id >= 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-300/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-lg font-medium gradient-text">{photo.title}</h3>
                    <p className="text-sm gradient-text">{photo.category}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Third column - Apply motion to the entire column */}
          <motion.div className="space-y-2 mt-[40px]" style={{ y: translateThird }}>
            {thirdColumn.map((photo) => (
              <motion.div
                key={photo.id}
                className="relative overflow-hidden rounded-lg border border-border/50 shimmer hover-scale"
                onClick={() => handleClick(photo)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div layoutId={`card-${photo.id}`} className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={photo.src || "/placeholder.svg"}
                    alt={photo.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={photo.id < 9 && photo.id >= 6}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-300/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-lg font-medium gradient-text">{photo.title}</h3>
                    <p className="text-sm gradient-text">{photo.category}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Expanded photo view */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-dark-300 z-50"
              onClick={handleOutsideClick}
            />
            <motion.div
              layoutId={`card-${selected.id}`}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
            >
              <motion.div
                className="relative w-full max-w-4xl bg-dark-200 rounded-lg overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative aspect-[16/9] md:aspect-[21/9]">
                  <Image
                    src={selected.src || "/placeholder.svg"}
                    alt={selected.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    priority
                  />
                </div>
                <div className="p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-2">{selected.title}</h2>
                  <p className="text-sm text-gray-400 mb-4">{selected.category}</p>
                  <p className="text-gray-300">{selected.description}</p>
                </div>
                <button
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-dark-300/80 flex items-center justify-center text-white hover:bg-dark-100 transition-colors"
                  onClick={handleOutsideClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
