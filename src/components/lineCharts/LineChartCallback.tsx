"use client"

import React from "react"

import { LineChart, TooltipProps } from "@/components/lineCharts/LineChart"
import { useRouter } from "next/navigation"
interface DataItem {
  id: number
  date: string
  calls: number
}
const data : DataItem[]= [
  { "id": 1, "date": "Dec 31, 25", "calls": 9 },
  { "id": 2, "date": "Jan 1, 26", "calls": 12 },
  { "id": 3, "date": "Jan 2, 26", "calls": 8 },
  { "id": 4, "date": "Jan 3, 26", "calls": 11 },
  { "id": 5, "date": "Jan 4, 26", "calls": 10 }
];
  //array-end

function LineChartCallback() {
  const router = useRouter();
  const [datas, setDatas] = React.useState<TooltipProps | null>(null)
  const callsFormatter = (number: number) =>
    `${Intl.NumberFormat("us").format(number)}`

  const payload = datas?.payload?.[0]
  const value = payload?.value ?? 0



  const selectedId = datas?.payload?.[0]?.payload.id;
  const formattedValue = payload
    ? callsFormatter(value)
    : callsFormatter(data[data.length - 1].calls)
  
  const handleDrillDown = () => {
   return router.push(`/call/${selectedId}`);
}
  return (
    <div className="w-[80%]">
      <p className="text-sm text-gray-700 dark:text-gray-300">
        Calls by Day
      </p>
      <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-gray-50">
        {formattedValue}
      </p>
      <div onClick={handleDrillDown}>
      <LineChart
        data={data}
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
    </div>
  )
}
export { LineChartCallback }