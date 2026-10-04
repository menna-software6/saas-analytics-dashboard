import React, { useState } from 'react';
import { 
  ArrowUpDown, 
  Search, 
  Receipt, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  X
} from 'lucide-react';
import { Transaction, TransactionStatus } from '../../types';
import { RECENT_TRANSACTIONS } from '../../data/mockData';

interface TransactionsTableProps {
  onViewAll?: () => void;
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({ onViewAll }) => {
  const [filter, setFilter] = useState<'all' | TransactionStatus>('all');
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<'amount' | 'date'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const filteredTransactions = RECENT_TRANSACTIONS.filter(tx => {
    const matchesFilter = filter === 'all' || tx.status === filter;
    const matchesSearch = 
      tx.customerName.toLowerCase().includes(search.toLowerCase()) ||
      tx.customerEmail.toLowerCase().includes(search.toLowerCase()) ||
      tx.invoiceId.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  }).sort((a, b) => {
    if (sortField === 'amount') {
      return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    }
    return 0; // Default order
  });

  const toggleSort = (field: 'amount' | 'date') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const getStatusBadge = (status: TransactionStatus) => {
    switch (status) {
      case 'paid':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#20D9A6]/10 text-[#20D9A6] border border-[#20D9A6]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#20D9A6]" />
            Paid
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-400/10 text-amber-300 border border-amber-400/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Pending
          </span>
        );
      case 'refunded':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-rose-500/10 text-rose-300 border border-rose-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            Refunded
          </span>
        );
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-[#11151B] border border-[#252B35] flex flex-col justify-between">
      {/* Table Header & Interactive Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div>
          <h3 className="font-display font-semibold text-lg text-white">
            Recent Transactions
          </h3>
          <p className="text-xs text-[#8B93A1] mt-0.5">
            Verified Stripe & ACH payment settlement ledger
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#8B93A1] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1 bg-[#0B0D10] border border-[#252B35] rounded-lg text-xs text-white placeholder-[#8B93A1] focus:outline-none focus:border-[#7C5CFF]/50 w-36 sm:w-44"
            />
          </div>

          {/* Status Segmented Filter */}
          <div className="flex items-center gap-0.5 p-1 bg-[#0B0D10] rounded-lg border border-[#252B35]">
            {(['all', 'paid', 'pending', 'refunded'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilter(st)}
                className={`px-2.5 py-0.5 rounded text-[11px] font-medium capitalize transition-colors ${
                  filter === st
                    ? 'bg-[#151A22] text-white shadow-sm font-semibold'
                    : 'text-[#8B93A1] hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead>
            <tr className="border-b border-[#252B35] text-[11px] font-mono text-[#8B93A1] uppercase tracking-wider">
              <th className="pb-3 font-medium">Customer</th>
              <th className="pb-3 font-medium">Plan</th>
              <th 
                className="pb-3 font-medium cursor-pointer hover:text-white transition-colors"
                onClick={() => toggleSort('amount')}
              >
                <div className="flex items-center gap-1">
                  <span>Amount</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#252B35]/50">
            {filteredTransactions.map((tx) => (
              <tr
                key={tx.id}
                onClick={() => setSelectedTx(tx)}
                className="group hover:bg-[#151A22]/50 transition-colors cursor-pointer"
              >
                {/* Customer with Avatar */}
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#7C5CFF]/20 to-[#20D9A6]/20 border border-[#252B35] text-white flex items-center justify-center font-display font-semibold text-[11px]">
                      {tx.customerAvatar}
                    </div>
                    <div>
                      <div className="font-medium text-white group-hover:text-[#A78BFA] transition-colors">
                        {tx.customerName}
                      </div>
                      <div className="text-[11px] text-[#8B93A1] font-mono">
                        {tx.customerEmail}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Plan */}
                <td className="py-3">
                  <span className="font-mono text-white text-[11px] px-2 py-0.5 rounded bg-[#151A22] border border-[#252B35]">
                    {tx.plan}
                  </span>
                </td>

                {/* Amount */}
                <td className="py-3 font-mono font-semibold text-white tabular-nums">
                  ${tx.amount.toLocaleString()}
                </td>

                {/* Status */}
                <td className="py-3">
                  {getStatusBadge(tx.status)}
                </td>

                {/* Date */}
                <td className="py-3 text-[#8B93A1] font-mono text-[11px]">
                  {tx.date}
                </td>

                {/* Action button */}
                <td className="py-3 text-right">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTx(tx);
                    }}
                    className="p-1 rounded text-[#8B93A1] hover:text-white hover:bg-[#151A22] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer link: View all transactions */}
      <div className="pt-4 mt-3 border-t border-[#252B35] flex items-center justify-between text-xs text-[#8B93A1]">
        <span>Showing {filteredTransactions.length} of {RECENT_TRANSACTIONS.length} entries</span>
        <button
          onClick={onViewAll}
          className="text-white hover:text-[#7C5CFF] font-medium flex items-center gap-1 transition-colors"
        >
          <span>View all transactions</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Transaction Receipt Modal */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedTx(null)}
          />
          <div className="relative w-full max-w-md rounded-2xl bg-[#11151B] border border-[#252B35] p-6 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-[#252B35]">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-[#7C5CFF]" />
                <h4 className="font-display font-semibold text-white">Payment Receipt</h4>
              </div>
              <button
                onClick={() => setSelectedTx(null)}
                className="p-1 text-[#8B93A1] hover:text-white rounded-md hover:bg-[#151A22]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-5 space-y-4 text-xs font-mono">
              <div className="text-center py-2">
                <div className="text-3xl font-display font-bold text-white tabular-nums">
                  ${selectedTx.amount.toLocaleString()}.00
                </div>
                <div className="mt-2">{getStatusBadge(selectedTx.status)}</div>
              </div>

              <div className="rounded-xl bg-[#0B0D10] p-4 border border-[#252B35] space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-[#8B93A1]">Invoice ID</span>
                  <span className="text-white">{selectedTx.invoiceId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8B93A1]">Customer</span>
                  <span className="text-white font-sans">{selectedTx.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8B93A1]">Plan Tier</span>
                  <span className="text-white">{selectedTx.plan} Plan</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8B93A1]">Payment Method</span>
                  <span className="text-white">{selectedTx.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8B93A1]">Settlement Timestamp</span>
                  <span className="text-white">{selectedTx.date}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setSelectedTx(null)}
                className="flex-1 py-2 rounded-xl bg-[#151A22] border border-[#252B35] text-xs font-medium text-white hover:bg-[#1A212D] transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Downloading Invoice ${selectedTx.invoiceId} as PDF...`);
                  setSelectedTx(null);
                }}
                className="flex-1 py-2 rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#6035FF] text-xs font-medium text-white shadow hover:opacity-90 transition-opacity"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
