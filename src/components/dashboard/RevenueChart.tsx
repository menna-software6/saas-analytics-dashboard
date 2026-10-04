import React, { useState } from 'react';
import { 
  REVENUE_DATA_7D, 
  REVENUE_DATA_30D, 
  REVENUE_DATA_90D, 
  REVENUE_DATA_12M 
} from '../../data/mockData';
import { RevenueDataPoint } from '../../types';

export const RevenueChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '90D' | '12M'>('30D');
  const [activeSeries, setActiveSeries] = useState<{ revenue: boolean; expenses: boolean; netRevenue: boolean }>({
    revenue: true,
    expenses: true,
    netRevenue: true,
  });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getData = (): RevenueDataPoint[] => {
    switch (timeRange) {
      case '7D': return REVENUE_DATA_7D;
      case '30D': return REVENUE_DATA_30D;
      case '90D': return REVENUE_DATA_90D;
      case '12M': return REVENUE_DATA_12M;
      default: return REVENUE_DATA_30D;
    }
  };

  const data = getData();

  // SVG Chart Geometry
  const chartWidth = 720;
  const chartHeight = 260;
  const paddingX = 40;
  const paddingY = 30;

  const maxVal = Math.max(...data.map(d => Math.max(d.revenue, d.expenses, d.netRevenue))) * 1.15;
  const minVal = 0;

  const getX = (idx: number) => {
    if (data.length <= 1) return paddingX;
    return paddingX + (idx / (data.length - 1)) * (chartWidth - paddingX * 2);
  };

  const getY = (val: number) => {
    const usableHeight = chartHeight - paddingY * 2;
    return chartHeight - paddingY - ((val - minVal) / (maxVal - minVal)) * usableHeight;
  };

  // Helper to build smooth curved bezier path
  const makeSmoothPath = (values: number[]) => {
    if (values.length === 0) return '';
    const points = values.map((val, idx) => ({ x: getX(idx), y: getY(val) }));
    if (points.length === 1) return `M ${points[0].x},${points[0].y}`;

    let path = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? 0 : i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }
    return path;
  };

  const revenuePath = makeSmoothPath(data.map(d => d.revenue));
  const expensesPath = makeSmoothPath(data.map(d => d.expenses));
  const netPath = makeSmoothPath(data.map(d => d.netRevenue));

  // Area under netRevenue
  const firstX = getX(0);
  const lastX = getX(data.length - 1);
  const netAreaPath = `${netPath} L ${lastX},${chartHeight - paddingY} L ${firstX},${chartHeight - paddingY} Z`;

  // Grid line values
  const yTicks = [0, maxVal * 0.33, maxVal * 0.66, maxVal];

  // Active or hovered data point
  const currentPoint = hoveredIndex !== null ? data[hoveredIndex] : data[data.length - 1];

  const totalRev = data.reduce((acc, d) => acc + d.revenue, 0);
  const totalNet = data.reduce((acc, d) => acc + d.netRevenue, 0);

  return (
    <div className="p-6 rounded-2xl bg-[#11151B] border border-[#252B35] relative">
      {/* Top Header & Range Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-display font-semibold text-lg text-white">
              Revenue Overview
            </h3>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#20D9A6]/10 text-[#20D9A6] border border-[#20D9A6]/20">
              Live Stream
            </span>
          </div>
          <p className="text-xs text-[#8B93A1] mt-0.5">
            Real-time multi-currency inflow, infrastructure expenses, and net margins.
          </p>
        </div>

        {/* Time Range Selector Buttons */}
        <div className="flex items-center gap-1 p-1 bg-[#0B0D10] rounded-xl border border-[#252B35] self-start sm:self-auto">
          {(['7D', '30D', '90D', '12M'] as const).map(range => (
            <button
              key={range}
              onClick={() => {
                setTimeRange(range);
                setHoveredIndex(null);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-medium font-mono transition-all ${
                timeRange === range
                  ? 'bg-[#151A22] text-[#20D9A6] shadow-sm border border-[#252B35]'
                  : 'text-[#8B93A1] hover:text-white'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Series Toggles & Summary Metrics */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#252B35]/60 mb-4 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          {/* Revenue Toggle */}
          <button
            onClick={() => setActiveSeries(prev => ({ ...prev, revenue: !prev.revenue }))}
            className={`flex items-center gap-2 px-2.5 py-1 rounded-md border transition-all ${
              activeSeries.revenue 
                ? 'bg-[#7C5CFF]/10 border-[#7C5CFF]/30 text-white' 
                : 'opacity-40 border-transparent text-[#8B93A1]'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#7C5CFF]" />
            <span className="font-medium">Gross Revenue</span>
            <span className="font-mono text-[#A78BFA] tabular-nums">
              ${(currentPoint.revenue).toLocaleString()}
            </span>
          </button>

          {/* Net Revenue Toggle */}
          <button
            onClick={() => setActiveSeries(prev => ({ ...prev, netRevenue: !prev.netRevenue }))}
            className={`flex items-center gap-2 px-2.5 py-1 rounded-md border transition-all ${
              activeSeries.netRevenue 
                ? 'bg-[#20D9A6]/10 border-[#20D9A6]/30 text-white' 
                : 'opacity-40 border-transparent text-[#8B93A1]'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#20D9A6]" />
            <span className="font-medium">Net Revenue</span>
            <span className="font-mono text-[#20D9A6] tabular-nums">
              ${(currentPoint.netRevenue).toLocaleString()}
            </span>
          </button>

          {/* Expenses Toggle */}
          <button
            onClick={() => setActiveSeries(prev => ({ ...prev, expenses: !prev.expenses }))}
            className={`flex items-center gap-2 px-2.5 py-1 rounded-md border transition-all ${
              activeSeries.expenses 
                ? 'bg-rose-500/10 border-rose-500/30 text-white' 
                : 'opacity-40 border-transparent text-[#8B93A1]'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span className="font-medium">Expenses</span>
            <span className="font-mono text-rose-300 tabular-nums">
              ${(currentPoint.expenses).toLocaleString()}
            </span>
          </button>
        </div>

        <div className="text-[11px] font-mono text-[#8B93A1]">
          Period Total: <span className="text-white font-semibold">${totalRev.toLocaleString()}</span>
        </div>
      </div>

      {/* Interactive SVG Chart */}
      <div className="relative w-full h-[280px] select-none">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-full overflow-visible"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <defs>
            <linearGradient id="netRevenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#20D9A6" stopOpacity="0.25" />
              <stop offset="70%" stopColor="#20D9A6" stopOpacity="0.03" />
              <stop offset="100%" stopColor="#20D9A6" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="grossRevenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7C5CFF" stopOpacity="0.20" />
              <stop offset="100%" stopColor="#7C5CFF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines */}
          {yTicks.map((val, i) => {
            const y = getY(val);
            return (
              <g key={i}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={chartWidth - paddingX}
                  y2={y}
                  stroke="#252B35"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={paddingX - 8}
                  y={y + 4}
                  fill="#8B93A1"
                  fontSize="10"
                  fontFamily="JetBrains Mono"
                  textAnchor="end"
                >
                  ${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}
                </text>
              </g>
            );
          })}

          {/* Area fill for Net Revenue */}
          {activeSeries.netRevenue && (
            <path
              d={netAreaPath}
              fill="url(#netRevenueGradient)"
              className="transition-all duration-300"
            />
          )}

          {/* Line for Expenses */}
          {activeSeries.expenses && (
            <path
              d={expensesPath}
              fill="none"
              stroke="#FB7185"
              strokeWidth="2"
              strokeDasharray="5 3"
              strokeLinecap="round"
              className="transition-all duration-300 opacity-80"
            />
          )}

          {/* Line for Gross Revenue */}
          {activeSeries.revenue && (
            <path
              d={revenuePath}
              fill="none"
              stroke="#7C5CFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-300"
            />
          )}

          {/* Line for Net Revenue */}
          {activeSeries.netRevenue && (
            <path
              d={netPath}
              fill="none"
              stroke="#20D9A6"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-300"
            />
          )}

          {/* X Axis Labels */}
          {data.map((d, i) => {
            // Show every label if small dataset, or skip if 30D/90D
            const showLabel = 
              data.length <= 8 || 
              i === 0 || 
              i === data.length - 1 || 
              i % Math.floor(data.length / 5) === 0;

            if (!showLabel) return null;
            const x = getX(i);
            return (
              <text
                key={i}
                x={x}
                y={chartHeight - 8}
                fill="#8B93A1"
                fontSize="10"
                fontFamily="Inter"
                textAnchor="middle"
              >
                {d.label}
              </text>
            );
          })}

          {/* Hover Crosshair & Interactive Slices */}
          {data.map((d, i) => {
            const x = getX(i);
            const isHovered = hoveredIndex === i;

            return (
              <g key={i}>
                {/* Transparent hover capture column */}
                <rect
                  x={x - (chartWidth / data.length) / 2}
                  y={0}
                  width={chartWidth / data.length}
                  height={chartHeight}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(i)}
                />

                {isHovered && (
                  <>
                    {/* Vertical indicator line */}
                    <line
                      x1={x}
                      y1={paddingY}
                      x2={x}
                      y2={chartHeight - paddingY}
                      stroke="#7C5CFF"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />

                    {/* Circular points */}
                    {activeSeries.revenue && (
                      <circle
                        cx={x}
                        cy={getY(d.revenue)}
                        r="5"
                        fill="#7C5CFF"
                        stroke="#0B0D10"
                        strokeWidth="2"
                      />
                    )}
                    {activeSeries.netRevenue && (
                      <circle
                        cx={x}
                        cy={getY(d.netRevenue)}
                        r="5"
                        fill="#20D9A6"
                        stroke="#0B0D10"
                        strokeWidth="2"
                      />
                    )}
                    {activeSeries.expenses && (
                      <circle
                        cx={x}
                        cy={getY(d.expenses)}
                        r="4"
                        fill="#FB7185"
                        stroke="#0B0D10"
                        strokeWidth="2"
                      />
                    )}
                  </>
                )}
              </g>
            );
          })}
        </svg>

        {/* Hover Floating Tooltip Card */}
        {hoveredIndex !== null && (
          <div
            className="absolute pointer-events-none z-30 transition-all duration-75 transform -translate-x-1/2 -translate-y-full"
            style={{
              left: `${(getX(hoveredIndex) / chartWidth) * 100}%`,
              top: `${(getY(data[hoveredIndex].revenue) / chartHeight) * 100 - 4}%`,
            }}
          >
            <div className="bg-[#151A22]/95 backdrop-blur-md border border-[#252B35] rounded-xl p-3 shadow-2xl min-w-[170px] text-xs">
              <div className="text-[11px] font-mono text-[#8B93A1] mb-1.5 pb-1 border-b border-[#252B35]">
                {data[hoveredIndex].date}
              </div>
              <div className="space-y-1 font-mono">
                <div className="flex justify-between items-center text-[#A78BFA]">
                  <span>Gross:</span>
                  <span className="font-semibold text-white">${data[hoveredIndex].revenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-[#20D9A6]">
                  <span>Net:</span>
                  <span className="font-semibold text-[#20D9A6]">${data[hoveredIndex].netRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-rose-400">
                  <span>Expenses:</span>
                  <span className="font-semibold text-rose-300">${data[hoveredIndex].expenses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-[#8B93A1] text-[10px] pt-1">
                  <span>Transactions:</span>
                  <span className="text-white">{data[hoveredIndex].orders}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
