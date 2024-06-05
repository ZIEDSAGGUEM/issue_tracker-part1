"use client";
import { useEffect, useState } from "react";
import IssueStatusChart from "../components/IssueStatusCharts"; // Fixed import

interface Issue {
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const IssuesList: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);

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

  return (
    <div>
      <h1 className=" text-center ">Issues List</h1>
      <ul className=" flex align-center justify-center">
        {issues.map((issue) => (
          <div
            key={issue.title}
            className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4"
          >
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{issue.title}</div>
              <p className="text-gray-700 text-base">{issue.description}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span
                className={`inline-block bg-${
                  issue.status === "Open"
                    ? "green"
                    : issue.status === "InProgress"
                    ? "blue"
                    : "red"
                }-200 rounded-full px-3 py-1 text-sm font-semibold text-${
                  issue.status === "Open"
                    ? "green"
                    : issue.status === "InProgress"
                    ? "blue"
                    : "red"
                }-700 mr-2 mb-2`}
              >
                {issue.status}
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                Created: {new Date(issue.createdAt).toLocaleDateString()}
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                Updated: {new Date(issue.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default IssuesList;
