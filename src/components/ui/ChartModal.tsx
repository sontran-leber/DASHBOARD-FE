import { X } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  LineChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";

interface ChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  chartType: "revenue" | "expenses" | "users" | null;
  chartData: any[];
  barChartConfig: any;
  lineChartConfig: any;
}

export default function ChartModal({
  isOpen,
  onClose,
  chartType,
  chartData,
  barChartConfig,
  lineChartConfig,
}: ChartModalProps) {
  if (!isOpen || !chartType) return null;

  const renderChart = () => {
    switch (chartType) {
      case "revenue":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue over 2 years</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={barChartConfig}
                className="h-[400px] w-full"
              >
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={true} />
                  <XAxis
                    dataKey="month"
                    tickLine={true}
                    tickMargin={10}
                    axisLine={true}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="revenue"
                    fill="var(--color-revenue)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );

      case "expenses":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Expenses Trend</CardTitle>
              <CardDescription>Monthly expenses over 2 years</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={barChartConfig}
                className="h-[400px] w-full"
              >
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={true} />
                  <XAxis
                    dataKey="month"
                    tickLine={true}
                    tickMargin={10}
                    axisLine={true}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="expenses"
                    fill="var(--color-expenses)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );

      case "users":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Active Users Growth</CardTitle>
              <CardDescription>
                User acquisition trend over 2 years
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={lineChartConfig}
                className="h-[400px] w-full"
              >
                <LineChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={true} />
                  <XAxis
                    dataKey="month"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Line
                    dataKey="users"
                    type="monotone"
                    stroke="var(--color-users)"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Backdrop/Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
          {/* Close Button */}
          <div className="flex justify-end p-4 pb-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Chart Content */}
          <div className="p-6 pt-2">{renderChart()}</div>
        </div>
      </div>
    </>
  );
}
