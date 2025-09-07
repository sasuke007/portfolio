import { PrismaClient } from './generated/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // First, clean existing data (optional - remove if you want to keep existing data)

  await prisma.blog.deleteMany()
  await prisma.photo.deleteMany()
  await prisma.poem.deleteMany()
  await prisma.vlog.deleteMany()


  console.log('🧹 Cleaned existing data')

  // Create Blog Posts
  const blogs = await Promise.all([
    prisma.blog.create({
      data: {
        title: 'Getting Started with Next.js 14 and TypeScript',
        description: 'A comprehensive guide to building modern web applications with Next.js 14, TypeScript, and best practices.',
        slug: 'getting-started-nextjs-14-typescript',
        content: `# Getting Started with Next.js 14 and TypeScript

Next.js 14 brings exciting new features and improvements that make building web applications even more enjoyable. In this comprehensive guide, we'll explore the key features and set up a project from scratch.

## Why Next.js 14?

Next.js 14 introduces several game-changing features:
- **Server Actions**: Full-stack React with built-in server-side functionality
- **Improved Performance**: Better bundling and optimization
- **Enhanced Developer Experience**: Better error messages and debugging tools

## Setting Up Your Project

\`\`\`bash
npx create-next-app@latest my-app --typescript --tailwind --eslint
cd my-app
npm run dev
\`\`\`

## Key Features to Explore

### 1. App Router
The new App Router provides a more intuitive way to structure your application with file-based routing.

### 2. Server Components
Server Components allow you to render components on the server, reducing the JavaScript bundle size and improving performance.

### 3. TypeScript Integration
TypeScript support is now even better with improved type inference and better integration with the framework.

## Best Practices

1. Use Server Components by default
2. Implement proper error boundaries
3. Optimize images with next/image
4. Use dynamic imports for code splitting

## Conclusion

Next.js 14 with TypeScript provides an excellent foundation for building modern web applications. The combination of performance, developer experience, and type safety makes it an ideal choice for any project.`,
        author: 'Rohit Pandit',
        priority: 1,
        category: 'Web Development',
        published_at: new Date('2024-01-15'),
        is_published: true,
        featured_image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
      }
    }),

    prisma.blog.create({
      data: {
        title: 'The Art of Writing Clean Code',
        description: 'Best practices and principles for writing maintainable, readable, and scalable code.',
        slug: 'art-of-writing-clean-code',
        content: `# The Art of Writing Clean Code

Writing clean code is not just about making it work—it's about making it readable, maintainable, and scalable. Here are the key principles every developer should follow.

## Core Principles

### 1. Meaningful Names
Use descriptive names for variables, functions, and classes.

\`\`\`javascript
// Bad
const d = new Date();
const u = users.filter(u => u.age > 18);

// Good
const currentDate = new Date();
const adultUsers = users.filter(user => user.age > 18);
\`\`\`

### 2. Functions Should Do One Thing
Keep your functions small and focused on a single responsibility.

### 3. Comments Should Explain Why, Not What
Good code should be self-documenting. Comments should explain the reasoning behind complex logic.

## Conclusion

Clean code is a craft that requires constant practice and attention to detail. The investment in writing clean code pays dividends in the long run.`,
        author: 'Rohit Pandit',
        priority: 2,
        category: 'Programming',
        published_at: new Date('2024-02-01'),
        is_published: true,
        featured_image_url: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
      }
    }),

    prisma.blog.create({
      data: {
        title: 'Understanding React Server Components',
        description: 'Deep dive into React Server Components and how they revolutionize full-stack React applications.',
        slug: 'understanding-react-server-components',
        content: `# Understanding React Server Components

React Server Components represent a paradigm shift in how we think about React applications. Let's explore what they are and why they matter.

## What Are Server Components?

Server Components are React components that run on the server and can directly access backend resources like databases, file systems, and APIs without requiring an additional API layer.

## Benefits

1. **Zero Bundle Size**: Server Components don't ship to the client
2. **Direct Backend Access**: No need for API routes for simple data fetching
3. **Improved Performance**: Less JavaScript to download and execute
4. **Better SEO**: Content is rendered on the server

## Example

\`\`\`tsx
// app/posts/page.tsx
import { getPosts } from '@/lib/db'

export default async function PostsPage() {
  const posts = await getPosts() // Direct database access
  
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  )
}
\`\`\`

## Best Practices

1. Use Server Components for data fetching
2. Keep Client Components for interactivity
3. Pass serializable data between server and client
4. Use the "use client" directive judiciously

Server Components are the future of React development, offering better performance and developer experience.`,
        author: 'Rohit Pandit',
        priority: 1,
        category: 'React',
        published_at: new Date('2024-02-15'),
        is_published: true,
        featured_image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
      }
    }),

    prisma.blog.create({
      data: {
        title: 'Database Design Patterns with Prisma',
        description: 'Learn effective database design patterns and how to implement them using Prisma ORM.',
        slug: 'database-design-patterns-prisma',
        content: `# Database Design Patterns with Prisma

Prisma has revolutionized how we interact with databases in modern applications. Let's explore some essential database design patterns and how to implement them effectively.

## Schema Design Best Practices

### 1. Proper Relationships
Understanding one-to-many, many-to-many, and one-to-one relationships is crucial.

\`\`\`prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  posts Post[]
}

model Post {
  id       Int    @id @default(autoincrement())
  title    String
  authorId Int
  author   User   @relation(fields: [authorId], references: [id])
}
\`\`\`

### 2. Timestamps and Auditing
Always include created and updated timestamps for better data tracking.

### 3. Soft Deletes
Instead of permanently deleting records, mark them as deleted.

## Advanced Patterns

### Junction Tables for Many-to-Many
When you need additional fields in your many-to-many relationships, explicit junction tables are the way to go.

### Polymorphic Relationships
While Prisma doesn't support true polymorphic relationships, we can achieve similar functionality with careful design.

## Performance Considerations

1. **Indexing Strategy**: Index frequently queried fields
2. **Query Optimization**: Use select and include wisely
3. **Connection Pooling**: Configure your database connection pool properly

## Migration Best Practices

- Always review generated migrations
- Use descriptive migration names
- Test migrations in development first
- Have a rollback plan

Prisma makes database management enjoyable while maintaining the power and flexibility needed for complex applications.`,
        author: 'Rohit Pandit',
        priority: 2,
        category: 'Database',
        published_at: new Date('2024-03-01'),
        is_published: false, // Draft
        featured_image_url: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800',
      }
    }),
  ])

  console.log('📝 Created blog posts')

  // Create Photos
  const photos = await Promise.all([
    prisma.photo.create({
      data: {
        title: 'Golden Hour Portrait',
        description: 'A stunning portrait captured during the golden hour, showcasing natural lighting and warm tones.',
        image_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200',
        taken_at: new Date('2024-01-10'),
        location: 'Central Park, New York',
      }
    }),
    
    prisma.photo.create({
      data: {
        title: 'Mountain Landscape at Sunrise',
        description: 'Breathtaking mountain landscape captured at sunrise with dramatic cloud formations.',
        image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
        taken_at: new Date('2024-01-20'),
        location: 'Rocky Mountains, Colorado',
      }
    }),
    
    prisma.photo.create({
      data: {
        title: 'Urban Street Photography',
        description: 'Candid street photography capturing the essence of city life and human connections.',
        image_url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200',
        taken_at: new Date('2024-02-05'),
        location: 'SoHo, New York City',
      }
    }),
    
    prisma.photo.create({
      data: {
        title: 'Serene Lake Reflection',
        description: 'Perfect mirror-like reflection of mountains and sky in a pristine alpine lake.',
        image_url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1200',
        taken_at: new Date('2024-02-15'),
        location: 'Lake Tahoe, California',
      }
    }),
    
    prisma.photo.create({
      data: {
        title: 'Wildflower Meadow',
        description: 'Vibrant wildflower meadow in full bloom, showcasing the beauty of spring.',
        image_url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200',
        taken_at: new Date('2024-03-10'),
        location: 'Antelope Valley, California',
      }
    }),
  ])

  console.log('📸 Created photos')

  // Create Poems
  const poems = await Promise.all([
    prisma.poem.create({
      data: {
        title: 'Digital Dreams',
        author: 'Rohit Pandit',
        slug: 'digital-dreams',
        content: `In lines of code, we weave our dreams,
Through pixels bright and data streams.
Each function call, a heartbeat true,
Each variable, a morning dew.

The servers hum their gentle song,
As algorithms march along.
In this digital symphony,
We find our own identity.

Binary thoughts and silicon souls,
Creating art through ones and zeros.
In this realm where logic reigns,
Poetry flows through memory lanes.

Code is poetry, they often say,
Each semicolon finds its way.
In this dance of mind and machine,
The most beautiful things are seen.`,
        written_at: new Date('2024-01-05'),
        is_published: true,
      }
    }),
    
    prisma.poem.create({
      data: {
        title: 'Reflections in Still Water',
        author: 'Rohit Pandit',
        slug: 'reflections-in-still-water',
        content: `Beneath the surface, stories lie,
Of clouds that drift and birds that fly.
In still water, truth appears,
Washing away our doubts and fears.

The ripples speak of time's embrace,
Each wave a moment, gone without trace.
Yet in the stillness, we can see
The person we were meant to be.

Mirror of the soul so clear,
Reflecting joy and every tear.
In quiet moments by the shore,
We find what we were searching for.

The water holds our deepest thoughts,
The dreams we chase, the peace we've sought.
In its reflection, pure and true,
The universe gazes back at you.`,
        written_at: new Date('2024-01-15'),
        is_published: true,
      }
    }),
    
    prisma.poem.create({
      data: {
        title: 'The Journey Within',
        author: 'Rohit Pandit',
        slug: 'the-journey-within',
        content: `Not all paths are walked with feet,
Some journeys make the heart complete.
Through corridors of mind we roam,
Seeking that place we can call home.

The longest roads are paved with thought,
The greatest battles, inward fought.
Each step we take inside ourselves,
Reveals the treasures on our shelves.

Mountains of doubt we climb each day,
Valleys of hope show us the way.
The compass spins, the map unclear,
But wisdom whispers: "Look right here."

For in this moment, here and now,
The journey's end is on your brow.
The destination you have sought
Has always been where you are not.

So travel light and travel far,
You are the journey, you're the star.
The path unfolds with every choice,
Listen close and hear your voice.`,
        written_at: new Date('2024-02-10'),
        is_published: true,
      }
    }),
    
    prisma.poem.create({
      data: {
        title: 'Canvas of Tomorrow',
        author: 'Rohit Pandit',
        slug: 'canvas-of-tomorrow',
        content: `With brushes made of hope and dreams,
We paint tomorrow's vivid schemes.
Each stroke a choice, each hue a chance,
To join life's ever-changing dance.

The palette holds both dark and light,
The shadows give the colors might.
No masterpiece was ever made
By those who of mistakes were afraid.

The canvas waits, so blank and new,
What masterpiece will you pursue?
Each dawn brings forth a fresh white page,
Upon which we can set the stage.

The artist's eye sees what could be,
Beyond what others claim to see.
So take your brush and make your mark,
Create your light within the dark.

Tomorrow's canvas calls to you,
With endless possibilities to pursue.
The only limit is your heart,
So go ahead, create your art.`,
        written_at: new Date('2024-02-25'),
        is_published: false, // Draft
      }
    }),
  ])

  console.log('📖 Created poems')

  // Create Vlogs
  const vlogs = await Promise.all([
    prisma.vlog.create({
      data: {
        title: 'Day in the Life of a Full-Stack Developer',
        description: 'Join me for a typical day as I work on various projects, share coding tips, and discuss the latest in web development.',
        video_url: 'https://youtube.com/watch?v=sample-video-1',
        published_at: new Date('2024-01-12'),
        is_published: true,
      }
    }),
    
    prisma.vlog.create({
      data: {
        title: 'Building a Portfolio Website from Scratch',
        description: 'Watch as I design and develop a portfolio website using Next.js, TypeScript, and Tailwind CSS. Learn best practices and get inspiration for your own portfolio.',
        video_url: 'https://youtube.com/watch?v=sample-video-2',
        published_at: new Date('2024-01-25'),
        is_published: true,
      }
    }),
    
    prisma.vlog.create({
      data: {
        title: 'Photography Walk in Central Park',
        description: 'Come along on a photography adventure through Central Park as I capture portraits and landscapes. Tips and techniques included!',
        video_url: 'https://youtube.com/watch?v=sample-video-3',
        published_at: new Date('2024-02-08'),
        is_published: true,
      }
    }),
    
    prisma.vlog.create({
      data: {
        title: 'Code Review Session: React Best Practices',
        description: 'Live code review session where I analyze React components and discuss best practices, performance optimization, and maintainable code patterns.',
        video_url: 'https://youtube.com/watch?v=sample-video-4',
        published_at: new Date('2024-02-20'),
        is_published: false, // Draft
      }
    }),
  ])

  console.log('🎥 Created vlogs')

  console.log('🔗 All content created successfully')

  console.log('✅ Database seeded successfully!')
  console.log(`
📊 Seed Summary:
- ${blogs.length} blog posts created  
- ${photos.length} photos created
- ${poems.length} poems created
- ${vlogs.length} vlogs created
- All content relationships ready
  `)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  }) 