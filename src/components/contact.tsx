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
      <div className="max-w-2xl mx-auto grid gap-8 md:grid-cols-2">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              Feel free to reach out through any of the following.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Email
              </p>
              <a
                href="mailto:ctafsiras@gmail.com"
                className="text-primary hover:underline"
              >
                ctafsiras@gmail.com
              </a>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Phone
              </p>
              <a
                href="tel:+8801983510532"
                className="text-primary hover:underline"
              >
                +880 1983 510532
              </a>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Location
              </p>
              <p>Dhaka, Bangladesh</p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
            <CardDescription>
              Fill out the form below to send me a message.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              action="mailto:ctafsiras@gmail.com"
              method="GET"
            >
              <div>
                <Input placeholder="Your Name" name="name" required />
              </div>
              <div>
                <Input placeholder="Subject" name="subject" required />
              </div>
              <div>
                <Textarea placeholder="Your Message" name="body" required />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
