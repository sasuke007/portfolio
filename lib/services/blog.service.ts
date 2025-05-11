import { prisma } from '@/prisma'
import { BlogDTO, CreateBlog, createBlogSchema, slugSchema } from '@/types/blog'
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


/**
 * Creates a new blog post with associated tags
 * @param blogData Input data for the new blog post
 * @returns Promise resolving to the created blog
 */

export async function createBlog(blogData: CreateBlog): Promise<BlogDTO> {
  try {

    // Extract tags from the validated data
    const { tags, ...blogFields } = blogData

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

/**
 * Updates an existing blog post
 * @param slug The slug of the blog post to update
 * @param blogData The updated blog data
 * @returns Promise resolving to the updated blog
 */
export async function updateBlog(slug: string, blogData: CreateBlog): Promise<BlogDTO> {
  try {
    // Validate input
    const validatedData = createBlogSchema.parse(blogData);
    
    // Check if blog exists
    const existingBlog = await getBlogBySlug(slug);
    if (!existingBlog) {
      throw new BlogServiceError(`Blog with slug '${slug}' not found`, 'NOT_FOUND');
    }
    
    // Extract tags from the validated data
    const { tags, ...blogFields } = validatedData;

    // Use tryCatch for the database operation
    const { data: updatedBlog, error } = await tryCatch(prisma.blog.update({
      where: { slug },
      data: {
        ...blogFields,
        published_at: new Date(blogFields.published_at), // Convert string to Date
        tags: {
          // First delete existing tag relations
          deleteMany: {},
          // Then create new ones
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
    }));

    if (error) {
      handleServiceError(error, `updating blog with slug '${slug}'`);
    }

    if (!updatedBlog) {
      throw new BlogServiceError(`Failed to update blog with slug '${slug}'`, 'UPDATE_FAILED');
    }

    return updatedBlog;
  } catch (error) {
    handleServiceError(error, `updating blog with slug '${slug}'`);
  }
}

// Get all blogs (including drafts) for admin panel
export async function getAllBlogs(): Promise<BlogDTO[]> {
  const { data: blogs, error } = await tryCatch(prisma.blog.findMany({
    orderBy: {
      created_at: 'desc'
    },
    include: {
      tags: {
        include: {
          tag: true
        }
      }
    }
  }));

  if (error) {
    handleServiceError(error, 'fetching all blogs');
  }

  if (!blogs) {
    return [];
  }

  return blogs;
}