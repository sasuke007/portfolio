import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { BentoGrid, BentoGridItem } from "@/components/bento-grid"
import { getAllPublishedBlogs } from "@/lib/services/blog.service"

import Image from "next/image"
import { formatDate } from "@/lib/utils"
import { CalendarIcon, TagIcon } from "@heroicons/react/24/outline"
import { BlogDTO } from "@/types/blog"
import { Monitoring } from "react-scan/monitoring/next"

// use bengo gird properly and make it responsive 

export default async function BlogPage() {
  const blogs: BlogDTO[] = await getAllPublishedBlogs()

  return (
    <>
      <Monitoring
        apiKey="SLKBA2j_QoGPEPe2ODDaMQwxCW0TfHOz" // Safe to expose publically
        url="https://monitoring.react-scan.com/api/v1/ingest"
        commit={process.env.GIT_COMMIT_HASH} // optional but recommended
        branch={process.env.GIT_BRANCH} // optional but recommended
      />
      <div className="container px-4 py-12 md:px-6 md:py-24">
        <PageHeader
          title="Blog"
          description="Thoughts, stories, and ideas from my journey through writing, photography, and filmmaking."
        />

        <BentoGrid className="mt-12">
          {blogs.map((blog, i) => {
            // Adjust image height based on item size
            const imageHeight = "h-40";

            return (
              <BentoGridItem
                key={i}
                title={blog.title}
                description={
                  <div className="flex flex-col gap-2">
                    <p className="line-clamp-2">{blog.meta_description || "Read more..."}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <CalendarIcon className="h-3 w-3" />
                      <span>{formatDate(blog.published_at)}</span>
                      {blog.tags && blog.tags.length > 0 && (
                        <>
                          <TagIcon className="h-3 w-3 ml-2" />
                          <span>{blog.tags[0].tag.name}</span>
                        </>
                      )}
                    </div>
                  </div>
                }
                header={
                  <div className={`relative w-full overflow-hidden rounded-lg ${imageHeight}`}>
                    <Image
                      src={blog.featured_image_url || "/placeholder.svg"}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover/bento:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-300/80 via-transparent to-transparent"></div>
                  </div>
                }
                href={`/blog/${blog.slug}`}
                className={i === 3 || i === 6 ? "md:col-span-2" : ""}
              />
            );
          })}
        </BentoGrid>
      </div>
    </>
  )
}
