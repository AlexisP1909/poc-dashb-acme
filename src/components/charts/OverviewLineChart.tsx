"use client";

import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area
} from 'recharts';
import { useRouter } from 'next/navigation';
import MOCK_DASHBOARD_DATA from '@/app/mockDashboardData';

export default function OverviewLineChart() {
    const router = useRouter();
    const { timeSeriesData } = MOCK_DASHBOARD_DATA;

    // Transform data for the chart
    const data = timeSeriesData.map(day => ({
        ...day,
        formattedDate: day.date,
        revenueK: day.totalRevenue / 1000
    }));

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const pointData = payload[0].payload;
            return (
                <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-4 min-w-[220px]">
                    <p className="text-sm font-bold text-gray-900 mb-3">{label}</p>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-gray-600">Calls</span>
                            <span className="text-sm font-bold text-blue-600">{pointData.calls}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-gray-600">Success Rate</span>
                            <span className="text-sm font-bold text-green-600">{pointData.successRate}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-gray-600">Revenue</span>
                            <span className="text-sm font-bold text-purple-600">${pointData.revenueK.toFixed(1)}K</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-gray-600">Sentiment</span>
                            <div className="flex items-center gap-1">
                                <span className={`w-2 h-2 rounded-full ${pointData.avgSentiment > 0.5 ? 'bg-green-500' :
                                        pointData.avgSentiment > 0 ? 'bg-yellow-500' : 'bg-red-500'
                                    }`} />
                                <span className="text-sm font-bold text-gray-700">
                                    {Math.round(((pointData.avgSentiment + 1) / 2) * 100)}%
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 text-center font-medium">
                            Click to view details
                        </p>
                    </div>
                </div>
            );
        }
        return null;
    };

    const handlePointClick = (data: any) => {
        if (data && data.activePayload && data.activePayload.length > 0) {
            const pointData = data.activePayload[0].payload;
            router.push(`/daily/${pointData.fullDate}`);
        }
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Calls Over Time</h3>
                <p className="text-sm text-gray-500">Daily call volume and performance metrics</p>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        onClick={handlePointClick}
                        className="cursor-pointer"
                    >
                        <defs>
                            <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis
                            dataKey="formattedDate"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            dy={10}
                            minTickGap={30}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '4 4' }} />
                        <Line
                            type="monotone"
                            dataKey="calls"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            dot={{ fill: '#fff', stroke: '#3b82f6', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, strokeWidth: 0, fill: '#2563eb' }}
                            animationDuration={1500}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
