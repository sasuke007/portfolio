"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "motion/react"
import Image from "next/image"
import { Download, Heart, Plus, Share, Info, MapPin, Calendar, Camera, Shield } from "lucide-react"

export type UnsplashPhoto = {
  id: string | undefined
  title: string
  description: string
  category: string
  src: string
  photographer?: {
    name: string
    username: string
    avatar: string
  }
  stats?: {
    views: number
    downloads: number
  }
  metadata?: {
    location?: string
    publishedDate?: string
    camera?: string
    license?: string
  }
}

interface UnsplashPhotoPopupProps {
  photo: UnsplashPhoto | null
  onClose: () => void
}

export function UnsplashPhotoPopup({ photo, onClose }: UnsplashPhotoPopupProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [showControls, setShowControls] = useState(true)

  // Prevent body scrolling when popup is open
  useEffect(() => {
    if (photo) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = 'unset'
      }
    }
  }, [photo])

  if (!photo) return null

  const handleDownload = () => {
    // Create a link element and trigger download
    const link = document.createElement('a')
    link.href = photo.src
    link.download = `${photo.title.replace(/\s+/g, '-').toLowerCase()}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: photo.title,
          text: photo.description,
          url: window.location.href,
        })
      } catch (error) {
        // Fallback to copying to clipboard
        navigator.clipboard.writeText(window.location.href)
      }
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-50 overflow-hidden"
        onClick={(e) => e.target === e.currentTarget && onClose()}
        style={{ height: '100vh', width: '100vw' }}
      >
        {/* Close Button - Top Right (Always Visible) */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-8 right-8 w-10 h-10 rounded-full bg-dark-200/80 backdrop-blur-sm hover:bg-red-500/20 text-foreground hover:text-red-400 border border-border/50 hover:border-red-400/50 transition-all shadow-lg flex items-center justify-center z-20"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </motion.button>

        {/* Full Screen Image Container */}
        <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <Image
              src={photo.src}
              alt={photo.title}
              width={1200}
              height={800}
              className="max-w-full max-h-full w-auto h-auto object-contain"
              priority
            />
          </motion.div>
        </div>

        {/* Floating Action Buttons - Top Left */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute top-8 left-8 flex items-center gap-3 z-10"
        >
          {/* Like Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsLiked(!isLiked)}
            className={`w-10 h-10 rounded-full backdrop-blur-sm transition-all shadow-lg flex items-center justify-center border ${
              isLiked 
                ? 'bg-red-500 text-white border-red-500' 
                : 'bg-dark-200/80 hover:bg-dark-100/80 text-foreground border-border/50'
            }`}
          >
            <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
          </motion.button>

          {/* Add to Collection Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full bg-dark-200/80 backdrop-blur-sm hover:bg-dark-100/80 text-foreground border border-border/50 transition-all shadow-lg flex items-center justify-center"
          >
            <Plus size={20} />
          </motion.button>
        </motion.div>

        {/* Download Button - Top Right (Next to Close) */}
        <motion.button
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          className="absolute top-8 right-20 bg-gradient-to-r from-glow-purple via-glow-blue to-glow-cyan text-white hover:shadow-xl px-4 py-2 rounded text-sm font-medium transition-all shadow-lg flex items-center gap-2 z-20"
        >
          <Download size={16} />
          Download
        </motion.button>

        {/* Bottom Info Bar - Only Photo Title & Photographer */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-10"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
              {photo.photographer?.avatar ? (
                <Image
                  src={photo.photographer.avatar}
                  alt={photo.photographer.name || "Photographer"}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-glow-purple via-glow-blue to-glow-cyan flex items-center justify-center text-white font-bold">
                  {photo.photographer?.name?.[0] || "R"}
                </div>
              )}
            </div>
            <div>
              <h2 className="gradient-text font-semibold text-lg">{photo.title}</h2>
              <p className="text-muted-foreground text-sm">
                {photo.photographer?.name || "Rohit Pandit"}
              </p>
            </div>
          </div>

          {/* Share & Info Buttons */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-dark-200/80 backdrop-blur-sm hover:bg-dark-100/80 text-foreground border border-border/50 transition-all shadow-lg flex items-center justify-center"
            >
              <Share size={18} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowInfo(!showInfo)}
              className={`w-10 h-10 rounded-full backdrop-blur-sm transition-all shadow-lg flex items-center justify-center border ${
                showInfo
                  ? 'bg-primary text-primary-foreground border-primary/50'
                  : 'bg-dark-200/80 hover:bg-dark-100/80 text-foreground border-border/50'
              }`}
            >
              <Info size={18} />
            </motion.button>
          </div>
        </motion.div>

        {/* Info Panel - Themed Bottom Sheet */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-300 via-dark-300/98 to-dark-300/95 backdrop-blur-xl border-t border-border/30 max-h-[35vh] overflow-y-auto custom-scrollbar"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold gradient-text mb-2">{photo.title}</h3>
                    {photo.description && (
                      <p className="text-muted-foreground mb-4">{photo.description}</p>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowInfo(false)}
                    className="w-8 h-8 rounded-full hover:bg-red-500/20 flex items-center justify-center text-muted-foreground hover:text-red-400 transition-all"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </motion.button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-6">
                  <div className="text-center p-3 rounded-lg bg-dark-200/50 border border-border/30 hover:border-primary/50 transition-colors">
                    <div className="font-bold gradient-text text-lg">{photo.stats?.views?.toLocaleString() || "272,660"}</div>
                    <div className="text-muted-foreground">Views</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-dark-200/50 border border-border/30 hover:border-primary/50 transition-colors">
                    <div className="font-bold gradient-text text-lg">{photo.stats?.downloads?.toLocaleString() || "5,124"}</div>
                    <div className="text-muted-foreground">Downloads</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-dark-200/50 border border-border/30 hover:border-primary/50 transition-colors">
                    <div className="font-bold gradient-text text-lg">{photo.category || "Featured"}</div>
                    <div className="text-muted-foreground">Collection</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-dark-200/50 border border-border/30 hover:border-primary/50 transition-colors">
                    <div className="font-bold gradient-text text-lg">Free</div>
                    <div className="text-muted-foreground">License</div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="pt-4 border-t border-border/20">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    {photo.metadata?.location && (
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-dark-200/40 border border-border/30">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <MapPin size={16} className="text-primary" />
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Location</div>
                          <div className="text-foreground font-medium">{photo.metadata.location}</div>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-dark-200/40 border border-border/30">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <Calendar size={16} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Published</div>
                        <div className="text-foreground font-medium">{photo.metadata?.publishedDate || "3 weeks ago"}</div>
                      </div>
                    </div>
                    {photo.metadata?.camera && (
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-dark-200/40 border border-border/30">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <Camera size={16} className="text-primary" />
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Camera</div>
                          <div className="text-foreground font-medium">{photo.metadata.camera}</div>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-dark-200/40 border border-border/30">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <Shield size={16} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">License</div>
                        <div className="text-foreground font-medium">Free to use</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}
