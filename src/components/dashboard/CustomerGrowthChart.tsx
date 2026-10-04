import React, { useState } from 'react';
import { CUSTOMER_GROWTH_DATA } from '../../data/mockData';
import { CustomerGrowthPoint } from '../../types';

export const CustomerGrowthChart: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const data = CUSTOMER_GROWTH_DATA;

  const width = 480;
  const height = 220;
  const paddingX = 35;
  const paddingY = 25;

  const maxVal = Math.max(...data.map(d => Math.max(d.newCustomers, d.returningCustomers))) * 1.15;

  const getX = (i: number) => paddingX + (i / (data.length - 1)) * (width - paddingX * 2);
  const getY = (val: number) => height - paddingY - (val / maxVal) * (height - paddingY * 2);

  const makePath = (field: 'newCustomers' | 'returningCustomers') => {
    return data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d[field])}`).join(' ');
  };

  const newPath = makePath('newCustomers');
  const returningPath = makePath('returningCustomers');

  return (
    <div className="p-6 rounded-2xl bg-[#11151B] border border-[#252B35] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display font-semibold text-base text-white">
            Customer Growth
          </h3>
          <p className="text-xs text-[#8B93A1] mt-0.5">
            New acquisition vs. recurring cohort expansion
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7C5CFF]" />
            <span className="text-[#8B93A1]">Returning</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#20D9A6]" />
            <span className="text-[#8B93A1]">New</span>
          </div>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative w-full h-[180px]">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {/* Grid lines */}
          {[0, maxVal * 0.5, maxVal].map((val, i) => {
            const y = getY(val);
            return (
              <g key={i}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#252B35"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
                <text
                  x={paddingX - 6}
                  y={y + 3}
                  fill="#8B93A1"
                  fontSize="9"
                  fontFamily="JetBrains Mono"
                  textAnchor="end"
                >
                  {Math.round(val)}
                </text>
              </g>
            );
          })}

          {/* Returning Line */}
          <path
            d={returningPath}
            fill="none"
            stroke="#7C5CFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* New Line */}
          <path
            d={newPath}
            fill="none"
            stroke="#20D9A6"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points & Interactive columns */}
          {data.map((d, i) => {
            const x = getX(i);
            const isHovered = hoveredIdx === i;

            return (
              <g key={i}>
                <rect
                  x={x - (width / data.length) / 2}
                  y={0}
                  width={width / data.length}
                  height={height}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(i)}
                />

                {/* X Axis label */}
                <text
                  x={x}
                  y={height - 6}
                  fill="#8B93A1"
                  fontSize="9"
                  fontFamily="Inter"
                  textAnchor="middle"
                >
                  {d.label}
                </text>

                {/* Dots on hover */}
                {isHovered && (
                  <>
                    <line
                      x1={x}
                      y1={paddingY}
                      x2={x}
                      y2={height - paddingY}
                      stroke="#8B93A1"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                    <circle cx={x} cy={getY(d.returningCustomers)} r="4" fill="#7C5CFF" stroke="#0B0D10" strokeWidth="2" />
                    <circle cx={x} cy={getY(d.newCustomers)} r="4" fill="#20D9A6" stroke="#0B0D10" strokeWidth="2" />
                  </>
                )}
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {hoveredIdx !== null && (
          <div
            className="absolute pointer-events-none z-30 transition-all duration-75 transform -translate-x-1/2 -translate-y-full"
            style={{
              left: `${(getX(hoveredIdx) / width) * 100}%`,
              top: `${(getY(data[hoveredIdx].returningCustomers) / height) * 100 - 10}%`,
            }}
          >
            <div className="bg-[#151A22] border border-[#252B35] rounded-lg p-2 shadow-xl text-[11px] font-mono whitespace-nowrap">
              <div className="text-white font-semibold mb-1">{data[hoveredIdx].label}</div>
              <div className="text-[#A78BFA]">Returning: {data[hoveredIdx].returningCustomers}</div>
              <div className="text-[#20D9A6]">New: {data[hoveredIdx].newCustomers}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
