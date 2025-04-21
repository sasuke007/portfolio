"use client"

import { MainPoemCard } from "@/components/poem-card"
import { formatDate } from "@/lib/utils"
import { PoemDTO } from "@/types/poem"
import { useState, useEffect } from "react"

interface PoemsListProps {
  poems: PoemDTO[]
}

export function PoemsList({ poems }: PoemsListProps) {
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Set loading to false once component mounts and props are available
    setLoading(false)
  }, [poems])

  return (
    <>
      {loading ? (
        <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="h-64 rounded-lg bg-dark-100/40 animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2">
          {poems.map((poem) => (
            <MainPoemCard 
              key={poem.id}
              title={poem.title} 
              content={poem.content} 
              date={formatDate(poem.written_at || poem.created_at)} 
              slug={poem.id.toString()}
              poemData={poem}
            />
          ))}
        </div>
      )}
    </>
  )
}