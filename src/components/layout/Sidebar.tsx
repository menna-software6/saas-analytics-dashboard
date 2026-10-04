import React from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  DollarSign, 
  Users, 
  Package, 
  FileText, 
  Layers, 
  UserCheck, 
  Cpu, 
  Settings, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  X
} from 'lucide-react';
import { NavPage } from '../../types';

interface SidebarProps {
  currentPage: NavPage;
  onSelectPage: (page: NavPage) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onSelectPage,
  isOpenMobile,
  onCloseMobile,
}) => {
  const mainNavItems: { id: NavPage; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" />, badge: 'Live' },
    { id: 'revenue', label: 'Revenue', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'customers', label: 'Customers', icon: <Users className="w-4 h-4" /> },
    { id: 'products', label: 'Products', icon: <Package className="w-4 h-4" /> },
    { id: 'reports', label: 'Reports', icon: <FileText className="w-4 h-4" /> },
  ];

  const workspaceNavItems: { id: NavPage; label: string; icon: React.ReactNode }[] = [
    { id: 'workspace', label: 'Workspace', icon: <Layers className="w-4 h-4" /> },
    { id: 'team', label: 'Team', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'integrations', label: 'Integrations', icon: <Cpu className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const handleNavClick = (page: NavPage) => {
    onSelectPage(page);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0B0D10]/95 backdrop-blur-xl border-r border-[#252B35] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo & Workspace Brand */}
        <div className="h-16 px-5 border-b border-[#252B35] flex items-center justify-between">
          <button 
            onClick={() => handleNavClick('overview')}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            {/* Minimalist geometric icon */}
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C5CFF] to-[#20D9A6]/80 p-[1.5px] shadow-sm group-hover:glow-violet transition-all">
              <div className="w-full h-full bg-[#0B0D10] rounded-[6.5px] flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#7C5CFF]" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2L2 22h20L12 2z" strokeLinejoin="round" />
                  <circle cx="12" cy="15" r="2.5" fill="#20D9A6" stroke="none" />
                </svg>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-display font-bold text-lg tracking-wider text-white flex items-center gap-1.5">
                NOVA
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#20D9A6] animate-pulse" />
              </span>
              <span className="text-[10px] text-[#8B93A1] tracking-widest font-mono">INTELLIGENCE</span>
            </div>
          </button>

          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 text-[#8B93A1] hover:text-white rounded-md hover:bg-[#151A22] transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {/* Main Navigation Group */}
          <div>
            <div className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-[#8B93A1]/70 uppercase font-mono">
              Platform
            </div>
            <nav className="space-y-0.5">
              {mainNavItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all group relative ${
                      isActive
                        ? 'bg-[#151A22] text-white shadow-inner border border-[#252B35]'
                        : 'text-[#8B93A1] hover:text-[#F5F5F7] hover:bg-[#11151B]'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-gradient-to-b from-[#7C5CFF] to-[#20D9A6] rounded-r-full shadow-[0_0_8px_rgba(124,92,255,0.6)]" />
                    )}
                    <div className="flex items-center gap-3">
                      <span className={isActive ? 'text-[#7C5CFF]' : 'text-[#8B93A1] group-hover:text-white transition-colors'}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#20D9A6]/10 text-[#20D9A6] border border-[#20D9A6]/20">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Workspace Group */}
          <div>
            <div className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-[#8B93A1]/70 uppercase font-mono">
              Workspace
            </div>
            <nav className="space-y-0.5">
              {workspaceNavItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all group relative ${
                      isActive
                        ? 'bg-[#151A22] text-white shadow-inner border border-[#252B35]'
                        : 'text-[#8B93A1] hover:text-[#F5F5F7] hover:bg-[#11151B]'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-gradient-to-b from-[#7C5CFF] to-[#20D9A6] rounded-r-full shadow-[0_0_8px_rgba(124,92,255,0.6)]" />
                    )}
                    <div className="flex items-center gap-3">
                      <span className={isActive ? 'text-[#7C5CFF]' : 'text-[#8B93A1] group-hover:text-white transition-colors'}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Marketing Showcase Switcher */}
          <div className="pt-2">
            <button
              onClick={() => handleNavClick('landing')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium border transition-all ${
                currentPage === 'landing'
                  ? 'bg-gradient-to-r from-[#7C5CFF]/20 to-[#20D9A6]/20 border-[#7C5CFF]/40 text-white'
                  : 'bg-[#11151B] border-[#252B35] text-[#8B93A1] hover:text-white hover:border-[#7C5CFF]/30'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-3.5 h-3.5 text-[#20D9A6]" />
                <span>Marketing Landing Page</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </button>
          </div>
        </div>

        {/* User Profile & Subscription Tier */}
        <div className="p-3 border-t border-[#252B35] bg-[#0E1116]/80">
          <div className="p-2.5 rounded-xl bg-[#11151B] border border-[#252B35] flex items-center justify-between group hover:border-[#7C5CFF]/40 transition-colors">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-[#7C5CFF] to-[#A78BFA] text-white flex items-center justify-center font-display font-semibold text-xs shrink-0 shadow-sm">
                AD
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#20D9A6] border-2 border-[#11151B]" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-white truncate">Alexandre Dev</div>
                <div className="text-[10px] text-[#8B93A1] flex items-center gap-1">
                  <ShieldCheck className="w-2.5 h-2.5 text-[#20D9A6]" />
                  <span>Enterprise Plan</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => handleNavClick('settings')}
              className="text-[#8B93A1] hover:text-white p-1 rounded transition-colors"
              title="Settings"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
