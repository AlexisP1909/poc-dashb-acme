import React from 'react';

interface MetricCardProps {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
    subtitle?: string;
    trend?: {
        value: string;
        isPositive: boolean;
    };
    gradient?: string;
}

export default function MetricCard({
    title,
    value,
    icon,
    subtitle,
    trend,
    gradient = 'from-blue-500 to-purple-600'
}: MetricCardProps) {
    return (
        <div className="relative overflow-hidden rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group">
            {/* Gradient accent bar */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`} />

            <div className="p-6">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                        <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
                        {subtitle && (
                            <p className="text-xs text-gray-500">{subtitle}</p>
                        )}
                        {trend && (
                            <div className={`inline-flex items-center mt-2 text-xs font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'
                                }`}>
                                <span>{trend.isPositive ? '↑' : '↓'}</span>
                                <span className="ml-1">{trend.value}</span>
                            </div>
                        )}
                    </div>
                    {icon && (
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${gradient} opacity-30 group-hover:opacity-50 transition-opacity duration-300`}>
                            <div className="text-black ">
                                {icon}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
