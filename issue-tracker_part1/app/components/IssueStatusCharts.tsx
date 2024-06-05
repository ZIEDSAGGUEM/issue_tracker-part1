import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface IssueStatusChartProps {
  statusPercentages: Record<string, number>;
  colors?: string[];
  showLegend?: boolean;
}

const IssueStatusChart: React.FC<IssueStatusChartProps> = ({
  statusPercentages,
  colors = ["#FF6384", "#36A2EB", "#FFCE56"], // Default colors
  showLegend = true,
}) => {
  const data = {
    labels: Object.keys(statusPercentages),
    datasets: [
      {
        data: Object.values(statusPercentages),
        backgroundColor: colors,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: showLegend,
      },
    },
  };

  return <Doughnut className="w-1/2" data={data} options={options} />;
};

export default IssueStatusChart;
