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
import Image from "next/image";

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
      ],
      features: [
        "Implemented ecommerce features including view products, add to cart, and checkout. Dashboard for use to manage previous order and current order status.",
        "Implemented Dashboard for admin to manage products and users. Add new products. Manage all order status",
      ],
      github: "https://github.com/ctafsiras/baby-care-store",
      live: "https://baby-care-store-three.vercel.app",
    },
    {
      title: "Bake N Treat",
      description: "A bakery ecommerce website for delicious treats.",
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Stripe",
        "MongoDB",
        "NextAuth.js",
      ],
      features: [
        "Implemented a full-featured ecommerce platform with product listings, shopping cart, and secure checkout using Stripe.",
        "Created a user authentication system with NextAuth.js for customer accounts and order history.",
        "Designed a responsive and visually appealing interface showcasing bakery products.",
      ],
      github: "https://github.com/ctafsiras/bake-n-treat",
      live: "https://bake-n-treat.vercel.app",
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
        "Implemented an MCQ exam feature with a timer, instant result display, and a report card for exam history. Where almost 440 students gave exams over 3000 times.",
        "Deployed the application on Digital Ocean with an Ubuntu server, integrated with GitHub for continuous integration and deployment.",
      ],
      github: "",
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
              <div className="mb-4 relative group perspective-1000">
                <div className="transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
                  <Image
                    src={`https://themewagon.com/wp-content/uploads/2021/08/skydash-1200x736.png`}
                    alt={`${project.title} screenshot`}
                    width={600}
                    height={400}
                    className="rounded-lg object-cover w-full backface-hidden"
                  />
                  <div className="absolute top-0 left-0 w-full h-full backface-hidden rotate-y-180">
                    <Image
                      src={`https://themewagon.com/wp-content/uploads/2022/11/phoenix-html-1500x920-1.jpg`}
                      alt={`${project.title} alternate screenshot`}
                      width={600}
                      height={400}
                      className="rounded-lg object-cover w-full h-full"
                    />
                  </div>
                </div>
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
            <CardFooter className="flex justify-between">
              <Button disabled={!project.github} asChild variant="outline">
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
