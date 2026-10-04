import React, { useState } from 'react';
import { X, Download, FileText, Check, Loader2, Sparkles } from 'lucide-react';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  dateRange: string;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({
  isOpen,
  onClose,
  dateRange,
}) => {
  const [format, setFormat] = useState<'pdf' | 'csv' | 'json'>('pdf');
  const [includeTransactions, setIncludeTransactions] = useState(true);
  const [includeCohorts, setIncludeCohorts] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);

      // Trigger automatic simulated file download
      const element = document.createElement('a');
      const fileContent = format === 'json' 
        ? JSON.stringify({ app: 'NOVA Intelligence', exportedAt: new Date().toISOString(), range: dateRange, status: 'verified' }, null, 2)
        : `NOVA Analytics Export\nTimeframe: ${dateRange}\nFormat: ${format.toUpperCase()}\nStatus: Verified Complete\nGross MRR: $84,240\nActive Users: 24,892\nConversion Rate: 8.42%\nChurn Rate: 1.24%`;

      const file = new Blob([fileContent], { type: format === 'json' ? 'application/json' : 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `nova-analytics-${dateRange.toLowerCase().replace(/\s+/g, '-')}.${format === 'pdf' ? 'txt' : format}`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      setTimeout(() => {
        setExportComplete(false);
        onClose();
      }, 1400);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md rounded-2xl bg-[#11151B] border border-[#252B35] p-6 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-[#252B35]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#7C5CFF]/10 text-[#7C5CFF] border border-[#7C5CFF]/20">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-white">
                Export Executive Report
              </h3>
              <p className="text-xs text-[#8B93A1]">
                Selected window: <span className="text-white font-medium">{dateRange}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#8B93A1] hover:text-white rounded-lg hover:bg-[#151A22] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selector */}
        <div className="py-4 space-y-4 text-xs">
          <div>
            <label className="text-[11px] font-mono text-[#8B93A1] uppercase tracking-wider block mb-2">
              File Format
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['pdf', 'csv', 'json'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setFormat(fmt)}
                  className={`py-2.5 px-3 rounded-xl border text-center font-medium transition-all ${
                    format === fmt
                      ? 'bg-[#151A22] border-[#7C5CFF] text-white shadow-sm'
                      : 'bg-[#0B0D10] border-[#252B35] text-[#8B93A1] hover:text-white'
                  }`}
                >
                  <div className="font-mono uppercase font-bold text-xs">{fmt}</div>
                  <div className="text-[10px] text-[#8B93A1] mt-0.5">
                    {fmt === 'pdf' ? 'Executive Deck' : fmt === 'csv' ? 'Raw Spreadsheet' : 'REST Data'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Included Data toggles */}
          <div className="space-y-2 pt-2 border-t border-[#252B35]/60">
            <label className="text-[11px] font-mono text-[#8B93A1] uppercase tracking-wider block mb-1">
              Included Modules
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-lg bg-[#0B0D10] border border-[#252B35] cursor-pointer">
              <span className="text-white font-medium">Recent Ledger Transactions</span>
              <input
                type="checkbox"
                checked={includeTransactions}
                onChange={(e) => setIncludeTransactions(e.target.checked)}
                className="rounded accent-[#7C5CFF] w-4 h-4 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-lg bg-[#0B0D10] border border-[#252B35] cursor-pointer">
              <span className="text-white font-medium">Customer Retention & Cohort Matrix</span>
              <input
                type="checkbox"
                checked={includeCohorts}
                onChange={(e) => setIncludeCohorts(e.target.checked)}
                className="rounded accent-[#7C5CFF] w-4 h-4 cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#252B35]">
          <button
            onClick={onClose}
            disabled={isExporting}
            className="px-4 py-2 text-xs font-medium text-[#8B93A1] hover:text-white hover:bg-[#151A22] rounded-xl transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleExport}
            disabled={isExporting || exportComplete}
            className="flex items-center gap-2 px-5 py-2 text-xs font-medium text-white bg-gradient-to-r from-[#7C5CFF] to-[#6035FF] hover:from-[#8C6DFF] hover:to-[#6E42FF] rounded-xl shadow-md shadow-[#7C5CFF]/20 transition-all disabled:opacity-60"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Compiling {format.toUpperCase()}...</span>
              </>
            ) : exportComplete ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#20D9A6]" />
                <span>Downloaded!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Export {format.toUpperCase()}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
