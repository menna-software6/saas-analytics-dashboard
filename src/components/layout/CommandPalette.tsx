import React, { useState, useEffect } from 'react';
import { 
  Search, 
  LayoutDashboard, 
  BarChart3, 
  DollarSign, 
  Users, 
  Package, 
  FileText, 
  Settings, 
  Download, 
  Plus, 
  Sparkles,
  ArrowRight,
  X
} from 'lucide-react';
import { NavPage } from '../../types';
import { ALL_CUSTOMERS } from '../../data/mockData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPage: (page: NavPage) => void;
  onOpenExportModal: () => void;
  onOpenAddWidgetModal: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectPage,
  onOpenExportModal,
  onOpenAddWidgetModal,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent, or toggle
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const pages: { id: NavPage; label: string; icon: React.ReactNode; group: string }[] = [
    { id: 'overview', label: 'Overview Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, group: 'Navigation' },
    { id: 'analytics', label: 'Advanced Analytics', icon: <BarChart3 className="w-4 h-4" />, group: 'Navigation' },
    { id: 'revenue', label: 'Revenue Intelligence', icon: <DollarSign className="w-4 h-4" />, group: 'Navigation' },
    { id: 'customers', label: 'Customer Directory', icon: <Users className="w-4 h-4" />, group: 'Navigation' },
    { id: 'products', label: 'Products & Plans', icon: <Package className="w-4 h-4" />, group: 'Navigation' },
    { id: 'reports', label: 'Executive Reports', icon: <FileText className="w-4 h-4" />, group: 'Navigation' },
    { id: 'settings', label: 'Settings & Security', icon: <Settings className="w-4 h-4" />, group: 'Navigation' },
    { id: 'landing', label: 'Marketing Landing Page', icon: <Sparkles className="w-4 h-4" />, group: 'Showcase' },
  ];

  const filteredPages = pages.filter(p => 
    p.label.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCustomers = ALL_CUSTOMERS.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase()) || 
    c.company.toLowerCase().includes(query.toLowerCase()) ||
    c.email.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const actions = [
    { 
      label: 'Export Dashboard Data (PDF/CSV)', 
      icon: <Download className="w-4 h-4 text-[#7C5CFF]" />, 
      run: () => { onClose(); onOpenExportModal(); } 
    },
    { 
      label: 'Customize Dashboard Widgets', 
      icon: <Plus className="w-4 h-4 text-[#20D9A6]" />, 
      run: () => { onClose(); onOpenAddWidgetModal(); } 
    },
  ].filter(a => a.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-xl rounded-2xl bg-[#11151B] border border-[#252B35] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#252B35] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#8B93A1]" />
          <input
            type="text"
            placeholder="Type a command, customer name, or page..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-sm text-white placeholder-[#8B93A1] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-[#8B93A1] hover:text-white hover:bg-[#151A22] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-4">
          {/* Actions */}
          {actions.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-mono text-[#8B93A1]/70 uppercase tracking-wider">
                Quick Actions
              </div>
              <div className="mt-1 space-y-1">
                {actions.map((act, i) => (
                  <button
                    key={i}
                    onClick={act.run}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-[#F5F5F7] hover:bg-[#151A22] hover:text-white transition-colors group text-left"
                  >
                    <div className="flex items-center gap-3">
                      {act.icon}
                      <span>{act.label}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#8B93A1] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Pages */}
          {filteredPages.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-mono text-[#8B93A1]/70 uppercase tracking-wider">
                Views & Navigation
              </div>
              <div className="mt-1 space-y-1">
                {filteredPages.map((page) => (
                  <button
                    key={page.id}
                    onClick={() => {
                      onSelectPage(page.id);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-[#F5F5F7] hover:bg-[#151A22] hover:text-white transition-colors group text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[#8B93A1] group-hover:text-[#7C5CFF] transition-colors">
                        {page.icon}
                      </span>
                      <span>{page.label}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#8B93A1]">{page.group}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Customers (if querying) */}
          {query.trim().length > 0 && filteredCustomers.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-mono text-[#8B93A1]/70 uppercase tracking-wider">
                Customers
              </div>
              <div className="mt-1 space-y-1">
                {filteredCustomers.map((cust) => (
                  <button
                    key={cust.id}
                    onClick={() => {
                      onSelectPage('customers');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-[#F5F5F7] hover:bg-[#151A22] hover:text-white transition-colors group text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#1A212D] text-[#A78BFA] flex items-center justify-center text-[10px] font-bold">
                        {cust.avatar}
                      </div>
                      <div>
                        <div className="text-white">{cust.name}</div>
                        <div className="text-[10px] text-[#8B93A1]">{cust.company}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-[#20D9A6]">${cust.mrr}/mo</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredPages.length === 0 && actions.length === 0 && filteredCustomers.length === 0 && (
            <div className="py-8 text-center text-xs text-[#8B93A1]">
              No results found for &ldquo;{query}&rdquo;.
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 border-t border-[#252B35] bg-[#0E1116] flex items-center justify-between text-[11px] text-[#8B93A1]">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1 py-0.5 rounded bg-[#151A22] border border-[#252B35] text-[9px] font-mono">↵</kbd> Select</span>
            <span><kbd className="px-1 py-0.5 rounded bg-[#151A22] border border-[#252B35] text-[9px] font-mono">ESC</kbd> Close</span>
          </div>
          <span className="font-mono text-[10px] text-[#7C5CFF]">NOVA Command</span>
        </div>
      </div>
    </div>
  );
};
