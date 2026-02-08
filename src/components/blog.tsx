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

export function Blog() {
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="py-16">
      <h2 className="text-3xl font-bold text-center mb-8">Blog</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {latestPosts.map((post) => (
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
              <div className="text-sm text-muted-foreground mb-1">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <CardTitle className="text-lg leading-tight">
                {post.title}
              </CardTitle>
              <CardDescription className="line-clamp-2">
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
      <div className="text-center mt-8">
        <Button asChild variant="outline" size="lg">
          <Link href="/blog">View All Posts</Link>
        </Button>
      </div>
    </section>
  );
}
