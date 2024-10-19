import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Experience() {
  const experiences = [
    {
      company: "Legal Fist",
      position: "Full Stack Developer",
      duration: "Jun 2022 - Sep 2023 (Contractual)",
      responsibilities: [
        "Designed and developed over 20 static and dynamic pages using Next.js, React, and Tailwind.",
        "Deployed applications using frameworks like Laravel, WordPress, and Next.js on DigitalOcean. Learned the process on the go within 7 days.",
        "Resolved bugs related to the UI, functionalities, server, and associated tools within the day.",
      ],
    },
    {
      company: "Bangladesh Air Force",
      position: "Accounts & Secretarial Assistant",
      duration: "Mar 2018 - Sep 2024",
      responsibilities: [
        "Automated various manual tasks, including bill generation, printing, and tracking systems. This reduced the time required from 2 days to 1 hour and the necessary manpower from 3 to 1.",
        "Took responsibility and successfully credited the salary of over 2800 people of the organization.",
        "Awarded with Certificate of Appreciation from the current Chief of Bangladesh Air Force for successfully completing the pilot-project of iBAS++ software system in the organization.",
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
