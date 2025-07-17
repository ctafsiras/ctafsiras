import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "./ui/card";
import dynamic from "next/dynamic";
const ClientReOrder = dynamic(() => import("./reorder"), { ssr: false });

export function Skills() {
  const skillCategories = [
    {
      category: "Frontend",
      skills: [
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Tailwind CSS",
        "ShadCN UI",
        "Redux",
        "Ant Design",
      ],
    },
    {
      category: "Backend",
      skills: [
        "Node.js",
        "Express.js",
        "Prisma",
        "Mongoose",
        "OpenAI",
        "Gemini",
        "Claude",
        "Redis",
        "Firebase",
        "NextAuth/Auth.js",
        "Clerk",
        "BullMQ",
      ],
    },
    {
      category: "Database",
      skills: [
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "Supabase",
        "Neon.tech",
      ],
    },
    {
      category: "DevOps & Tools",
      skills: [
        "Git",
        "GitHub",
        "GitHub Actions",
        "Docker",
        "Redis",
        "AWS (EC2, ECS)",
        "DigitalOcean",
      ],
    },
    {
      category: "Interpersonal Skills",
      skills: [
        "Diligent",
        "Problem Solver",
        "Highly Accountable",
        "Active Listener",
        "Team Player",
      ],
    },
  ];

  return (
    <section id="skills" className="py-16 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Skills</h2>
      <Card>
        <CardContent>
          <div className="space-y-6 pt-6">
            {skillCategories.map((category, index) => (
              <div key={index}>
                <h3 className="text-xl font-semibold mb-2">
                  {category.category}
                </h3>
                <div>
                  <ClientReOrder
                    className="cursor-grab h-8"
                    parentClassName="flex flex-wrap gap-2"
                    initialItems={category.skills}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
{
  /* {category.skills.map((skill, idx) => (
                    <Badge key={idx} variant="outline">
                      {skill}
                    </Badge>
                  ))} */
}
