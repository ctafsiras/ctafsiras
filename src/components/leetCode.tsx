"use client";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { useRef } from "react";

interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  contributionPoint: number;
  reputation: number;
  ranking: number;
}

const difficultyColors: Record<string, string> = {
  All: "bg-blue-500",
  Easy: "bg-green-500",
  Medium: "bg-yellow-500",
  Hard: "bg-red-500",
};

const borderColors: Record<string, string> = {
  All: "border-blue-500",
  Easy: "border-green-500",
  Medium: "border-yellow-500",
  Hard: "border-red-500",
};

export default function LeetCode({
  updatedStats,
}: {
  updatedStats: LeetCodeStats;
}) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const stats = [
    {
      difficulty: "All",
      count: updatedStats.totalSolved,
      total: updatedStats.totalQuestions,
    },
    {
      difficulty: "Easy",
      count: updatedStats.easySolved,
      total: updatedStats.totalEasy,
    },
    {
      difficulty: "Medium",
      count: updatedStats.mediumSolved,
      total: updatedStats.totalMedium,
    },
    {
      difficulty: "Hard",
      count: updatedStats.hardSolved,
      total: updatedStats.totalHard,
    },
  ];

  return (
    <section id="leetCode" className="py-16 max-w-3xl mx-auto" ref={sectionRef}>
      <h2 className="text-3xl font-bold text-center mb-8">My LeetCode Stats</h2>
      <Card>
        <CardContent>
          <div className="pt-6 grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.difficulty}
                className={`${
                  difficultyColors[stat.difficulty]
                } p-6 rounded-lg shadow-md text-center`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold text-white mb-2">
                  {stat.difficulty}
                </h3>
                <motion.div
                  className="text-4xl font-bold text-white"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    delay: 0.2 + index * 0.1,
                  }}
                >
                  {stat.count}
                </motion.div>
                <p className="text-sm text-white mt-2">out of {stat.total}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                title: "Acceptance Rate",
                value: `${updatedStats.acceptanceRate}%`,
                color: borderColors.All,
              },
              {
                title: "Contribution Points",
                value: updatedStats.contributionPoint,
                color: borderColors.Easy,
              },
              {
                title: "Reputation",
                value: updatedStats.reputation,
                color: borderColors.Medium,
              },
              {
                title: "Ranking",
                value: updatedStats.ranking.toLocaleString(),
                color: borderColors.Hard,
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className={`p-4 rounded-lg shadow-md text-center border-2 ${item.color} flex flex-col justify-center h-24`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <h4 className="text-sm font-semibold mb-1">{item.title}</h4>
                <p className="text-lg font-bold">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
