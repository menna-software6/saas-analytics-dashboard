import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  Calendar, 
  Download, 
  Plus, 
  Check, 
  ChevronDown,
  Sparkles,
  ArrowUpRight,
  SlidersHorizontal,
  Circle
} from 'lucide-react';
import { NavPage, NotificationItem } from '../../types';
import { NOTIFICATIONS_DATA } from '../../data/mockData';

interface NavbarProps {
  currentPage: NavPage;
  onOpenMobileMenu: () => void;
  onOpenCommandPalette: () => void;
  onOpenExportModal: () => void;
  onOpenAddWidgetModal: () => void;
  dateRange: string;
  onChangeDateRange: (range: string) => void;
  onSelectPage: (page: NavPage) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onOpenMobileMenu,
  onOpenCommandPalette,
  onOpenExportModal,
  onOpenAddWidgetModal,
  dateRange,
  onChangeDateRange,
  onSelectPage,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS_DATA);
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setShowDateDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getPageTitle = (page: NavPage) => {
    switch (page) {
      case 'overview': return 'Overview';
      case 'analytics': return 'Advanced Analytics';
      case 'revenue': return 'Revenue Intelligence';
      case 'customers': return 'Customer Directory';
      case 'products': return 'Products & Plans';
      case 'reports': return 'Executive Reports';
      case 'workspace': return 'Workspace Config';
      case 'team': return 'Team Members';
      case 'integrations': return 'Integrations & Webhooks';
      case 'settings': return 'System Settings';
      case 'landing': return 'Public Showcase';
      default: return 'Dashboard';
    }
  };

  const dateOptions = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'Last 12 months'];

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#0B0D10]/85 backdrop-blur-xl border-b border-[#252B35] px-4 lg:px-8 flex items-center justify-between transition-colors">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3 lg:gap-4">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 text-[#8B93A1] hover:text-white rounded-lg hover:bg-[#151A22] transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#8B93A1] font-mono uppercase tracking-wider hidden sm:inline">NOVA</span>
          <span className="text-[#252B35] hidden sm:inline">/</span>
          <span className="text-white font-medium capitalize flex items-center gap-1.5">
            {getPageTitle(currentPage)}
            {currentPage === 'overview' && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#20D9A6]" />
            )}
          </span>
        </div>
      </div>

      {/* Center: Command Palette Search Bar Trigger */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-lg bg-[#11151B] border border-[#252B35] hover:border-[#7C5CFF]/40 text-xs text-[#8B93A1] transition-all group"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-3.5 h-3.5 text-[#8B93A1] group-hover:text-[#7C5CFF] transition-colors" />
            <span className="text-stone-400 group-hover:text-stone-200">Search metrics, customers, reports...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 font-mono text-[10px] bg-[#151A22] text-[#8B93A1] px-1.5 py-0.5 rounded border border-[#252B35]">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 lg:gap-3">
        {/* Mobile search trigger */}
        <button
          onClick={onOpenCommandPalette}
          className="md:hidden p-2 text-[#8B93A1] hover:text-white rounded-lg hover:bg-[#151A22] transition-colors"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Date Selector Dropdown */}
        <div className="relative" ref={dateRef}>
          <button
            onClick={() => setShowDateDropdown(!showDateDropdown)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#11151B] border border-[#252B35] hover:border-[#7C5CFF]/30 text-xs font-medium text-[#F5F5F7] transition-all"
          >
            <Calendar className="w-3.5 h-3.5 text-[#7C5CFF]" />
            <span className="hidden sm:inline">{dateRange}</span>
            <ChevronDown className="w-3 h-3 text-[#8B93A1]" />
          </button>

          {showDateDropdown && (
            <div className="absolute right-0 mt-2 w-44 rounded-xl bg-[#11151B] border border-[#252B35] shadow-2xl py-1 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-1.5 text-[10px] font-mono text-[#8B93A1] uppercase tracking-wider border-b border-[#252B35]">
                Select Timeframe
              </div>
              {dateOptions.map(option => (
                <button
                  key={option}
                  onClick={() => {
                    onChangeDateRange(option);
                    setShowDateDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-[#151A22] transition-colors ${
                    dateRange === option ? 'text-[#20D9A6] font-semibold bg-[#151A22]/50' : 'text-[#8B93A1]'
                  }`}
                >
                  <span>{option}</span>
                  {dateRange === option && <Check className="w-3.5 h-3.5 text-[#20D9A6]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Export Report Button */}
        <button
          onClick={onOpenExportModal}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#11151B] border border-[#252B35] hover:border-[#7C5CFF]/40 text-xs font-medium text-[#F5F5F7] transition-all hover:bg-[#151A22]"
        >
          <Download className="w-3.5 h-3.5 text-[#8B93A1]" />
          <span>Export</span>
        </button>

        {/* Add Widget Button (if on overview) */}
        {currentPage === 'overview' && (
          <button
            onClick={onOpenAddWidgetModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#7C5CFF] to-[#6035FF] hover:from-[#8C6DFF] hover:to-[#6E42FF] text-white text-xs font-medium shadow-md shadow-[#7C5CFF]/20 hover:shadow-[#7C5CFF]/30 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add Widget</span>
          </button>
        )}

        {/* Notification Bell Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-[#8B93A1] hover:text-white hover:bg-[#151A22] border border-transparent hover:border-[#252B35] transition-all"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#7C5CFF] rounded-full ring-2 ring-[#0B0D10] animate-pulse" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#11151B] border border-[#252B35] shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-3 border-b border-[#252B35] flex items-center justify-between bg-[#151A22]/50">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-white">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-[#7C5CFF]/20 text-[#A78BFA] border border-[#7C5CFF]/30">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[11px] text-[#20D9A6] hover:underline transition-colors"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-[#252B35]/50">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => {
                      setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
                    }}
                    className={`p-3.5 hover:bg-[#151A22] transition-colors cursor-pointer flex gap-3 ${
                      !notif.read ? 'bg-[#151A22]/30' : ''
                    }`}
                  >
                    <div className="pt-0.5">
                      <div className={`w-2 h-2 rounded-full ${
                        notif.type === 'success' ? 'bg-[#20D9A6]' : notif.type === 'alert' ? 'bg-amber-400' : 'bg-[#7C5CFF]'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs font-medium text-white truncate">{notif.title}</span>
                        <span className="text-[10px] text-[#8B93A1] font-mono">{notif.time}</span>
                      </div>
                      <p className="text-[11px] text-[#8B93A1] leading-relaxed">{notif.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-2 border-t border-[#252B35] bg-[#0E1116] text-center">
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    onSelectPage('settings');
                  }}
                  className="text-[11px] text-[#8B93A1] hover:text-white transition-colors"
                >
                  Configure notification webhooks →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
