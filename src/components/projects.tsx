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

export function Projects() {
  const projects = [
    {
      title: "Baby Care Store",
      description: "An eccommerce web application for baby care accessories.",
      technologies: [
        "Next.js",
        "React",
        "Redux",
        "TypeScript",
        "Tailwind",
        "ShadCN",
        "Prisma",
        "PostgreSQL",
        "GitHub",
        "Vercel",
      ],
      features: [
        "Implemented eccommerce features including view products, add to cart, and checkout.",
        "Dashboard for use to manage previous order and current order status",
        "Implemented Dashboard for admin to manage products and users. Add new products. Manage All order status",
        "Deployed the application on Vercel with a PostgreSQL database, integrated with GitHub for continuous integration and deployment.",
      ],
      github: "https://github.com/ctafsiras/baby-care-store",
      live: "https://baby-care-store-three.vercel.app",
    },
    {
      title: "Legal Fist Exam",
      description: "A MCQ based exam taking web application for law students.",
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind",
        "GitHub",
        "Digital Ocean",
        "Ubuntu",
      ],
      features: [
        "Implemented an MCQ exam feature with a timer, instant result display, and a report card for exam history.",
        "Deployed the application on Digital Ocean with an Ubuntu server, integrated with GitHub for continuous integration and deployment.",
      ],
      github: "https://github.com/ctafsiras/legalfist-exam.git",
      live: "https://exam.legalfist.com",
    },
    {
      title: "Mind The Blog",
      description:
        "A smart reminder for the latest article of all of your favorite blog sites.",
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "ShadCN",
        "Prisma",
        "Next Auth",
        "MongoDB",
      ],
      features: [
        "Implemented Mailgun to send automated emails to users whenever their favorite blog publishes a new article.",
        "Responsive design optimized for both mobile and desktop devices.",
      ],
      github: "https://github.com/ctafsiras/mind-the-blog.git",
      live: "https://mindtheblog.vercel.app",
    },
  ];

  return (
    <section id="projects" className="py-16">
      <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <Card key={index} className="flex flex-col">
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
                  <li key={idx} className="text-justify">
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button asChild variant="outline">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </Button>
              <Button asChild>
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
    </section>
  );
}
