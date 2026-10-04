/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavPage } from './types';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { CommandPalette } from './components/layout/CommandPalette';
import { ExportReportModal } from './components/modals/ExportReportModal';
import { AddWidgetModal } from './components/modals/AddWidgetModal';

// Views
import { OverviewView } from './views/OverviewView';
import { AnalyticsView } from './views/AnalyticsView';
import { RevenueView } from './views/RevenueView';
import { CustomersView } from './views/CustomersView';
import { ProductsView } from './views/ProductsView';
import { ReportsView } from './views/ReportsView';
import { SettingsView } from './views/SettingsView';
import { TeamView } from './views/TeamView';
import { IntegrationsView } from './views/IntegrationsView';
import { LandingPageView } from './views/LandingPageView';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavPage>('overview');
  const [dateRange, setDateRange] = useState<string>('Last 30 days');
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isAddWidgetModalOpen, setIsAddWidgetModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync with URL hash for bookmarking & direct navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as NavPage;
      const validPages: NavPage[] = [
        'overview', 'analytics', 'revenue', 'customers', 
        'products', 'reports', 'workspace', 'team', 
        'integrations', 'settings', 'landing'
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectPage = (page: NavPage) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // If user chooses to view Landing Page, render the marketing showcase
  if (currentPage === 'landing') {
    return (
      <LandingPageView 
        onGoToDashboard={() => handleSelectPage('overview')} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#F5F5F7] flex flex-col lg:flex-row relative">
      {/* Background Subtle Noise / Ambient Light */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-[#7C5CFF]/[0.04] blur-[120px] rounded-full" />
        <div className="absolute bottom-10 left-1/3 w-[500px] h-[400px] bg-[#20D9A6]/[0.03] blur-[140px] rounded-full" />
      </div>

      {/* Sidebar Navigation */}
      <Sidebar
        currentPage={currentPage}
        onSelectPage={handleSelectPage}
        isOpenMobile={isOpenMobile}
        onCloseMobile={() => setIsOpenMobile(false)}
      />

      {/* Main Content Viewport */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen relative z-10">
        {/* Top Navbar */}
        <Navbar
          currentPage={currentPage}
          onOpenMobileMenu={() => setIsOpenMobile(true)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenExportModal={() => setIsExportModalOpen(true)}
          onOpenAddWidgetModal={() => setIsAddWidgetModalOpen(true)}
          dateRange={dateRange}
          onChangeDateRange={(range) => {
            setDateRange(range);
            showToast(`Timeframe updated to ${range}`);
          }}
          onSelectPage={handleSelectPage}
        />

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentPage === 'overview' && (
            <OverviewView
              dateRange={dateRange}
              onOpenExportModal={() => setIsExportModalOpen(true)}
              onOpenAddWidgetModal={() => setIsAddWidgetModalOpen(true)}
              onViewAllTransactions={() => handleSelectPage('customers')}
            />
          )}

          {currentPage === 'analytics' && <AnalyticsView />}
          {currentPage === 'revenue' && <RevenueView />}
          {currentPage === 'customers' && <CustomersView />}
          {currentPage === 'products' && <ProductsView />}
          {currentPage === 'reports' && <ReportsView />}
          {currentPage === 'workspace' && <SettingsView />}
          {currentPage === 'team' && <TeamView />}
          {currentPage === 'integrations' && <IntegrationsView />}
          {currentPage === 'settings' && <SettingsView />}
        </main>

        {/* Global Footer in Dashboard */}
        <footer className="py-4 px-6 border-t border-[#252B35]/50 text-center text-xs text-[#8B93A1] flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl w-full mx-auto">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#20D9A6]" />
            <span className="font-mono text-[11px]">NOVA Engine v2.4 · All Systems Nominal</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <button 
              onClick={() => handleSelectPage('landing')} 
              className="hover:text-white transition-colors"
            >
              Public Showcase
            </button>
            <button 
              onClick={() => handleSelectPage('reports')} 
              className="hover:text-white transition-colors"
            >
              Investor Reports
            </button>
            <span className="font-mono text-[10px]">© 2026 NOVA</span>
          </div>
        </footer>
      </div>

      {/* Global Interactive Modals */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectPage={handleSelectPage}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onOpenAddWidgetModal={() => setIsAddWidgetModalOpen(true)}
      />

      <ExportReportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        dateRange={dateRange}
      />

      <AddWidgetModal
        isOpen={isAddWidgetModalOpen}
        onClose={() => setIsAddWidgetModalOpen(false)}
        onAdd={(widgetTitle) => {
          showToast(`Widget "${widgetTitle}" configured on your overview dashboard.`);
        }}
      />

      {/* Interactive Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-3.5 rounded-xl bg-[#11151B] border border-[#20D9A6]/40 text-xs text-white shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-bottom duration-200">
          <span className="w-2 h-2 rounded-full bg-[#20D9A6]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
