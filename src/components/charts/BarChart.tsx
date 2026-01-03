"use client";

import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface BarChartData {
    name: string;
    value: number;
    color?: string;
    percentage?: number;
}

interface BarChartProps {
    data: BarChartData[];
    title?: string;
    valueLabel?: string;
    showPercentage?: boolean;
    height?: number;
}

export default function BarChart({
    data,
    title,
    valueLabel = "Count",
    showPercentage = false,
    height = 300
}: BarChartProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            {title && (
                <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
            )}

            <ResponsiveContainer width="100%" height={height}>
                <RechartsBarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis type="number" stroke="#6b7280" />
                    <YAxis
                        dataKey="name"
                        type="category"
                        width={150}
                        stroke="#6b7280"
                        tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        formatter={(value: any, name: any, props: any) => {
                            if (showPercentage && props.payload.percentage) {
                                return [`${value} (${props.payload.percentage}%)`, valueLabel];
                            }
                            return [value, valueLabel];
                        }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color || '#3b82f6'} />
                        ))}
                    </Bar>
                </RechartsBarChart>
            </ResponsiveContainer>

            {/* Legend with percentages */}
            {showPercentage && (
                <div className="mt-4 space-y-2">
                    {data.map((item, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded-sm"
                                    style={{ backgroundColor: item.color || '#3b82f6' }}
                                />
                                <span className="text-gray-700">{item.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-semibold text-gray-900">{item.value}</span>
                                {item.percentage !== undefined && (
                                    <span className="text-gray-500">({item.percentage}%)</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
