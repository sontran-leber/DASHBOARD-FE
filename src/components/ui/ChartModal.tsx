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
  chartType:
    | "firstResponse"
    | "continuousResponse"
    | "designatedConsultationResponse"
    | "favoriteConsultationResponse"
    | "generalConsultationResponse"
    | "totalConsultation"
    | "cumulativePatientConsultations"
    | "cumulativeUserConsultations"
    | "careFacilityCount"
    | "careFacilityUserCount"
    | "companyCount"
    | "companyUserCount"
    | "billingAmount"
    | "billingUsers"
    | "designatedConsultationUsers"
    | "favoriteConsultationUsers"
    | "generalConsultationUsers"
    | "doctorRatingSinceStart"
    | "doctorRating"
    | "premiumConsultations"
    | "superPremiumConsultations"
    | "totalPaidMemberConsultations"
    | "mentalCheckCount"
    | "poolConsultationCount"
    | "schoolCount"
    | "paidMemberAdditionsTotal"
    | "paidMemberAdditions"
    | "paidMembers"
    | "premiumAdditions"
    | "superPremiumAdditions"
    | "trialAdditions"
    | "trialUsersTotal"
    | "schoolAccountsTotal"
    | "schoolAccountsType3"
    | "schoolAccountsType4"
    | "doctorCount"
    | "patientAccounts"
    | "personalUsers"
    | "schoolUsersCompanyGovernment"
    | "schoolUsersPremium"
    | "schoolUsersStarter"
    | "schoolUsersSuperPremium"
    | "schoolUsersTotal"
    | "schoolUsersTrial"
    | "totalUsers"
    | "companyGovernmentConsultations"
    | "personalConsultations"
    | "schoolConsultations"
    | null;
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
      case "firstResponse":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>First Response Rate</CardTitle>
              <CardDescription>
                Weekly first response rate over 14 weeks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={barChartConfig}
                className="h-[400px] w-full"
              >
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={true} />
                  <XAxis
                    dataKey="week"
                    tickLine={true}
                    tickMargin={10}
                    axisLine={true}
                    // tickFormatter={(value) => value.slice(0, 4)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(0)}%`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="firstResponseRate"
                    fill="var(--color-generalConfig)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );

      case "continuousResponse":
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
                    dataKey="week"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    // tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(1)}%`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Line
                    dataKey="continuousResponseRate"
                    type="monotone"
                    stroke="var(--color-generalConfig)"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "designatedConsultationResponse":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>
                Designated Consultation Response Speed Weekly
              </CardTitle>
              <CardDescription>
                Weekly designated consultation response speed over 14 weeks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={barChartConfig}
                className="h-[400px] w-full"
              >
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={true} />
                  <XAxis
                    dataKey="week"
                    tickLine={true}
                    tickMargin={10}
                    axisLine={true}
                    // tickFormatter={(value) => value.slice(0, 4)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(0)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="designatedConsultationResponseSpeedWeekly"
                    fill="var(--color-generalConfig)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "favoriteConsultationResponse":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Favorite Consultation Response Speed Weekly</CardTitle>
              <CardDescription>
                Weekly favorite consultation response speed over 14 weeks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={barChartConfig}
                className="h-[400px] w-full"
              >
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={true} />
                  <XAxis
                    dataKey="week"
                    tickLine={true}
                    tickMargin={10}
                    axisLine={true}
                    // tickFormatter={(value) => value.slice(0, 4)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(0)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="favoriteConsultationResponseSpeedWeekly"
                    fill="var(--color-generalConfig)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "generalConsultationResponse":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>General Consultation Response Speed Weekly</CardTitle>
              <CardDescription>
                Weekly general consultation response speed over 14 weeks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={barChartConfig}
                className="h-[400px] w-full"
              >
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={true} />
                  <XAxis
                    dataKey="week"
                    tickLine={true}
                    tickMargin={10}
                    axisLine={true}
                    // tickFormatter={(value) => value.slice(0, 4)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(0)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="generalConsultationResponseSpeedWeekly"
                    fill="var(--color-generalConfig)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "totalConsultation":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Total Consultation</CardTitle>
              <CardDescription>
                Total consultation over the last 14 weeks
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
                    dataKey="week"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    // tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(1)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Line
                    dataKey="totalConsultation"
                    type="monotone"
                    stroke="var(--color-generalConfig)"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "cumulativePatientConsultations":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Cumulative Patient Consultations</CardTitle>
              <CardDescription>
                Cumulative patient consultations over the last 14 weeks
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
                    dataKey="week"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    // tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(1)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Line
                    dataKey="cumulativePatientConsultations"
                    type="monotone"
                    stroke="var(--color-generalConfig)"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "cumulativeUserConsultations":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Cumulative User Consultations</CardTitle>
              <CardDescription>
                Cumulative user consultations over the last 14 weeks
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
                    dataKey="week"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    // tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(1)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Line
                    dataKey="cumulativeUserConsultations"
                    type="monotone"
                    stroke="var(--color-generalConfig)"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "careFacilityCount":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Care Facility Count</CardTitle>
              <CardDescription>
                Care facility count over the last 14 weeks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={barChartConfig}
                className="h-[400px] w-full"
              >
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={true} />
                  <XAxis
                    dataKey="week"
                    tickLine={true}
                    tickMargin={10}
                    axisLine={true}
                    // tickFormatter={(value) => value.slice(0, 4)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(0)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="careFacilityCount"
                    fill="var(--color-generalConfig)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "careFacilityUserCount":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Care Facility User Count</CardTitle>
              <CardDescription>
                Care facility user count over the last 14 weeks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={barChartConfig}
                className="h-[400px] w-full"
              >
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={true} />
                  <XAxis
                    dataKey="week"
                    tickLine={true}
                    tickMargin={10}
                    axisLine={true}
                    // tickFormatter={(value) => value.slice(0, 4)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(0)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="careFacilityUserCount"
                    fill="var(--color-generalConfig)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "companyCount":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Company Count</CardTitle>
              <CardDescription>
                Company count over the last 14 weeks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={barChartConfig}
                className="h-[400px] w-full"
              >
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={true} />
                  <XAxis
                    dataKey="week"
                    tickLine={true}
                    tickMargin={10}
                    axisLine={true}
                    // tickFormatter={(value) => value.slice(0, 4)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(0)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="companyCount"
                    fill="var(--color-generalConfig)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "companyUserCount":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Company User Count</CardTitle>
              <CardDescription>
                Company user count over the last 14 weeks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={barChartConfig}
                className="h-[400px] w-full"
              >
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={true} />
                  <XAxis
                    dataKey="week"
                    tickLine={true}
                    tickMargin={10}
                    axisLine={true}
                    // tickFormatter={(value) => value.slice(0, 4)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(0)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="companyUserCount"
                    fill="var(--color-generalConfig)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "billingAmount":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Billing Amount</CardTitle>
              <CardDescription>
                Billing amount over the last 14 weeks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={barChartConfig}
                className="h-[400px] w-full"
              >
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={true} />
                  <XAxis
                    dataKey="week"
                    tickLine={true}
                    tickMargin={10}
                    axisLine={true}
                    // tickFormatter={(value) => value.slice(0, 4)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(0)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="billingAmountWeekly"
                    fill="var(--color-generalConfig)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "billingUsers":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Billing Users Weekly</CardTitle>
              <CardDescription>
                Billing users over the last 14 weeks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={barChartConfig}
                className="h-[400px] w-full"
              >
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={true} />
                  <XAxis
                    dataKey="week"
                    tickLine={true}
                    tickMargin={10}
                    axisLine={true}
                    // tickFormatter={(value) => value.slice(0, 4)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(0)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="billingUsersWeekly"
                    fill="var(--color-generalConfig)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "designatedConsultationUsers":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Designated Consultation Users Weekly</CardTitle>
              <CardDescription>
                Designated consultation users over the last 14 weeks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={barChartConfig}
                className="h-[400px] w-full"
              >
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={true} />
                  <XAxis
                    dataKey="week"
                    tickLine={true}
                    tickMargin={10}
                    axisLine={true}
                    // tickFormatter={(value) => value.slice(0, 4)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(0)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="designatedConsultationUsersWeekly"
                    fill="var(--color-generalConfig)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "favoriteConsultationUsers":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Favorite Consultation Users Weekly</CardTitle>
              <CardDescription>
                Favorite consultation users over the last 14 weeks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={barChartConfig}
                className="h-[400px] w-full"
              >
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={true} />
                  <XAxis
                    dataKey="week"
                    tickLine={true}
                    tickMargin={10}
                    axisLine={true}
                    // tickFormatter={(value) => value.slice(0, 4)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(0)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="favoriteConsultationUsersWeekly"
                    fill="var(--color-generalConfig)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "generalConsultationUsers":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>General Consultation Users Weekly</CardTitle>
              <CardDescription>
                General consultation users over the last 14 weeks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={barChartConfig}
                className="h-[400px] w-full"
              >
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={true} />
                  <XAxis
                    dataKey="week"
                    tickLine={true}
                    tickMargin={10}
                    axisLine={true}
                    // tickFormatter={(value) => value.slice(0, 4)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(0)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="generalConsultationUsersWeekly"
                    fill="var(--color-generalConfig)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "doctorRatingSinceStart":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Doctor Rating Since Start</CardTitle>
              <CardDescription>
                Doctor rating since start over the last 14 weeks
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
                    dataKey="week"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    // tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(1)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Line
                    dataKey="doctorRatingSinceStart"
                    type="monotone"
                    stroke="var(--color-generalConfig)"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "doctorRating":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Doctor Rating Weekly</CardTitle>
              <CardDescription>
                Weekly doctor rating over the last 14 weeks
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
                    dataKey="week"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    // tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(1)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Line
                    dataKey="doctorRatingWeekly"
                    type="monotone"
                    stroke="var(--color-generalConfig)"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "premiumConsultations":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Premium Consultations</CardTitle>
              <CardDescription>
                Premium consultations over the last 14 weeks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={barChartConfig}
                className="h-[400px] w-full"
              >
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={true} />
                  <XAxis
                    dataKey="week"
                    tickLine={true}
                    tickMargin={10}
                    axisLine={true}
                    // tickFormatter={(value) => value.slice(0, 4)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(0)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="premiumConsultations"
                    fill="var(--color-generalConfig)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "superPremiumConsultations":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Super Premium Consultations</CardTitle>
              <CardDescription>
                Super premium consultations over the last 14 weeks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={barChartConfig}
                className="h-[400px] w-full"
              >
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={true} />
                  <XAxis
                    dataKey="week"
                    tickLine={true}
                    tickMargin={10}
                    axisLine={true}
                    // tickFormatter={(value) => value.slice(0, 4)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(0)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="superPremiumConsultations"
                    fill="var(--color-generalConfig)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "totalPaidMemberConsultations":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Total Paid Member Consultations</CardTitle>
              <CardDescription>
                Total paid member consultations over the last 14 weeks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={barChartConfig}
                className="h-[400px] w-full"
              >
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={true} />
                  <XAxis
                    dataKey="week"
                    tickLine={true}
                    tickMargin={10}
                    axisLine={true}
                    // tickFormatter={(value) => value.slice(0, 4)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(0)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="totalPaidMemberConsultations"
                    fill="var(--color-generalConfig)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "mentalCheckCount":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Mental CheckCount</CardTitle>
              <CardDescription>
                Mental checkCount over the last 14 weeks
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
                    dataKey="week"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    // tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(1)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Line
                    dataKey="mentalCheckCount"
                    type="monotone"
                    stroke="var(--color-generalConfig)"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "poolConsultationCount":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Pool Consultation Count</CardTitle>
              <CardDescription>
                Pool consultation count over the last 14 weeks
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
                    dataKey="week"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    // tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(1)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Line
                    dataKey="poolConsultationCount"
                    type="monotone"
                    stroke="var(--color-generalConfig)"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "schoolCount":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>School Count</CardTitle>
              <CardDescription>
                School count over the last 14 weeks
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
                    dataKey="week"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    // tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(1)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Line
                    dataKey="schoolCount"
                    type="monotone"
                    stroke="var(--color-generalConfig)"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "paidMemberAdditionsTotal":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Paid Member Additions Total</CardTitle>
              <CardDescription>
                Paid member additions total over the last 14 weeks
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
                    dataKey="week"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    // tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(1)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Line
                    dataKey="paidMemberAdditionsTotal"
                    type="monotone"
                    stroke="var(--color-generalConfig)"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "paidMemberAdditions":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Paid Member Additions Weekly</CardTitle>
              <CardDescription>
                Weekly paid member additions over the last 14 weeks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={barChartConfig}
                className="h-[400px] w-full"
              >
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={true} />
                  <XAxis
                    dataKey="week"
                    tickLine={true}
                    tickMargin={10}
                    axisLine={true}
                    // tickFormatter={(value) => value.slice(0, 4)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(0)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="paidMemberAdditionsWeekly"
                    fill="var(--color-generalConfig)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "paidMembers":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Paid Members</CardTitle>
              <CardDescription>
                Paid members over the last 14 weeks
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
                    dataKey="week"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    // tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(1)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Line
                    dataKey="paidMembers"
                    type="monotone"
                    stroke="var(--color-generalConfig)"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "premiumAdditions":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Premium Additions Weekly</CardTitle>
              <CardDescription>
                Premium additions weekly over the last 14 weeks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={barChartConfig}
                className="h-[400px] w-full"
              >
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={true} />
                  <XAxis
                    dataKey="week"
                    tickLine={true}
                    tickMargin={10}
                    axisLine={true}
                    // tickFormatter={(value) => value.slice(0, 4)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(0)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="premiumAdditionsWeekly"
                    fill="var(--color-generalConfig)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "superPremiumAdditions":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Super Premium Additions Weekly</CardTitle>
              <CardDescription>
                Super premium additions weekly over the last 14 weeks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={barChartConfig}
                className="h-[400px] w-full"
              >
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={true} />
                  <XAxis
                    dataKey="week"
                    tickLine={true}
                    tickMargin={10}
                    axisLine={true}
                    // tickFormatter={(value) => value.slice(0, 4)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(0)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="superPremiumAdditionsWeekly"
                    fill="var(--color-generalConfig)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "trialAdditions":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Trial Additions Weekly</CardTitle>
              <CardDescription>
                Weekly trial additions over the last 14 weeks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={barChartConfig}
                className="h-[400px] w-full"
              >
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={true} />
                  <XAxis
                    dataKey="week"
                    tickLine={true}
                    tickMargin={10}
                    axisLine={true}
                    // tickFormatter={(value) => value.slice(0, 4)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(0)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="trialAdditionsWeekly"
                    fill="var(--color-generalConfig)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "trialUsersTotal":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Trial Users Weekly</CardTitle>
              <CardDescription>
                Weekly trial users over the last 14 weeks
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
                    dataKey="week"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    // tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(1)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Line
                    dataKey="trialUsersTotal"
                    type="monotone"
                    stroke="var(--color-generalConfig)"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "schoolAccountsTotal":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>School Accounts Total</CardTitle>
              <CardDescription>
                School accounts total over the last 14 weeks
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
                    dataKey="week"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    // tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(1)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Line
                    dataKey="schoolAccountsTotal"
                    type="monotone"
                    stroke="var(--color-generalConfig)"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "schoolAccountsType3":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>School Accounts Type 3</CardTitle>
              <CardDescription>
                School accounts type 3 over the last 14 weeks
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
                    dataKey="week"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    // tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(1)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Line
                    dataKey="schoolAccountsType3"
                    type="monotone"
                    stroke="var(--color-generalConfig)"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "schoolAccountsType4":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>School Accounts Type 4</CardTitle>
              <CardDescription>
                School accounts type 4 over the last 14 weeks
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
                    dataKey="week"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    // tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(1)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Line
                    dataKey="schoolAccountsType4"
                    type="monotone"
                    stroke="var(--color-generalConfig)"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "doctorCount":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Doctor Count</CardTitle>
              <CardDescription>
                Doctor count over the last 14 weeks
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
                    dataKey="week"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    // tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(1)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Line
                    dataKey="doctorCount"
                    type="monotone"
                    stroke="var(--color-generalConfig)"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "patientAccounts":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Patient Accounts</CardTitle>
              <CardDescription>
                Patient accounts over the last 14 weeks
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
                    dataKey="week"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    // tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(1)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Line
                    dataKey="patientAccounts"
                    type="monotone"
                    stroke="var(--color-generalConfig)"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "personalUsers":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Personal Users</CardTitle>
              <CardDescription>
                Personal users over the last 14 weeks
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
                    dataKey="week"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    // tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(1)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Line
                    dataKey="personalUsers"
                    type="monotone"
                    stroke="var(--color-generalConfig)"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "schoolUsersCompanyGovernment":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>School Users Company Government</CardTitle>
              <CardDescription>
                School users company government over the last 14 weeks
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
                    dataKey="week"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    // tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(1)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Line
                    dataKey="schoolUsersCompanyGovernment"
                    type="monotone"
                    stroke="var(--color-generalConfig)"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "schoolUsersPremium":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>School Users Premium</CardTitle>
              <CardDescription>
                School users premium over the last 14 weeks
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
                    dataKey="week"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    // tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(1)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Line
                    dataKey="schoolUsersPremium"
                    type="monotone"
                    stroke="var(--color-generalConfig)"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "schoolUsersStarter":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>School Users Starter</CardTitle>
              <CardDescription>
                School users starter over the last 14 weeks
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
                    dataKey="week"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    // tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(1)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Line
                    dataKey="schoolUsersStarter"
                    type="monotone"
                    stroke="var(--color-generalConfig)"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "schoolUsersSuperPremium":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>School Users Super Premium</CardTitle>
              <CardDescription>
                School users super premium over the last 14 weeks
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
                    dataKey="week"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    // tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(1)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Line
                    dataKey="schoolUsersSuperPremium"
                    type="monotone"
                    stroke="var(--color-generalConfig)"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "schoolUsersTotal":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>School Users Total</CardTitle>
              <CardDescription>
                School users total over the last 14 weeks
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
                    dataKey="week"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    // tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(1)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Line
                    dataKey="schoolUsersTotal"
                    type="monotone"
                    stroke="var(--color-generalConfig)"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "schoolUsersTrial":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>School Users Trial</CardTitle>
              <CardDescription>
                School users trial over the last 14 weeks
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
                    dataKey="week"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    // tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(1)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Line
                    dataKey="schoolUsersTrial"
                    type="monotone"
                    stroke="var(--color-generalConfig)"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "totalUsers":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
              <CardDescription>
                Total users over the last 14 weeks
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
                    dataKey="week"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    // tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(1)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Line
                    dataKey="totalUsers"
                    type="monotone"
                    stroke="var(--color-generalConfig)"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "companyGovernmentConsultations":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Company Government Consultations</CardTitle>
              <CardDescription>
                Company government consultations over the last 14 weeks
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
                    dataKey="week"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    // tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(1)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Line
                    dataKey="companyGovernmentConsultations"
                    type="monotone"
                    stroke="var(--color-generalConfig)"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "personalConsultations":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Personal Consultations</CardTitle>
              <CardDescription>
                Personal consultations over the last 14 weeks
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
                    dataKey="week"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    // tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(1)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Line
                    dataKey="personalConsultations"
                    type="monotone"
                    stroke="var(--color-generalConfig)"
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        );
      case "schoolConsultations":
        return (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>School Consultations</CardTitle>
              <CardDescription>
                School consultations over the last 14 weeks
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
                    dataKey="week"
                    tickLine={true}
                    axisLine={true}
                    tickMargin={8}
                    // tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={true}
                    axisLine={true}
                    tickMargin={10}
                    tickFormatter={(value) => `${value.toFixed(1)}`}
                  />
                  <ChartTooltip
                    cursor={true}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Line
                    dataKey="schoolConsultations"
                    type="monotone"
                    stroke="var(--color-generalConfig)"
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
