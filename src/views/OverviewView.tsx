import React from 'react';
import { 
  Download, 
  Plus, 
  Calendar, 
  Sparkles, 
  TrendingUp, 
  ArrowUpRight,
  ShieldCheck,
  Zap,
  ChevronDown
} from 'lucide-react';
import { KPI_METRICS } from '../data/mockData';
import { MetricCard } from '../components/dashboard/MetricCard';
import { RevenueChart } from '../components/dashboard/RevenueChart';
import { CustomerGrowthChart } from '../components/dashboard/CustomerGrowthChart';
import { TrafficDonutChart } from '../components/dashboard/TrafficDonutChart';
import { TransactionsTable } from '../components/dashboard/TransactionsTable';
import { ActivityFeed } from '../components/dashboard/ActivityFeed';
import { TopPlansCard } from '../components/dashboard/TopPlansCard';

interface OverviewViewProps {
  dateRange: string;
  onOpenExportModal: () => void;
  onOpenAddWidgetModal: () => void;
  onViewAllTransactions: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  dateRange,
  onOpenExportModal,
  onOpenAddWidgetModal,
  onViewAllTransactions,
}) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2 border-b border-[#252B35]/40">
        <div>
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-mono tracking-widest text-[#20D9A6] font-semibold uppercase">
              BUSINESS OVERVIEW
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#20D9A6] animate-pulse" />
          </div>

          {/* Large Heading with Italic / Gradient Emphasis */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15]">
            Your business, <br className="hidden sm:inline" />
            <span className="italic bg-gradient-to-r from-[#A78BFA] via-[#7C5CFF] to-[#20D9A6] bg-clip-text text-transparent font-normal">
              in motion.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-sm text-[#8B93A1] max-w-2xl mt-3 leading-relaxed">
            Track performance, understand your customers, and make smarter decisions from one powerful workspace.
          </p>
        </div>

        {/* Date Selector & Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#11151B] border border-[#252B35] text-xs font-mono text-[#F5F5F7]">
            <Calendar className="w-3.5 h-3.5 text-[#7C5CFF]" />
            <span>{dateRange}</span>
          </div>

          <button
            onClick={onOpenExportModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#11151B] border border-[#252B35] hover:border-[#7C5CFF]/40 text-xs font-medium text-white transition-all hover:bg-[#151A22] group"
          >
            <Download className="w-3.5 h-3.5 text-[#8B93A1] group-hover:text-white transition-colors" />
            <span>Export Report</span>
          </button>

          <button
            onClick={onOpenAddWidgetModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#6035FF] hover:from-[#8C6DFF] hover:to-[#6E42FF] text-xs font-medium text-white shadow-lg shadow-[#7C5CFF]/20 hover:shadow-[#7C5CFF]/30 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Widget</span>
          </button>
        </div>
      </div>

      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        {KPI_METRICS.map((metric) => (
          <MetricCard key={metric.title} data={metric} />
        ))}
      </div>

      {/* Main Revenue Analytics Section */}
      <RevenueChart />

      {/* Second Analytics Area: Customer Growth + Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <CustomerGrowthChart />
        <TrafficDonutChart />
      </div>

      {/* Top Performing Plans Section */}
      <TopPlansCard />

      {/* Bottom Section: Recent Transactions + Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <TransactionsTable onViewAll={onViewAllTransactions} />
        </div>
        <div>
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
};
