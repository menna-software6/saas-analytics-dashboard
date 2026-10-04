import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  Sparkles, 
  Sliders, 
  HelpCircle,
  Percent,
  Layers,
  ArrowRight
} from 'lucide-react';
import { TOP_PERFORMING_PLANS } from '../data/mockData';

export const RevenueView: React.FC = () => {
  // Forecast Simulation State
  const [monthlyGrowthRate, setMonthlyGrowthRate] = useState<number>(12); // 12% MoM
  const [monthlyChurnRate, setMonthlyChurnRate] = useState<number>(1.2); // 1.2% churn
  const currentMRR = 84240;

  // Project next 12 months
  const forecastMonths = Array.from({ length: 12 }, (_, i) => {
    const netGrowth = (monthlyGrowthRate - monthlyChurnRate) / 100;
    const projectedMRR = Math.round(currentMRR * Math.pow(1 + netGrowth, i + 1));
    const monthNames = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
    return {
      month: monthNames[i % 12],
      mrr: projectedMRR,
      arr: projectedMRR * 12,
    };
  });

  const projectedARR12M = forecastMonths[11].arr;
  const arrGain = projectedARR12M - currentMRR * 12;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#252B35]/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono tracking-widest text-[#20D9A6] font-semibold uppercase">
              FINANCIAL ARCHITECTURE
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight">
            Revenue Intelligence & Forecast Modeling
          </h1>
          <p className="text-xs text-[#8B93A1] mt-1">
            Realized cash flow, unit economics, contract run rates, and predictive runway simulations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#8B93A1]">Next billing cycle:</span>
          <span className="text-xs font-mono text-[#20D9A6] font-semibold bg-[#20D9A6]/10 px-2 py-0.5 rounded border border-[#20D9A6]/20">
            Nov 01, 2026
          </span>
        </div>
      </div>

      {/* 4 Financial KPI Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* MRR */}
        <div className="p-5 rounded-2xl bg-[#11151B] border border-[#252B35]">
          <div className="flex justify-between items-center text-xs text-[#8B93A1] mb-2">
            <span>Current MRR</span>
            <span className="text-[#20D9A6] font-mono text-[11px] flex items-center">
              <ArrowUpRight className="w-3 h-3" /> +18.6%
            </span>
          </div>
          <div className="text-3xl font-display font-bold text-white tabular-nums">
            $84,240
          </div>
          <div className="text-[11px] text-[#8B93A1] mt-1 font-mono">
            Annualized ARR: $1,010,880
          </div>
        </div>

        {/* ARPU */}
        <div className="p-5 rounded-2xl bg-[#11151B] border border-[#252B35]">
          <div className="flex justify-between items-center text-xs text-[#8B93A1] mb-2">
            <span>Average Revenue / User (ARPU)</span>
            <span className="text-[#20D9A6] font-mono text-[11px] flex items-center">
              <ArrowUpRight className="w-3 h-3" /> +6.4%
            </span>
          </div>
          <div className="text-3xl font-display font-bold text-white tabular-nums">
            $68.40
          </div>
          <div className="text-[11px] text-[#8B93A1] mt-1 font-mono">
            Weighted across all 4 tiers
          </div>
        </div>

        {/* Customer LTV */}
        <div className="p-5 rounded-2xl bg-[#11151B] border border-[#252B35]">
          <div className="flex justify-between items-center text-xs text-[#8B93A1] mb-2">
            <span>Customer Lifetime Value (LTV)</span>
            <span className="text-[#A78BFA] font-mono text-[11px] flex items-center">
              <ArrowUpRight className="w-3 h-3" /> 4.8x CAC
            </span>
          </div>
          <div className="text-3xl font-display font-bold text-white tabular-nums">
            $1,840
          </div>
          <div className="text-[11px] text-[#8B93A1] mt-1 font-mono">
            Payback period: 2.4 months
          </div>
        </div>

        {/* Capital Runway */}
        <div className="p-5 rounded-2xl bg-[#11151B] border border-[#252B35]">
          <div className="flex justify-between items-center text-xs text-[#8B93A1] mb-2">
            <span>Cash Runway</span>
            <span className="text-[#20D9A6] font-mono text-[11px]">Profitable</span>
          </div>
          <div className="text-3xl font-display font-bold text-white tabular-nums">
            28 mos
          </div>
          <div className="text-[11px] text-[#8B93A1] mt-1 font-mono">
            Net margin: +77.8%
          </div>
        </div>
      </div>

      {/* Interactive 12-Month Revenue Forecast Simulator */}
      <div className="p-6 rounded-2xl bg-[#11151B] border border-[#252B35]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#252B35]">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#7C5CFF]" />
              <h3 className="font-display font-semibold text-lg text-white">
                Predictive Revenue Forecast Simulator
              </h3>
            </div>
            <p className="text-xs text-[#8B93A1] mt-0.5">
              Simulate enterprise ARR trajectories by adjusting MoM growth velocity and churn resistance.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#0B0D10] border border-[#252B35] text-right">
              <span className="text-[10px] font-mono text-[#8B93A1] uppercase">Projected ARR (Month 12)</span>
              <div className="text-xl font-display font-bold text-[#20D9A6] tabular-nums">
                ${projectedARR12M.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-4 rounded-xl bg-[#0B0D10] border border-[#252B35]">
          <div>
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="text-white font-medium">Monthly Inbound Growth Rate:</span>
              <span className="font-mono text-[#20D9A6] font-bold text-sm">{monthlyGrowthRate}% MoM</span>
            </div>
            <input
              type="range"
              min="3"
              max="25"
              step="1"
              value={monthlyGrowthRate}
              onChange={(e) => setMonthlyGrowthRate(Number(e.target.value))}
              className="w-full accent-[#20D9A6] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#8B93A1] font-mono mt-1">
              <span>3% Conservative</span>
              <span>12% Current</span>
              <span>25% Aggressive</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="text-white font-medium">Monthly Churn Probability:</span>
              <span className="font-mono text-rose-400 font-bold text-sm">{monthlyChurnRate}% Churn</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="5.0"
              step="0.1"
              value={monthlyChurnRate}
              onChange={(e) => setMonthlyChurnRate(Number(e.target.value))}
              className="w-full accent-rose-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#8B93A1] font-mono mt-1">
              <span>0.5% Sticky</span>
              <span>1.2% Current</span>
              <span>5.0% High Risk</span>
            </div>
          </div>
        </div>

        {/* Forecast Bars Grid */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-[#8B93A1] uppercase tracking-wider mb-2">
            12-Month Projected Trajectory
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {forecastMonths.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#0B0D10] border border-[#252B35] hover:border-[#7C5CFF]/50 transition-all text-xs"
              >
                <div className="text-[11px] font-mono text-[#8B93A1] mb-1">
                  M+{idx + 1} ({item.month})
                </div>
                <div className="font-display font-bold text-white text-sm tabular-nums">
                  ${(item.mrr).toLocaleString()}
                </div>
                <div className="text-[10px] font-mono text-[#20D9A6] mt-0.5">
                  ARR: ${(item.arr / 1000).toFixed(0)}k
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue by Plan Breakdown */}
      <div className="p-6 rounded-2xl bg-[#11151B] border border-[#252B35]">
        <h3 className="font-display font-semibold text-base text-white mb-1">
          Revenue Distribution by Subscription Tier
        </h3>
        <p className="text-xs text-[#8B93A1] mb-6">
          Contribution percentages and contract volume
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TOP_PERFORMING_PLANS.map((plan) => (
            <div key={plan.name} className="p-4 rounded-xl bg-[#0B0D10] border border-[#252B35]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-white text-xs">{plan.name}</span>
                <span className="font-mono text-xs text-[#20D9A6]">{plan.activePct}%</span>
              </div>
              <div className="text-2xl font-display font-bold text-white tabular-nums mb-2">
                ${plan.revenue.toLocaleString()}
              </div>
              <div className="w-full bg-[#151A22] h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${plan.activePct}%`, backgroundColor: plan.color }}
                />
              </div>
              <div className="text-[10px] font-mono text-[#8B93A1] mt-2 flex justify-between">
                <span>{plan.customers} subscribers</span>
                <span>${plan.price}/user</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
