import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  BarChart3, 
  Layers, 
  ChevronDown, 
  ChevronUp,
  Cpu, 
  Globe, 
  Lock, 
  Activity,
  Terminal,
  ExternalLink
} from 'lucide-react';
import { NavPage } from '../types';

interface LandingPageViewProps {
  onGoToDashboard: () => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({ onGoToDashboard }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const testimonials = [
    {
      quote: "NOVA gave our executive team real-time visibility into MRR expansion and cohort health. It cut our investor reporting compilation time from 3 days to literally 30 seconds.",
      author: "Elena Rostova",
      role: "VP of Finance",
      company: "SolarData AI",
      avatar: "ER",
      metric: "+24% ARR Growth",
    },
    {
      quote: "The cleanest analytics experience on the web. The predictive churn models caught two at-risk enterprise contracts before renewal, saving $68,000 in ARR this quarter alone.",
      author: "Marcus Vance",
      role: "Head of Product",
      company: "LinearTech Dev",
      avatar: "MV",
      metric: "94% Retention",
    },
    {
      quote: "Every engineer and PM in our company lives in NOVA. The UI feels like an expensive instrument rather than a bloated enterprise admin portal.",
      author: "Sarah Chen",
      role: "Co-Founder & CEO",
      company: "StripeFlow Inc.",
      avatar: "SC",
      metric: "18ms Edge Latency",
    }
  ];

  const faqs = [
    {
      q: "How does NOVA connect to our payment gateway?",
      a: "NOVA features pre-built zero-latency connectors for Stripe, Paddle, Braintree, and custom webhook feeds. Setup takes less than 2 minutes via OAuth or read-only restricted API credentials."
    },
    {
      q: "Is NOVA compliant with SOC2 Type II and GDPR?",
      a: "Yes. All telemetry is encrypted in transit using TLS 1.3 and at rest with AES-256 GCM. We undergo continuous automated SOC2 Type II audit certification and provide regional EU/US data residency."
    },
    {
      q: "Can I customize the predictive forecast model algorithms?",
      a: "Yes. In the Revenue Intelligence suite, you can simulate custom MoM growth curves, seasonable churn parameters, and contract expansions with interactive parameter sliders."
    },
    {
      q: "How does the 14-day free trial work?",
      a: "You get unrestricted access to the complete Pro or Business tier with no credit card required. Invite your entire team, connect your sandbox, and export reports immediately."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#F5F5F7] selection:bg-[#7C5CFF]/30 selection:text-white relative overflow-hidden font-sans">
      {/* Background Ambient Glow Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#7C5CFF]/15 via-[#20D9A6]/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-[800px] -left-40 w-[500px] h-[500px] bg-[#7C5CFF]/10 blur-3xl pointer-events-none" />
      <div className="absolute top-[1600px] -right-40 w-[600px] h-[600px] bg-[#20D9A6]/10 blur-3xl pointer-events-none" />

      {/* Top Marketing Navigation */}
      <header className="sticky top-0 z-40 h-20 bg-[#0B0D10]/80 backdrop-blur-xl border-b border-[#252B35]/60 px-6 lg:px-12 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C5CFF] to-[#20D9A6] p-[1.5px] shadow-sm">
            <div className="w-full h-full bg-[#0B0D10] rounded-[6.5px] flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#7C5CFF]" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 22h20L12 2z" strokeLinejoin="round" />
                <circle cx="12" cy="15" r="2.5" fill="#20D9A6" stroke="none" />
              </svg>
            </div>
          </div>
          <span className="font-display font-bold text-xl tracking-wider text-white">
            NOVA
          </span>
        </div>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-[#8B93A1]">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#analytics" className="hover:text-white transition-colors">Intelligence</a>
          <a href="#testimonials" className="hover:text-white transition-colors">Customers</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={onGoToDashboard}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#6035FF] hover:from-[#8C6DFF] hover:to-[#6E42FF] text-white text-xs font-semibold shadow-lg shadow-[#7C5CFF]/25 hover:shadow-[#7C5CFF]/40 transition-all flex items-center gap-2"
          >
            <span>Launch Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-28 px-6 lg:px-12 max-w-7xl mx-auto text-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151A22] border border-[#252B35] text-xs font-mono text-[#20D9A6] mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#20D9A6] animate-pulse" />
          <span>NOVA 2.0 Revenue Engine is Live</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.1] mb-6">
          Analytics, <br />
          <span className="italic bg-gradient-to-r from-[#A78BFA] via-[#7C5CFF] to-[#20D9A6] bg-clip-text text-transparent font-normal">
            designed for clarity.
          </span>
        </h1>

        {/* Supporting Subtitle */}
        <p className="text-base sm:text-lg text-[#8B93A1] max-w-2xl mx-auto leading-relaxed mb-10">
          The revenue intelligence platform built for modern software companies. Track cohort retention, forecast ARR, and uncover churn risk before it impacts your bottom line.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onGoToDashboard}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#6035FF] hover:from-[#8C6DFF] hover:to-[#6E42FF] text-white text-sm font-semibold shadow-xl shadow-[#7C5CFF]/30 hover:shadow-[#7C5CFF]/50 transition-all flex items-center justify-center gap-2"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onGoToDashboard}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#11151B] border border-[#252B35] hover:border-[#7C5CFF]/40 text-white text-sm font-medium hover:bg-[#151A22] transition-all flex items-center justify-center gap-2"
          >
            <span>Explore Live Dashboard</span>
            <ExternalLink className="w-4 h-4 text-[#8B93A1]" />
          </button>
        </div>

        {/* FLOATING LUXURIOUS DASHBOARD PREVIEW MOCKUP */}
        <div className="relative mx-auto max-w-5xl">
          {/* Ambient rim glow behind the preview */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#7C5CFF]/40 via-[#20D9A6]/30 to-[#A78BFA]/40 rounded-3xl blur-2xl opacity-60" />

          {/* Floating UI Card container */}
          <div 
            onClick={onGoToDashboard}
            className="relative rounded-2xl bg-[#11151B]/95 border border-[#252B35] shadow-[0_20px_80px_-15px_rgba(0,0,0,0.9)] overflow-hidden cursor-pointer group hover:border-[#7C5CFF]/60 transition-all duration-300"
          >
            {/* Top window frame bar */}
            <div className="px-5 py-3.5 bg-[#0B0D10] border-b border-[#252B35] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-[#20D9A6]/80" />
              </div>

              <div className="px-3 py-1 rounded-md bg-[#151A22] border border-[#252B35] text-[11px] font-mono text-[#8B93A1] flex items-center gap-2">
                <Lock className="w-3 h-3 text-[#20D9A6]" />
                <span>app.nova-intel.com/overview</span>
              </div>

              <span className="text-[10px] font-mono text-[#20D9A6] bg-[#20D9A6]/10 px-2 py-0.5 rounded border border-[#20D9A6]/20">
                Click to Open App
              </span>
            </div>

            {/* Dashboard Content Mockup */}
            <div className="p-6 lg:p-8 space-y-6 text-left">
              {/* Top stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#0B0D10] border border-[#252B35]">
                  <span className="text-[11px] font-mono text-[#8B93A1]">Monthly Recurring Revenue</span>
                  <div className="text-2xl font-display font-bold text-white mt-1 tabular-nums">$84,240</div>
                  <span className="text-[10px] font-mono text-[#20D9A6]">+18.6% MoM</span>
                </div>
                <div className="p-4 rounded-xl bg-[#0B0D10] border border-[#252B35]">
                  <span className="text-[11px] font-mono text-[#8B93A1]">Active Subscribers</span>
                  <div className="text-2xl font-display font-bold text-white mt-1 tabular-nums">24,892</div>
                  <span className="text-[10px] font-mono text-[#20D9A6]">+12.4% MoM</span>
                </div>
                <div className="p-4 rounded-xl bg-[#0B0D10] border border-[#252B35]">
                  <span className="text-[11px] font-mono text-[#8B93A1]">Checkout Conversion</span>
                  <div className="text-2xl font-display font-bold text-white mt-1 tabular-nums">8.42%</div>
                  <span className="text-[10px] font-mono text-[#20D9A6]">+2.8% yield</span>
                </div>
                <div className="p-4 rounded-xl bg-[#0B0D10] border border-[#252B35]">
                  <span className="text-[11px] font-mono text-[#8B93A1]">Gross Margin</span>
                  <div className="text-2xl font-display font-bold text-white mt-1 tabular-nums">77.8%</div>
                  <span className="text-[10px] font-mono text-[#7C5CFF]">Profitable SaaS</span>
                </div>
              </div>

              {/* Graphic area */}
              <div className="p-5 rounded-xl bg-[#0B0D10] border border-[#252B35] relative">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <span className="text-xs font-semibold text-white">Gross Revenue vs. Net Inflow</span>
                    <span className="text-[10px] font-mono text-[#8B93A1] ml-2">Last 30 Days</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#7C5CFF]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#20D9A6]" />
                  </div>
                </div>

                <div className="h-32 w-full flex items-end gap-1.5 pt-4">
                  {[32, 45, 38, 55, 62, 58, 70, 75, 68, 82, 88, 78, 92, 98, 94, 100].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end gap-1 h-full">
                      <div 
                        className="w-full bg-gradient-to-t from-[#7C5CFF] to-[#20D9A6] rounded-t-sm opacity-80 group-hover:opacity-100 transition-opacity" 
                        style={{ height: `${h}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY LOGOS */}
      <section className="py-12 border-y border-[#252B35]/60 bg-[#0E1116]/60">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-mono text-[#8B93A1] uppercase tracking-widest mb-8">
            TRUSTED BY HIGH-GROWTH ENGINEERING & REVENUE TEAMS GLOBALLY
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16 opacity-60">
            {['STRIPEFLOW', 'HYPERBASE', 'SOLARDATA', 'LINEARTECH', 'AETHERCLOUD', 'PRISMDYNAMICS'].map((name) => (
              <span key={name} className="font-display font-bold tracking-widest text-sm text-stone-300">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* POWERFUL ANALYTICS BENTO GRID */}
      <section id="features" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-mono tracking-widest text-[#7C5CFF] font-semibold uppercase">
            POWERFUL CAPABILITIES
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight mt-2">
            Everything your revenue team needs. <br />
            <span className="italic text-[#20D9A6]">In one place.</span>
          </h2>
          <p className="text-sm text-[#8B93A1] mt-3">
            Stop stitching together five broken spreadsheets. NOVA consolidates telemetry, forecasting, and retention into an intuitive workspace.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Big Bento 1 */}
          <div className="md:col-span-2 p-8 rounded-2xl bg-[#11151B] border border-[#252B35] relative overflow-hidden flex flex-col justify-between">
            <div className="max-w-md mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#7C5CFF]/10 border border-[#7C5CFF]/20 flex items-center justify-center text-[#7C5CFF] mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-2xl text-white">
                Predictive MoM Growth Modeling
              </h3>
              <p className="text-xs text-[#8B93A1] mt-2 leading-relaxed">
                Run real-time scenario tests on subscriber expansion, pipeline yield, and churn probability with our algorithmic forecast engine.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0B0D10] border border-[#252B35] font-mono text-xs text-[#8B93A1] flex items-center justify-between">
              <span>Forecast horizon: 12 Months Projected</span>
              <span className="text-[#20D9A6] font-semibold">$1,010,880 ARR</span>
            </div>
          </div>

          {/* Bento 2 */}
          <div className="p-8 rounded-2xl bg-[#11151B] border border-[#252B35] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#20D9A6]/10 border border-[#20D9A6]/20 flex items-center justify-center text-[#20D9A6] mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-xl text-white">
                Cohort Heatmap Matrix
              </h3>
              <p className="text-xs text-[#8B93A1] mt-2 leading-relaxed">
                Track retention drop-offs across 180-day customer cohorts with automatic benchmark alerts.
              </p>
            </div>

            <div className="pt-6 font-mono text-xs text-[#20D9A6]">
              94.2% Month-1 Retention
            </div>
          </div>

          {/* Bento 3 */}
          <div className="p-8 rounded-2xl bg-[#11151B] border border-[#252B35] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#A78BFA]/10 border border-[#A78BFA]/20 flex items-center justify-center text-[#A78BFA] mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-xl text-white">
                Real-Time Webhook Engine
              </h3>
              <p className="text-xs text-[#8B93A1] mt-2 leading-relaxed">
                Stream event payloads directly from payment gateways and edge proxies with sub-20ms latency.
              </p>
            </div>

            <div className="pt-6 font-mono text-xs text-[#A78BFA]">
              18ms Global Ingestion
            </div>
          </div>

          {/* Big Bento 4 */}
          <div className="md:col-span-2 p-8 rounded-2xl bg-[#11151B] border border-[#252B35] flex flex-col justify-between">
            <div className="max-w-md mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/20 flex items-center justify-center text-[#38BDF8] mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-2xl text-white">
                Executive Reporting & Audits
              </h3>
              <p className="text-xs text-[#8B93A1] mt-2 leading-relaxed">
                Export presentation-ready stakeholder briefs, balance ledger reconciliations, and tax summaries with one click.
              </p>
            </div>

            <div className="flex gap-2">
              <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#0B0D10] border border-[#252B35] text-white">
                PDF Executive Deck
              </span>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#0B0D10] border border-[#252B35] text-white">
                CSV Ledger
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-t border-[#252B35]/60">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-mono tracking-widest text-[#20D9A6] font-semibold uppercase">
            CLIENT PERSPECTIVES
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">
            Loved by founders & finance teams
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-[#11151B] border border-[#252B35] flex flex-col justify-between">
              <p className="text-xs text-[#F5F5F7] leading-relaxed italic mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-[#252B35]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C5CFF] to-[#20D9A6] text-white font-display font-bold text-xs flex items-center justify-center">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">{t.author}</div>
                    <div className="text-[10px] text-[#8B93A1]">{t.role}, {t.company}</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#20D9A6] bg-[#20D9A6]/10 px-2 py-0.5 rounded border border-[#20D9A6]/20">
                  {t.metric}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING TABLE */}
      <section id="pricing" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-t border-[#252B35]/60">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-mono tracking-widest text-[#7C5CFF] font-semibold uppercase">
            TRANSPARENT PLANS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">
            Predictable pricing for every stage
          </h2>
          <p className="text-xs text-[#8B93A1] mt-2">
            No surprise overage bills. Scale seamlessly from pre-seed to IPO.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-2 p-1 bg-[#11151B] border border-[#252B35] rounded-xl text-xs mt-6">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                billingCycle === 'monthly' ? 'bg-[#151A22] text-white font-medium' : 'text-[#8B93A1]'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual' ? 'bg-[#151A22] text-[#20D9A6] font-medium' : 'text-[#8B93A1]'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] font-mono bg-[#20D9A6]/10 text-[#20D9A6] px-1 rounded">20% Off</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Starter */}
          <div className="p-6 rounded-2xl bg-[#11151B] border border-[#252B35] flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-lg text-white">Starter</h3>
              <p className="text-xs text-[#8B93A1] mt-1">For early teams validating SaaS traction</p>
              <div className="my-6">
                <span className="text-3xl font-display font-bold text-white">
                  ${billingCycle === 'annual' ? 79 : 99}
                </span>
                <span className="text-xs text-[#8B93A1]">/month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#8B93A1] mb-6">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#20D9A6]" /> 10,000 Monthly Active Users</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#20D9A6]" /> 30-Day Data Retention</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#20D9A6]" /> Standard REST API</li>
              </ul>
            </div>
            <button
              onClick={onGoToDashboard}
              className="w-full py-2.5 rounded-xl bg-[#151A22] border border-[#252B35] text-xs font-semibold text-white hover:bg-[#1A212D] transition-colors"
            >
              Start Free Trial
            </button>
          </div>

          {/* Pro (Highlighted) */}
          <div className="p-6 rounded-2xl bg-[#11151B] border border-[#7C5CFF] shadow-[0_0_35px_-10px_rgba(124,92,255,0.35)] flex flex-col justify-between relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#7C5CFF] to-[#20D9A6] text-[10px] font-mono font-bold text-white uppercase">
              Popular Choice
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">Pro</h3>
              <p className="text-xs text-[#8B93A1] mt-1">For scaling startups needing retention intelligence</p>
              <div className="my-6">
                <span className="text-3xl font-display font-bold text-white">
                  ${billingCycle === 'annual' ? 220 : 280}
                </span>
                <span className="text-xs text-[#8B93A1]">/month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#8B93A1] mb-6">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#20D9A6]" /> 50,000 Monthly Active Users</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#20D9A6]" /> 90-Day Cohort Heatmap</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#20D9A6]" /> Real-time Webhooks & Alerts</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#20D9A6]" /> Priority Support SLA</li>
              </ul>
            </div>
            <button
              onClick={onGoToDashboard}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#6035FF] text-xs font-semibold text-white shadow hover:opacity-90 transition-opacity"
            >
              Get Started with Pro
            </button>
          </div>

          {/* Enterprise */}
          <div className="p-6 rounded-2xl bg-[#11151B] border border-[#252B35] flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-lg text-white">Enterprise</h3>
              <p className="text-xs text-[#8B93A1] mt-1">Dedicated cloud infrastructure & custom SLAs</p>
              <div className="my-6">
                <span className="text-3xl font-display font-bold text-white">Custom</span>
                <span className="text-xs text-[#8B93A1]">/annual</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#8B93A1] mb-6">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#20D9A6]" /> Unlimited Users & Volume</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#20D9A6]" /> 99.99% Uptime Guarantee</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#20D9A6]" /> Dedicated CSM & Engineers</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#20D9A6]" /> SOC2 & GDPR Compliance Pack</li>
              </ul>
            </div>
            <button
              onClick={onGoToDashboard}
              className="w-full py-2.5 rounded-xl bg-[#151A22] border border-[#252B35] text-xs font-semibold text-white hover:bg-[#1A212D] transition-colors"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-24 px-6 lg:px-12 max-w-4xl mx-auto border-t border-[#252B35]/60">
        <div className="text-center mb-16">
          <span className="text-[11px] font-mono tracking-widest text-[#20D9A6] font-semibold uppercase">
            QUESTIONS ANSWERED
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-[#11151B] border border-[#252B35] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-white hover:bg-[#151A22] transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#7C5CFF]" /> : <ChevronDown className="w-4 h-4 text-[#8B93A1]" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-[#8B93A1] leading-relaxed border-t border-[#252B35]/50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-20 px-6 lg:px-12 border-t border-[#252B35]/60 relative bg-gradient-to-b from-[#11151B] to-[#0B0D10]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Ready to experience clarity in your metrics?
          </h2>
          <p className="text-sm text-[#8B93A1] max-w-xl mx-auto leading-relaxed">
            Join hundreds of modern software businesses scaling their ARR with NOVA. No credit card required to start.
          </p>
          <div className="pt-4">
            <button
              onClick={onGoToDashboard}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#6035FF] hover:from-[#8C6DFF] hover:to-[#6E42FF] text-white text-sm font-semibold shadow-xl shadow-[#7C5CFF]/30 transition-all inline-flex items-center gap-2"
            >
              <span>Launch NOVA Platform Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 lg:px-12 border-t border-[#252B35] bg-[#0B0D10] text-xs text-[#8B93A1]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#7C5CFF] to-[#20D9A6] flex items-center justify-center font-display font-bold text-white text-[10px]">
              N
            </div>
            <span className="font-display font-semibold text-white">NOVA Intelligence</span>
            <span>·</span>
            <span>© 2026 NOVA Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <button onClick={onGoToDashboard} className="hover:text-white transition-colors">Open Dashboard</button>
            <span className="text-[#20D9A6] font-mono">Status: All Systems Nominal</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
