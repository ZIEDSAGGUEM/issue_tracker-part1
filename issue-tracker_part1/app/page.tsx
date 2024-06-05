"use client";
import { Button } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import IssueStatusChart from "./components/IssueStatusCharts";
import { useEffect, useState } from "react";

interface Issue {
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function Home() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [percentages, setPercentages] = useState<Record<string, number>>({});

  useEffect(() => {
    async function fetchIssues() {
      try {
        const response = await fetch("/api/issues");
        if (response.ok) {
          const data = await response.json();
          setIssues(data);
        } else {
          console.error("Failed to fetch issues");
        }
      } catch (error) {
        console.error("Error fetching issues:", error);
      }
    }

    fetchIssues();
  }, []);

  useEffect(() => {
    if (issues.length === 0) return;

    const statusCounts = issues.reduce((acc, issue) => {
      acc[issue.status] = (acc[issue.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const totalIssues = issues.length;
    const calculatedPercentages = Object.keys(statusCounts).reduce(
      (acc, status) => {
        acc[status] = ((statusCounts[status] / totalIssues) * 100).toFixed(2);
        return acc;
      },
      {} as Record<string, number>
    );

    setPercentages(calculatedPercentages);
  }, [issues]);
  return (
    <div>
      <h2>Issue Status Percentages</h2>
      <IssueStatusChart statusPercentages={percentages} />
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </div>
  );
}
