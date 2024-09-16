import { Linkedin, Github, Code } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            Built by Chowdhury Tafsir Ahmed Siddiki. Hosted on{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Vercel
            </a>
            .
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/ctafsiras"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="https://linkedin.com/in/ctafsiras"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a
            href="https://leetcode.com/u/ctafsiras"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Code className="h-5 w-5" />
            <span className="sr-only">LeetCode</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
