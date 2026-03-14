import { About } from "@/components/about";
import { Blog } from "@/components/blog";
import { Contact } from "@/components/contact";
import { Education } from "@/components/education";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import LeetCode from "@/components/leetCode";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";

type SubmissionStats = {
  difficulty: string;
  count: number;
  submissions: number;
};

type LeetCodeStats = {
  totalSolved: number;
  totalSubmissions: SubmissionStats[];
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  ranking: number;
  contributionPoint: number;
  reputation: number;
  acceptanceRate: number;
  codeforceProblem: number;
};

const FETCH_REVALIDATE_SECONDS = 3600;
const FETCH_TIMEOUT_MS = 5000;

const fallbackStats: LeetCodeStats = {
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

function logFetchEvent(
  source: string,
  startedAt: number,
  details: Record<string, string | number>,
) {
  console.info(`[home-stats] ${source}`, {
    durationMs: Date.now() - startedAt,
    ...details,
  });
}

async function fetchLeetCodeStats(): Promise<Partial<LeetCodeStats>> {
  const startedAt = Date.now();
  const response = await fetch(
    "https://leetcode-api-faisalshohag.vercel.app/ctafsiras",
    {
      next: { revalidate: FETCH_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    },
  );

  if (!response.ok) {
    logFetchEvent("leetcode", startedAt, {
      outcome: "http_error",
      status: response.status,
    });
    throw new Error(`LeetCode API error: ${response.status}`);
  }

  const stats = (await response.json()) as Partial<LeetCodeStats>;
  const allSubmissions = stats.totalSubmissions?.[0];
  const acceptanceRate =
    allSubmissions?.count && allSubmissions.submissions
      ? Number(
          ((allSubmissions.count / allSubmissions.submissions) * 100).toFixed(2),
        )
      : 0;

  logFetchEvent("leetcode", startedAt, {
    outcome: "success",
    status: response.status,
  });

  return {
    ...stats,
    acceptanceRate,
  };
}

async function fetchCodeforceStats(): Promise<number> {
  const startedAt = Date.now();
  const response = await fetch(
    "https://n8n.zenix-lab.com/webhook/codeforce-stat",
    {
      next: { revalidate: FETCH_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    },
  );

  if (!response.ok) {
    logFetchEvent("codeforce", startedAt, {
      outcome: "http_error",
      status: response.status,
    });
    throw new Error(`Codeforce API error: ${response.status}`);
  }

  const text = await response.text();
  const codeforceProblem = Number(text.split(" ")[0]);

  if (Number.isNaN(codeforceProblem)) {
    logFetchEvent("codeforce", startedAt, {
      outcome: "invalid_payload",
      status: response.status,
    });
    throw new Error("Codeforce API returned an invalid payload");
  }

  logFetchEvent("codeforce", startedAt, {
    outcome: "success",
    status: response.status,
  });

  return codeforceProblem;
}

function logFetchFailure(source: string, error: unknown) {
  const reason =
    error instanceof Error
      ? `${error.name}: ${error.message}`
      : "Unknown fetch failure";

  console.error(`[home-stats] ${source} failed`, {
    timeoutMs: FETCH_TIMEOUT_MS,
    reason,
  });
}

export default async function Home() {
  const updatedStats = { ...fallbackStats };

  const [leetcodeResult, codeforceResult] = await Promise.allSettled([
    fetchLeetCodeStats(),
    fetchCodeforceStats(),
  ]);

  if (leetcodeResult.status === "fulfilled") {
    Object.assign(updatedStats, leetcodeResult.value);
  } else {
    logFetchFailure("leetcode", leetcodeResult.reason);
  }

  if (codeforceResult.status === "fulfilled") {
    updatedStats.codeforceProblem = codeforceResult.value;
    updatedStats.totalSolved += codeforceResult.value;
  } else {
    logFetchFailure("codeforce", codeforceResult.reason);
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
