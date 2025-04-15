import { prisma } from '@/prisma'
import { VlogDTO } from '@/types/vlog'

export const getHighlightedVlogs = async (): Promise<VlogDTO[]> => {
  try {
    const vlogs = await prisma.vlog.findMany({
      where: {
        is_published: true
      },
      orderBy: {
        published_at: 'desc'
      },
      take: 6,
      include: {
        tags: {
          include: {
            tag: true
          }
        }
      }
    })
    return vlogs as VlogDTO[]
  } catch (error) {
    console.error('Error fetching highlighted vlogs:', error)
    throw error
  }
}

export const getAllVlogs = async (): Promise<VlogDTO[]> => {
  try {
    const vlogs = await prisma.vlog.findMany({
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
    })
    return vlogs as VlogDTO[]
  } catch (error) {
    console.error('Error fetching all vlogs:', error)
    throw error
  }
}