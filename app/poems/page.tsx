import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { PoemCard } from "@/components/poem-card"

export const metadata: Metadata = {
  title: "Poetry Corner | Jane Doe",
  description: "A collection of poems by Jane Doe.",
}

export default function PoemsPage() {
  // In a real app, you would fetch this data from a CMS or API
  const poems = [
    {
      title: "Whispers of Dawn",
      excerpt:
        "In the quiet hours when darkness fades,\nAnd light begins to paint the sky,\nI find myself in peaceful glades,\nWhere dreams and reality lie...",
      date: "April 5, 2023",
      slug: "/poems/whispers-of-dawn",
    },
    {
      title: "Ocean Memories",
      excerpt:
        "Salt-kissed air and rolling waves,\nMemories etched in grains of sand,\nTime slips by as the ocean laves,\nShores of a distant, forgotten land...",
      date: "March 20, 2023",
      slug: "/poems/ocean-memories",
    },
    {
      title: "City Lights",
      excerpt:
        "Neon glow against the night,\nA symphony of urban sound,\nTall buildings reaching for the light,\nWhere solitude and chaos abound...",
      date: "February 28, 2023",
      slug: "/poems/city-lights",
    },
    {
      title: "Autumn Leaves",
      excerpt:
        "Crimson, gold, and amber hues,\nDancing gently to the ground,\nNature's palette, vibrant views,\nAutumn's beauty all around...",
      date: "February 10, 2023",
      slug: "/poems/autumn-leaves",
    },
    {
      title: "Stargazer",
      excerpt:
        "Beneath the vast celestial dome,\nI search for patterns in the stars,\nIn cosmic wonders, I find home,\nAmidst the planets, moons, and Mars...",
      date: "January 15, 2023",
      slug: "/poems/stargazer",
    },
  ]

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <PageHeader title="Poetry Corner" description="Featuring poems by Jane Doe." />
      <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2">
        {poems.map((poem, index) => (
          <PoemCard key={index} title={poem.title} excerpt={poem.excerpt} date={poem.date} slug={poem.slug} />
        ))}
      </div>
    </div>
  )
}
