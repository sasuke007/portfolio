import type { Metadata } from "next";
import Link from "next/link";
import { categoryMeta as systemDesign } from "./system-design/meta";
import { categoryMeta as database } from "./database/meta";

export const metadata: Metadata = {
  title: "Blog — Rohit Pandit",
  description: "Writing on system design, databases, and engineering.",
};

const categories = [
  { slug: "system-design", ...systemDesign },
  { slug: "database", ...database },
];

export default function BlogIndexPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-display text-display">Writing</h1>
      <p className="body-editorial mt-4">
        Long-form notes, grouped by topic.
      </p>

      <ul className="mt-12 divide-y divide-white/10">
        {categories.map((category) => (
          <li key={category.slug} className="py-6">
            <Link href={`/blog/${category.slug}`} className="group block">
              <div className="flex items-baseline justify-between gap-6">
                <h2 className="font-display text-2xl group-hover:underline">
                  {category.name}
                </h2>
                <span className="label-micro opacity-60">
                  /{category.slug}
                </span>
              </div>
              <p className="body-editorial mt-2 opacity-75">
                {category.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
