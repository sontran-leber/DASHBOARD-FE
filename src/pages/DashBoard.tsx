import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { clearAuth, getUser } from "@/utils/authUtils";
import { getDashboardData, logout } from "@/utils/apiService";
import type { ApiError } from "@/utils/apiService";
import ChartsExample from "@/components/ui/ChartExample";
import MetricCard from "@/components/ui/MetricCard";
import ChartModal from "@/components/ui/ChartModal";
import { chartData, barChartConfig, lineChartConfig } from "@/utils/chartData";

type ChartType = "revenue" | "expenses" | "users";

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
        await getDashboardData();
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
  const getMetrics = () => {
    if (chartData.length < 2) return null;

    const latestData = chartData[chartData.length - 1];
    const previousData = chartData[chartData.length - 2];

    const calculateTrend = (current: number, previous: number) => {
      return ((current - previous) / previous) * 100;
    };

    return {
      revenue: {
        value: `$${(latestData.revenue / 1000).toFixed(1)}k`,
        trend: calculateTrend(latestData.revenue, previousData.revenue),
      },
      expenses: {
        value: `$${(latestData.expenses / 1000).toFixed(1)}k`,
        trend: calculateTrend(latestData.expenses, previousData.expenses),
      },
      users: {
        value: `${(latestData.users / 1000).toFixed(1)}k`,
        trend: calculateTrend(latestData.users, previousData.users),
      },
    };
  };

  const metrics = getMetrics();

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics && (
            <>
              <MetricCard
                title="Revenue"
                value={metrics.revenue.value}
                trend={metrics.revenue.trend}
                description="Total monthly revenue"
                onClick={() => setSelectedChart("revenue")}
              />
              <MetricCard
                title="Expenses"
                value={metrics.expenses.value}
                trend={metrics.expenses.trend}
                description="Total monthly expenses"
                onClick={() => setSelectedChart("expenses")}
              />
              <MetricCard
                title="Active Users"
                value={metrics.users.value}
                trend={metrics.users.trend}
                description="Monthly active users"
                onClick={() => setSelectedChart("users")}
              />
            </>
          )}
        </div>

        <ChartsExample />
      </div>

      {/* Chart Modal */}
      <ChartModal
        isOpen={selectedChart !== null}
        onClose={() => setSelectedChart(null)}
        chartType={selectedChart}
        chartData={chartData}
        barChartConfig={barChartConfig}
        lineChartConfig={lineChartConfig}
      />
    </div>
  );
}
