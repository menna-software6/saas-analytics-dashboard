import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
import { MetricData } from '../../types';

interface MetricCardProps {
  data: MetricData;
}

export const MetricCard: React.FC<MetricCardProps> = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Compute SVG sparkline path
  const min = Math.min(...data.sparkline);
  const max = Math.max(...data.sparkline);
  const range = max - min || 1;
  const width = 120;
  const height = 36;
  const points = data.sparkline.map((val, idx) => {
    const x = (idx / (data.sparkline.length - 1)) * width;
    const y = height - ((val - min) / range) * (height - 8) - 4;
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(' L ')}`;
  const areaD = `M 0,${height} L ${points.join(' L ')} L ${width},${height} Z`;

  const colorStyles = {
    violet: {
      accent: '#7C5CFF',
      glow: 'group-hover:border-[#7C5CFF]/50 group-hover:shadow-[0_8px_30px_-6px_rgba(124,92,255,0.25)]',
      gradientId: 'grad-violet',
      badgeBg: 'bg-[#7C5CFF]/10 text-[#A78BFA] border-[#7C5CFF]/20',
      stroke: '#7C5CFF',
    },
    mint: {
      accent: '#20D9A6',
      glow: 'group-hover:border-[#20D9A6]/50 group-hover:shadow-[0_8px_30px_-6px_rgba(32,217,166,0.25)]',
      gradientId: 'grad-mint',
      badgeBg: 'bg-[#20D9A6]/10 text-[#20D9A6] border-[#20D9A6]/20',
      stroke: '#20D9A6',
    },
    purple: {
      accent: '#A78BFA',
      glow: 'group-hover:border-[#A78BFA]/50 group-hover:shadow-[0_8px_30px_-6px_rgba(167,139,250,0.25)]',
      gradientId: 'grad-purple',
      badgeBg: 'bg-[#A78BFA]/10 text-[#C4B5FD] border-[#A78BFA]/20',
      stroke: '#A78BFA',
    },
    cyan: {
      accent: '#38BDF8',
      glow: 'group-hover:border-[#38BDF8]/50 group-hover:shadow-[0_8px_30px_-6px_rgba(56,189,248,0.25)]',
      gradientId: 'grad-cyan',
      badgeBg: 'bg-[#38BDF8]/10 text-[#38BDF8] border-[#38BDF8]/20',
      stroke: '#38BDF8',
    },
  }[data.color];

  const isPositive = data.change > 0;
  // For churn rate, negative change is actually good!
  const isGood = data.title.includes('Churn') ? !isPositive : isPositive;

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative p-5 rounded-2xl bg-[#11151B] border border-[#252B35] transition-all duration-300 hover:-translate-y-1 ${colorStyles.glow}`}
    >
      {/* Background ambient radial highlight */}
      <div 
        className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent`}
      />

      {/* Header: Title and Comparison Badge */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <span className="text-xs font-medium text-[#8B93A1] tracking-wide">
          {data.title}
        </span>
        
        <div className={`flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full border ${
          isGood 
            ? 'bg-[#20D9A6]/10 text-[#20D9A6] border-[#20D9A6]/20' 
            : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
        }`}>
          {isPositive ? (
            <ArrowUpRight className="w-3 h-3" />
          ) : (
            <ArrowDownRight className="w-3 h-3" />
          )}
          <span>{isPositive ? `+${data.change}%` : `${data.change}%`}</span>
        </div>
      </div>

      {/* Main Metric Value & Sparkline */}
      <div className="flex items-end justify-between relative z-10">
        <div>
          <div className="font-display font-bold text-2xl lg:text-3xl text-white tracking-tight tabular-nums">
            {data.value}
          </div>
          <p className="text-[11px] text-[#8B93A1]/70 mt-1">
            {data.period}
          </p>
        </div>

        {/* Mini Sparkline Chart */}
        <div className="w-[110px] h-[36px] overflow-hidden shrink-0">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id={colorStyles.gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colorStyles.stroke} stopOpacity="0.4" />
                <stop offset="100%" stopColor={colorStyles.stroke} stopOpacity="0.0" />
              </linearGradient>
            </defs>

            <path
              d={areaD}
              fill={`url(#${colorStyles.gradientId})`}
            />

            <path
              d={pathD}
              fill="none"
              stroke={colorStyles.stroke}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Glowing endpoint indicator */}
            <circle
              cx={width}
              cy={height - ((data.sparkline[data.sparkline.length - 1] - min) / range) * (height - 8) - 4}
              r="3"
              fill={colorStyles.stroke}
              className={isHovered ? 'animate-ping' : ''}
            />
            <circle
              cx={width}
              cy={height - ((data.sparkline[data.sparkline.length - 1] - min) / range) * (height - 8) - 4}
              r="2"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
