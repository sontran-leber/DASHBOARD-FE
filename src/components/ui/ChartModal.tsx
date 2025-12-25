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
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";

// Custom tooltip component with proper spacing
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: Record<string, unknown>;
  }>;
  label?: string;
  valueFormatter: (value: number) => string;
  dataLabel: string;
}

const CustomTooltip = ({
  active,
  payload,
  label,
  valueFormatter,
  dataLabel,
}: CustomTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
      <div className="font-medium mb-1">{label}</div>
      <div className="flex items-center justify-between gap-4">
        <span className="text-muted-foreground">{dataLabel}</span>
        <span className="font-mono font-medium tabular-nums text-foreground">
          {valueFormatter(payload[0].value)}
        </span>
      </div>
    </div>
  );
};

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
  chartData: Array<Record<string, unknown>>;
  barChartConfig?: ChartConfig;
  lineChartConfig?: ChartConfig;
}

// Centralized configuration for chart data keys and their labels
const CHART_DATA_LABELS: Record<string, string> = {
  firstResponseRate: "First Response Rate",
  continuousResponseRate: "Continuous Response Rate",
  designatedConsultationResponseSpeedWeekly: "Response Speed",
  favoriteConsultationResponseSpeedWeekly: "Response Speed",
  generalConsultationResponseSpeedWeekly: "Response Speed",
  totalConsultation: "Total Consultation",
  cumulativePatientConsultations: "Cumulative Consultations",
  cumulativeUserConsultations: "Cumulative Consultations",
  careFacilityCount: "Facility Count",
  careFacilityUserCount: "User Count",
  companyCount: "Company Count",
  companyUserCount: "User Count",
  billingAmountWeekly: "Billing Amount",
  billingUsersWeekly: "Billing Users",
  designatedConsultationUsersWeekly: "Users Count",
  favoriteConsultationUsersWeekly: "Users Count",
  generalConsultationUsersWeekly: "Users Count",
  doctorRatingSinceStart: "Rating",
  doctorRatingWeekly: "Rating",
  premiumConsultations: "Premium Consultations",
  superPremiumConsultations: "Super Premium Consultations",
  totalPaidMemberConsultations: "Total Consultations",
  mentalCheckCount: "Mental Check Count",
  poolConsultationCount: "Pool Consultation Count",
  schoolCount: "School Count",
  paidMemberAdditionsTotal: "Total Additions",
  paidMemberAdditionsWeekly: "Weekly Additions",
  paidMembers: "Paid Members",
  premiumAdditionsWeekly: "Premium Additions",
  superPremiumAdditionsWeekly: "Super Premium Additions",
  trialAdditionsWeekly: "Trial Additions",
  trialUsersTotal: "Trial Users",
  schoolAccountsTotal: "Total Accounts",
  schoolAccountsType3: "Type 3 Accounts",
  schoolAccountsType4: "Type 4 Accounts",
  doctorCount: "Doctor Count",
  patientAccounts: "Patient Accounts",
  personalUsers: "Personal Users",
  schoolUsersCompanyGovernment: "Company/Government Users",
  schoolUsersPremium: "Premium Users",
  schoolUsersStarter: "Starter Users",
  schoolUsersSuperPremium: "Super Premium Users",
  schoolUsersTotal: "Total Users",
  schoolUsersTrial: "Trial Users",
  totalUsers: "Total Users",
  companyGovernmentConsultations: "Consultations",
  personalConsultations: "Personal Consultations",
  schoolConsultations: "School Consultations",
};

// Helper function to create chart config with proper labels
const createChartConfig = (dataKey: string, baseConfig?: ChartConfig): ChartConfig => {
  // Use the passed config if available, otherwise create a default one
  if (baseConfig) {
    return {
      ...baseConfig,
      [dataKey]: {
        label: CHART_DATA_LABELS[dataKey] || dataKey,
        color: baseConfig.generalConfig?.color || "hsl(var(--chart-1))",
      },
    };
  }

  return {
    [dataKey]: {
      label: CHART_DATA_LABELS[dataKey] || dataKey,
      color: "hsl(var(--chart-1))",
    },
  };
};

