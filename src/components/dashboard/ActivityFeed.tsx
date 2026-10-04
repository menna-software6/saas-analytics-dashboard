import React from 'react';
import { 
  ArrowUpRight, 
  Layers, 
  DollarSign, 
  Users2, 
  FileText, 
  Sparkles,
  Zap
} from 'lucide-react';
import { ACTIVITY_FEED } from '../../data/mockData';
import { ActivityItem } from '../../types';

export const ActivityFeed: React.FC = () => {
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'upgrade':
        return <ArrowUpRight className="w-3.5 h-3.5 text-[#20D9A6]" />;
      case 'workspace':
        return <Layers className="w-3.5 h-3.5 text-[#7C5CFF]" />;
      case 'payment':
        return <DollarSign className="w-3.5 h-3.5 text-[#20D9A6]" />;
      case 'team':
        return <Users2 className="w-3.5 h-3.5 text-[#38BDF8]" />;
      case 'export':
        return <FileText className="w-3.5 h-3.5 text-[#A78BFA]" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-[#7C5CFF]" />;
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-[#11151B] border border-[#252B35] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-display font-semibold text-base text-white">
              Recent Activity
            </h3>
            <span className="w-2 h-2 rounded-full bg-[#20D9A6] animate-pulse" />
          </div>
          <p className="text-xs text-[#8B93A1] mt-0.5">
            Audit logs and real-time user lifecycle events
          </p>
        </div>

        <span className="text-[11px] font-mono text-[#8B93A1]">
          Live Event Hub
        </span>
      </div>

      {/* Feed List */}
      <div className="space-y-3.5">
        {ACTIVITY_FEED.map((item) => (
          <div
            key={item.id}
            className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#151A22] transition-colors border border-transparent hover:border-[#252B35]"
          >
            {/* Avatar & Sub-badge */}
            <div className="relative shrink-0">
              <div className="w-8 h-8 rounded-full bg-[#1A212D] border border-[#252B35] text-white flex items-center justify-center font-display font-semibold text-xs">
                {item.user.avatar}
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#11151B] border border-[#252B35] flex items-center justify-center shadow-xs">
                {getActivityIcon(item.type)}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 text-xs">
              <div className="text-[#8B93A1] leading-relaxed">
                <span className="font-medium text-white hover:text-[#A78BFA] transition-colors mr-1">
                  {item.user.name}
                </span>
                <span>{item.description}</span>{' '}
                <span className="text-white font-medium">
                  {item.highlight}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-mono text-[#8B93A1]">
                  {item.timestamp}
                </span>
                {item.amount && (
                  <span className="text-[10px] font-mono text-[#20D9A6] font-semibold bg-[#20D9A6]/10 px-1.5 py-0.2 rounded">
                    {item.amount}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
