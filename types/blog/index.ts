// Update imports to use the correct path
import { Tag } from '@/prisma/generated/client'
import { z } from 'zod'

// Remove duplicate import
// import { BlogTag } from '@/prisma/generated/client'

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
  author: string
  is_published: boolean
  category: string
  tags: BlogTag[]
}


export const slugSchema = z.string().min(3).max(100).regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens')

// Validation schema for blog creation
export const createBlogSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().min(10),
  slug: slugSchema,
  content: z.string().min(50),
  author: z.string().min(2),
  priority: z.number().int().min(0).max(10).default(0),
  category: z.string(),
  published_at: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: 'Invalid date format'
  }),
  is_published: z.boolean().default(false),
  featured_image_url: z.string().url().optional(),
  tags: z.array(z.number()).default([])
})


export type CreateBlog = z.infer<typeof createBlogSchema>

