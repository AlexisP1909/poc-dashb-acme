# ACME Dashboard PoC - Architecture Documentation

## Overview

This is a **Proof of Concept (PoC) dashboard** built to demonstrate custom analytics and metrics tracking for use case evaluation. The application showcases a product vision where analytics are built in-house rather than relying on platform-provided analytics, allowing for tailored insights specific to business needs.

## Technology Stack

### Core Framework
- **Next.js 14** - React framework with App Router for server-side rendering and routing
- **React 18** - UI component library
- **TypeScript 5** - Type-safe development

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework with custom theme configuration
- **Tailwind Forms** - Form styling plugin
- **Geist Font** - Modern typography (Geist Sans & Geist Mono)
- **Inter Font** - Google Fonts fallback

### Charts & Visualization
- **Recharts 3.6** - Composable charting library for React
- Custom line chart components with interactive tooltips

### UI Components
- **Radix UI** - Headless, accessible component primitives
  - Accordion, Checkbox, Dialog, Dropdown Menu, Hover Card
  - Label, Navigation Menu, Popover, Radio Group, Select
  - Slider, Switch, Tabs, Toast, Toggle, Tooltip
- **React Aria** - Accessible date picker components
- **React Day Picker** - Calendar component
- **Remixicon** - Icon library

### Utilities
- **date-fns** - Date manipulation and formatting
- **tailwind-merge** - Utility for merging Tailwind classes
- **tailwind-variants** - Type-safe variant API for Tailwind

## Architecture

### Project Structure

```
poc-dashb-acme/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── daily/[date]/         # Dynamic route for daily reports
│   │   │   └── page.tsx          # Daily metrics dashboard
│   │   ├── call/[id]/            # Individual call detail pages
│   │   ├── fonts/                # Local font files
│   │   ├── globals.css           # Global styles & Tailwind config
│   │   ├── layout.tsx            # Root layout with fonts & metadata
│   │   ├── page.tsx              # Home page with overview chart
│   │   └── sample_api_payload_daily.ts  # Mock data
│   ├── components/
│   │   ├── lineCharts/
│   │   │   ├── LineChart.tsx           # Base chart component
│   │   │   └── LineChartCallback.tsx   # Chart with drill-down
│   │   └── ui/
│   │       ├── Button.tsx              # Reusable button component
│   │       ├── MetricCard.tsx          # Metric display cards
│   │       └── Sidebar.tsx             # Navigation sidebar
│   ├── interface/
│   │   └── types.ts              # TypeScript type definitions
│   └── lib/
│       ├── chartUtils.ts         # Chart helper functions
│       ├── useOnWindowResize.ts  # Responsive hook
│       └── utils.ts              # General utilities
└── package.json
```

## Data Model

### Type Definitions

