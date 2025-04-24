import { prisma } from '@/prisma'
import { PoemDTO } from '@/types/poem'
import { z } from 'zod' // For input validation
import { tryCatch } from '../utils'

// Custom error for service-specific errors
export class PoemServiceError extends Error {
  constructor(message: string, public readonly code: string, public readonly originalError?: unknown) {
    super(message)
    this.name = 'PoemServiceError'
  }
}

// Centralized error handling function
function handleServiceError(error: unknown, operation: string): never {
  console.error(`Error ${operation}:`, error)
  
  // Handle specific known errors
  if (error instanceof z.ZodError) {
    throw new PoemServiceError(`Invalid input for ${operation}: ${error.message}`, 'VALIDATION_ERROR', error)
  }
  
  // Handle Prisma-specific errors
  if (error instanceof Error && error.message.includes('Unique constraint failed')) {
    throw new PoemServiceError(`Duplicate entry detected during ${operation}`, 'DUPLICATE_ERROR', error)
  }
  
  // Generic fallback
  throw new PoemServiceError(`Failed to ${operation}`, 'UNKNOWN_ERROR', error)
}

/**
 * Retrieves highlighted poems for display on the homepage
 * @returns Promise resolving to an array of highlighted poems
 */
export const getHighlightedPoems = async (): Promise<PoemDTO[]> => {
  const { data: poems, error } = await tryCatch(prisma.poem.findMany({
    where: {
      is_published: true
    },
    orderBy: {
      created_at: 'desc'
    },
    take: 6
  }))

  if (error) {
    handleServiceError(error, 'fetching highlighted poems')
  }

  if (!poems) {
    return []
  }

  return poems
}

/**
 * Retrieves all poems from the database
 * @returns Promise resolving to an array of all poems
 */
export const getAllPoems = async (): Promise<PoemDTO[]> => {
  const { data: poems, error } = await tryCatch(prisma.poem.findMany({
    orderBy: {
      created_at: 'desc'
    }
  }))

  if (error) {
    handleServiceError(error, 'fetching all poems')
  }

  if (!poems) {
    return []
  }

  return poems
}