import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">Tafsir Ahmed</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link href="#about">About</Link>
          <Link href="#experience">Experience</Link>
          <Link href="#projects">Projects</Link>
          <Link href="#skills">Skills</Link>
          <Link href="#education">Education</Link>
          <Link href="#contact">Contact</Link>
        </nav>
        <div className="ml-auto">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
