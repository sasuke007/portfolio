import { prisma } from '@/prisma'
import { PhotoDTO, CreatePhoto } from '@/types/photo/index'
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

/**
 * Get a single photo by its image URL
 * @param imageUrl - The photo's image URL
 * @returns The photo or null if not found
 */
export async function getPhotoByImageUrl(imageUrl: string): Promise<PhotoDTO | null> {
  const photo = await prisma.photo.findUnique({
    where: {
      image_url: imageUrl,
    },
    include: {
      tags: {
        include: {
          tag: true
        }
      }
    }
  });
  return photo as unknown as PhotoDTO | null;
}

/**
 * Create a new photo
 * @param data - The photo data
 * @returns The created photo
 */
export async function createPhoto(data: CreatePhoto): Promise<PhotoDTO> {
  // Check if a photo with the same image URL already exists
  const existingPhoto = await prisma.photo.findUnique({
    where: {
      image_url: data.image_url,
    },
  });

  if (existingPhoto) {
    throw new Error(`A photo with this image URL already exists.`);
  }

  // Extract tags from the data
  const { tags, ...photoData } = data;

  const photo = await prisma.photo.create({
    data: {
      ...photoData,
      taken_at: data.taken_at ? new Date(data.taken_at) : null,
      uploaded_at: new Date(),
      // Handle tags relationship properly
      tags: {
        create: tags.map(tagName => ({
          tag: {
            connectOrCreate: {
              where: { name: tagName },
              create: { 
                name: tagName,
                slug: tagName.toLowerCase().replace(/\s+/g, '-')
              }
            }
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
  });

  return photo as unknown as PhotoDTO;
}

/**
 * Update an existing photo
 * @param imageUrl - The image URL of the photo to update
 * @param data - The updated photo data
 * @returns The updated photo
 */
export async function updatePhoto(
  imageUrl: string,
  data: CreatePhoto
): Promise<PhotoDTO> {
  // Check if the photo exists
  const existingPhoto = await prisma.photo.findUnique({
    where: {
      image_url: imageUrl,
    },
  });

  if (!existingPhoto) {
    throw new Error(`Photo with this image URL not found.`);
  }

  // If the image URL is changing, check if the new image URL is already in use
  if (data.image_url !== imageUrl) {
    const urlInUse = await prisma.photo.findUnique({
      where: {
        image_url: data.image_url,
      },
    });

    if (urlInUse) {
      throw new Error(`A photo with this image URL already exists.`);
    }
  }

  // Extract tags from the data
  const { tags, ...photoData } = data;

  const updatedPhoto = await prisma.photo.update({
    where: {
      image_url: imageUrl,
    },
    data: {
      ...photoData,
      taken_at: data.taken_at ? new Date(data.taken_at) : null,
      // Handle tags relationship properly
      tags: {
        // Delete existing tag connections
        deleteMany: {},
        // Create new tag connections
        create: tags.map(tagName => ({
          tag: {
            connectOrCreate: {
              where: { name: tagName },
              create: { 
                name: tagName,
                slug: tagName.toLowerCase().replace(/\s+/g, '-')
              }
            }
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
  });

  return updatedPhoto as unknown as PhotoDTO;
} 