import { FeaturedPhotos } from "@/components/featured-photos"
import { FeaturedPost } from "@/components/featured-post"
import { HeroSection } from "@/components/hero-section"
import { PoemCard } from "@/components/poem-card"
import { SectionHeading } from "@/components/section-heading"
import { VideoCard } from "@/components/video-card"
import { getHighlightedBlogs } from "@/lib/services/blog.service"
import { getHighlightedPhotos } from "@/lib/services/photo.service"
import { getHighlightedPoems } from "@/lib/services/poem.service"
import { getHighlightedVlogs } from "@/lib/services/vlog.service"
import { formatDate } from "@/lib/utils"

export default async function Home() {
  // Make all API calls in parallel and wait for all to complete
  const [blogs, photos, vlogs, poems] = await Promise.all([
    getHighlightedBlogs().catch(() => []),
    getHighlightedPhotos().catch(() => []),
    getHighlightedVlogs().catch(() => []),
    getHighlightedPoems().catch(() => [])
  ]);

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
                  excerpt={blog.description}
                  date={blog.published_at}
                  category={blog.category}
                  slug={blog.slug}
                  featured_image_url={blog.featured_image_url || undefined}
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
                  image={photo.image_url}
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
            {vlogs.map((vlog) => (
              <VideoCard
                key={vlog.id}
                title={vlog.title}
                description={vlog.description}
                thumbnail={vlog.thumbnail_url}
                date={formatDate(vlog.published_at)}
                duration={vlog.duration}
                videoId={vlog.id}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Poems */}
      <section className="w-full py-1 md:py-2 lg:py-3">
        <div className="container px-4 md:px-6">
          <SectionHeading
            title="Poetry Corner"
            description="Featuring poems by my sister, Shrishti Pandit."
            link="/poems"
            linkText="Read More Poems"
          />
          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
            {poems.map((poem) => (
              <PoemCard
                key={poem.id}
                title={poem.title}
                excerpt={poem.content.slice(0, 120) + "..."}
                date={formatDate(poem.written_at || poem.created_at)}
                slug={`/poems/${poem.id}`}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Journey Section Teaser */}
      <section className="w-full py-1 md:py-2 lg:py-3 bg-dark-200/50">
        <div className="container px-4 md:px-6">
          <div className="mt-8 p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Professional Timeline</h3>
            <p className="text-muted-foreground mb-4">
              From education to professional experience, discover the path that shaped my career in technology and creative work.
            </p>
            <div className="flex justify-end">
              <a href="/journey" className="text-primary hover:underline">
                Explore my journey →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
