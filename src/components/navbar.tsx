import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="container flex h-14 items-center px-4 mx-auto">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="font-bold text-xl">Tafsir's Portfolio</span>
        </Link>
        <nav className="items-center space-x-6 text-sm font-medium hidden md:flex">
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
