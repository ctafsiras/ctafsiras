import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projects";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Projects | Chowdhury Tafsir Ahmed Siddiki",
  description:
    "Browse all projects built by Chowdhury Tafsir Ahmed Siddiki - Full Stack Developer.",
};

export default function AllProjectsPage() {
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
      <h1 className="text-4xl font-bold text-center mb-4">All Projects</h1>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        A collection of projects I have built, ranging from full-stack ecommerce
        platforms to AI-powered applications and developer tools.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.slug} className="flex flex-col">
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-4 flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <Badge key={idx} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
              <ul className="list-disc pl-5 space-y-2">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="text-justify text-sm text-muted-foreground">
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex justify-between gap-2">
              <Button disabled={!project.github} asChild variant="outline" size="sm">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link href={`/projects/${project.slug}`}>
                  Project Details
                </Link>
              </Button>
              <Button disabled={!project.live} asChild size="sm">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
