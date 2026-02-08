import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Education() {
  return (
    <section id="education" className="py-16 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Education</h2>
      <Card>
        <CardHeader>
          <CardTitle>University of the People</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-semibold">
            Bachelor of Science in Computer Science
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            2021 - 2024 | Completed
          </p>
          <p className="text-muted-foreground mt-2">Graduated with CGPA 3.67</p>
          <p className="text-muted-foreground">
            Enlisted for Dean&apos;s Award List
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