The application uses a strongly-typed data model defined in [`types.ts`](file:///c:/Users/alexi/Documents/Carrière/happyRobots/poc-dashb-acme/poc-dashb-acme/src/interface/types.ts):

```typescript
type Call = {
  id: string;
  caller: string;
  duration: string;
  timestamp: string;
  client_sentiment: "positive" | "neutral" | "negative";
  most_relevant_data: MostRelevantData;
};

type DailyCallData = {
  startDate: string;
  endDate: string;
  calls: Call[];
};
```

### Mock Data Strategy

Currently using static mock data in [`sample_api_payload_daily.ts`](file:///c:/Users/alexi/Documents/Carrière/happyRobots/poc-dashb-acme/poc-dashb-acme/src/app/sample_api_payload_daily.ts) for the date **2025-12-31**. This demonstrates the data structure and UI without requiring a backend API.

**Future Enhancement**: Replace with actual API calls to a backend service.

## Routing Strategy

### Dynamic Routes

- **`/`** - Overview dashboard with calls-by-day line chart
- **`/daily/[date]`** - Daily report for specific date (e.g., `/daily/2025-12-31`)
- **`/call/[id]`** - Individual call details (placeholder)

### Navigation Flow

1. User views overview chart on home page
2. Clicks on a data point in the chart
3. Navigates to `/daily/2025-12-31` for detailed daily metrics
4. Can return to overview via sidebar

## Component Architecture

### Page Components

#### Home Page ([`page.tsx`](file:///c:/Users/alexi/Documents/Carrière/happyRobots/poc-dashb-acme/poc-dashb-acme/src/app/page.tsx))
- Displays sidebar navigation
- Shows `LineChartCallback` component with calls-by-day trend
- Provides drill-down interaction to daily view

#### Daily Page ([`daily/[date]/page.tsx`](file:///c:/Users/alexi/Documents/Carrière/happyRobots/poc-dashb-acme/poc-dashb-acme/src/app/daily/[date]/page.tsx))
- **Metrics Summary**: 4 key metric cards
  - Total Calls
  - Positive Sentiment (with percentage)
  - Total Revenue (from successful negotiations)
  - Average Call Duration
- **Sentiment Breakdown**: Visual progress bars showing distribution
- **Call Details List**: Enhanced cards for each call with:
  - Caller name with sentiment badge
  - Duration and timestamp
  - Route information (origin → destination)
  - Load details (ID, equipment type)
  - Negotiation summary
  - Load rate (revenue)

### Reusable Components

#### MetricCard ([`MetricCard.tsx`](file:///c:/Users/alexi/Documents/Carrière/happyRobots/poc-dashb-acme/poc-dashb-acme/src/components/ui/MetricCard.tsx))
- Displays key performance indicators
- Features:
  - Gradient accent bar (customizable colors)
  - Icon support
  - Optional subtitle and trend indicators
  - Hover effects for interactivity
  - Responsive design

#### Sidebar ([`Sidebar.tsx`](file:///c:/Users/alexi/Documents/Carrière/happyRobots/poc-dashb-acme/poc-dashb-acme/src/components/ui/Sidebar.tsx))
- Fixed navigation panel
- "Overview" button to return to home
- Consistent across all pages

#### LineChartCallback ([`LineChartCallback.tsx`](file:///c:/Users/alexi/Documents/Carrière/happyRobots/poc-dashb-acme/poc-dashb-acme/src/components/lineCharts/LineChartCallback.tsx))
- Interactive line chart showing calls over time
- Tooltip with hover state management
- Click handler for drill-down to daily view
- Uses Recharts library

## Metrics Strategy

### What We Track

1. **Call Volume**: Total number of calls per day/period
2. **Sentiment Analysis**: Distribution of positive/neutral/negative client sentiment
3. **Revenue Metrics**: Total revenue from successful load negotiations
4. **Efficiency Metrics**: Average call duration
5. **Success Rate**: Implied by sentiment and revenue data

### Why These Metrics Matter

- **Call Volume**: Indicates activity level and workload
- **Sentiment**: Measures client satisfaction and relationship health
- **Revenue**: Direct business impact and ROI
- **Duration**: Efficiency indicator - shorter successful calls = better performance
- **Success Rate**: Helps identify training needs and process improvements

### Calculation Logic

Metrics are calculated client-side from the call data:

```typescript
function calculateMetrics(calls: Call[]) {
  const totalCalls = calls.length;
  const sentimentCounts = calls.reduce((acc, call) => {
    acc[call.client_sentiment] = (acc[call.client_sentiment] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalRevenue = calls.reduce((sum, call) => {
    return sum + call.most_relevant_data.load_rate.amount;
  }, 0);

  const durations = calls.map(call => parseInt(call.duration.split(' ')[0]));
  const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;

  return { totalCalls, positive, neutral, negative, totalRevenue, avgDuration };
}
```

## Product Vision

### Custom Analytics Approach

This PoC demonstrates a **build-your-own analytics** philosophy:

1. **Tailored Insights**: Metrics specific to the logistics/freight brokerage use case
2. **Full Control**: Complete ownership of data presentation and calculations
3. **Flexibility**: Easy to add new metrics or modify existing ones
4. **Integration Ready**: Can combine data from multiple sources
5. **White-Label**: Branded experience without third-party analytics UI

### Design Philosophy

- **Premium Aesthetics**: Modern, clean design with gradients and micro-animations
- **Data-First**: Information hierarchy prioritizes key metrics
- **Responsive**: Works across desktop and tablet devices
- **Accessible**: Using Radix UI primitives for ARIA compliance
- **Performant**: Server-side rendering with Next.js for fast initial loads

## Future Enhancements

### Short-Term
- [ ] Add date range picker for custom period analysis
- [ ] Implement filtering by sentiment, caller, or equipment type
- [ ] Add export functionality (CSV, PDF reports)
- [ ] Create individual call detail pages
- [ ] Add search functionality

### Medium-Term
- [ ] Connect to real API backend
- [ ] Add user authentication and multi-tenant support
- [ ] Implement real-time updates with WebSockets
- [ ] Add comparative analytics (week-over-week, month-over-month)
- [ ] Create custom alert rules for anomalies

### Long-Term
- [ ] Machine learning insights (predict sentiment, optimal pricing)
- [ ] Advanced visualizations (heat maps, funnel analysis)
- [ ] Mobile app version
- [ ] Integration with CRM systems
- [ ] Automated reporting and email digests

## Development

### Running Locally

```bash
npm run dev
```

Visit `http://localhost:3000` to view the application.

### Building for Production

```bash
npm run build
npm start
```

### Key Dependencies

- Next.js handles routing, SSR, and optimization
- Tailwind CSS provides utility classes for rapid UI development
- Recharts enables interactive data visualization
- TypeScript ensures type safety across the application

## Notes

- Mock data is currently hardcoded for **2025-12-31** only
- The application uses Next.js App Router (not Pages Router)
- Tailwind CSS 4 uses a new `@theme` directive in `globals.css`
- All components are server components by default unless marked with `"use client"`
