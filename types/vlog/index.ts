import { Tag } from '@prisma/client'

export interface VlogTag {
  tag: Tag
}

export interface VlogDTO {
  id: number
  title: string
  slug: string
  description: string | null
  video_url: string
  published_at: Date
  thumbnail_url: string | null
  duration: string | null
  meta_description: string | null
  meta_keywords: string | null
  is_published: boolean
  tags: VlogTag[]
}