import { Tag } from '@/prisma/generated/client'

export interface VlogTag {
  tag: Tag
}

export interface VlogDTO {
  id: number
  title: string
  description: string | null
  video_url: string
  published_at: Date
  is_published: boolean
  tags: VlogTag[]
}