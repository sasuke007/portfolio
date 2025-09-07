import { prisma } from '@/prisma'
import {PhotoEntity, CreatePhoto, getPhotoEntityFromCreatePhoto} from '@/types/photo'
import { z } from 'zod' // For input validation
import { tryCatch } from '../utils'

//TODO: Id of photos are getting returned meaning all the fields of database are getting returned. Need to fix this. Hide fields like id.
// TODO: Do the above exercise for all the other entities.
// TODO: Set a standard practise for how dto's are made and how conversion are done.
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


/**
 * Retrieves highlighted photos for display on the homepage
 * @returns Promise resolving to an array of highlighted photos
 */
export const getHighlightedPhotos = async (): Promise<PhotoEntity[]> => {
  const { data: photos, error } = await tryCatch(prisma.photo.findMany({
    take: 8
  }))

  if (error) {
    handleServiceError(error, 'fetching highlighted photos')
  }

  if (!photos) {
    return []
  }

  return photos as PhotoEntity[]
}

/**
 * Retrieves all photos from the database
 * @returns Promise resolving to an array of all photos
 */
export const getAllPhotos = async (): Promise<PhotoEntity[]> => {
  const { data: photos, error } = await tryCatch(prisma.photo.findMany({
    orderBy: {
      uploaded_at: 'desc'
    }
  }))

  if (error) {
    handleServiceError(error, 'fetching all photos')
  }

  if (!photos) {
    return []
  }

  return photos as PhotoEntity[]
}


/**
 * Get a single photo by its image URL
 * @param imageUrl - The photo's image URL
 * @returns The photo or null if not found
 */
export async function getPhotoByImageUrl(imageUrl: string): Promise<PhotoEntity | null> {
  const photo = await prisma.photo.findUnique({
    where: {
      image_url: imageUrl,
    }
  });
  return photo as unknown as PhotoEntity | null;
}

/**
 * Create a new photo
 * @param data - The photo data
 * @returns The created photo
 */
export async function createPhoto(data: CreatePhoto): Promise<PhotoEntity> {
  // Check if a photo with the same image URL already exists
  const existingPhoto = await prisma.photo.findUnique({
    where: {
      image_url: data.image_url,
    },
  });

  if (existingPhoto) {
    throw new Error(`A photo with this image URL already exists.`);
  }

  const photo = await prisma.photo.create({
    data: {...getPhotoEntityFromCreatePhoto(data)}
  });

  return photo as unknown as PhotoEntity;
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
): Promise<PhotoEntity> {
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

  const updatedPhoto = await prisma.photo.update({
    where: {
      image_url: imageUrl,
    },
    data: {
      title: data.title,
      description: data.description,
      image_url: data.image_url,
      taken_at: data.taken_at ? new Date(data.taken_at) : null,
      location: data.location
    }
  });

  return updatedPhoto as unknown as PhotoEntity;
} 