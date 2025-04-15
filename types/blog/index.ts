import { Tag } from '@prisma/client'

export interface BlogTag {
  tag: Tag
}

export interface BlogDTO {
  title: string
  slug: string
  description: string
  content: string
  published_at: Date
  featured_image_url: string | null
  meta_description: string | null
  author: string
  is_published: boolean
  category: string
  tags: BlogTag[]
}