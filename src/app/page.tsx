"use client";

import OverviewLineChart from "@/components/charts/OverviewLineChart";
import Sidebar from "@/components/ui/Sidebar";
import MetricCard from "@/components/ui/MetricCard";
import BarChart from "@/components/charts/BarChart";
import ExportButton from "@/components/ui/ExportButton";
import MOCK_DASHBOARD_DATA from "@/app/mockDashboardData";

export default function Home() {
  const {
    timeSeriesData,
    failureAnalysis,
    topDeals,
    totalCalls,
    totalSuccessRate,
    avgSentiment,
    totalRevenue,
    weekOverWeekChange
  } = MOCK_DASHBOARD_DATA;

  // Format sentiment as percentage (convert -1 to 1 scale to 0-100%)
  const sentimentPercentage = Math.round(((avgSentiment + 1) / 2) * 100);

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
          <div className="mb-8">
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

          {/* Top Deals Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Highest Revenue Deals</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {topDeals.map((deal, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-blue-600">#{index + 1}</span>
                    <span className="text-xs text-gray-500">{deal.metric}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-700 mb-1">{deal.name}</p>
                  <p className="text-xl font-bold text-gray-900">${deal.value.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 flex items-center gap-4">
            <a
              href="/daily/2025-12-31"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>View Today's Calls</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
