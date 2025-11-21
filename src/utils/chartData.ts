import type { ChartConfig } from "@/components/ui/chart";

// Generate 24 months of dummy data (2023-2024)
const generateWeeklyData = () => {
  const weeks = [
    "week1",
    "week2",
    "week3",
    "week3",
    "week4",
    "week5",
    "week6",
    "week7",
    "week8",
    "week9",
    "week10",
    "week11",
    "week12",
    "week13",
    "week14",
  ];
  const data = [];

  for (let i = 0; i <= 13; i++) {
    data.push({
      week: `${weeks}`,
      revenue: Math.floor(Math.random() * 50000) + 30000, // Random revenue between 30k-80k
      expenses: Math.floor(Math.random() * 30000) + 20000, // Random expenses between 20k-50k
      users: Math.floor(Math.random() * 5000) + 2000, // Random users between 2k-7k
    });
  }

  return data;
};

export const chartData = generateWeeklyData();

// Configuration for the bar chart
export const barChartConfig = {
  revenue: {
    label: "Revenue",
    color: "#3b82f6",
  },
  expenses: {
    label: "Expenses",
    color: "#a7a7a7",
  },
} satisfies ChartConfig;

// Configuration for the line chart
export const lineChartConfig = {
  users: {
    label: "Active Users",
    color: "#3b82f6",
  },
} satisfies ChartConfig;
