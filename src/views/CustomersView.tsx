import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Download, 
  Mail, 
  ChevronRight, 
  UserPlus,
  ShieldCheck,
  Building2,
  MapPin
} from 'lucide-react';
import { ALL_CUSTOMERS } from '../data/mockData';
import { Customer } from '../types';
import { CustomerDetailModal } from '../components/modals/CustomerDetailModal';

export const CustomersView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = ALL_CUSTOMERS.filter((c) => {
    const matchesSearch = 
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase());
    const matchesPlan = selectedPlan === 'all' || c.plan.toLowerCase() === selectedPlan.toLowerCase();
    const matchesStatus = selectedStatus === 'all' || c.status.toLowerCase() === selectedStatus.toLowerCase();
    return matchesSearch && matchesPlan && matchesStatus;
  });

  const getStatusBadge = (status: Customer['status']) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#20D9A6]/10 text-[#20D9A6] border border-[#20D9A6]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#20D9A6]" />
            Active
          </span>
        );
      case 'trial':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-400/10 text-amber-300 border border-amber-400/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Trialing
          </span>
        );
      case 'at-risk':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            At Risk
          </span>
        );
      case 'churned':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-rose-500/10 text-rose-300 border border-rose-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            Churned
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#252B35]/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono tracking-widest text-[#20D9A6] font-semibold uppercase">
              CUSTOMER DIRECTORY
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight">
            Accounts & Subscriptions
          </h1>
          <p className="text-xs text-[#8B93A1] mt-1">
            Manage subscriber workspaces, MRR contributions, contract states, and lifecycle health.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('New customer onboarding link generated!')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#6035FF] hover:from-[#8C6DFF] hover:to-[#6E42FF] text-xs font-medium text-white shadow-md shadow-[#7C5CFF]/20 transition-all"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Invite Customer</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#11151B] border border-[#252B35] flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#8B93A1] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by customer name, company, email, or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#0B0D10] border border-[#252B35] rounded-xl text-xs text-white placeholder-[#8B93A1] focus:outline-none focus:border-[#7C5CFF]/60"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0B0D10] border border-[#252B35] rounded-xl text-xs">
            <span className="text-[#8B93A1]">Plan:</span>
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="bg-transparent text-white focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#11151B]">All Plans</option>
              <option value="enterprise" className="bg-[#11151B]">Enterprise</option>
              <option value="business" className="bg-[#11151B]">Business</option>
              <option value="pro" className="bg-[#11151B]">Pro</option>
              <option value="starter" className="bg-[#11151B]">Starter</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0B0D10] border border-[#252B35] rounded-xl text-xs">
            <span className="text-[#8B93A1]">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent text-white focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#11151B]">All Statuses</option>
              <option value="active" className="bg-[#11151B]">Active</option>
              <option value="trial" className="bg-[#11151B]">Trial</option>
              <option value="at-risk" className="bg-[#11151B]">At Risk</option>
              <option value="churned" className="bg-[#11151B]">Churned</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="p-6 rounded-2xl bg-[#11151B] border border-[#252B35]">
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="border-b border-[#252B35] font-mono text-[11px] text-[#8B93A1] uppercase tracking-wider">
                <th className="pb-3 font-medium">Customer & Company</th>
                <th className="pb-3 font-medium">Plan Tier</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">MRR</th>
                <th className="pb-3 font-medium">Total LTV</th>
                <th className="pb-3 font-medium">Last Active</th>
                <th className="pb-3 font-medium text-right">Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#252B35]/50">
              {filteredCustomers.map((cust) => (
                <tr
                  key={cust.id}
                  onClick={() => setSelectedCustomer(cust)}
                  className="group hover:bg-[#151A22]/50 transition-colors cursor-pointer"
                >
                  <td className="py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C5CFF]/20 to-[#20D9A6]/20 border border-[#252B35] text-white flex items-center justify-center font-display font-semibold text-xs">
                        {cust.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-white group-hover:text-[#A78BFA] transition-colors">
                          {cust.name}
                        </div>
                        <div className="text-[11px] text-[#8B93A1] flex items-center gap-1.5">
                          <span>{cust.company}</span>
                          <span>·</span>
                          <span className="font-mono">{cust.location}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5">
                    <span className="font-mono text-white text-[11px] px-2 py-0.5 rounded bg-[#151A22] border border-[#252B35]">
                      {cust.plan}
                    </span>
                  </td>

                  <td className="py-3.5">
                    {getStatusBadge(cust.status)}
                  </td>

                  <td className="py-3.5 font-mono font-semibold text-white tabular-nums">
                    ${cust.mrr.toLocaleString()}/mo
                  </td>

                  <td className="py-3.5 font-mono text-[#20D9A6] tabular-nums">
                    ${cust.ltv.toLocaleString()}
                  </td>

                  <td className="py-3.5 text-[#8B93A1] font-mono text-[11px]">
                    {cust.lastActive}
                  </td>

                  <td className="py-3.5 text-right">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCustomer(cust);
                      }}
                      className="p-1.5 rounded-lg text-[#8B93A1] hover:text-white hover:bg-[#151A22] transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCustomers.length === 0 && (
          <div className="py-12 text-center text-xs text-[#8B93A1]">
            No customers found matching &ldquo;{search}&rdquo;.
          </div>
        )}
      </div>

      {/* Customer Detail Modal */}
      <CustomerDetailModal
        customer={selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
      />
    </div>
  );
};
