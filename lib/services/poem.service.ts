import { prisma } from '@/prisma'
import { PoemDTO } from '@/types/poem'

export const getHighlightedPoems = async (): Promise<PoemDTO[]> => {
  try {
    const poems = await prisma.poem.findMany({
      where: {
        is_published: true
      },
      orderBy: {
        created_at: 'desc'
      },
      take: 6
    })
    return poems
  } catch (error) {
    console.error('Error fetching highlighted poems:', error)
    throw error
  }
}

export const getAllPoems = async (): Promise<PoemDTO[]> => {
  try {
    const poems = await prisma.poem.findMany({
      orderBy: {
        created_at: 'desc'
      }
    })
    return poems
  } catch (error) {
    console.error('Error fetching all poems:', error)
    throw error
  }
}