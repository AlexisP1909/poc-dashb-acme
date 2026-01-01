import React from 'react';
import { DailyCallData, Call } from '@/interface/types';
import MOCK_DAILY_DATA from '@/app/sample_api_payload_daily';
import Sidebar from '@/components/ui/Sidebar';
import MetricCard from '@/components/ui/MetricCard';

const MOCK_DAILY_DATA_TYPED: DailyCallData = MOCK_DAILY_DATA;

export function getDataForDate(date: string): DailyCallData | undefined {
  // Since this is mock data for 2025-12-31, return it only for that date
  if (date === "2025-12-31") {
    return MOCK_DAILY_DATA_TYPED;
  }
}

// Helper function to calculate metrics
function calculateMetrics(calls: Call[]) {
  const totalCalls = calls.length;
  const sentimentCounts = calls.reduce((acc, call) => {
    acc[call.client_sentiment] = (acc[call.client_sentiment] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalRevenue = calls.reduce((sum, call) => {
    return sum + call.most_relevant_data.load_rate.amount;
  }, 0);

  // Calculate average duration (assuming format like "8 minutes")
  const durations = calls.map(call => parseInt(call.duration.split(' ')[0]));
  const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;

  return {
    totalCalls,
    positive: sentimentCounts.positive || 0,
    neutral: sentimentCounts.neutral || 0,
    negative: sentimentCounts.negative || 0,
    totalRevenue,
    avgDuration: Math.round(avgDuration)
  };
}

// Helper to get sentiment color
function getSentimentColor(sentiment: string) {
  switch (sentiment) {
    case 'positive':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'neutral':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'negative':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

// Helper to format timestamp
function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

export default function DailyPage({ params }: { params: { date: string } }) {
  const data = getDataForDate(params.date);

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <div className="pl-60 pt-10 pr-10">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Daily Report</h1>
            <p className="text-gray-600 mb-8">{params.date}</p>
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <p className="text-gray-500 text-lg">No data available for this date</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const metrics = calculateMetrics(data.calls);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="pl-60 pt-10 pr-10 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Daily Report</h1>
            <p className="text-gray-600">
              {new Date(params.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Total Calls"
              value={metrics.totalCalls}
              gradient="from-blue-500 to-blue-600"
              icon={
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              }
            />

            <MetricCard
              title="Positive Sentiment"
              value={metrics.positive}
              subtitle={`${Math.round((metrics.positive / metrics.totalCalls) * 100)}% of calls`}
              gradient="from-green-500 to-emerald-600"
              icon={
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />

            <MetricCard
              title="Total Revenue"
              value={`$${metrics.totalRevenue.toLocaleString()}`}
              subtitle="From successful negotiations"
              gradient="from-purple-500 to-pink-600"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />

            <MetricCard
              title="Avg Duration"
              value={`${metrics.avgDuration} min`}
              subtitle="Per call"
              gradient="from-orange-500 to-red-600"
              icon={
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
          </div>

          {/* Sentiment Breakdown */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Sentiment Breakdown</h2>
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Positive</span>
                  <span className="text-sm font-semibold text-green-600">{metrics.positive}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(metrics.positive / metrics.totalCalls) * 100}%` }}
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Neutral</span>
                  <span className="text-sm font-semibold text-yellow-600">{metrics.neutral}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(metrics.neutral / metrics.totalCalls) * 100}%` }}
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Negative</span>
                  <span className="text-sm font-semibold text-red-600">{metrics.negative}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(metrics.negative / metrics.totalCalls) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Calls List */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Call Details</h2>
            <div className="space-y-4">
              {data.calls.map((call) => (
                <div
                  key={call.id}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{call.caller}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSentimentColor(call.client_sentiment)}`}>
                          {call.client_sentiment}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {call.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatTimestamp(call.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-xs font-medium text-gray-500 mb-2">Route</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {call.most_relevant_data.origin} → {call.most_relevant_data.destination}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-xs font-medium text-gray-500 mb-2">Load Details</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {call.most_relevant_data.load_id} • {call.most_relevant_data.equipment_type}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-500 mb-2">Negotiation Summary</p>
                    <p className="text-sm text-gray-700">{call.most_relevant_data.negotiation_summary}</p>
                  </div>

                  <div className="flex items-end justify-end pt-4 border-t border-gray-100">
                    <div className="text-right">
                      <p className="text-xs font-medium text-gray-500 mb-1">Load Rate</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {call.most_relevant_data.load_rate.amount > 0
                          ? `$${call.most_relevant_data.load_rate.amount.toLocaleString()} ${call.most_relevant_data.load_rate.currency}`
                          : 'No deal'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}