// Chart metadata configuration following Single Responsibility Principle
interface ChartMetadata {
  title: string;
  description: string;
  dataKey: string;
  chartType: "bar" | "line";
  valueFormatter: (value: number) => string;
}

const CHART_METADATA: Record<string, ChartMetadata> = {
  firstResponse: {
    title: "First Response Rate",
    description: "Weekly first response rate over 14 weeks",
    dataKey: "firstResponseRate",
    chartType: "bar",
    valueFormatter: (value) => `${value.toFixed(0)}%`,
  },
  continuousResponse: {
    title: "Active Users Growth",
    description: "User acquisition trend over 2 years",
    dataKey: "continuousResponseRate",
    chartType: "line",
    valueFormatter: (value) => `${value.toFixed(1)}%`,
  },
  designatedConsultationResponse: {
    title: "Designated Consultation Response Speed Weekly",
    description: "Weekly designated consultation response speed over 14 weeks",
    dataKey: "designatedConsultationResponseSpeedWeekly",
    chartType: "bar",
    valueFormatter: (value) => `${value.toFixed(0)}`,
  },
  favoriteConsultationResponse: {
    title: "Favorite Consultation Response Speed Weekly",
    description: "Weekly favorite consultation response speed over 14 weeks",
    dataKey: "favoriteConsultationResponseSpeedWeekly",
    chartType: "bar",
    valueFormatter: (value) => `${value.toFixed(0)}`,
  },
  generalConsultationResponse: {
    title: "General Consultation Response Speed Weekly",
    description: "Weekly general consultation response speed over 14 weeks",
    dataKey: "generalConsultationResponseSpeedWeekly",
    chartType: "bar",
    valueFormatter: (value) => `${value.toFixed(0)}`,
  },
  totalConsultation: {
    title: "Total Consultation",
    description: "Total consultation over the last 14 weeks",
    dataKey: "totalConsultation",
    chartType: "line",
    valueFormatter: (value) => `${value.toFixed(1)}`,
  },
  cumulativePatientConsultations: {
    title: "Cumulative Patient Consultations",
    description: "Cumulative patient consultations over the last 14 weeks",
    dataKey: "cumulativePatientConsultations",
    chartType: "line",
    valueFormatter: (value) => `${value.toFixed(1)}`,
  },
  cumulativeUserConsultations: {
    title: "Cumulative User Consultations",
    description: "Cumulative user consultations over the last 14 weeks",
    dataKey: "cumulativeUserConsultations",
    chartType: "line",
    valueFormatter: (value) => `${value.toFixed(1)}`,
  },
  careFacilityCount: {
    title: "Care Facility Count",
    description: "Care facility count over the last 14 weeks",
    dataKey: "careFacilityCount",
    chartType: "bar",
    valueFormatter: (value) => `${value.toFixed(0)}`,
  },
  careFacilityUserCount: {
    title: "Care Facility User Count",
    description: "Care facility user count over the last 14 weeks",
    dataKey: "careFacilityUserCount",
    chartType: "bar",
    valueFormatter: (value) => `${value.toFixed(0)}`,
  },
  companyCount: {
    title: "Company Count",
    description: "Company count over the last 14 weeks",
    dataKey: "companyCount",
    chartType: "bar",
    valueFormatter: (value) => `${value.toFixed(0)}`,
  },
  companyUserCount: {
    title: "Company User Count",
    description: "Company user count over the last 14 weeks",
    dataKey: "companyUserCount",
    chartType: "bar",
    valueFormatter: (value) => `${value.toFixed(0)}`,
  },
  billingAmount: {
    title: "Billing Amount",
    description: "Billing amount over the last 14 weeks",
    dataKey: "billingAmountWeekly",
    chartType: "bar",
    valueFormatter: (value) => `${value.toFixed(0)}`,
  },
  billingUsers: {
    title: "Billing Users Weekly",
    description: "Billing users over the last 14 weeks",
    dataKey: "billingUsersWeekly",
    chartType: "bar",
    valueFormatter: (value) => `${value.toFixed(0)}`,
  },
  designatedConsultationUsers: {
    title: "Designated Consultation Users Weekly",
    description: "Designated consultation users over the last 14 weeks",
    dataKey: "designatedConsultationUsersWeekly",
    chartType: "bar",
    valueFormatter: (value) => `${value.toFixed(0)}`,
  },
  favoriteConsultationUsers: {
    title: "Favorite Consultation Users Weekly",
    description: "Favorite consultation users over the last 14 weeks",
    dataKey: "favoriteConsultationUsersWeekly",
    chartType: "bar",
    valueFormatter: (value) => `${value.toFixed(0)}`,
  },
  generalConsultationUsers: {
    title: "General Consultation Users Weekly",
    description: "General consultation users over the last 14 weeks",
    dataKey: "generalConsultationUsersWeekly",
    chartType: "bar",
    valueFormatter: (value) => `${value.toFixed(0)}`,
  },
  doctorRatingSinceStart: {
    title: "Doctor Rating Since Start",
    description: "Doctor rating since start over the last 14 weeks",
    dataKey: "doctorRatingSinceStart",
    chartType: "line",
    valueFormatter: (value) => `${value.toFixed(1)}`,
  },
  doctorRating: {
    title: "Doctor Rating Weekly",
    description: "Weekly doctor rating over the last 14 weeks",
    dataKey: "doctorRatingWeekly",
    chartType: "line",
    valueFormatter: (value) => `${value.toFixed(1)}`,
  },
  premiumConsultations: {
    title: "Premium Consultations",
    description: "Premium consultations over the last 14 weeks",
    dataKey: "premiumConsultations",
    chartType: "bar",
    valueFormatter: (value) => `${value.toFixed(0)}`,
  },
  superPremiumConsultations: {
    title: "Super Premium Consultations",
    description: "Super premium consultations over the last 14 weeks",
    dataKey: "superPremiumConsultations",
    chartType: "bar",
    valueFormatter: (value) => `${value.toFixed(0)}`,
  },
  totalPaidMemberConsultations: {
    title: "Total Paid Member Consultations",
    description: "Total paid member consultations over the last 14 weeks",
    dataKey: "totalPaidMemberConsultations",
    chartType: "bar",
    valueFormatter: (value) => `${value.toFixed(0)}`,
  },
  mentalCheckCount: {
    title: "Mental CheckCount",
    description: "Mental checkCount over the last 14 weeks",
    dataKey: "mentalCheckCount",
    chartType: "line",
    valueFormatter: (value) => `${value.toFixed(1)}`,
  },
  poolConsultationCount: {
    title: "Pool Consultation Count",
    description: "Pool consultation count over the last 14 weeks",
    dataKey: "poolConsultationCount",
    chartType: "line",
    valueFormatter: (value) => `${value.toFixed(1)}`,
  },
  schoolCount: {
    title: "School Count",
    description: "School count over the last 14 weeks",
    dataKey: "schoolCount",
    chartType: "line",
    valueFormatter: (value) => `${value.toFixed(1)}`,
  },
  paidMemberAdditionsTotal: {
    title: "Paid Member Additions Total",
    description: "Paid member additions total over the last 14 weeks",
    dataKey: "paidMemberAdditionsTotal",
    chartType: "line",
    valueFormatter: (value) => `${value.toFixed(1)}`,
  },
  paidMemberAdditions: {
    title: "Paid Member Additions Weekly",
    description: "Weekly paid member additions over the last 14 weeks",
    dataKey: "paidMemberAdditionsWeekly",
    chartType: "bar",
    valueFormatter: (value) => `${value.toFixed(0)}`,
  },
  paidMembers: {
    title: "Paid Members",
    description: "Paid members over the last 14 weeks",
    dataKey: "paidMembers",
    chartType: "line",
    valueFormatter: (value) => `${value.toFixed(1)}`,
  },
  premiumAdditions: {
    title: "Premium Additions Weekly",
    description: "Premium additions weekly over the last 14 weeks",
    dataKey: "premiumAdditionsWeekly",
    chartType: "bar",
    valueFormatter: (value) => `${value.toFixed(0)}`,
  },
  superPremiumAdditions: {
    title: "Super Premium Additions Weekly",
    description: "Super premium additions weekly over the last 14 weeks",
    dataKey: "superPremiumAdditionsWeekly",
    chartType: "bar",
    valueFormatter: (value) => `${value.toFixed(0)}`,
  },
  trialAdditions: {
    title: "Trial Additions Weekly",
    description: "Weekly trial additions over the last 14 weeks",
    dataKey: "trialAdditionsWeekly",
    chartType: "bar",
    valueFormatter: (value) => `${value.toFixed(0)}`,
  },
  trialUsersTotal: {
    title: "Trial Users Weekly",
    description: "Weekly trial users over the last 14 weeks",
    dataKey: "trialUsersTotal",
    chartType: "line",
    valueFormatter: (value) => `${value.toFixed(1)}`,
  },
  schoolAccountsTotal: {
    title: "School Accounts Total",
    description: "School accounts total over the last 14 weeks",
    dataKey: "schoolAccountsTotal",
    chartType: "line",
    valueFormatter: (value) => `${value.toFixed(1)}`,
  },
  schoolAccountsType3: {
    title: "School Accounts Type 3",
    description: "School accounts type 3 over the last 14 weeks",
    dataKey: "schoolAccountsType3",
    chartType: "line",
    valueFormatter: (value) => `${value.toFixed(1)}`,
  },
  schoolAccountsType4: {
    title: "School Accounts Type 4",
    description: "School accounts type 4 over the last 14 weeks",
    dataKey: "schoolAccountsType4",
    chartType: "line",
    valueFormatter: (value) => `${value.toFixed(1)}`,
  },
  doctorCount: {
    title: "Doctor Count",
    description: "Doctor count over the last 14 weeks",
    dataKey: "doctorCount",
    chartType: "line",
    valueFormatter: (value) => `${value.toFixed(1)}`,
  },
  patientAccounts: {
    title: "Patient Accounts",
    description: "Patient accounts over the last 14 weeks",
    dataKey: "patientAccounts",
    chartType: "line",
    valueFormatter: (value) => `${value.toFixed(1)}`,
  },
  personalUsers: {
    title: "Personal Users",
    description: "Personal users over the last 14 weeks",
    dataKey: "personalUsers",
    chartType: "line",
    valueFormatter: (value) => `${value.toFixed(1)}`,
  },
  schoolUsersCompanyGovernment: {
    title: "School Users Company Government",
    description: "School users company government over the last 14 weeks",
    dataKey: "schoolUsersCompanyGovernment",
    chartType: "line",
    valueFormatter: (value) => `${value.toFixed(1)}`,
  },
  schoolUsersPremium: {
    title: "School Users Premium",
    description: "School users premium over the last 14 weeks",
    dataKey: "schoolUsersPremium",
    chartType: "line",
    valueFormatter: (value) => `${value.toFixed(1)}`,
  },
  schoolUsersStarter: {
    title: "School Users Starter",
    description: "School users starter over the last 14 weeks",
    dataKey: "schoolUsersStarter",
    chartType: "line",
    valueFormatter: (value) => `${value.toFixed(1)}`,
  },
  schoolUsersSuperPremium: {
    title: "School Users Super Premium",
    description: "School users super premium over the last 14 weeks",
    dataKey: "schoolUsersSuperPremium",
    chartType: "line",
    valueFormatter: (value) => `${value.toFixed(1)}`,
  },
  schoolUsersTotal: {
    title: "School Users Total",
    description: "School users total over the last 14 weeks",
    dataKey: "schoolUsersTotal",
    chartType: "line",
    valueFormatter: (value) => `${value.toFixed(1)}`,
  },
  schoolUsersTrial: {
    title: "School Users Trial",
    description: "School users trial over the last 14 weeks",
    dataKey: "schoolUsersTrial",
    chartType: "line",
    valueFormatter: (value) => `${value.toFixed(1)}`,
  },
  totalUsers: {
    title: "Total Users",
    description: "Total users over the last 14 weeks",
    dataKey: "totalUsers",
    chartType: "line",
    valueFormatter: (value) => `${value.toFixed(1)}`,
  },
  companyGovernmentConsultations: {
    title: "Company Government Consultations",
    description: "Company government consultations over the last 14 weeks",
    dataKey: "companyGovernmentConsultations",
    chartType: "line",
    valueFormatter: (value) => `${value.toFixed(1)}`,
  },
  personalConsultations: {
    title: "Personal Consultations",
    description: "Personal consultations over the last 14 weeks",
    dataKey: "personalConsultations",
    chartType: "line",
    valueFormatter: (value) => `${value.toFixed(1)}`,
  },
  schoolConsultations: {
    title: "School Consultations",
    description: "School consultations over the last 14 weeks",
    dataKey: "schoolConsultations",
    chartType: "line",
    valueFormatter: (value) => `${value.toFixed(1)}`,
  },
};

