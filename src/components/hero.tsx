import { Button } from "@/components/ui/button";
import { TypewriterEffect } from "@/components/typewriter-effect";

export function Hero() {
  const words = [
    {
      text: "Full",
    },
    {
      text: "Stack",
    },
    {
      text: "Developer",
      className: "text-[#F59E0B]",
    },
  ];

  return (
    <section className="py-24 px-6 text-center">
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
        Chowdhury Tafsir Ahmed Siddiki
      </h1>
      <div className="mt-4 h-[40px] lg:h-[56px] text-xl md:text-4xl">
        <TypewriterEffect words={words} />
      </div>
      <p className="mx-auto mt-4 max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
        Passionate about continuous learning, exploring new technologies, and
        creating innovative solutions to solve real-world problems.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Button asChild>
          <a target="_blank" href="https://drive.google.com/file/d/1kNpOqud5V7HCxpAnoq9qzocPyb3ygOaXYb3ZE9ID0AI/preview">View Resume</a>
        </Button>
        <Button variant="outline" asChild>
          <a
            href="https://docs.google.com/document/d/1kNpOqud5V7HCxpAnoq9qzocPyb3ygOaXYb3ZE9ID0AI/export?format=pdf"
          >
            Download Resume
          </a>
        </Button>
      </div>
    </section>
  );
}
