import React, { useState } from 'react';
import { 
  Package, 
  Check, 
  Sparkles, 
  Plus, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Cpu,
  ArrowRight
} from 'lucide-react';
import { TOP_PERFORMING_PLANS } from '../data/mockData';

export const ProductsView: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: 'Starter',
      description: 'Ideal for early-stage bootstrapped teams launching their first SaaS telemetry.',
      monthlyPrice: 99,
      annualPrice: 79,
      features: [
        'Up to 10,000 monthly active users',
        '30-day data retention',
        'Standard REST API access',
        'Email support (24h SLA)',
        '3 team member seats'
      ],
      currentCount: 41,
      mrr: '$4,080',
      popular: false,
    },
    {
      name: 'Pro',
      description: 'Built for scaling startups needing cohort analytics and funnel intelligence.',
      monthlyPrice: 280,
      annualPrice: 220,
      features: [
        'Up to 50,000 monthly active users',
        '90-day cohort retention matrix',
        'Real-time webhook events',
        'Priority Slack support',
        '10 team member seats',
        'Custom domain branding'
      ],
      currentCount: 52,
      mrr: '$14,560',
      popular: false,
    },
    {
      name: 'Business',
      description: 'For high-growth scale-ups requiring predictive forecasting and multi-workspace billing.',
      monthlyPrice: 850,
      annualPrice: 680,
      features: [
        'Up to 250,000 monthly active users',
        '1-year telemetry retention',
        'Predictive churn AI modeling',
        'Dedicated Customer Success Manager',
        'Unlimited workspace seats',
        'SAML SSO & Audit Logs'
      ],
      currentCount: 32,
      mrr: '$27,200',
      popular: true,
    },
    {
      name: 'Enterprise',
      description: 'Mission-critical architecture with custom SLAs, dedicated VPC, and compliance.',
      monthlyPrice: 2400,
      annualPrice: 1950,
      features: [
        'Unlimited monthly active users',
        'Indefinite data lake storage',
        '99.99% uptime SLA guarantee',
        'Dedicated VPC & SOC2 Type II compliance',
        'Custom contract & invoicing',
        '24/7 dedicated engineering hotline'
      ],
      currentCount: 16,
      mrr: '$38,400',
      popular: false,
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#252B35]/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono tracking-widest text-[#7C5CFF] font-semibold uppercase">
              TIER MANAGEMENT
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight">
            Subscription Products & Tier Matrix
          </h1>
          <p className="text-xs text-[#8B93A1] mt-1">
            Configure pricing packaging, feature flags, entitlements, and seat allocations.
          </p>
        </div>

        {/* Billing cycle switcher */}
        <div className="flex items-center gap-2 p-1 bg-[#11151B] border border-[#252B35] rounded-xl text-xs">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              billingCycle === 'monthly' ? 'bg-[#151A22] text-white font-medium shadow-sm' : 'text-[#8B93A1]'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              billingCycle === 'annual' ? 'bg-[#151A22] text-[#20D9A6] font-medium shadow-sm' : 'text-[#8B93A1]'
            }`}
          >
            <span>Annual Billing</span>
            <span className="text-[10px] font-mono bg-[#20D9A6]/10 text-[#20D9A6] px-1.5 py-0.2 rounded border border-[#20D9A6]/20">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {plans.map((p) => {
          const price = billingCycle === 'annual' ? p.annualPrice : p.monthlyPrice;

          return (
            <div
              key={p.name}
              className={`relative p-6 rounded-2xl bg-[#11151B] border flex flex-col justify-between transition-all ${
                p.popular
                  ? 'border-[#7C5CFF] shadow-[0_0_30px_-10px_rgba(124,92,255,0.3)]'
                  : 'border-[#252B35] hover:border-[#323A48]'
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#7C5CFF] to-[#20D9A6] text-[10px] font-mono font-bold text-white uppercase tracking-wider shadow-sm">
                  Most Popular
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display font-bold text-lg text-white">
                    {p.name}
                  </h3>
                  <span className="text-[11px] font-mono text-[#8B93A1] bg-[#0B0D10] px-2 py-0.5 rounded border border-[#252B35]">
                    {p.currentCount} active
                  </span>
                </div>

                <p className="text-xs text-[#8B93A1] leading-relaxed mb-4 min-h-[48px]">
                  {p.description}
                </p>

                {/* Price Display */}
                <div className="mb-6 pb-4 border-b border-[#252B35]">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display font-bold text-3xl text-white tabular-nums">
                      ${price}
                    </span>
                    <span className="text-xs text-[#8B93A1]">/month</span>
                  </div>
                  <div className="text-[11px] font-mono text-[#20D9A6] mt-1">
                    Generates {p.mrr}/mo MRR
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-2.5 text-xs text-[#8B93A1] mb-6">
                  {p.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#20D9A6] shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => alert(`Opening configuration for ${p.name} tier...`)}
                className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  p.popular
                    ? 'bg-gradient-to-r from-[#7C5CFF] to-[#6035FF] text-white shadow hover:opacity-90'
                    : 'bg-[#151A22] border border-[#252B35] text-white hover:bg-[#1A212D]'
                }`}
              >
                Configure Entitlements
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
