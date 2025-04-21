"use client"

import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { PoemDTO } from "@/types/poem"
import { useState, useEffect } from "react"

interface PoemPopupProps {
  poem: PoemDTO | null
  isOpen: boolean
  onClose: () => void
}

export function PoemPopup({ poem, isOpen, onClose }: PoemPopupProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="backdrop-blur-sm" />
      <DialogContent className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl p-0 bg-dark-100/95 border border-border/30 rounded-lg overflow-hidden">
        <div className="relative h-full w-full">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-2 bg-dark-200/80 text-gray-400 hover:text-white transition-colors z-10"
          >
            <X className="h-5 w-5" />
          </button>
          
          {poem && (
            <div className="p-6 md:p-8">
              <div className="mb-6 space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl md:text-3xl font-bold gradient-text-simple">{poem.title}</h2>
                  <time className="text-sm text-gray-400">
                    {formatDate(poem.written_at || poem.created_at)}
                  </time>
                </div>
                <p className="text-sm text-gray-400">By {poem.author}</p>
              </div>
              
              <div className="max-h-[70vh] overflow-y-auto pr-4 custom-scrollbar">
                <p className="text-gray-200 italic whitespace-pre-line leading-relaxed">
                  {poem.content}
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}