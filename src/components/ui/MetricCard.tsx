import { TrendingUp, TrendingDown } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string;
  trend: number;
  description?: string;
  onClick: () => void;
}

export default function MetricCard({
  title,
  value,
  trend,
  description,
  onClick,
}: MetricCardProps) {
  const isPositive = trend > 0;
  const trendColor = isPositive ? "text-green-600" : "text-red-600";
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <Card
      className="cursor-pointer transition-all duration-200 hover:shadow-xl"
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <div className={`flex items-center gap-1 ${trendColor}`}>
            <TrendIcon className="h-4 w-4" />
            <span className="text-sm font-medium">
              {Math.abs(trend).toFixed(1)}%
            </span>
            <span className="text-xs text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
