import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Experience() {
  const experiences = [
    {
      company: "Standard Insights",
      position: "Full Stack Developer",
      duration: "Oct 24 - Present | Remote | Hong Kong, SAR",
      responsibilities: [
        "Engineered and shipped production-grade features using Next.js, TypeScript, Node.js, and ShadCN UI, delivering scalable consumer intelligence dashboards with clean, responsive UI/UX.",
        "Built and optimized RESTful APIs using Express.js, MongoDB, and Mongoose, while leveraging Redis for efficient caching and state handling across sessions and data layers.",
        "Designed and implemented BullMQ-based worker queues backed by Redis, enabling background task processing with robust error handling and retry logic.",
        "Integrated Claude AI and OpenAI APIs into the platform to power intelligent summarization, dynamic content generation, and personalized recommendations.",
        "Deployed containerized services via Docker and managed production environments using AWS ECS, handling CI/CD pipelines and service orchestration.",
        "Leveraged the Vercel SDK for frontend deployment, enabling seamless integration of serverless functions and performance monitoring in production."
      ],
    },
    {
      company: "HJ Animation Shop LTD",
      position: "MERN Stack Developer",
      duration: "Jul 23 - Sep 24 | Remote | Loughton, United Kingdom",
      responsibilities: [
        "Built and deployed full-stack features with TypeScript, React.js, Node.js, and MongoDB, focusing on UI components via Tailwind CSS and reusable modules.",
        "Integrated third-party services (payment, auth, analytics) and designed secure RESTful APIs using JWT/OAuth2, improving platform security and extensibility.",
        "Automated deployments, built reusable components, and implemented smart workflows, boosting development velocity and aligning with CI/CD practices."
      ],
    },
    {
      company: "Legal Fist",
      position: "Full Stack Developer",
      duration: "Jun 22 - Jun 23 | Remote | Dhaka, Bangladesh",
      responsibilities: [
        "Designed and deployed dynamic apps using Next.js, React, Tailwind CSS, and PostgreSQL via Prisma ORM, achieving clean and responsive UI.",
        "Built and maintained backend features using Node.js, Express.js, and MongoDB, integrating with PostgreSQL via Prisma for optimal queries.",
        "Contributed to cross-team code reviews, sprint planning, and deployment pipelines using Git and Linux servers on DigitalOcean."
      ],
    },
  ];

  return (
    <section id="experience" className="py-16">
      <h2 className="text-3xl font-bold text-center mb-8">
        Professional Experience
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {experiences.map((exp, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <CardTitle>{exp.company}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {exp.position} | {exp.duration}
              </p>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx} className="text-justify">
                    {resp}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
