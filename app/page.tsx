import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { FeaturedPost } from "@/components/featured-post"
import { FeaturedWork } from "@/components/featured-work"
import { SectionHeading } from "@/components/section-heading"
import { HeroSection } from "@/components/hero-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Background Photo */}
      <HeroSection />

      {/* Featured Blog Posts */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-dark-200/50">
        <div className="container px-4 md:px-6">
          <SectionHeading
            title="Latest Writing"
            description="Explore my recent thoughts and stories."
            link="/blog"
            linkText="View All Posts"
          />
          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
            <FeaturedPost
              title="The Art of Minimalism"
              excerpt="Exploring how less can truly be more in design and life."
              date="April 2, 2023"
              category="Design"
              slug="/blog/the-art-of-minimalism"
            />
            <FeaturedPost
              title="A Journey Through Iceland"
              excerpt="Documenting my travels through the land of fire and ice."
              date="March 15, 2023"
              category="Travel"
              slug="/blog/journey-through-iceland"
            />
            <FeaturedPost
              title="The Future of Digital Content"
              excerpt="How technology is reshaping the way we consume media."
              date="February 28, 2023"
              category="Technology"
              slug="/blog/future-of-digital-content"
            />
          </div>
        </div>
      </section>

      {/* Featured Photography */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <SectionHeading
            title="Photography"
            description="Capturing moments through my lens."
            link="/photography"
            linkText="View Gallery"
          />
          <div className="grid grid-cols-2 gap-4 mt-8 md:grid-cols-3 lg:grid-cols-4">
            <FeaturedWork
              image="/placeholder.svg?height=400&width=600"
              title="Urban Landscapes"
              slug="/photography/urban-landscapes"
            />
            <FeaturedWork
              image="/placeholder.svg?height=400&width=600"
              title="Nature's Beauty"
              slug="/photography/natures-beauty"
            />
            <FeaturedWork
              image="/placeholder.svg?height=400&width=600"
              title="Portraits"
              slug="/photography/portraits"
            />
            <FeaturedWork
              image="/placeholder.svg?height=400&width=600"
              title="Street Photography"
              slug="/photography/street"
            />
          </div>
        </div>
      </section>

      {/* Featured Vlogs */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-dark-200/50">
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
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <SectionHeading
            title="Poetry Corner"
            description="Featuring poems by my sister, Jane Doe."
            link="/poems"
            linkText="Read More Poems"
          />
          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
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
