import Link from "next/link"
import Image from "next/image"
import { Play } from "lucide-react"

interface VideoCardProps {
  title: string
  description: string
  date: string
  duration: string
  thumbnail: string
  videoId: string
}

export function VideoCard({ title, description, date, duration, thumbnail, videoId }: VideoCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border/50 bg-dark-100 transition-all hover:shadow-md glow-border hover-scale">
      <Link href={`/vlogs/${videoId}`} className="relative overflow-hidden">
        <Image
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          width={1280}
          height={720}
          className="aspect-video h-auto w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 transform scale-75 transition-transform group-hover:scale-100 pulse">
            <Play className="h-8 w-8 text-white" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs text-white">{duration}</div>
      </Link>
      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="space-y-3">
          <div className="text-sm text-gray-500">{date}</div>
          <h3 className="text-xl font-medium leading-tight text-gray-200 group-hover:gradient-text transition-all duration-300">
            <Link href={`/vlogs/${videoId}`}>{title}</Link>
          </h3>
          <p className="text-sm text-gray-400 line-clamp-2">{description}</p>
        </div>
      </div>
    </div>
  )
}
