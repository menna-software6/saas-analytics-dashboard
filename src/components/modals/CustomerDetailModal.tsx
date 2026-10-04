import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  ArrowUpRight, 
  PauseCircle, 
  CreditCard, 
  Calendar, 
  MapPin, 
  Building2, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Customer } from '../../types';

interface CustomerDetailModalProps {
  customer: Customer | null;
  onClose: () => void;
  onUpdateCustomer?: (updated: Customer) => void;
}

export const CustomerDetailModal: React.FC<CustomerDetailModalProps> = ({
  customer,
  onClose,
  onUpdateCustomer,
}) => {
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  if (!customer) return null;

  const triggerAction = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-xl rounded-2xl bg-[#11151B] border border-[#252B35] shadow-2xl z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Banner with Ambient Gradient */}
        <div className="h-24 bg-gradient-to-r from-[#7C5CFF]/20 via-[#20D9A6]/10 to-transparent p-4 flex items-start justify-between relative border-b border-[#252B35]">
          <span className="text-[11px] font-mono text-[#8B93A1] uppercase tracking-wider">
            Customer Profile & Lifecycle
          </span>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8B93A1] hover:text-white rounded-lg hover:bg-[#151A22] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content body */}
        <div className="px-6 pb-6 pt-0 relative">
          {/* Avatar and basic info */}
          <div className="flex items-end justify-between -mt-10 mb-4">
            <div className="flex items-end gap-3.5">
              <div className="w-16 h-16 rounded-2xl bg-[#1A212D] border-2 border-[#11151B] text-white flex items-center justify-center font-display font-bold text-xl shadow-lg">
                {customer.avatar}
              </div>
              <div className="pb-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-lg text-white">
                    {customer.name}
                  </h3>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    customer.status === 'active' 
                      ? 'bg-[#20D9A6]/10 text-[#20D9A6] border border-[#20D9A6]/20'
                      : customer.status === 'trial'
                      ? 'bg-amber-400/10 text-amber-300 border border-amber-400/20'
                      : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                  }`}>
                    {customer.status}
                  </span>
                </div>
                <div className="text-xs text-[#8B93A1] flex items-center gap-2 mt-0.5">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    {customer.company}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {customer.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="pb-1 text-right">
              <div className="font-mono font-bold text-lg text-white tabular-nums">
                ${customer.mrr.toLocaleString()}<span className="text-xs font-normal text-[#8B93A1]">/mo</span>
              </div>
              <div className="text-[10px] font-mono text-[#20D9A6]">
                LTV: ${customer.ltv.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Action notification toast */}
          {actionNotice && (
            <div className="mb-4 p-2.5 rounded-xl bg-[#20D9A6]/10 border border-[#20D9A6]/30 text-xs text-[#20D9A6] flex items-center gap-2 animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{actionNotice}</span>
            </div>
          )}

          {/* Key Metric Blocks */}
          <div className="grid grid-cols-3 gap-3 my-4">
            <div className="p-3 rounded-xl bg-[#0B0D10] border border-[#252B35]">
              <div className="text-[10px] font-mono text-[#8B93A1]">Current Plan</div>
              <div className="text-sm font-semibold text-white mt-0.5">{customer.plan}</div>
            </div>
            <div className="p-3 rounded-xl bg-[#0B0D10] border border-[#252B35]">
              <div className="text-[10px] font-mono text-[#8B93A1]">Customer Since</div>
              <div className="text-sm font-semibold text-white mt-0.5">{customer.joinedDate}</div>
            </div>
            <div className="p-3 rounded-xl bg-[#0B0D10] border border-[#252B35]">
              <div className="text-[10px] font-mono text-[#8B93A1]">Last Active</div>
              <div className="text-sm font-semibold text-white mt-0.5">{customer.lastActive}</div>
            </div>
          </div>

          {/* Contact & Subscription Details */}
          <div className="p-4 rounded-xl bg-[#0B0D10] border border-[#252B35] space-y-2 text-xs font-mono mb-4">
            <div className="flex justify-between">
              <span className="text-[#8B93A1]">Email Address</span>
              <span className="text-white font-sans">{customer.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8B93A1]">Billing Cycle</span>
              <span className="text-white">Monthly Auto-Debit</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8B93A1]">Next Renewal</span>
              <span className="text-[#20D9A6]">November 01, 2026</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8B93A1]">Assigned CSM</span>
              <span className="text-white font-sans">Alexandre Dev (NOVA)</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <button
              onClick={() => triggerAction(`Direct message queued to ${customer.email}`)}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#151A22] border border-[#252B35] text-xs font-medium text-white hover:bg-[#1A212D] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#7C5CFF]" />
              <span>Email</span>
            </button>
            <button
              onClick={() => triggerAction(`Customer tier upgraded to next plan level!`)}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#151A22] border border-[#252B35] text-xs font-medium text-white hover:bg-[#1A212D] transition-colors"
            >
              <ArrowUpRight className="w-3.5 h-3.5 text-[#20D9A6]" />
              <span>Upgrade</span>
            </button>
            <button
              onClick={() => triggerAction(`Subscription paused. No charges will be processed.`)}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#151A22] border border-[#252B35] text-xs font-medium text-white hover:bg-[#1A212D] transition-colors"
            >
              <PauseCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Pause</span>
            </button>
            <button
              onClick={() => triggerAction(`Credit balance of $100 added to account.`)}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#151A22] border border-[#252B35] text-xs font-medium text-white hover:bg-[#1A212D] transition-colors"
            >
              <CreditCard className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Credit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
