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
import {
  chartData,
  barChartConfig,
  lineChartConfig,
} from "@/utils/chartData.ts";

export default function ChartsExample() {
  return (
    <div className="w-full space-y-8 p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Business Metrics Dashboard</h1>
        <p className="text-muted-foreground">
          Monthly performance data from January 2023 to December 2024
        </p>
      </div>

      {/* Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue vs Expenses</CardTitle>
          <CardDescription>Monthly comparison over 2 years</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={barChartConfig} className="h-[400px] w-full">
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
              <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
              <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Line Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Active Users Growth</CardTitle>
          <CardDescription>User acquisition trend over 2 years</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={lineChartConfig} className="h-[400px] w-full">
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
    </div>
  );
}
