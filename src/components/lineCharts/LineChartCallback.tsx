"use client"

import React from "react"

import { LineChart, TooltipProps } from "@/components/lineCharts/LineChart"
import { useRouter } from "next/navigation"
import MOCK_DASHBOARD_DATA from "@/app/mockDashboardData"

function LineChartCallback() {
  const router = useRouter();
  const [datas, setDatas] = React.useState<TooltipProps | null>(null)

  const { timeSeriesData } = MOCK_DASHBOARD_DATA;

  // Prepare data for the chart
  const chartData = timeSeriesData.map(day => ({
    date: day.date,
    calls: day.calls,
    successRate: day.successRate,
    revenue: day.totalRevenue / 1000 // Convert to thousands for better scale
  }));

  const callsFormatter = (number: number) =>
    `${Intl.NumberFormat("us").format(number)}`

  const payload = datas?.payload?.[0]
  const value = payload?.value ?? 0

  const formattedValue = payload
    ? callsFormatter(value)
    : callsFormatter(chartData[chartData.length - 1].calls)

  const handleDrillDown = () => {
    // Get the date from the hovered point or use default
    const hoveredData = datas?.payload?.[0]?.payload;
    const selectedDate = hoveredData?.fullDate || "2025-12-31";
    return router.push(`/daily/${selectedDate}`);
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Calls Over Time
        </p>
        <p className="mt-2 text-3xl font-bold text-gray-900">
          {formattedValue}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {datas?.label || chartData[chartData.length - 1].date}
        </p>
      </div>
      <div onClick={handleDrillDown} className="cursor-pointer">
        <LineChart
          data={chartData}
          index="date"
          categories={["calls"]}
          showLegend={false}
          showYAxis={false}
          startEndOnly={true}
          className="-mb-2 mt-8 h-48"
          tooltipCallback={(props) => {
            if (props.active) {
              setDatas((prev) => {
                if (prev?.label === props.label) return prev
                return props
              })
            } else {
              setDatas(null)
            }
            return null
          }}
        />
      </div>
      <div className="mt-4 text-xs text-gray-500 text-center">
        Click any point to view daily details
      </div>
    </div>
  )
}
export { LineChartCallback }