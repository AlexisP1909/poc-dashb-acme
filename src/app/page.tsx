"use client";

import OverviewLineChart from "@/components/charts/OverviewLineChart";
import Sidebar from "@/components/ui/Sidebar";
import MetricCard from "@/components/ui/MetricCard";
import BarChart from "@/components/charts/BarChart";
import ExportButton from "@/components/ui/ExportButton";
import MOCK_DASHBOARD_DATA from "@/app/mockDashboardData";
import { useRouter } from "next/navigation";

export default function Home() {
  const {
    timeSeriesData,
    failureAnalysis,

    totalCalls,
    totalSuccessRate,
    avgSentiment,
    totalRevenue,
    weekOverWeekChange
  } = MOCK_DASHBOARD_DATA;

  // Format sentiment as percentage (convert -1 to 1 scale to 0-100%)
  const sentimentPercentage = Math.round(((avgSentiment + 1) / 2) * 100);

  const router = useRouter();

  function goToDayReport() {
    router.push("/daily/2025-12-31");
  }
  // Prepare bar chart data
  const failureChartData = failureAnalysis.map(item => ({
    name: item.reason,
    value: item.count,
    color: item.color,
    percentage: item.percentage
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="pl-60 pt-10 pr-10 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
              <p className="text-gray-600">
                Last 30 days • Updated {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <ExportButton data={timeSeriesData} filename="dashboard-metrics" />
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Total Calls"
              value={totalCalls}
              subtitle="Last 30 days"
              gradient="from-blue-500 to-blue-600"
              trend={{
                value: `${Math.abs(weekOverWeekChange.calls)}%`,
                isPositive: weekOverWeekChange.calls > 0
              }}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              }
            />

            <MetricCard
              title="Success Rate"
              value={`${totalSuccessRate}%`}
              subtitle="Successful negotiations"
              gradient="from-green-500 to-emerald-600"
              trend={{
                value: `${Math.abs(weekOverWeekChange.successRate).toFixed(1)}%`,
                isPositive: weekOverWeekChange.successRate > 0
              }}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />

            <MetricCard
              title="Avg Sentiment"
              value={`${sentimentPercentage}%`}
              subtitle="Client satisfaction"
              gradient="from-purple-500 to-pink-600"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />

            <MetricCard
              title="Total Revenue"
              value={`$${(totalRevenue / 1000).toFixed(0)}K`}
              subtitle="From successful deals"
              gradient="from-orange-500 to-red-600"
              trend={{
                value: `${Math.abs(weekOverWeekChange.revenue)}%`,
                isPositive: weekOverWeekChange.revenue > 0
              }}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
          </div>

          {/* Enhanced Line Chart */}
          <div className="mb-8" onClick={goToDayReport}>
            <OverviewLineChart />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 gap-6 mb-8">
            {/* Failure Analysis Bar Chart */}
            <BarChart
              data={failureChartData}
              title="Failure Analysis"
              valueLabel="Failed Calls"
              showPercentage={true}
              height={280}
            />
          </div>


        </div>
      </div>
    </div>
  );
}
