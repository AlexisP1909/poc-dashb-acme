

// Mock data for dashboard overview - 30 days of data
// Each day contains aggregated metrics and detailed call information

export interface DashboardDataPoint {
    date: string;
    fullDate: string; // ISO format for drill-down
    calls: number;
    successfulCalls: number;
    failedCalls: number;
    successRate: number; // percentage
    avgSentiment: number; // -1 to 1 scale
    totalRevenue: number;
    avgCallDuration: number; // minutes
}

export interface FailureReason {
    reason: string;
    count: number;
    percentage: number;
    color: string;
}

export interface TopPerformer {
    name: string;
    value: number;
    metric: string;
}

export interface DashboardData {
    timeSeriesData: DashboardDataPoint[];
    failureAnalysis: FailureReason[];
    topCarriers: TopPerformer[];
    topRoutes: TopPerformer[];
    topDeals: TopPerformer[];
    totalCalls: number;
    totalSuccessRate: number;
    avgSentiment: number;
    totalRevenue: number;
    weekOverWeekChange: {
        calls: number;
        successRate: number;
        revenue: number;
    };
}

// Simple seeded random number generator (Linear Congruential Generator)
let seed = 12345;
const seededRandom = () => {
    const a = 1664525;
    const c = 1013904223;
    const m = 4294967296; // 2^32
    seed = (a * seed + c) % m;
    return seed / m;
};

// Generate 30 days of time series data
const generateTimeSeriesData = (): DashboardDataPoint[] => {
    // Reset seed for consistency on re-renders
    seed = 12345;

    const data: DashboardDataPoint[] = [];
    const startDate = new Date('2025-12-02');

    for (let i = 0; i < 30; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);

        // Simulate varying call volumes (6-15 calls per day)
        const calls = Math.floor(seededRandom() * 10) + 6;
        const successfulCalls = Math.floor(calls * (0.6 + seededRandom() * 0.3)); // 60-90% success
        const failedCalls = calls - successfulCalls;
        const successRate = Math.round((successfulCalls / calls) * 100);

        // Sentiment: -1 (negative) to 1 (positive), weighted toward positive
        const avgSentiment = Math.round((seededRandom() * 0.8 + 0.1) * 100) / 100;

        // Revenue: $1000-$2500 per successful call
        const totalRevenue = successfulCalls * (Math.floor(seededRandom() * 1500) + 1000);

        // Avg duration: 7-14 minutes
        const avgCallDuration = Math.floor(seededRandom() * 8) + 7;

        data.push({
            date: currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            fullDate: currentDate.toISOString().split('T')[0],
            calls,
            successfulCalls,
            failedCalls,
            successRate,
            avgSentiment,
            totalRevenue,
            avgCallDuration
        });
    }

    return data;
};

const timeSeriesData = generateTimeSeriesData();

// Calculate overall metrics
const totalCalls = timeSeriesData.reduce((sum, day) => sum + day.calls, 0);
const totalSuccessful = timeSeriesData.reduce((sum, day) => sum + day.successfulCalls, 0);
const totalSuccessRate = Math.round((totalSuccessful / totalCalls) * 100);
const avgSentiment = Math.round(
    (timeSeriesData.reduce((sum, day) => sum + day.avgSentiment, 0) / timeSeriesData.length) * 100
) / 100;
const totalRevenue = timeSeriesData.reduce((sum, day) => sum + day.totalRevenue, 0);

// Calculate week-over-week changes
const lastWeek = timeSeriesData.slice(-7);
const previousWeek = timeSeriesData.slice(-14, -7);

const lastWeekCalls = lastWeek.reduce((sum, day) => sum + day.calls, 0);
const prevWeekCalls = previousWeek.reduce((sum, day) => sum + day.calls, 0);
const callsChange = Math.round(((lastWeekCalls - prevWeekCalls) / prevWeekCalls) * 100);

const lastWeekSuccess = lastWeek.reduce((sum, day) => sum + day.successfulCalls, 0) / lastWeekCalls * 100;
const prevWeekSuccess = previousWeek.reduce((sum, day) => sum + day.successfulCalls, 0) / prevWeekCalls * 100;
const successRateChange = Math.round((lastWeekSuccess - prevWeekSuccess) * 10) / 10;

const lastWeekRevenue = lastWeek.reduce((sum, day) => sum + day.totalRevenue, 0);
const prevWeekRevenue = previousWeek.reduce((sum, day) => sum + day.totalRevenue, 0);
const revenueChange = Math.round(((lastWeekRevenue - prevWeekRevenue) / prevWeekRevenue) * 100);

// Failure analysis data
const failureAnalysis: FailureReason[] = [
    {
        reason: "Price Negotiation Failed",
        count: 50,
        percentage: 69,
        color: "#ef4444" // red-500
    },
    {
        reason: "Node/System Failure",
        count: 18,
        percentage: 25,
        color: "#f59e0b" // amber-500
    },
    {
        reason: "Other Reasons",
        count: 4,
        percentage: 6,
        color: "#8b5cf6" // violet-500
    }
];

// Top performers
const topCarriers: TopPerformer[] = [
    { name: "John Doe Trucking LLC", value: 23, metric: "calls" },
    { name: "Smith Logistics Inc.", value: 19, metric: "calls" },
    { name: "Eagle Transport Co.", value: 17, metric: "calls" },
    { name: "Summit Logistics Group", value: 15, metric: "calls" },
    { name: "NorthStar Carriers", value: 12, metric: "calls" }
];

const topRoutes: TopPerformer[] = [
    { name: "Dallas, TX → Atlanta, GA", value: 95, metric: "% success" },
    { name: "Houston, TX → Orlando, FL", value: 92, metric: "% success" },
    { name: "Chicago, IL → Memphis, TN", value: 88, metric: "% success" },
    { name: "Denver, CO → Salt Lake City, UT", value: 85, metric: "% success" },
    { name: "Nashville, TN → Louisville, KY", value: 82, metric: "% success" }
];

const topDeals: TopPerformer[] = [
    { name: "LD-78455 (Reefer)", value: 2200, metric: "USD" },
    { name: "LD-78421 (Dry Van)", value: 1850, metric: "USD" },
    { name: "LD-78502 (Dry Van)", value: 1950, metric: "USD" },
    { name: "LD-78561 (Dry Van)", value: 1750, metric: "USD" },
    { name: "LD-78518 (Reefer)", value: 1600, metric: "USD" }
];

const MOCK_DASHBOARD_DATA: DashboardData = {
    timeSeriesData,
    failureAnalysis,
    topCarriers,
    topRoutes,
    topDeals,
    totalCalls,
    totalSuccessRate,
    avgSentiment,
    totalRevenue,
    weekOverWeekChange: {
        calls: callsChange,
        successRate: successRateChange,
        revenue: revenueChange
    }
};

export default MOCK_DASHBOARD_DATA;
