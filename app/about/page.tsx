import type { Metadata } from "next"
import Image from "next/image"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "About | John Doe",
  description: "Learn more about John Doe and his creative journey.",
}

export default function AboutPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <PageHeader title="About Me" description="Writer, photographer, and filmmaker based in New York." />

      <div className="grid grid-cols-1 gap-12 mt-12 md:grid-cols-2">
        <div>
          <div className="rounded-lg overflow-hidden border border-border/50 glow-border">
            <Image
              src="/placeholder.svg?height=800&width=600"
              alt="John Doe"
              width={600}
              height={800}
              className="rounded-lg object-cover w-full h-auto"
            />
          </div>
        </div>
        <div className="space-y-6">
          <p className="text-lg text-gray-300">
            Hello! I'm John Doe, a multidisciplinary creative with a passion for storytelling through various mediums.
            With over 10 years of experience in writing, photography, and filmmaking, I've dedicated my career to
            capturing and sharing meaningful stories.
          </p>
          <p className="text-lg text-gray-300">
            My journey began with a simple blog where I documented my travels and everyday observations. Over time, this
            evolved into a deeper exploration of visual storytelling through photography and eventually filmmaking. I
            believe in the power of authentic narratives and strive to bring a unique perspective to every project I
            undertake.
          </p>
          <p className="text-lg text-gray-300">
            When I'm not behind the camera or typing away at my keyboard, you can find me hiking in nature, exploring
            new cities, or enjoying a good book at my favorite coffee shop. I'm also a proud supporter of my sister
            Jane's poetry, which you can find featured on this site.
          </p>
          <div className="pt-6">
            <h3 className="text-xl font-semibold mb-4 gradient-text">Connect With Me</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                LinkedIn
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
