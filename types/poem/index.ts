export interface PoemDTO {
  id: number
  slug: string
  title: string
  author: string
  content: string
  written_at: Date | null
  created_at: Date
  updated_at: Date
  is_published: boolean
}