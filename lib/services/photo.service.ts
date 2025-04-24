import { prisma } from '@/prisma'
import { PhotoDTO } from '@/types/photo'
import { z } from 'zod' // For input validation
import { tryCatch } from '../utils'

// Custom error for service-specific errors
export class PhotoServiceError extends Error {
  constructor(message: string, public readonly code: string, public readonly originalError?: unknown) {
    super(message)
    this.name = 'PhotoServiceError'
  }
}

// Centralized error handling function
function handleServiceError(error: unknown, operation: string): never {
  console.error(`Error ${operation}:`, error)
  
  // Handle specific known errors
  if (error instanceof z.ZodError) {
    throw new PhotoServiceError(`Invalid input for ${operation}: ${error.message}`, 'VALIDATION_ERROR', error)
  }
  
  // Handle Prisma-specific errors
  if (error instanceof Error && error.message.includes('Unique constraint failed')) {
    throw new PhotoServiceError(`Duplicate entry detected during ${operation}`, 'DUPLICATE_ERROR', error)
  }
  
  // Generic fallback
  throw new PhotoServiceError(`Failed to ${operation}`, 'UNKNOWN_ERROR', error)
}

// Validation schema
const tagSlugSchema = z.string().min(2).max(100).regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens')

/**
 * Retrieves highlighted photos for display on the homepage
 * @returns Promise resolving to an array of highlighted photos
 */
export const getHighlightedPhotos = async (): Promise<PhotoDTO[]> => {
  const { data: photos, error } = await tryCatch(prisma.photo.findMany({
    take: 8,
    include: {
      tags: {
        include: {
          tag: true
        }
      }
    }
  }))

  if (error) {
    handleServiceError(error, 'fetching highlighted photos')
  }

  if (!photos) {
    return []
  }

  return photos
}

/**
 * Retrieves all photos from the database
 * @returns Promise resolving to an array of all photos
 */
export const getAllPhotos = async (): Promise<PhotoDTO[]> => {
  const { data: photos, error } = await tryCatch(prisma.photo.findMany({
    orderBy: {
      uploaded_at: 'desc'
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
    handleServiceError(error, 'fetching all photos')
  }

  if (!photos) {
    return []
  }

  return photos
}

/**
 * Retrieves photos with a specific tag
 * @param tagSlug - The slug of the tag to filter by
 * @returns Promise resolving to an array of photos with the specified tag
 */
export const getPhotosByTag = async (tagSlug: string): Promise<PhotoDTO[]> => {
  try {
    // Validate input
    tagSlugSchema.parse(tagSlug)
    
    const { data: photos, error } = await tryCatch(prisma.photo.findMany({
      where: {
        tags: {
          some: {
            tag: {
              slug: tagSlug
            }
          }
        }
      },
      orderBy: {
        uploaded_at: 'desc'
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
      handleServiceError(error, `fetching photos by tag ${tagSlug}`)
    }
    
    if (!photos) {
      return []
    }
    
    return photos
  } catch (validationError) {
    handleServiceError(validationError, `validating tag slug '${tagSlug}'`)
  }
}