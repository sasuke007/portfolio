// Update imports to use the correct path
import { Tag } from '@/prisma/generated/client'

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
  meta_description: string | null
  author: string
  is_published: boolean
  category: string
  tags: BlogTag[]
}



export interface CreateBlogInput {
  title: string;
  slug: string;
  content: string;
  description: string;
  meta_description: string;
  author: string;
  category: string;
  featured_image_url: string;
  is_published: boolean;
  priority: number;
  published_at: string;
  tags: string[];
}