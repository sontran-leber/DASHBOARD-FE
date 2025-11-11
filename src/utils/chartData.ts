import type { ChartConfig } from "@/components/ui/chart";

// Generate 24 months of dummy data (2023-2024)
const generateMonthlyData = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const data = [];

  for (let year = 2023; year <= 2024; year++) {
    for (let month = 0; month < 12; month++) {
      data.push({
        month: `${months[month]} ${year}`,
        revenue: Math.floor(Math.random() * 50000) + 30000, // Random revenue between 30k-80k
        expenses: Math.floor(Math.random() * 30000) + 20000, // Random expenses between 20k-50k
        users: Math.floor(Math.random() * 5000) + 2000, // Random users between 2k-7k
      });
    }
  }

  return data;
};

export const chartData = generateMonthlyData();

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
