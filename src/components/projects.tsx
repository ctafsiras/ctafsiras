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
import Link from "next/link";
import { projects } from "@/data/projects";

const gradients = [
  "from-blue-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-rose-600",
  "from-violet-500 to-purple-600",
  "from-cyan-500 to-sky-600",
];

export function Projects() {
  return (
    <section id="projects" className="py-16">
      <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <Card key={project.slug} className="flex flex-col">
            <CardHeader>
              <div
                className={`mb-4 h-48 rounded-lg bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center`}
              >
                <span className="text-white text-2xl font-bold tracking-wide opacity-90 text-center px-4">
                  {project.title}
                </span>
              </div>
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
                  <li key={idx} className="text-justify">
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex justify-between gap-2">
              {project.github ? (
                <Button asChild variant="outline" size="sm">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </Button>
              ) : (
                <Button disabled variant="outline" size="sm">
                  GitHub
                </Button>
              )}
              <Button asChild variant="outline" size="sm">
                <Link href={`/projects/${project.slug}`}>Project Details</Link>
              </Button>
              {project.live ? (
                <Button asChild size="sm">
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    Live Demo
                  </a>
                </Button>
              ) : (
                <Button disabled size="sm">
                  Live Demo
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="text-center mt-8">
        <Button asChild variant="outline" size="lg">
          <Link href="/projects">View All Projects</Link>
        </Button>
      </div>
    </section>
  );
}
