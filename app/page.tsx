import { FeaturedPost } from "@/components/featured-post"
import { FeaturedPhotos } from "@/components/featured-work"
import { HeroSection } from "@/components/hero-section"
import { SectionHeading } from "@/components/section-heading"
import { getHighlightedBlogs } from "@/lib/services/blog.service"
import { getHighlightedPhotos } from "@/lib/services/photo.service"
import { BlogDTO } from "@/types/blog"
import { PhotoDTO } from "@/types/photo"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default async function Home() {
  const blogs: BlogDTO[] = await getHighlightedBlogs();
  const photos: PhotoDTO[] = await getHighlightedPhotos();
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <section className="w-full pt-1 md:pt-4 lg:pt-6 bg-dark-200/50 outline-blue-500" >
        <div className="container px-4 md:px-6">
          <SectionHeading
            title="Latest Writing"
            description="Explore my recent thoughts and stories."
            link="/blog"
            linkText="View All Posts"
          />
          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
            {
              blogs.map((blog) => (
                <FeaturedPost
                  key={blog.title}
                  title={blog.title}
                  excerpt={blog.content}
                  date={blog.published_at}
                  category={blog.category}
                  slug={blog.slug}
                />
              ))
            }
          </div>
        </div>
      </section>

      {/* Featured Photography */}
      <section className="w-full py-1 md:py-2 lg:py-3">
        <div className="container px-4 md:px-6">
          <SectionHeading
            title="Photography"
            description="Capturing moments through my lens."
            link="/photography"
            linkText="View Gallery"
          />
          <div className="grid grid-cols-2 gap-4 mt-8 md:grid-cols-3 lg:grid-cols-4">
            {
              photos.map((photo) => (
                <FeaturedPhotos
                  key={photo.id}
                  image={photo.file_url}
                  title={photo.title}
                />
              ))
            }
          </div>
        </div>
      </section>

      {/* Featured Vlogs */}
      <section className="w-full py-1 md:py-2 lg:py-3 bg-dark-200/50">
        <div className="container px-4 md:px-6">
          <SectionHeading
            title="Vlogs"
            description="Visual stories from my adventures."
            link="/vlogs"
            linkText="Watch More"
          />
          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
            <div className="aspect-video bg-dark-100 rounded-lg overflow-hidden border border-border/50 hover-scale glow-border">
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-500">Video Thumbnail</p>
              </div>
            </div>
            <div className="aspect-video bg-dark-100 rounded-lg overflow-hidden border border-border/50 hover-scale glow-border">
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-500">Video Thumbnail</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sister's Poems */}
      <section className="w-full py-1 md:py-2 lg:py-3">
        <div className="container px-4 md:px-6">
          <SectionHeading
            title="Poetry Corner"
            description="Featuring poems by my sister, Jane Doe."
            link="/poems"
            linkText="Read More Poems"
          />
          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-dark-100 rounded-lg border border-border/50 glow-border hover-scale">
              <h3 className="text-xl font-medium mb-2 text-gray-200 hover:gradient-text">Whispers of Dawn</h3>
              <p className="text-gray-400 italic mb-4">
                In the quiet hours when darkness fades,
                <br />
                And light begins to paint the sky,
                <br />I find myself in peaceful glades,
                <br />
                Where dreams and reality lie...
              </p>
              <Link
                href="/poems/whispers-of-dawn"
                className="text-sm text-gray-400 hover:text-primary inline-flex items-center"
              >
                Read full poem <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="p-6 bg-dark-100 rounded-lg border border-border/50 glow-border hover-scale">
              <h3 className="text-xl font-medium mb-2 text-gray-200 hover:gradient-text">Ocean Memories</h3>
              <p className="text-gray-400 italic mb-4">
                Salt-kissed air and rolling waves,
                <br />
                Memories etched in grains of sand,
                <br />
                Time slips by as the ocean laves,
                <br />
                Shores of a distant, forgotten land...
              </p>
              <Link
                href="/poems/ocean-memories"
                className="text-sm text-gray-400 hover:text-primary inline-flex items-center"
              >
                Read full poem <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
