import { PageHeader } from "@/components/page-header"
import { PoemsList } from "@/components/poems-list"
import { getAllPoems } from "@/lib/services/poem.service"
import { PoemDTO } from "@/types/poem"

export const metadata = {
  title: "Poetry Corner",
  description: "A collection of poems by Shrishti Pandit.",
}

export default async function PoemsPage() {
  // Fetch poems data on the server
  const poems: PoemDTO[] = await getAllPoems();
  
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <PageHeader title={metadata.title} description={metadata.description} />
      <PoemsList poems={poems} />
    </div>
  )
}
