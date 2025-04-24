import { Tag } from '@/prisma/generated/client'

export interface PhotoTag {
  tag: Tag
}

export interface PhotoDTO {
  id: number
  title: string
  description: string | null
  image_url: string
  taken_at: Date | null
  uploaded_at: Date
  location: string | null
  tags: PhotoTag[]
}