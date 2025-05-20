import { prisma } from '@/prisma'
import { VlogDTO, CreateVlog } from '@/types/vlog/index'
import { z } from 'zod' // For input validation
import { tryCatch } from '../utils'

// Custom error for service-specific errors
export class VlogServiceError extends Error {
  constructor(message: string, public readonly code: string, public readonly originalError?: unknown) {
    super(message)
    this.name = 'VlogServiceError'
  }
}

// Centralized error handling function
function handleServiceError(error: unknown, operation: string): never {
  console.error(`Error ${operation}:`, error)
  
  // Handle specific known errors
  if (error instanceof z.ZodError) {
    throw new VlogServiceError(`Invalid input for ${operation}: ${error.message}`, 'VALIDATION_ERROR', error)
  }
  
  // Handle Prisma-specific errors
  if (error instanceof Error && error.message.includes('Unique constraint failed')) {
    throw new VlogServiceError(`Duplicate entry detected during ${operation}`, 'DUPLICATE_ERROR', error)
  }
  
  // Generic fallback
  throw new VlogServiceError(`Failed to ${operation}`, 'UNKNOWN_ERROR', error)
}

/**
 * Retrieves highlighted vlogs for display on the homepage
 * @returns Promise resolving to an array of highlighted vlogs
 */
export const getHighlightedVlogs = async (): Promise<VlogDTO[]> => {
  const { data: vlogs, error } = await tryCatch(prisma.vlog.findMany({
    where: {
      is_published: true
    },
    orderBy: {
      published_at: 'desc'
    },
    take: 2,
    include: {
      tags: {
        include: {
          tag: true
        }
      }
    }
  }))

  if (error) {
    handleServiceError(error, 'fetching highlighted vlogs')
  }

  if (!vlogs) {
    return []
  }

  return vlogs as VlogDTO[]
}

/**
 * Retrieves all vlogs from the database
 * @returns Promise resolving to an array of all vlogs
 */
export const getAllVlogs = async (): Promise<VlogDTO[]> => {
  const { data: vlogs, error } = await tryCatch(prisma.vlog.findMany({
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
    handleServiceError(error, 'fetching all vlogs')
  }

  if (!vlogs) {
    return []
  }

  return vlogs as VlogDTO[]
}

/**
 * Get a single vlog by its video URL
 * @param videoUrl - The vlog's video URL
 * @returns The vlog or null if not found
 */
export async function getVlogByVideoUrl(videoUrl: string): Promise<VlogDTO | null> {
  const vlog = await prisma.vlog.findUnique({
    where: {
      video_url: videoUrl,
    },
    include: {
      tags: {
        include: {
          tag: true
        }
      }
    }
  });
  return vlog as unknown as VlogDTO | null;
}

/**
 * Create a new vlog
 * @param data - The vlog data
 * @returns The created vlog
 */
export async function createVlog(data: CreateVlog): Promise<VlogDTO> {
  // Check if a vlog with the same video URL already exists
  const existingVlog = await prisma.vlog.findUnique({
    where: {
      video_url: data.video_url,
    },
  });

  if (existingVlog) {
    throw new Error(`A vlog with this video URL already exists.`);
  }

  // Extract tags from the data
  const { tags, ...vlogData } = data;

  const vlog = await prisma.vlog.create({
    data: {
      ...vlogData,
      published_at: data.is_published ? new Date(data.published_at || new Date()) : new Date(),
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

  return vlog as unknown as VlogDTO;
}

/**
 * Update an existing vlog
 * @param videoUrl - The video URL of the vlog to update
 * @param data - The updated vlog data
 * @returns The updated vlog
 */
export async function updateVlog(
  videoUrl: string,
  data: CreateVlog
): Promise<VlogDTO> {
  // Check if the vlog exists
  const existingVlog = await prisma.vlog.findUnique({
    where: {
      video_url: videoUrl,
    },
  });

  if (!existingVlog) {
    throw new Error(`Vlog with this video URL not found.`);
  }

  // If the video URL is changing, check if the new video URL is already in use
  if (data.video_url !== videoUrl) {
    const urlInUse = await prisma.vlog.findUnique({
      where: {
        video_url: data.video_url,
      },
    });

    if (urlInUse) {
      throw new Error(`A vlog with this video URL already exists.`);
    }
  }

  // Extract tags from the data
  const { tags, ...vlogData } = data;

  const updatedVlog = await prisma.vlog.update({
    where: {
      video_url: videoUrl,
    },
    data: {
      ...vlogData,
      published_at: data.is_published ? new Date(data.published_at || new Date()) : new Date(),
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

  return updatedVlog as unknown as VlogDTO;
}