import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  Calendar, 
  Check, 
  Sparkles, 
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Building
} from 'lucide-react';
import { KPI_METRICS, RECENT_TRANSACTIONS, TRAFFIC_SOURCES } from '../data/mockData';

export const ReportsView: React.FC = () => {
  const [activeReportId, setActiveReportId] = useState<string>('rep_monthly');

  const reportTypes = [
    {
      id: 'rep_monthly',
      title: 'Monthly Executive Performance',
      description: 'Comprehensive high-level summary of MRR, ARR, churn, active users, and operating margins.',
      period: 'October 2026',
      status: 'Ready',
    },
    {
      id: 'rep_revenue',
      title: 'Revenue & Cash Ledger Audit',
      description: 'Full reconciliation of gross inflow, processor transaction fees, refunds, and net margins.',
      period: 'Q3 2026',
      status: 'Ready',
    },
    {
      id: 'rep_customer',
      title: 'Customer Cohort & LTV Audit',
      description: 'Deep retention analysis, subscriber expansion velocity, ARPU trends, and churn probability.',
      period: 'Last 180 Days',
      status: 'Ready',
    },
    {
      id: 'rep_growth',
      title: 'Growth & Inbound Traffic Yield',
      description: 'Conversion rates per acquisition channel, organic search velocity, and funnel drop-off metrics.',
      period: 'Year-to-Date 2026',
      status: 'Ready',
    },
  ];

  const currentReport = reportTypes.find(r => r.id === activeReportId) || reportTypes[0];

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const text = `NOVA EXECUTIVE REPORT\nReport Title: ${currentReport.title}\nPeriod: ${currentReport.period}\nStatus: Verified\nGenerated: ${new Date().toLocaleDateString()}\n\nKEY HIGHLIGHTS:\n- Gross MRR: $84,240 (+18.6% MoM)\n- Active Subscribed Workspaces: 24,892 (+12.4% MoM)\n- Funnel Conversion: 8.42%\n- Net Churn Rate: 1.24%\n- Annualized ARR: $1,010,880\n\nCONFIDENTIAL & PROPRIETARY — NOVA INTELLIGENCE SYSTEMS`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentReport.id}-${currentReport.period.toLowerCase().replace(/\s+/g, '-')}.txt`;
    a.click();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#252B35]/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono tracking-widest text-[#20D9A6] font-semibold uppercase">
              EXECUTIVE INTELLIGENCE
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight">
            Financial & Performance Reports
          </h1>
          <p className="text-xs text-[#8B93A1] mt-1">
            Generate verifiable investor audits, stakeholder briefings, and ledger statements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#11151B] border border-[#252B35] hover:border-[#7C5CFF]/40 text-xs font-medium text-white transition-all hover:bg-[#151A22]"
          >
            <Printer className="w-3.5 h-3.5 text-[#8B93A1]" />
            <span>Print View</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#6035FF] hover:from-[#8C6DFF] hover:to-[#6E42FF] text-xs font-medium text-white shadow-md shadow-[#7C5CFF]/20 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Report</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Selector on left + Document Preview on right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reports Navigation List */}
        <div className="space-y-3">
          <div className="text-xs font-mono text-[#8B93A1] uppercase tracking-wider px-1">
            Available Compilations
          </div>
          {reportTypes.map((rep) => {
            const isActive = rep.id === activeReportId;
            return (
              <div
                key={rep.id}
                onClick={() => setActiveReportId(rep.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isActive
                    ? 'bg-[#151A22] border-[#7C5CFF] shadow-lg shadow-[#7C5CFF]/10'
                    : 'bg-[#11151B] border-[#252B35] hover:border-[#323A48]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-white text-xs">
                    {rep.title}
                  </span>
                  <span className="text-[10px] font-mono text-[#20D9A6] bg-[#20D9A6]/10 px-2 py-0.5 rounded border border-[#20D9A6]/20">
                    {rep.status}
                  </span>
                </div>
                <p className="text-[11px] text-[#8B93A1] line-clamp-2 leading-relaxed">
                  {rep.description}
                </p>
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#252B35]/40 text-[10px] font-mono text-[#8B93A1]">
                  <span>Window: {rep.period}</span>
                  <span className="text-[#7C5CFF] flex items-center">
                    Inspect <ChevronRight className="w-3 h-3 ml-0.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Document Preview Panel */}
        <div className="lg:col-span-2 p-8 rounded-2xl bg-[#11151B] border border-[#252B35] shadow-2xl relative">
          {/* Decorative watermark / subtle banner */}
          <div className="flex items-center justify-between pb-6 border-b border-[#252B35]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C5CFF] to-[#20D9A6] p-[1.5px]">
                <div className="w-full h-full bg-[#0B0D10] rounded-[6.5px] flex items-center justify-center font-display font-bold text-white text-xs">
                  N
                </div>
              </div>
              <div>
                <div className="font-display font-bold text-base text-white">NOVA INTELLIGENCE REPORT</div>
                <div className="text-[10px] font-mono text-[#8B93A1]">DOC-REF: {currentReport.id.toUpperCase()}-2026-X</div>
              </div>
            </div>

            <div className="text-right font-mono text-xs text-[#8B93A1]">
              <div>Status: <span className="text-[#20D9A6]">Verified</span></div>
              <div className="text-[10px]">{currentReport.period}</div>
            </div>
          </div>

          {/* Document Content */}
          <div className="py-6 space-y-6">
            <div>
              <h2 className="font-display font-bold text-2xl text-white tracking-tight">
                {currentReport.title}
              </h2>
              <p className="text-xs text-[#8B93A1] mt-1 leading-relaxed">
                {currentReport.description} Prepared automatically by NOVA Analytical Engine for executive review.
              </p>
            </div>

            {/* KPI Summary Block */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#0B0D10] border border-[#252B35]">
              {KPI_METRICS.map(m => (
                <div key={m.title}>
                  <div className="text-[10px] font-mono text-[#8B93A1]">{m.title}</div>
                  <div className="text-lg font-display font-bold text-white mt-0.5 tabular-nums">
                    {m.value}
                  </div>
                  <div className="text-[10px] font-mono text-[#20D9A6]">
                    +{m.change}% vs benchmark
                  </div>
                </div>
              ))}
            </div>

            {/* Inflow & Traffic Summary */}
            <div className="space-y-3">
              <h4 className="font-display font-semibold text-xs text-white uppercase tracking-wider font-mono">
                Acquisition & Traffic Distribution
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {TRAFFIC_SOURCES.map(t => (
                  <div key={t.source} className="p-2.5 rounded-lg bg-[#0B0D10] border border-[#252B35]">
                    <div className="text-[10px] text-[#8B93A1] truncate">{t.source}</div>
                    <div className="text-sm font-mono font-bold text-white mt-0.5">{t.percentage}%</div>
                    <div className="text-[9px] font-mono text-[#8B93A1]">{t.visitors.toLocaleString()} users</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Verified Transactions Sample */}
            <div className="space-y-2">
              <h4 className="font-display font-semibold text-xs text-white uppercase tracking-wider font-mono">
                Verified Inflow Sample (Audit Trail)
              </h4>
              <div className="rounded-xl border border-[#252B35] overflow-hidden">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#0B0D10] border-b border-[#252B35] text-[10px] text-[#8B93A1]">
                    <tr>
                      <th className="p-2.5">Invoice</th>
                      <th className="p-2.5">Entity</th>
                      <th className="p-2.5">Plan</th>
                      <th className="p-2.5 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#252B35]/50 bg-[#11151B]">
                    {RECENT_TRANSACTIONS.slice(0, 4).map(tx => (
                      <tr key={tx.id}>
                        <td className="p-2.5 text-[#8B93A1]">{tx.invoiceId}</td>
                        <td className="p-2.5 text-white font-sans">{tx.customerName}</td>
                        <td className="p-2.5 text-[#A78BFA]">{tx.plan}</td>
                        <td className="p-2.5 text-right text-[#20D9A6]">${tx.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Document Footer Signoff */}
          <div className="pt-6 border-t border-[#252B35] flex items-center justify-between text-[11px] font-mono text-[#8B93A1]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#20D9A6]" />
              <span>Cryptographically Verified Invariant #4492-NOVA</span>
            </div>
            <span>Page 1 of 1</span>
          </div>
        </div>
      </div>
    </div>
  );
};
