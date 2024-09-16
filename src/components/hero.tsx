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
    },
    {
      text: "Problem",
    },
    {
      text: "Solver",
    },
  ];

  return (
    <section className="py-24 px-6 text-center">
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
        Chowdhury Tafsir Ahmed Siddiki
      </h1>
      <div className="mt-4 h-[40px] lg:h-[56px]">
        <TypewriterEffect words={words} />
      </div>
      <p className="mx-auto mt-4 max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
        Passionate about continuous learning, exploring new technologies, and
        creating innovative solutions to solve real-world problems.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Button asChild>
          <a href="#contact">Contact Me</a>
        </Button>
        <Button variant="outline" asChild>
          <a href="/resume.pdf" download>
            Download Resume
          </a>
        </Button>
      </div>
    </section>
  );
}
