import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "./ui/card";

export function Skills() {
  const skillCategories = [
    {
      category: "Languages",
      skills: ["JavaScript", "TypeScript", "Python", "C++"],
    },
    {
      category: "Frontend",
      skills: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "ShadCN",
        "Redux",
        "Ant Design",
      ],
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express.js", "Prisma", "Mongoose"],
    },
    {
      category: "Database",
      skills: ["MySQL", "MongoDB", "PostgreSQL"],
    },
    {
      category: "DevOps",
      skills: ["Git", "Github", "DigitalOcean", "Ubuntu", "Vercel", "Firebase"],
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
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => (
                    <Badge key={idx} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
