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

/**
 * Retrieves a specific poem by its slug
 * @param slug The unique slug identifier for the poem
 * @returns Promise resolving to the poem or null if not found
 */
export async function getPoemBySlug(slug: string): Promise<PoemDTO | null> {
  try {
    // Validate slug
    if (!slug) {
      throw new PoemServiceError(`Invalid slug: '${slug}'`, 'VALIDATION_ERROR');
    }
    
    const { data: poem, error } = await tryCatch(prisma.poem.findUnique({
      where: { slug }
    }));

    if (error) {
      handleServiceError(error, `fetching poem by slug '${slug}'`);
    }

    return poem;
  } catch (error) {
    handleServiceError(error, `validating poem slug '${slug}'`);
  }
}

// Zod schema for poem data validation
const poemSchema = z.object({
  title: z.string().min(3).max(200),
  slug: z.string().min(3).max(100).regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  content: z.string().min(3),
  author: z.string().min(2),
  written_at: z.string().nullable()
    .refine(val => val === null || !isNaN(Date.parse(val)), {
      message: 'Invalid date format'
    })
    .transform(val => val === null ? null : new Date(val)),
  is_published: z.boolean().default(false)
});

/**
 * Updates an existing poem
 * @param slug The slug of the poem to update
 * @param poemData The updated poem data
 * @returns Promise resolving to the updated poem
 */
export async function updatePoem(slug: string, poemData: any): Promise<PoemDTO> {
  try {
    // Validate input
    const validatedData = poemSchema.parse(poemData);
    
    // Check if poem exists
    const existingPoem = await getPoemBySlug(slug);
    if (!existingPoem) {
      throw new PoemServiceError(`Poem with slug '${slug}' not found`, 'NOT_FOUND');
    }
    
    // Use tryCatch for the database operation
    const { data: updatedPoem, error } = await tryCatch(prisma.poem.update({
      where: { slug },
      data: {
        ...validatedData,
        updated_at: new Date()
      }
    }));

    if (error) {
      handleServiceError(error, `updating poem with slug '${slug}'`);
    }

    if (!updatedPoem) {
      throw new PoemServiceError(`Failed to update poem with slug '${slug}'`, 'UPDATE_FAILED');
    }

    return updatedPoem;
  } catch (error) {
    handleServiceError(error, `updating poem with slug '${slug}'`);
  }
}