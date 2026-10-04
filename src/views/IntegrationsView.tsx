import React, { useState } from 'react';
import { Cpu, Check, ExternalLink, RefreshCw, Key, ShieldCheck, Zap } from 'lucide-react';

export const IntegrationsView: React.FC = () => {
  const [integrations, setIntegrations] = useState([
    {
      id: 'stripe',
      name: 'Stripe Billing & Subscriptions',
      category: 'Payment Ingestion',
      description: 'Stream customer charges, invoices, disputes, and automatic upgrades directly into NOVA.',
      status: 'Connected',
      latency: '12ms',
    },
    {
      id: 'segment',
      name: 'Segment CDP & Telemetry',
      category: 'Event Tracking',
      description: 'Sync customer identify and track event payloads into real-time cohort retention tables.',
      status: 'Connected',
      latency: '24ms',
    },
    {
      id: 'slack',
      name: 'Slack Notification Dispatcher',
      category: 'Alerting',
      description: 'Broadcast high-value enterprise upgrades and churn warning alerts into specified channels.',
      status: 'Connected',
      latency: '4ms',
    },
    {
      id: 'github',
      name: 'GitHub Deployment Markers',
      category: 'DevOps & Releases',
      description: 'Correlate code deployment git commit hashes with conversion rate spikes.',
      status: 'Available',
      latency: '-',
    },
    {
      id: 'posthog',
      name: 'PostHog Session Analytics',
      category: 'Product Analytics',
      description: 'Bi-directional sync between session recordings and user churn risk scores.',
      status: 'Available',
      latency: '-',
    },
    {
      id: 'webhook',
      name: 'Custom HTTPS Webhook Endpoint',
      category: 'Developer API',
      description: 'Configurable zero-latency JSON webhook dispatch for custom backend microservices.',
      status: 'Connected',
      latency: '9ms',
    },
  ]);

  const toggleStatus = (id: string) => {
    setIntegrations(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: item.status === 'Connected' ? 'Available' : 'Connected',
          latency: item.status === 'Connected' ? '-' : '14ms',
        };
      }
      return item;
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#252B35]/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono tracking-widest text-[#7C5CFF] font-semibold uppercase">
              DATA PIPELINES
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight">
            Integrations & Webhook Ingestion
          </h1>
          <p className="text-xs text-[#8B93A1] mt-1">
            Connect payment processors, event trackers, and communication channels with sub-30ms sync.
          </p>
        </div>

        <button 
          onClick={() => alert('Webhook secret rotated and verified!')}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#11151B] border border-[#252B35] text-xs font-mono text-[#8B93A1] hover:text-white"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#20D9A6]" />
          <span>Rotate Webhook Secret</span>
        </button>
      </div>

      {/* Grid of integrations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {integrations.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl bg-[#11151B] border border-[#252B35] flex flex-col justify-between hover:border-[#323A48] transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#8B93A1] bg-[#0B0D10] px-2 py-0.5 rounded border border-[#252B35]">
                  {item.category}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                  item.status === 'Connected'
                    ? 'bg-[#20D9A6]/10 text-[#20D9A6] border-[#20D9A6]/20'
                    : 'bg-[#151A22] text-[#8B93A1] border-[#252B35]'
                }`}>
                  {item.status}
                </span>
              </div>

              <h3 className="font-display font-bold text-base text-white mt-2">
                {item.name}
              </h3>
              <p className="text-xs text-[#8B93A1] mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-[#252B35] flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#8B93A1]">
                Latency: <span className="text-white">{item.latency}</span>
              </span>
              <button
                onClick={() => toggleStatus(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  item.status === 'Connected'
                    ? 'bg-[#151A22] text-rose-300 hover:bg-rose-500/10 border border-[#252B35]'
                    : 'bg-gradient-to-r from-[#7C5CFF] to-[#6035FF] text-white shadow'
                }`}
              >
                {item.status === 'Connected' ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
