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
  const res = await data.json();
  const updatedStats = {
    totalSolved: res.totalSolved,
    totalQuestions: res.totalQuestions,
    easySolved: res.easySolved,
    totalEasy: res.totalEasy,
    mediumSolved: res.mediumSolved,
    totalMedium: res.totalMedium,
    hardSolved: res.hardSolved,
    totalHard: res.totalHard,
    acceptanceRate: parseFloat(res.acceptanceRate.toFixed(4)),
    contributionPoints: res.contributionPoint,
    reputation: res.reputation,
    ranking: res.ranking,
  };
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
