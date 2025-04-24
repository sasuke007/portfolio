import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { VideoCard } from "@/components/video-card"
import { getAllVlogs } from "@/lib/services/vlog.service";
import { VlogDTO } from "@/types/vlog";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Vlogs | Rohit Pandit",
  description: "Video stories and documentaries by Rohit Pandit.",
}

export default async function VlogsPage() {

  const videos: VlogDTO[] = await getAllVlogs();
  // In a real app, you would fetch this data from a CMS or API
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <PageHeader title="Vlogs" description="Visual stories from my adventures." />
      <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2">
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            title={video.title}
            description={video.description}
            date={formatDate(video.published_at)}
            videoId={video.id}
            videoUrl={video.video_url}
          />
        ))}
      </div>
    </div>
  )
}
