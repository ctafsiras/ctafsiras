import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Experience() {
  const experiences = [
    {
      company: "Legal Fist",
      position: "Full Stack Developer",
      duration: "Jun 2022 - Present (Part-time)",
      responsibilities: [
        "Designed and developed over 20 static and dynamic pages using Next.js, React, and Tailwind CSS.",
        "Deployed applications using various frameworks such as Laravel, WordPress, and Next.js on DigitalOcean with an Ubuntu server.",
        "Resolved bugs related to the UI, server, and associated tools.",
      ],
    },
    {
      company: "Bangladesh Air Force",
      position: "Accountant",
      duration: "Mar 2018 - Sep 2024",
      responsibilities: [
        "Developed tools using Next.js, MS Excel Macro, Google App Script for internal use.",
        "Successfully automated various manual tasks including bill generation, printing, and tracking, resulting in increased efficiency and reduced operational time.",
        "Awarded with Certificate of Appreciation from the current Chief of Bangladesh Air Force for successfully completing the pilot project of iBAS++ software system in the organization.",
      ],
    },
  ];

  return (
    <section id="experience" className="py-16">
      <h2 className="text-3xl font-bold text-center mb-8">
        Professional Experience
      </h2>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <Card key={index}>
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
