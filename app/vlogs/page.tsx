import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { VideoCard } from "@/components/video-card"

export const metadata: Metadata = {
  title: "Vlogs | John Doe",
  description: "Video stories and documentaries by John Doe.",
}

export default function VlogsPage() {
  // In a real app, you would fetch this data from a CMS or API
  const videos = [
    {
      title: "A Week in Tokyo",
      description: "Exploring the vibrant streets and culture of Tokyo, Japan.",
      date: "March 10, 2023",
      duration: "12:34",
      thumbnail: "/placeholder.svg?height=720&width=1280",
      videoId: "video-1",
    },
    {
      title: "Mountain Hiking Adventure",
      description: "Documenting a challenging hike through the mountains.",
      date: "February 15, 2023",
      duration: "18:22",
      thumbnail: "/placeholder.svg?height=720&width=1280",
      videoId: "video-2",
    },
    {
      title: "Day in the Life: Freelance Creator",
      description: "Behind the scenes of my daily routine as a content creator.",
      date: "January 28, 2023",
      duration: "15:45",
      thumbnail: "/placeholder.svg?height=720&width=1280",
      videoId: "video-3",
    },
    {
      title: "Street Food Tour",
      description: "Tasting the best street food from around the world.",
      date: "January 5, 2023",
      duration: "21:18",
      thumbnail: "/placeholder.svg?height=720&width=1280",
      videoId: "video-4",
    },
  ]

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <PageHeader title="Vlogs" description="Visual stories from my adventures." />
      <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2">
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            title={video.title}
            description={video.description}
            date={video.date}
            duration={video.duration}
            thumbnail={video.thumbnail}
            videoId={video.videoId}
          />
        ))}
      </div>
    </div>
  )
}
