
import { getBlogBySlug } from '@/lib/services/blog.service';
import { BlogDTO } from '@/types/blog';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Article } from './article';

interface BlogPageParams {
    params: {
        slug: string;
    };
}

export default async function BlogPostPage({ params }: BlogPageParams) {
    const { slug } = await params;

    // Fetch blog data. Assuming blog.content is the Lexical JSON object
    const blog: BlogDTO | null = await getBlogBySlug(slug);
    console.log("Blog fetched:", blog);
    // Ensure blog and content exist and content is valid JSON object
    if (!blog) {
        console.log(`Blog not found or content invalid/missing for slug: ${slug}`);
        notFound();
    }

    try {
        const parsed = JSON.parse(blog.content);
        if (!parsed.root) {
            throw new Error("Invalid Lexical JSON structure (missing root)");
        }
    } catch (error) {
        console.error(`Failed to stringify or validate Lexical content for slug ${slug}:`, error);
        notFound();
    }

    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">{blog.title}</h1>
            <Article contentJSON={blog.content} />
        </div>
    );
}

