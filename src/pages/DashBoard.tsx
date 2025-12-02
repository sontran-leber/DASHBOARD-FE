import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { clearAuth, getUser } from "@/utils/authUtils";
import { logout } from "@/utils/apiService";
import type { ApiError } from "@/utils/apiService";
import MetricCard from "@/components/ui/MetricCard";
import ChartModal from "@/components/ui/ChartModal";
import { chartAllData } from "@/utils/chartData";
import chartConfig from "@/utils/chartData";

type ChartType = "firstResponse" | "continuousResponse";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = getUser();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [selectedChart, setSelectedChart] = useState<ChartType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError.message || "Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      clearAuth();
      navigate("/login", { replace: true });
    }
  };

  // Calculate metrics from chart data
  const getMetrics = async () => {
    const data = await chartAllData;
    const dataLength = data.length;
    if (dataLength < 2) return null;

    const latestData = data[dataLength - 1];
    const previousData = data[dataLength - 2];

    const calculateTrend = (current: number, previous: number) => {
      return current - previous;
    };

    return {
      firstResponseRate: {
        value: `${latestData.firstResponseRate.toFixed(1)}%`,
        trend: calculateTrend(
          latestData.firstResponseRate,
          previousData.firstResponseRate
        ),
      },
      continuousResponseRate: {
        value: `${latestData.continuousResponseRate.toFixed(1)}%`,
        trend: calculateTrend(
          latestData.continuousResponseRate,
          previousData.continuousResponseRate
        ),
      },
      designatedConsultationResponseSpeedWeekly: {
        value: `${latestData.designatedConsultationResponseSpeedWeekly.toFixed(
          1
        )}`,
        trend: calculateTrend(
          latestData.designatedConsultationResponseSpeedWeekly,
          previousData.designatedConsultationResponseSpeedWeekly
        ),
      },
      favoriteConsultationResponseSpeedWeekly: {
        value: `${latestData.favoriteConsultationResponseSpeedWeekly.toFixed(
          1
        )}`,
        trend: calculateTrend(
          latestData.favoriteConsultationResponseSpeedWeekly,
          previousData.favoriteConsultationResponseSpeedWeekly
        ),
      },
      generalConsultationResponseSpeedWeekly: {
        value: `${latestData.generalConsultationResponseSpeedWeekly.toFixed(
          1
        )}`,
        trend: calculateTrend(
          latestData.generalConsultationResponseSpeedWeekly,
          previousData.generalConsultationResponseSpeedWeekly
        ),
      },
      totalConsultation: {
        value: `${latestData.totalConsultation}`,
        trend: calculateTrend(
          latestData.totalConsultation,
          previousData.totalConsultation
        ),
      },
      cumulativePatientConsultations: {
        value: `${latestData.cumulativePatientConsultations}`,
        trend: calculateTrend(
          latestData.cumulativePatientConsultations,
          previousData.cumulativePatientConsultations
        ),
      },
      cumulativeUserConsultations: {
        value: `${latestData.cumulativeUserConsultations}`,
        trend: calculateTrend(
          latestData.cumulativeUserConsultations,
          previousData.cumulativeUserConsultations
        ),
      },
      careFacilityCount: {
        value: `${latestData.careFacilityCount}`,
        trend: calculateTrend(
          latestData.careFacilityCount,
          previousData.careFacilityCount
        ),
      },
      careFacilityUserCount: {
        value: `${latestData.careFacilityUserCount}`,
        trend: calculateTrend(
          latestData.careFacilityUserCount,
          previousData.careFacilityUserCount
        ),
      },
      companyCount: {
        value: `${latestData.companyCount}`,
        trend: calculateTrend(
          latestData.companyCount,
          previousData.companyCount
        ),
      },
      companyUserCount: {
        value: `${latestData.companyUserCount}`,
        trend: calculateTrend(
          latestData.companyUserCount,
          previousData.companyUserCount
        ),
      },
      billingAmountWeekly: {
        value: `${latestData.billingAmountWeekly.toFixed(1)}`,
        trend: calculateTrend(
          latestData.billingAmountWeekly,
          previousData.billingAmountWeekly
        ),
      },
      billingUsersWeekly: {
        value: `${latestData.billingUsersWeekly}`,
        trend: calculateTrend(
          latestData.billingUsersWeekly,
          previousData.billingUsersWeekly
        ),
      },
      designatedConsultationUsersWeekly: {
        value: `${latestData.designatedConsultationUsersWeekly}`,
        trend: calculateTrend(
          latestData.designatedConsultationUsersWeekly,
          previousData.designatedConsultationUsersWeekly
        ),
      },
      favoriteConsultationUsersWeekly: {
        value: `${latestData.favoriteConsultationUsersWeekly}`,
        trend: calculateTrend(
          latestData.favoriteConsultationUsersWeekly,
          previousData.favoriteConsultationUsersWeekly
        ),
      },
      generalConsultationUsersWeekly: {
        value: `${latestData.generalConsultationUsersWeekly}`,
        trend: calculateTrend(
          latestData.generalConsultationUsersWeekly,
          previousData.generalConsultationUsersWeekly
        ),
      },
      doctorRatingSinceStart: {
        value: `${latestData.doctorRatingSinceStart.toFixed(1)}`,
        trend: calculateTrend(
          latestData.doctorRatingSinceStart,
          previousData.doctorRatingSinceStart
        ),
      },
      doctorRatingWeekly: {
        value: `${latestData.doctorRatingWeekly.toFixed(1)}`,
        trend: calculateTrend(
          latestData.doctorRatingWeekly,
          previousData.doctorRatingWeekly
        ),
      },
      premiumConsultations: {
        value: `${latestData.premiumConsultations}`,
        trend: calculateTrend(
          latestData.premiumConsultations,
          previousData.premiumConsultations
        ),
      },
      superPremiumConsultations: {
        value: `${latestData.superPremiumConsultations}`,
        trend: calculateTrend(
          latestData.superPremiumConsultations,
          previousData.superPremiumConsultations
        ),
      },
      totalPaidMemberConsultations: {
        value: `${latestData.totalPaidMemberConsultations}`,
        trend: calculateTrend(
          latestData.totalPaidMemberConsultations,
          previousData.totalPaidMemberConsultations
        ),
      },
      mentalCheckCount: {
        value: `${latestData.mentalCheckCount.toFixed(1)}`,
        trend: calculateTrend(
          latestData.mentalCheckCount,
          previousData.mentalCheckCount
        ),
      },
      poolConsultationCount: {
        value: `${latestData.poolConsultationCount.toFixed(1)}`,
        trend: calculateTrend(
          latestData.poolConsultationCount,
          previousData.poolConsultationCount
        ),
      },
      schoolCount: {
        value: `${latestData.schoolCount.toFixed(1)}`,
        trend: calculateTrend(latestData.schoolCount, previousData.schoolCount),
      },
      paidMemberAdditionsTotal: {
        value: `${latestData.paidMemberAdditionsTotal.toFixed(1)}`,
        trend: calculateTrend(
          latestData.paidMemberAdditionsTotal,
          previousData.paidMemberAdditionsTotal
        ),
      },
      paidMemberAdditionsWeekly: {
        value: `${latestData.paidMemberAdditionsWeekly.toFixed(1)}`,
        trend: calculateTrend(
          latestData.paidMemberAdditionsWeekly,
          previousData.paidMemberAdditionsWeekly
        ),
      },
      paidMembers: {
        value: `${latestData.paidMembers.toFixed(1)}`,
        trend: calculateTrend(latestData.paidMembers, previousData.paidMembers),
      },
      premiumAdditionsWeekly: {
        value: `${latestData.premiumAdditionsWeekly.toFixed(1)}`,
        trend: calculateTrend(
          latestData.premiumAdditionsWeekly,
          previousData.premiumAdditionsWeekly
        ),
      },
      superPremiumAdditionsWeekly: {
        value: `${latestData.superPremiumAdditionsWeekly.toFixed(1)}`,
        trend: calculateTrend(
          latestData.superPremiumAdditionsWeekly,
          previousData.superPremiumAdditionsWeekly
        ),
      },
      trialAdditionsWeekly: {
        value: `${latestData.trialAdditionsWeekly.toFixed(1)}`,
        trend: calculateTrend(
          latestData.trialAdditionsWeekly,
          previousData.trialAdditionsWeekly
        ),
      },
      trialUsersTotal: {
        value: `${latestData.trialUsersTotal.toFixed(1)}`,
        trend: calculateTrend(
          latestData.trialUsersTotal,
          previousData.trialUsersTotal
        ),
      },
      schoolAccountsTotal: {
        value: `${latestData.schoolAccountsTotal.toFixed(1)}`,
        trend: calculateTrend(
          latestData.schoolAccountsTotal,
          previousData.schoolAccountsTotal
        ),
      },
      schoolAccountsType3: {
        value: `${latestData.schoolAccountsType3.toFixed(1)}`,
        trend: calculateTrend(
          latestData.schoolAccountsType3,
          previousData.schoolAccountsType3
        ),
      },
      schoolAccountsType4: {
        value: `${latestData.schoolAccountsType4.toFixed(1)}`,
        trend: calculateTrend(
          latestData.schoolAccountsType4,
          previousData.schoolAccountsType4
        ),
      },
      doctorCount: {
        value: `${latestData.doctorCount.toFixed(1)}`,
        trend: calculateTrend(latestData.doctorCount, previousData.doctorCount),
      },
      patientAccounts: {
        value: `${latestData.patientAccounts.toFixed(1)}`,
        trend: calculateTrend(
          latestData.patientAccounts,
          previousData.patientAccounts
        ),
      },
      personalUsers: {
        value: `${latestData.personalUsers.toFixed(1)}`,
        trend: calculateTrend(
          latestData.personalUsers,
          previousData.personalUsers
        ),
      },
      schoolUsersCompanyGovernment: {
        value: `${latestData.schoolUsersCompanyGovernment.toFixed(1)}`,
        trend: calculateTrend(
          latestData.schoolUsersCompanyGovernment,
          previousData.schoolUsersCompanyGovernment
        ),
      },
      schoolUsersPremium: {
        value: `${latestData.schoolUsersPremium.toFixed(1)}`,
        trend: calculateTrend(
          latestData.schoolUsersPremium,
          previousData.schoolUsersPremium
        ),
      },
      schoolUsersStarter: {
        value: `${latestData.schoolUsersStarter.toFixed(1)}`,
        trend: calculateTrend(
          latestData.schoolUsersStarter,
          previousData.schoolUsersStarter
        ),
      },
      schoolUsersSuperPremium: {
        value: `${latestData.schoolUsersSuperPremium.toFixed(1)}`,
        trend: calculateTrend(
          latestData.schoolUsersSuperPremium,
          previousData.schoolUsersSuperPremium
        ),
      },
      schoolUsersTotal: {
        value: `${latestData.schoolUsersTotal.toFixed(1)}`,
        trend: calculateTrend(
          latestData.schoolUsersTotal,
          previousData.schoolUsersTotal
        ),
      },
      schoolUsersTrial: {
        value: `${latestData.schoolUsersTrial.toFixed(1)}`,
        trend: calculateTrend(
          latestData.schoolUsersTrial,
          previousData.schoolUsersTrial
        ),
      },
      totalUsers: {
        value: `${latestData.totalUsers.toFixed(1)}`,
        trend: calculateTrend(latestData.totalUsers, previousData.totalUsers),
      },
      companyGovernmentConsultations: {
        value: `${latestData.companyGovernmentConsultations.toFixed(1)}`,
        trend: calculateTrend(
          latestData.companyGovernmentConsultations,
          previousData.companyGovernmentConsultations
        ),
      },
      personalConsultations: {
        value: `${latestData.personalConsultations.toFixed(1)}`,
        trend: calculateTrend(
          latestData.personalConsultations,
          previousData.personalConsultations
        ),
      },
      schoolConsultations: {
        value: `${latestData.schoolConsultations.toFixed(1)}`,
        trend: calculateTrend(
          latestData.schoolConsultations,
          previousData.schoolConsultations
        ),
      },
    };
  };

  const [metrics, setMetrics] = useState<Awaited<
    ReturnType<typeof getMetrics>
  > | null>(null);
  const [chartData, setChartData] = useState<Awaited<typeof chartAllData>>([]);

  useEffect(() => {
    getMetrics().then(setMetrics);
    chartAllData.then(setChartData);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back, {user?.name || user?.email || "User"}!!
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Doctor Actions</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics && (
            <>
              <MetricCard
                title="First Response Rate"
                value={metrics.firstResponseRate.value}
                trend={metrics.firstResponseRate.trend}
                description="Weekly first response rate over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
              <MetricCard
                title="Continuous Response Rate"
                value={metrics.continuousResponseRate.value}
                trend={metrics.continuousResponseRate.trend}
                description="Weekly continuous response rate over the last 14 weeks"
                onClick={() => setSelectedChart("continuousResponse")}
              />
              <MetricCard
                title="Designated Consultation Response Rate Weekly"
                value={metrics.designatedConsultationResponseSpeedWeekly.value}
                trend={metrics.designatedConsultationResponseSpeedWeekly.trend}
                description="Weekly designated consultation response rate over the last 14 weeks"
                onClick={() => setSelectedChart("continuousResponse")}
              />
              <MetricCard
                title="Favorite Consultation Response Speed Weekly"
                value={metrics.favoriteConsultationResponseSpeedWeekly.value}
                trend={metrics.favoriteConsultationResponseSpeedWeekly.trend}
                description="Weekly favorite consultation response speed over the last 14 weeks"
                onClick={() => setSelectedChart("continuousResponse")}
              />
              <MetricCard
                title="General Consultation Response Speed Weekly"
                value={metrics.generalConsultationResponseSpeedWeekly.value}
                trend={metrics.generalConsultationResponseSpeedWeekly.trend}
                description="Weekly general consultation response speed over the last 14 weeks"
                onClick={() => setSelectedChart("continuousResponse")}
              />
            </>
          )}
        </div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Consultations</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics && (
            <>
              <MetricCard
                title="Total consultation"
                value={metrics.totalConsultation.value}
                trend={metrics.totalConsultation.trend}
                description="Total consultation over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
            </>
          )}
        </div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Consultation Unique Users
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics && (
            <>
              <MetricCard
                title="Cumulative Patient Consultations"
                value={metrics.cumulativePatientConsultations.value}
                trend={metrics.cumulativePatientConsultations.trend}
                description="Cumulative patient consultations over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
              <MetricCard
                title="Cumulative User Consultations"
                value={metrics.cumulativeUserConsultations.value}
                trend={metrics.cumulativeUserConsultations.trend}
                description="Cumulative user consultations over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
            </>
          )}
        </div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Company Care Facility Counts
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics && (
            <>
              <MetricCard
                title="Care Facility Count"
                value={metrics.careFacilityCount.value}
                trend={metrics.careFacilityCount.trend}
                description="Care facility count over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
              <MetricCard
                title="Care Facility User Count"
                value={metrics.careFacilityUserCount.value}
                trend={metrics.careFacilityUserCount.trend}
                description="Care facility user count over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
              <MetricCard
                title="Company Count"
                value={metrics.companyCount.value}
                trend={metrics.companyCount.trend}
                description="Company count over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
              <MetricCard
                title="Company User Count"
                value={metrics.companyUserCount.value}
                trend={metrics.companyUserCount.trend}
                description="Company user count over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
            </>
          )}
        </div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Billing Referals
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics && (
            <>
              <MetricCard
                title="Billing Amount Weekly"
                value={metrics.billingAmountWeekly.value}
                trend={metrics.billingAmountWeekly.trend}
                description="Weekly billing amount over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
              <MetricCard
                title="Billing Users Weekly"
                value={metrics.billingUsersWeekly.value}
                trend={metrics.billingUsersWeekly.trend}
                description="Weekly billing users over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
              <MetricCard
                title="Designated Consultation Users Weekly"
                value={metrics.designatedConsultationUsersWeekly.value}
                trend={metrics.designatedConsultationUsersWeekly.trend}
                description="Weekly designated consultation users over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
              <MetricCard
                title="Favorite Consultation Users Weekly"
                value={metrics.favoriteConsultationUsersWeekly.value}
                trend={metrics.favoriteConsultationUsersWeekly.trend}
                description="Weekly favorite consultation users over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
              <MetricCard
                title="General Consultation Users Weekly"
                value={metrics.generalConsultationUsersWeekly.value}
                trend={metrics.generalConsultationUsersWeekly.trend}
                description="Weekly general consultation users over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
            </>
          )}
        </div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Doctor Ratings</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics && (
            <>
              <MetricCard
                title="Doctor Rating Since Start"
                value={metrics.doctorRatingSinceStart.value}
                trend={metrics.doctorRatingSinceStart.trend}
                description="Doctor rating since start over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
              <MetricCard
                title="Doctor Rating Weekly"
                value={metrics.doctorRatingWeekly.value}
                trend={metrics.doctorRatingWeekly.trend}
                description="Weekly doctor rating over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
            </>
          )}
        </div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Paid member consultation
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics && (
            <>
              <MetricCard
                title="Premium Consultations"
                value={metrics.premiumConsultations.value}
                trend={metrics.premiumConsultations.trend}
                description="Premium consultations over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
              <MetricCard
                title="Super Premium Consultations"
                value={metrics.superPremiumConsultations.value}
                trend={metrics.superPremiumConsultations.trend}
                description="Super premium consultations over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
              <MetricCard
                title="Total Paid Member Consultations"
                value={metrics.totalPaidMemberConsultations.value}
                trend={metrics.totalPaidMemberConsultations.trend}
                description="Total paid member consultations over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
            </>
          )}
        </div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Pool Consultation
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics && (
            <>
              <MetricCard
                title="Mental CheckCount"
                value={metrics.mentalCheckCount.value}
                trend={metrics.mentalCheckCount.trend}
                description="Mental checkCount over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
              <MetricCard
                title="Pool Consultation Count"
                value={metrics.poolConsultationCount.value}
                trend={metrics.poolConsultationCount.trend}
                description="Pool consultation count over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
              <MetricCard
                title="School Count"
                value={metrics.schoolCount.value}
                trend={metrics.schoolCount.trend}
                description="School count over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
            </>
          )}
        </div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Premium Subscription
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics && (
            <>
              <MetricCard
                title="Paid Member Additions Total"
                value={metrics.paidMemberAdditionsTotal.value}
                trend={metrics.paidMemberAdditionsTotal.trend}
                description="Paid member additions total over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
              <MetricCard
                title="Paid Member Additions Weekly"
                value={metrics.paidMemberAdditionsWeekly.value}
                trend={metrics.paidMemberAdditionsWeekly.trend}
                description="Weekly paid member additions over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
              <MetricCard
                title="Paid Members"
                value={metrics.paidMembers.value}
                trend={metrics.paidMembers.trend}
                description="Paid members over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
              <MetricCard
                title="Premium Additions Weekly"
                value={metrics.premiumAdditionsWeekly.value}
                trend={metrics.premiumAdditionsWeekly.trend}
                description="Premium additions weekly over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
              <MetricCard
                title="Super Premium Additions Weekly"
                value={metrics.superPremiumAdditionsWeekly.value}
                trend={metrics.superPremiumAdditionsWeekly.trend}
                description="Super premium additions weekly over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
              <MetricCard
                title="Trial Additions Weekly"
                value={metrics.trialAdditionsWeekly.value}
                trend={metrics.trialAdditionsWeekly.trend}
                description="Weekly trial additions over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
              <MetricCard
                title="Trial Users Weekly"
                value={metrics.trialUsersTotal.value}
                trend={metrics.trialUsersTotal.trend}
                description="Weekly trial users over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
            </>
          )}
        </div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              School Account Registrations
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics && (
            <>
              <MetricCard
                title="School Accounts Total"
                value={metrics.schoolAccountsTotal.value}
                trend={metrics.schoolAccountsTotal.trend}
                description="School accounts total over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
              <MetricCard
                title="School Accounts Type 3"
                value={metrics.schoolAccountsType3.value}
                trend={metrics.schoolAccountsType3.trend}
                description="School accounts type 3 over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
              <MetricCard
                title="School Accounts Type 4"
                value={metrics.schoolAccountsType4.value}
                trend={metrics.schoolAccountsType4.trend}
                description="School accounts type 4 over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
            </>
          )}
        </div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              User Statistics
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics && (
            <>
              <MetricCard
                title="Doctor Count"
                value={metrics.doctorCount.value}
                trend={metrics.doctorCount.trend}
                description="Doctor count over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
              <MetricCard
                title="Patient Accounts"
                value={metrics.patientAccounts.value}
                trend={metrics.patientAccounts.trend}
                description="Patient accounts over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
              <MetricCard
                title="Personal Users"
                value={metrics.personalUsers.value}
                trend={metrics.personalUsers.trend}
                description="Personal users over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
              <MetricCard
                title="School Users Company Government"
                value={metrics.schoolUsersCompanyGovernment.value}
                trend={metrics.schoolUsersCompanyGovernment.trend}
                description="School users company government over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
              <MetricCard
                title="School Users Premium"
                value={metrics.schoolUsersPremium.value}
                trend={metrics.schoolUsersPremium.trend}
                description="School users premium over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
              <MetricCard
                title="School Users Starter"
                value={metrics.schoolUsersStarter.value}
                trend={metrics.schoolUsersStarter.trend}
                description="School users starter over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
              <MetricCard
                title="School Users Super Premium"
                value={metrics.schoolUsersSuperPremium.value}
                trend={metrics.schoolUsersSuperPremium.trend}
                description="School users super premium over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
              <MetricCard
                title="School Users Total"
                value={metrics.schoolUsersTotal.value}
                trend={metrics.schoolUsersTotal.trend}
                description="School users total over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
              <MetricCard
                title="School Users Trial"
                value={metrics.schoolUsersTrial.value}
                trend={metrics.schoolUsersTrial.trend}
                description="School users trial over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
              <MetricCard
                title="Total Users"
                value={metrics.totalUsers.value}
                trend={metrics.totalUsers.trend}
                description="Total users over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
            </>
          )}
        </div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              User Type Consultations
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics && (
            <>
              <MetricCard
                title="Company Government Consultations"
                value={metrics.companyGovernmentConsultations.value}
                trend={metrics.companyGovernmentConsultations.trend}
                description="Company government consultations over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
              <MetricCard
                title="Personal Consultations"
                value={metrics.personalConsultations.value}
                trend={metrics.personalConsultations.trend}
                description="Personal consultations over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
              <MetricCard
                title="School Consultations"
                value={metrics.schoolConsultations.value}
                trend={metrics.schoolConsultations.trend}
                description="School consultations over the last 14 weeks"
                onClick={() => setSelectedChart("firstResponse")}
              />
            </>
          )}
        </div>
      </div>
      <ChartModal
        isOpen={selectedChart !== null}
        onClose={() => setSelectedChart(null)}
        chartType={selectedChart}
        chartData={chartData}
        barChartConfig={chartConfig("First Response Rate")}
        lineChartConfig={chartConfig("Continuous Response Rate", "#a7a7a7")}
      />
    </div>
  );
}
