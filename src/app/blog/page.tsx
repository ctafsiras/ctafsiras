import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogs";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Chowdhury Tafsir Ahmed Siddiki",
  description:
    "Technical articles and insights by Chowdhury Tafsir Ahmed Siddiki on full stack development, AI integration, and modern web technologies.",
};

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          &larr; Back to Home
        </Link>
      </div>
      <h1 className="text-4xl font-bold text-center mb-4">Blog</h1>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Sharing my knowledge and experiences in full stack development, backend
        architecture, and AI integration.
      </p>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Card key={post.slug} className="flex flex-col overflow-hidden">
            <div className="relative h-48 w-full">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <div className="text-sm text-muted-foreground mb-2">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <CardTitle className="text-lg leading-tight">
                {post.title}
              </CardTitle>
              <CardDescription className="line-clamp-3">
                {post.excerpt}
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Button asChild variant="outline" className="w-full">
                <Link href={`/blog/${post.slug}`}>Read More</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
