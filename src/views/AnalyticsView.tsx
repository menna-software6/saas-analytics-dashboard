import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Zap, 
  Layers, 
  Globe, 
  Smartphone, 
  Monitor, 
  Tablet,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import { COHORT_DATA, FUNNEL_STEPS } from '../data/mockData';

export const AnalyticsView: React.FC = () => {
  const [segment, setSegment] = useState<'all' | 'enterprise' | 'smb'>('all');
  const [region, setRegion] = useState<'all' | 'na' | 'eu' | 'apac'>('all');

  const getHeatmapColor = (pct: number) => {
    if (pct === 0) return 'bg-[#151A22]/30 text-stone-600';
    if (pct >= 90) return 'bg-[#20D9A6]/25 text-[#20D9A6] font-semibold';
    if (pct >= 80) return 'bg-[#7C5CFF]/25 text-[#A78BFA] font-medium';
    if (pct >= 70) return 'bg-[#7C5CFF]/15 text-[#8B93A1]';
    return 'bg-amber-400/10 text-amber-300';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#252B35]/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono tracking-widest text-[#7C5CFF] font-semibold uppercase">
              DEEP TELEMETRY
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight">
            Advanced Analytics & Cohort Retention
          </h1>
          <p className="text-xs text-[#8B93A1] mt-1">
            End-to-end user journeys, cohort retention heatmaps, and funnel drop-off analysis.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-[#11151B] border border-[#252B35] rounded-xl text-xs">
            <Filter className="w-3.5 h-3.5 text-[#8B93A1] ml-2" />
            <select
              value={segment}
              onChange={(e) => setSegment(e.target.value as any)}
              className="bg-transparent text-white px-2 py-1 focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#11151B]">All Segments</option>
              <option value="enterprise" className="bg-[#11151B]">Enterprise Only</option>
              <option value="smb" className="bg-[#11151B]">Self-Serve & SMB</option>
            </select>
          </div>

          <div className="flex items-center gap-1 p-1 bg-[#11151B] border border-[#252B35] rounded-xl text-xs">
            <Globe className="w-3.5 h-3.5 text-[#8B93A1] ml-2" />
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value as any)}
              className="bg-transparent text-white px-2 py-1 focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#11151B]">Global (All Regions)</option>
              <option value="na" className="bg-[#11151B]">North America</option>
              <option value="eu" className="bg-[#11151B]">Europe (EMEA)</option>
              <option value="apac" className="bg-[#11151B]">Asia Pacific</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4 Stat Overview Bars */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#11151B] border border-[#252B35]">
          <span className="text-[11px] font-mono text-[#8B93A1]">30-Day Retention</span>
          <div className="text-2xl font-display font-bold text-white mt-1 tabular-nums">94.2%</div>
          <span className="text-[10px] font-mono text-[#20D9A6]">+1.8% vs benchmark</span>
        </div>
        <div className="p-4 rounded-xl bg-[#11151B] border border-[#252B35]">
          <span className="text-[11px] font-mono text-[#8B93A1]">Avg Session Length</span>
          <div className="text-2xl font-display font-bold text-white mt-1 tabular-nums">14m 28s</div>
          <span className="text-[10px] font-mono text-[#20D9A6]">+22% engagement</span>
        </div>
        <div className="p-4 rounded-xl bg-[#11151B] border border-[#252B35]">
          <span className="text-[11px] font-mono text-[#8B93A1]">Activation Rate</span>
          <div className="text-2xl font-display font-bold text-white mt-1 tabular-nums">64.8%</div>
          <span className="text-[10px] font-mono text-[#7C5CFF]">Onboarded in &lt;10m</span>
        </div>
        <div className="p-4 rounded-xl bg-[#11151B] border border-[#252B35]">
          <span className="text-[11px] font-mono text-[#8B93A1]">Net Churn Rate</span>
          <div className="text-2xl font-display font-bold text-white mt-1 tabular-nums">1.24%</div>
          <span className="text-[10px] font-mono text-[#20D9A6]">-0.6% reduction</span>
        </div>
      </div>

      {/* Cohort Retention Heatmap */}
      <div className="p-6 rounded-2xl bg-[#11151B] border border-[#252B35]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display font-semibold text-base text-white">
              Customer Retention Cohort Heatmap
            </h3>
            <p className="text-xs text-[#8B93A1] mt-0.5">
              Monthly subscriber retention percentages tracked over 6 months
            </p>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#8B93A1]">
            <span className="w-2.5 h-2.5 rounded bg-[#20D9A6]/25 border border-[#20D9A6]/40" />
            <span>&gt;90% Strong</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="border-b border-[#252B35] font-mono text-[11px] text-[#8B93A1]">
                <th className="pb-3 font-medium">Cohort Month</th>
                <th className="pb-3 font-medium">Users</th>
                <th className="pb-3 font-medium text-center">Month 0</th>
                <th className="pb-3 font-medium text-center">Month 1</th>
                <th className="pb-3 font-medium text-center">Month 2</th>
                <th className="pb-3 font-medium text-center">Month 3</th>
                <th className="pb-3 font-medium text-center">Month 4</th>
                <th className="pb-3 font-medium text-center">Month 5</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#252B35]/40 font-mono">
              {COHORT_DATA.map((row) => (
                <tr key={row.cohort} className="hover:bg-[#151A22]/50 transition-colors">
                  <td className="py-3 font-sans text-white font-medium">{row.cohort}</td>
                  <td className="py-3 text-[#8B93A1]">{row.users}</td>
                  <td className="py-3 text-center">
                    <span className="inline-block px-2.5 py-1 rounded bg-[#20D9A6]/25 text-[#20D9A6] font-semibold">
                      100%
                    </span>
                  </td>
                  <td className="py-3 text-center">
                    {row.m1 > 0 ? (
                      <span className={`inline-block px-2.5 py-1 rounded ${getHeatmapColor(row.m1)}`}>
                        {row.m1}%
                      </span>
                    ) : (
                      <span className="text-[#8B93A1]/40">-</span>
                    )}
                  </td>
                  <td className="py-3 text-center">
                    {row.m2 > 0 ? (
                      <span className={`inline-block px-2.5 py-1 rounded ${getHeatmapColor(row.m2)}`}>
                        {row.m2}%
                      </span>
                    ) : (
                      <span className="text-[#8B93A1]/40">-</span>
                    )}
                  </td>
                  <td className="py-3 text-center">
                    {row.m3 > 0 ? (
                      <span className={`inline-block px-2.5 py-1 rounded ${getHeatmapColor(row.m3)}`}>
                        {row.m3}%
                      </span>
                    ) : (
                      <span className="text-[#8B93A1]/40">-</span>
                    )}
                  </td>
                  <td className="py-3 text-center">
                    {row.m4 > 0 ? (
                      <span className={`inline-block px-2.5 py-1 rounded ${getHeatmapColor(row.m4)}`}>
                        {row.m4}%
                      </span>
                    ) : (
                      <span className="text-[#8B93A1]/40">-</span>
                    )}
                  </td>
                  <td className="py-3 text-center">
                    {row.m5 > 0 ? (
                      <span className={`inline-block px-2.5 py-1 rounded ${getHeatmapColor(row.m5)}`}>
                        {row.m5}%
                      </span>
                    ) : (
                      <span className="text-[#8B93A1]/40">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Funnel Conversion & Device Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Funnel Card */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#11151B] border border-[#252B35]">
          <h3 className="font-display font-semibold text-base text-white mb-1">
            Acquisition to Paid Conversion Funnel
          </h3>
          <p className="text-xs text-[#8B93A1] mb-6">
            Stage-by-stage progression from initial landing to recurring subscription
          </p>

          <div className="space-y-4">
            {FUNNEL_STEPS.map((step, idx) => {
              const maxUsers = FUNNEL_STEPS[0].users;
              const widthPct = (step.users / maxUsers) * 100;

              return (
                <div key={step.step} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-white flex items-center gap-2">
                      <span className="text-[11px] font-mono text-[#8B93A1]">{idx + 1}.</span>
                      {step.step}
                    </span>
                    <div className="font-mono text-xs flex items-center gap-3">
                      <span className="text-white font-semibold">{step.users.toLocaleString()} users</span>
                      {idx > 0 && (
                        <span className="text-[#20D9A6] text-[11px]">
                          {step.conversionRate}% conv
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="w-full bg-[#0B0D10] h-3 rounded-full overflow-hidden p-0.5 border border-[#252B35]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#7C5CFF] to-[#20D9A6] transition-all duration-500"
                      style={{ width: `${Math.max(widthPct, 2)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Device & Client Breakdown */}
        <div className="p-6 rounded-2xl bg-[#11151B] border border-[#252B35] flex flex-col justify-between">
          <div>
            <h3 className="font-display font-semibold text-base text-white mb-1">
              Client & Device Split
            </h3>
            <p className="text-xs text-[#8B93A1] mb-5">
              Active sessions by hardware platform
            </p>

            <div className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-[#0B0D10] border border-[#252B35] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Monitor className="w-4 h-4 text-[#7C5CFF]" />
                  <div>
                    <div className="text-white font-medium">Desktop & Mac</div>
                    <div className="text-[10px] text-[#8B93A1]">Chrome, Safari, Firefox</div>
                  </div>
                </div>
                <span className="font-mono font-bold text-white text-sm">68.4%</span>
              </div>

              <div className="p-3 rounded-xl bg-[#0B0D10] border border-[#252B35] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Smartphone className="w-4 h-4 text-[#20D9A6]" />
                  <div>
                    <div className="text-white font-medium">Mobile Web & iOS</div>
                    <div className="text-[10px] text-[#8B93A1]">iPhone, Pixel, Samsung</div>
                  </div>
                </div>
                <span className="font-mono font-bold text-white text-sm">24.1%</span>
              </div>

              <div className="p-3 rounded-xl bg-[#0B0D10] border border-[#252B35] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Tablet className="w-4 h-4 text-[#A78BFA]" />
                  <div>
                    <div className="text-white font-medium">Tablet & iPad</div>
                    <div className="text-[10px] text-[#8B93A1]">iPadOS, Android Slate</div>
                  </div>
                </div>
                <span className="font-mono font-bold text-white text-sm">7.5%</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#252B35] text-[11px] text-[#8B93A1]">
            Global edge latency average: <span className="text-[#20D9A6] font-mono">18ms</span>
          </div>
        </div>
      </div>
    </div>
  );
};
