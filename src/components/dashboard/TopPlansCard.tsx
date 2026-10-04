import React from 'react';
import { TOP_PERFORMING_PLANS } from '../../data/mockData';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

export const TopPlansCard: React.FC = () => {
  return (
    <div className="p-6 rounded-2xl bg-[#11151B] border border-[#252B35] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-display font-semibold text-base text-white">
            Top Performing Plans
          </h3>
          <p className="text-xs text-[#8B93A1] mt-0.5">
            ARR contribution and conversion yield per tier
          </p>
        </div>
        <div className="flex items-center gap-1 text-xs text-[#20D9A6] font-mono">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>+16.4% avg</span>
        </div>
      </div>

      {/* Grid of 4 Plan Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TOP_PERFORMING_PLANS.map((plan) => (
          <div
            key={plan.name}
            className="p-4 rounded-xl bg-[#0B0D10] border border-[#252B35] hover:border-[#7C5CFF]/40 transition-all group"
          >
            {/* Top row */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-white group-hover:text-[#A78BFA] transition-colors">
                {plan.name}
              </span>
              <span className="text-[10px] font-mono text-[#8B93A1]">
                ${plan.price}/mo
              </span>
            </div>

            {/* Revenue value */}
            <div className="text-xl font-display font-bold text-white tracking-tight tabular-nums mb-1">
              ${plan.revenue.toLocaleString()}
            </div>

            {/* Progress bar */}
            <div className="w-full bg-[#151A22] h-1.5 rounded-full overflow-hidden mb-3">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${plan.activePct}%`,
                  backgroundColor: plan.color,
                }}
              />
            </div>

            {/* Sub-stats: Customers & Growth */}
            <div className="flex items-center justify-between text-[11px] font-mono pt-2 border-t border-[#252B35]/40 text-[#8B93A1]">
              <span>{plan.customers} clients</span>
              <div className="flex items-center text-[#20D9A6]">
                <ArrowUpRight className="w-3 h-3" />
                <span>+{plan.growth}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
