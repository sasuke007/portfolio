import Link from "next/link"

interface VideoCardProps {
  title: string
  description: string | null
  date: string
  videoId: number
  videoUrl: string
}

export function VideoCard({ title, description, date, videoId, videoUrl }: VideoCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border/50 bg-dark-100 transition-all hover:shadow-md hover-scale">
      <Link href={`/vlogs/${videoId}`} className="relative overflow-hidden">
        {/* <Image
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          width={1280}
          height={720}
          className="aspect-video h-auto w-full object-cover transition-transform duration-500 group-hover:scale-110"
        /> */}
        <iframe 
          className="aspect-video h-auto w-full object-cover transition-transform duration-500 group-hover:scale-103"
          src={videoUrl}
          title={`${title} - Video Player`}
          allowFullScreen>
        </iframe>
        {/* <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 transform scale-75 transition-transform group-hover:scale-100 pulse">
            <Play className="h-8 w-8 text-white" />
          </div>
        </div> */}
      </Link>
      <div className="flex flex-1 flex-col justify-between p-4">
        <div className="space-y-3">
          <div className="text-sm text-gray-500">{date}</div>
          <h3 className="text-xl font-medium leading-tight transition-all duration-300 gradient-text">
            {title}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-2">{description}</p>
        </div>
      </div>
    </div>
  )
}
