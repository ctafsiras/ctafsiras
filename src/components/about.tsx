import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function About() {
  return (
    <section id="about" className="py-16 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">About Me</h2>
      <Card>
        <CardHeader>
          <CardTitle>A Dedicated Full Stack Developer</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-justify">
            A software engineer currently working as a Full Stack Developer at Standard Insights. I studied Computer Science at University of the People and hold IBM certification as a Full Stack Software Developer, along with Meta certifications in Front-End and Back-End Development. I'm passionate about continuous learning, exploring new technologies, and creating innovative solutions to solve real-life problems.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
