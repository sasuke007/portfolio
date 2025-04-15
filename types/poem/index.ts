export interface PoemDTO {
  id: number
  title: string
  author: string
  content: string
  written_at: Date | null
  created_at: Date
  updated_at: Date
  is_published: boolean
}