import { prisma } from '@/prisma'
import { VlogDTO } from '@/types/vlog'
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