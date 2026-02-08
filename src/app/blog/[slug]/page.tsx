import { blogPosts } from "@/data/blogs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) {
    return { title: "Post Not Found" };
  }
  return {
    title: `${post.title} | Chowdhury Tafsir Ahmed Siddiki`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="mb-8 flex gap-4">
        <Link
          href="/blog"
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          &larr; All Posts
        </Link>
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          &larr; Home
        </Link>
      </div>

      <article>
        <div className="mb-8">
          <div className="text-sm text-muted-foreground mb-4">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-muted-foreground">{post.excerpt}</p>
        </div>

        <div className="relative h-64 sm:h-80 w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {post.content.split("\n").map((line, idx) => {
            const trimmed = line.trim();
            if (!trimmed) return null;
            if (trimmed.startsWith("## ")) {
              return (
                <h2
                  key={idx}
                  className="text-2xl font-bold mt-10 mb-4"
                >
                  {trimmed.replace("## ", "")}
                </h2>
              );
            }
            if (trimmed.startsWith("### ")) {
              return (
                <h3
                  key={idx}
                  className="text-xl font-semibold mt-8 mb-3"
                >
                  {trimmed.replace("### ", "")}
                </h3>
              );
            }
            if (trimmed.startsWith("- **")) {
              const content = trimmed.replace("- ", "");
              return (
                <li
                  key={idx}
                  className="ml-6 mb-2 text-muted-foreground list-disc"
                  dangerouslySetInnerHTML={{
                    __html: content
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                      .replace(/`(.*?)`/g, "<code class='px-1 py-0.5 rounded bg-muted text-sm'>$1</code>"),
                  }}
                />
              );
            }
            if (/^\d+\.\s/.test(trimmed)) {
              const content = trimmed.replace(/^\d+\.\s/, "");
              return (
                <li
                  key={idx}
                  className="ml-6 mb-2 text-muted-foreground list-decimal"
                  dangerouslySetInnerHTML={{
                    __html: content
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                      .replace(/`(.*?)`/g, "<code class='px-1 py-0.5 rounded bg-muted text-sm'>$1</code>"),
                  }}
                />
              );
            }
            return (
              <p
                key={idx}
                className="text-muted-foreground leading-relaxed mb-4 text-justify"
                dangerouslySetInnerHTML={{
                  __html: trimmed
                    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                    .replace(/`(.*?)`/g, "<code class='px-1 py-0.5 rounded bg-muted text-sm'>$1</code>"),
                }}
              />
            );
          })}
        </div>
      </article>

      <div className="mt-12 pt-8 border-t">
        <Button asChild variant="outline">
          <Link href="/blog">&larr; Back to All Posts</Link>
        </Button>
      </div>
    </div>
  );
}