export default function ChartModal({
  isOpen,
  onClose,
  chartType,
  chartData,
  barChartConfig,
  lineChartConfig,
}: ChartModalProps) {
  if (!isOpen || !chartType) return null;

  const metadata = CHART_METADATA[chartType];
  if (!metadata) return null;

  // Use the appropriate config based on chart type
  const baseConfig = metadata.chartType === "bar" ? barChartConfig : lineChartConfig;
  const chartConfig = createChartConfig(metadata.dataKey, baseConfig);

  const renderChart = () => {
    if (metadata.chartType === "bar") {
      return (
        <Card className="border-0 shadow-none">
          <CardHeader>
            <CardTitle>{metadata.title}</CardTitle>
            <CardDescription>{metadata.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[400px] w-full">
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={true} />
                <XAxis
                  dataKey="week"
                  tickLine={true}
                  tickMargin={10}
                  axisLine={true}
                />
                <YAxis
                  tickLine={true}
                  axisLine={true}
                  tickMargin={10}
                  tickFormatter={metadata.valueFormatter}
                />
                <ChartTooltip
                  cursor={true}
                  content={
                    <CustomTooltip
                      valueFormatter={metadata.valueFormatter}
                      dataLabel={CHART_DATA_LABELS[metadata.dataKey] || metadata.dataKey}
                    />
                  }
                />
                <Bar
                  dataKey={metadata.dataKey}
                  fill={`var(--color-${metadata.dataKey})`}
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      );
    }

    // Line chart
    return (
      <Card className="border-0 shadow-none">
        <CardHeader>
          <CardTitle>{metadata.title}</CardTitle>
          <CardDescription>{metadata.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
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
              />
              <YAxis
                tickLine={true}
                axisLine={true}
                tickMargin={10}
                tickFormatter={metadata.valueFormatter}
              />
              <ChartTooltip
                cursor={true}
                content={
                  <CustomTooltip
                    valueFormatter={metadata.valueFormatter}
                    dataLabel={CHART_DATA_LABELS[metadata.dataKey] || metadata.dataKey}
                  />
                }
              />
              <Line
                dataKey={metadata.dataKey}
                type="monotone"
                stroke={`var(--color-${metadata.dataKey})`}
                strokeWidth={2}
                dot={true}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    );
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
