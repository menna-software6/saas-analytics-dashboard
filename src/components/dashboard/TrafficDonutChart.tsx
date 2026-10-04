import React, { useState } from 'react';
import { TRAFFIC_SOURCES } from '../../data/mockData';
import { TrafficSource } from '../../types';

export const TrafficDonutChart: React.FC = () => {
  const [hoveredSource, setHoveredSource] = useState<TrafficSource | null>(null);
  const data = TRAFFIC_SOURCES;

  const totalVisitors = data.reduce((acc, d) => acc + d.visitors, 0);

  // SVG Donut geometry
  const size = 180;
  const strokeWidth = 26;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercentage = 0;

  return (
    <div className="p-6 rounded-2xl bg-[#11151B] border border-[#252B35] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="font-display font-semibold text-base text-white">
            Traffic Sources
          </h3>
          <p className="text-xs text-[#8B93A1] mt-0.5">
            Acquisition channels by unique visitors
          </p>
        </div>
        <span className="text-[11px] font-mono text-[#8B93A1]">
          {totalVisitors.toLocaleString()} total
        </span>
      </div>

      {/* Main content: Donut on left/center + Legend */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-2">
        {/* SVG Donut */}
        <div className="relative w-[180px] h-[180px] shrink-0 select-none">
          <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full -rotate-90">
            {/* Background track circle */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#151A22"
              strokeWidth={strokeWidth}
            />

            {/* Slices */}
            {data.map((item) => {
              const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
              const strokeDashoffset = -((accumulatedPercentage / 100) * circumference);
              accumulatedPercentage += item.percentage;

              const isHovered = hoveredSource?.source === item.source;

              return (
                <circle
                  key={item.source}
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke={item.color}
                  strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-200 cursor-pointer"
                  onMouseEnter={() => setHoveredSource(item)}
                  onMouseLeave={() => setHoveredSource(null)}
                />
              );
            })}
          </svg>

          {/* Center text in donut */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            {hoveredSource ? (
              <>
                <span className="font-display font-bold text-xl text-white">
                  {hoveredSource.percentage}%
                </span>
                <span className="text-[10px] text-[#8B93A1] truncate max-w-[90px] text-center">
                  {hoveredSource.source}
                </span>
              </>
            ) : (
              <>
                <span className="font-display font-bold text-lg text-white">
                  {data[0].percentage}%
                </span>
                <span className="text-[10px] text-[#8B93A1] truncate max-w-[90px] text-center">
                  {data[0].source}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Clean Legend */}
        <div className="flex-1 w-full space-y-2">
          {data.map((item) => {
            const isHovered = hoveredSource?.source === item.source;
            return (
              <div
                key={item.source}
                onMouseEnter={() => setHoveredSource(item)}
                onMouseLeave={() => setHoveredSource(null)}
                className={`flex items-center justify-between text-xs px-2.5 py-1 rounded-lg cursor-pointer transition-colors ${
                  isHovered ? 'bg-[#151A22]' : 'hover:bg-[#151A22]/50'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className={`truncate ${isHovered ? 'text-white font-medium' : 'text-[#8B93A1]'}`}>
                    {item.source}
                  </span>
                </div>

                <div className="flex items-center gap-3 font-mono shrink-0">
                  <span className="text-[#8B93A1] text-[11px] hidden sm:inline">
                    {item.visitors.toLocaleString()}
                  </span>
                  <span className="text-white font-semibold w-8 text-right">
                    {item.percentage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
