import { prisma } from '@/prisma'
import { PhotoDTO } from '@/types/photo'

export const getHighlightedPhotos = async (): Promise<PhotoDTO[]> => {
  try {
    const photos: PhotoDTO[] = await prisma.photo.findMany({
      take: 8,
      include: {
        tags: {
          include: {
            tag: true
          }
        }
      }
    });
    return photos;
  } catch (error) {
    console.error('Error fetching random photos:', error);
    throw error;
  }
}

export const getAllPhotos = async (): Promise<PhotoDTO[]> => {
  try {
    const photos = await prisma.photo.findMany({
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
    });
    
    return photos;
  } catch (error) {
    console.error('Error fetching all photos:', error);
    throw error;
  }
}

// Get photos by tag
export const getPhotosByTag = async (tagSlug: string): Promise<PhotoDTO[]> => {
  try {
    const photos = await prisma.photo.findMany({
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
    });
    
    return photos;
  } catch (error) {
    console.error(`Error fetching photos by tag ${tagSlug}:`, error);
    throw error;
  }
}