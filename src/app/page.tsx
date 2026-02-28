import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Education } from "@/components/education";
import { Contact } from "@/components/contact";
import { Blog } from "@/components/blog";
import LeetCode from "@/components/leetCode";
const fallbackStats = {
  totalSolved: 0,
  totalSubmissions: [{ difficulty: "All", count: 0, submissions: 0 }],
  totalQuestions: 0,
  easySolved: 0,
  totalEasy: 0,
  mediumSolved: 0,
  totalMedium: 0,
  hardSolved: 0,
  totalHard: 0,
  ranking: 0,
  contributionPoint: 0,
  reputation: 0,
  acceptanceRate: 0,
  codeforceProblem: 0,
};

export default async function Home() {
  let updatedStats = { ...fallbackStats };

  try {
    const data = await fetch(
      "https://leetcode-api-faisalshohag.vercel.app/ctafsiras",
      { cache: "no-store" },
    );
    if (!data.ok) throw new Error(`LeetCode API error: ${data.status}`);
    const stats = await data.json();
    const allSubmissions = stats.totalSubmissions?.[0];
    const acceptanceRate =
      allSubmissions?.count && allSubmissions?.submissions
        ? Number(((allSubmissions.count / allSubmissions.submissions) * 100).toFixed(2))
        : 0;
    updatedStats = { ...fallbackStats, ...stats, acceptanceRate };
  } catch (e) {
    console.error("Failed to fetch LeetCode stats:", e);
  }

  try {
    const codeforceData = await fetch(
      "https://n8n.zenix-lab.com/webhook/codeforce-stat",
      { cache: "no-store" },
    );
    if (!codeforceData.ok) throw new Error(`Codeforce API error: ${codeforceData.status}`);
    const codeforceProblem = Number((await codeforceData.text()).split(" ")[0]);
    if (!isNaN(codeforceProblem)) {
      updatedStats.codeforceProblem = codeforceProblem;
      updatedStats.totalSolved += codeforceProblem;
    }
  } catch (e) {
    console.error("Failed to fetch Codeforce stats:", e);
  }

  return (
    <div className="container mx-auto px-4">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <LeetCode updatedStats={updatedStats} />
      <Skills />
      <Blog />
      <Education />
      <Contact />
    </div>
  );
}
