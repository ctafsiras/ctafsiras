import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function About() {
  return (
    <section id="about" className="py-16">
      <h2 className="text-3xl font-bold text-center mb-8">About Me</h2>
      <Card>
        <CardHeader>
          <CardTitle>A Dedicated Full Stack Developer</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-justify">
            Currently working at Legal Fist, I am passionate about continuous
            learning, exploring new technologies, and creating innovative
            solutions to solve real-world problems. With a background in
            accounting and a strong foundation in computer science, I bring a
            unique perspective to software development, combining analytical
            skills with technical expertise.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
