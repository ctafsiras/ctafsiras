import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Education } from "@/components/education";
import { Contact } from "@/components/contact";
import LeetCode from "@/components/leetCode";
export default async function Home() {
  const data = await fetch(
    "https://leetcode-api-faisalshohag.vercel.app/ctafsiras",
    {
      cache: "no-store",
    }
  );
  const updatedStats = await data.json();
  updatedStats.acceptanceRate = parseFloat(
    (
      updatedStats.matchedUserStats.acSubmissionNum[0].count /
      updatedStats.matchedUserStats.acSubmissionNum[0].submissions
    ).toFixed(2)
  );

  return (
    <div className="container mx-auto px-4">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <LeetCode updatedStats={updatedStats} />
      <Skills />
      <Education />
      <Contact />
    </div>
  );
}
