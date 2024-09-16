import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function Contact() {
  return (
    <section id="contact" className="py-16">
      <h2 className="text-3xl font-bold text-center mb-8">Contact Me</h2>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Get in Touch</CardTitle>
          <CardDescription>
            Fill out the form below to send me a message.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Input placeholder="Your Name" />
            </div>
            <div>
              <Input type="email" placeholder="Your Email" />
            </div>
            <div>
              <Textarea placeholder="Your Message" />
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
