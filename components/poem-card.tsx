"use client"

import Link from "next/link"
import { useState } from "react"
import { PoemPopup } from "@/components/poem-popup"
import { PoemDTO } from "@/types/poem"

interface MainPoemCardProps {
  title: string
  content: string
  date: string
  slug: string
  poemData: PoemDTO
}

export function MainPoemCard({ title, content, date, slug, poemData }: MainPoemCardProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  return (
    <>
      <div 
        className="flex flex-col h-full p-5 rounded-lg bg-dark-100/40 border border-border/20 hover:border-border/40 transition-all cursor-pointer"
        onClick={() => setIsPopupOpen(true)}
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-medium gradient-text-simple">{title}</h3>
          <div className="text-sm text-gray-400">{date}</div>
        </div>
        <p className="text-gray-300 italic whitespace-pre-line line-clamp-6 mb-3 flex-1">{content}</p>
        <button 
          className="inline-flex items-center text-xs text-primary hover:underline mt-auto"
          onClick={(e) => {
            e.stopPropagation()
            setIsPopupOpen(true)
          }}
        >
          Read full poem <span className="ml-1">→</span>
        </button>
      </div>

      <PoemPopup 
        poem={poemData} 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
    </>
  )
}