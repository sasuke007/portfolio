import { prisma } from '@/prisma'
import { BlogDTO, CreateBlogInput } from '@/types/blog'

export const getHighlightedBlogs = async (): Promise<BlogDTO[]> => {
  try {
    const blogs: BlogDTO[] = await prisma.blog.findMany({
      where: {
        priority: {
          gte: 5
        },
      },
      select: {
        title: true,
        slug: true,
        content: true,
        published_at: true,
        featured_image_url: true,
        meta_description: true,
        author: true,
        description: true,
        is_published: true,
        category: true,
        tags: {
          include: {
            tag: true
          }
        }
      },
      orderBy: {
        priority: 'desc'
      },
      take: 6
    })
    return blogs 
  } catch (error) {
    //TODO: have metrics here
    console.error('Error fetching blogs:', error)
    throw error
  }
}

export async function getAllPublishedBlogs(): Promise<BlogDTO[]> {
  try {
    const blogs: BlogDTO[] = await prisma.blog.findMany({
      where: {
        is_published: true
      },
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
    return blogs
  } catch (error) {
    console.error('Error fetching blogs:', error)
    throw error
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogDTO | null> {
  try {
    const blog: BlogDTO | null = await prisma.blog.findUnique({
      where: {
        slug
      },
      include: {
        tags: {
          include: {
            tag: true
          }
        }
      }
    })
    return blog
  }catch (error) {
    console.error('Error fetching blog:', error)
    throw error
  }
}

export async function createBlog(blogData: CreateBlogInput): Promise<BlogDTO> {
  try {
    // Extract tags from the request
    const { tags, ...blogFields } = blogData;
    
    // Create the blog post with a different approach for tags
    const blog = await prisma.blog.create({
      data: {
        ...blogFields,
        published_at: new Date(blogFields.published_at), // Convert string to Date
        tags: {
          
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
    
    console.log(`Blog created successfully: ${blog.title} (${blog.slug})`);
    return blog;
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
}