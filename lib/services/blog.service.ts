import { prisma } from '@/prisma'
import { BlogDTO, CreateBlogInput } from '@/types/blog'
import { z } from 'zod' // For input validation
import { tryCatch } from '../utils'

// Custom error for service-specific errors
export class BlogServiceError extends Error {
  constructor(message: string, public readonly code: string, public readonly originalError?: unknown) {
    super(message)
    this.name = 'BlogServiceError'
  }
}

// Centralized error handling function
function handleServiceError(error: unknown, operation: string): never {
  console.error(`Error ${operation}:`, error)

  // Handle specific known errors
  if (error instanceof z.ZodError) {
    throw new BlogServiceError(`Invalid input for ${operation}: ${error.message}`, 'VALIDATION_ERROR', error)
  }

  // Handle Prisma-specific errors (simplified example)
  if (error instanceof Error && error.message.includes('Unique constraint failed')) {
    throw new BlogServiceError(`Duplicate entry detected during ${operation}`, 'DUPLICATE_ERROR', error)
  }

  // Generic fallback
  throw new BlogServiceError(`Failed to ${operation}`, 'UNKNOWN_ERROR', error)
}

// Zod schemas for input validation
const slugSchema = z.string().min(3).max(100).regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens')

/**
 * Retrieves blogs with priority >= 5 for highlighting on the homepage
 * @returns Promise resolving to an array of highlighted blogs
 */
export const getHighlightedBlogs = async (): Promise<BlogDTO[]> => {
  const { data: blogs, error } = await tryCatch(prisma.blog.findMany({
    where: {
      priority: {
        gte: 0
      },
      is_published: true
    },
    select: {
      title: true,
      slug: true,
      content: true,
      published_at: true,
      featured_image_url: true,
      author: true,
      description: true,
      is_published: true,
      category: true,
      tags: {
        include: {
          tag: true
        }
      }
    },
    orderBy: {
      priority: 'desc'
    },
    take: 6
  }))

  if (error) {
    handleServiceError(error, 'fetching highlighted blogs')
  }

  if (!blogs) {
    return []
  }

  return blogs
}

/**
 * Retrieves all published blog posts
 * @returns Promise resolving to an array of all published blogs
 */
export async function getAllPublishedBlogs(): Promise<BlogDTO[]> {
  const { data: blogs, error } = await tryCatch(prisma.blog.findMany({
    where: {
      is_published: true
    },
    orderBy: {
      published_at: 'desc'
    },
    include: {
      tags: {
        include: {
          tag: true
        }
      }
    }
  }))

  if (error) {
    handleServiceError(error, 'fetching all published blogs')
  }

  if (!blogs) {
    return []
  }

  return blogs
}

/**
 * Retrieves a specific blog post by its slug
 * @param slug The unique slug identifier for the blog post
 * @returns Promise resolving to the blog post or null if not found
 */
export async function getBlogBySlug(slug: string): Promise<BlogDTO | null> {
  try {
    // Validate input first
    slugSchema.parse(slug)
    
    // Use tryCatch for the database query
    const { data: blog, error } = await tryCatch(prisma.blog.findUnique({
      where: { slug },
      include: {
        tags: {
          include: {
            tag: true
          }
        }
      }
    }))

    if (error) {
      handleServiceError(error, `fetching blog by slug '${slug}'`)
    }

    return blog
  } catch (validationError) {
    handleServiceError(validationError, `validating slug '${slug}'`)
  }
}

// Validation schema for blog creation
const createBlogSchema = z.object({
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

/**
 * Creates a new blog post with associated tags
 * @param blogData Input data for the new blog post
 * @returns Promise resolving to the created blog
 */
export async function createBlog(blogData: CreateBlogInput): Promise<BlogDTO> {
  try {
    // Validate all input fields
    const validatedData = createBlogSchema.parse(blogData)

    // Extract tags from the validated data
    const { tags, ...blogFields } = validatedData

    // Use tryCatch for the database operation
    const { data: blog, error } = await tryCatch(prisma.blog.create({
      data: {
        ...blogFields,
        published_at: new Date(blogFields.published_at), // Convert string to Date
        tags: {
          create: tags.map(tagId => ({
            tag: {
              connect: { id: tagId }
            }
          }))
        }
      },
      include: {
        tags: {
          include: {
            tag: true
          }
        }
      }
    }))

    if (error) {
      handleServiceError(error, 'creating blog')
    }

    if (!blog) {
      handleServiceError(new Error('Failed to create blog'), 'creating blog')
    }

    console.log(`Blog created successfully: ${blog.title} (${blog.slug})`)
    return blog
  } catch (validationError) {
    handleServiceError(validationError, 'validating blog data')
  }
}