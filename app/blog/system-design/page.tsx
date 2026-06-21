import type { Metadata } from "next";
import Link from "next/link";
import { categoryMeta } from "./meta";

export const metadata: Metadata = {
  title: `${categoryMeta.name} — Rohit Pandit`,
  description: categoryMeta.description,
};

const posts: { slug: string; title: string; summary: string; readingMinutes: number }[] = [];

export default function SystemDesignCategoryPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <Link href="/blog" className="label-micro opacity-60 hover:opacity-100">
        ← All topics
      </Link>
      <h1 className="font-display text-display mt-6">{categoryMeta.name}</h1>
      <p className="body-editorial mt-4">{categoryMeta.description}</p>

      {posts.length === 0 ? (
        <p className="body-editorial mt-12 italic opacity-60">
          No posts yet. Check back soon.
        </p>
      ) : (
        <ul className="mt-12 divide-y divide-white/10">
          {posts.map((post) => (
            <li key={post.slug} className="py-6">
              <Link
                href={`/blog/system-design/${post.slug}`}
                className="group block"
              >
                <div className="flex items-baseline justify-between gap-6">
                  <h2 className="font-display text-2xl group-hover:underline">
                    {post.title}
                  </h2>
                  <span className="label-micro opacity-60">
                    {post.readingMinutes} min
                  </span>
                </div>
                <p className="body-editorial mt-2 opacity-75">{post.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
