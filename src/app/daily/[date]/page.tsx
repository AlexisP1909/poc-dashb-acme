import React from 'react'
import { DailyCallData } from '@/interface/types';
import MOCK_DAILY_DATA from '@/app/sample_api_payload_daily';
const MOCK_DAILY_DATA_TYPED: DailyCallData = MOCK_DAILY_DATA;
export function getDataForDate(date: string): DailyCallData | undefined {
  // Since this is mock data for 2025-12-31, return it only for that date
  if (date === "2025-12-31") {
    return MOCK_DAILY_DATA_TYPED;
  }
}
export default function page( { params }: { params: { date: string } } ) {
  const data = getDataForDate(params.date);
 return (
  <div>
    {data?.calls.map((call) => (
      <div key={call.id} style={{ marginBottom: 12 }}>
        <div><b>{call.caller}</b> — {call.duration} — {call.client_sentiment}</div>
        <div>{call.most_relevant_data.origin} → {call.most_relevant_data.destination}</div>
        <div>
          Load {call.most_relevant_data.load_id} — {call.most_relevant_data.equipment_type} —{" "}
          {call.most_relevant_data.load_rate.amount} {call.most_relevant_data.load_rate.currency}
        </div>
        <div>{call.most_relevant_data.negotiation_summary}</div>
        <div style={{ fontSize: 12, opacity: 0.7 }}>{call.timestamp}</div>
      </div>
    ))}
  </div>
);

}
