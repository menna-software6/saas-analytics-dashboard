import React, { useState } from 'react';
import { X, Check, Plus, Sparkles, Activity, Globe, Shield, Cpu, Zap, CreditCard } from 'lucide-react';

interface AddWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (widgetTitle: string) => void;
}

export const AddWidgetModal: React.FC<AddWidgetModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [selectedWidgets, setSelectedWidgets] = useState<string[]>(['Revenue Overview', 'Customer Growth', 'Traffic Sources']);

  if (!isOpen) return null;

  const availableWidgets = [
    {
      id: 'churn_radar',
      title: 'Customer Churn Radar',
      description: 'Predictive machine learning risk score for subscribers at risk of cancellation.',
      icon: <Activity className="w-4 h-4 text-amber-400" />,
      category: 'Intelligence',
    },
    {
      id: 'geo_breakdown',
      title: 'Global Geo & Edge Latency',
      description: 'Traffic distribution across North America, EMEA, and APAC cloud regions.',
      icon: <Globe className="w-4 h-4 text-[#38BDF8]" />,
      category: 'Infrastructure',
    },
    {
      id: 'ltv_simulator',
      title: 'Cohort LTV Forecaster',
      description: 'Dynamic lifetime value projection based on 90-day retention curves.',
      icon: <Sparkles className="w-4 h-4 text-[#7C5CFF]" />,
      category: 'Analytics',
    },
    {
      id: 'billing_health',
      title: 'Dunning & Failed Charges',
      description: 'Smart recovery pipeline for automated credit card dispute resolution.',
      icon: <CreditCard className="w-4 h-4 text-[#20D9A6]" />,
      category: 'Billing',
    },
    {
      id: 'api_throughput',
      title: 'API Rate Limit & Webhooks',
      description: 'Live payload traffic meter for developer integrations and webhook retries.',
      icon: <Cpu className="w-4 h-4 text-[#A78BFA]" />,
      category: 'Developer',
    },
  ];

  const handleToggle = (title: string) => {
    if (selectedWidgets.includes(title)) {
      setSelectedWidgets(selectedWidgets.filter(w => w !== title));
    } else {
      setSelectedWidgets([...selectedWidgets, title]);
    }
  };

  const handleSave = () => {
    onAdd('Customized Widgets');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg rounded-2xl bg-[#11151B] border border-[#252B35] p-6 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-4 border-b border-[#252B35]">
          <div>
            <h3 className="font-display font-semibold text-lg text-white">
              Add Analytics Widget
            </h3>
            <p className="text-xs text-[#8B93A1] mt-0.5">
              Customize your overview layout with tailored intelligence modules
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#8B93A1] hover:text-white rounded-lg hover:bg-[#151A22] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of available widgets */}
        <div className="py-4 space-y-2.5 max-h-[360px] overflow-y-auto">
          {availableWidgets.map((widget) => {
            const isSelected = selectedWidgets.includes(widget.title);
            return (
              <div
                key={widget.id}
                onClick={() => handleToggle(widget.title)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                  isSelected 
                    ? 'bg-[#151A22] border-[#7C5CFF]/50 shadow-sm' 
                    : 'bg-[#0B0D10] border-[#252B35] hover:border-[#323A48]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#11151B] border border-[#252B35] shrink-0 mt-0.5">
                    {widget.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white">
                        {widget.title}
                      </span>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#8B93A1] bg-[#11151B] px-1.5 py-0.5 rounded border border-[#252B35]">
                        {widget.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8B93A1] mt-1 leading-relaxed">
                      {widget.description}
                    </p>
                  </div>
                </div>

                <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-all ${
                  isSelected 
                    ? 'bg-[#7C5CFF] border-[#7C5CFF] text-white' 
                    : 'border-[#252B35] bg-[#11151B]'
                }`}>
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#252B35]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-[#8B93A1] hover:text-white hover:bg-[#151A22] rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-xs font-medium text-white bg-gradient-to-r from-[#7C5CFF] to-[#6035FF] hover:from-[#8C6DFF] hover:to-[#6E42FF] rounded-xl shadow-md shadow-[#7C5CFF]/20 transition-all"
          >
            Save Layout
          </button>
        </div>
      </div>
    </div>
  );
};
