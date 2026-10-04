import React, { useState } from 'react';
import { 
  User, 
  Building, 
  CreditCard, 
  Bell, 
  Shield, 
  Cpu, 
  Key, 
  Check, 
  Copy, 
  ExternalLink,
  Plus,
  Trash2,
  Lock,
  Sparkles
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'workspace' | 'billing' | 'notifications' | 'security' | 'integrations'>('profile');
  const [copiedKey, setCopiedKey] = useState(false);
  const [saveNotice, setSaveNotice] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('Alexandre Dev');
  const [email, setEmail] = useState('alexandre@nova-intel.com');
  const [companyName, setCompanyName] = useState('NOVA Global Intelligence Inc.');
  const [domain, setDomain] = useState('nova-intel.com');
  const [apiKey] = useState('nova_live_88f92a4b1090c8e76291a92e');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleSave = (section: string) => {
    setSaveNotice(`${section} settings updated successfully.`);
    setTimeout(() => setSaveNotice(null), 3000);
  };

  const tabs = [
    { id: 'profile', label: 'User Profile', icon: <User className="w-4 h-4" /> },
    { id: 'workspace', label: 'Workspace', icon: <Building className="w-4 h-4" /> },
    { id: 'billing', label: 'Billing & Plans', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'security', label: 'Security & 2FA', icon: <Shield className="w-4 h-4" /> },
    { id: 'integrations', label: 'Integrations & API', icon: <Cpu className="w-4 h-4" /> },
  ] as const;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="pb-2 border-b border-[#252B35]/40">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-mono tracking-widest text-[#7C5CFF] font-semibold uppercase">
            PREFERENCES
          </span>
        </div>
        <h1 className="font-display text-3xl font-bold text-white tracking-tight">
          System & Workspace Settings
        </h1>
        <p className="text-xs text-[#8B93A1] mt-1">
          Manage your identity credentials, billing payment methods, API tokens, and webhook routing.
        </p>
      </div>

      {saveNotice && (
        <div className="p-3 rounded-xl bg-[#20D9A6]/10 border border-[#20D9A6]/30 text-xs text-[#20D9A6] flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4" />
          <span>{saveNotice}</span>
        </div>
      )}

      {/* Settings Layout: Left Tab list + Right Tab Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Navigation list */}
        <div className="space-y-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-left transition-all ${
                  isActive
                    ? 'bg-[#151A22] text-white shadow-sm border border-[#252B35]'
                    : 'text-[#8B93A1] hover:text-white hover:bg-[#11151B]'
                }`}
              >
                <span className={isActive ? 'text-[#7C5CFF]' : 'text-[#8B93A1]'}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panel */}
        <div className="md:col-span-3 p-6 sm:p-8 rounded-2xl bg-[#11151B] border border-[#252B35]">
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-semibold text-lg text-white">Public Profile</h3>
                <p className="text-xs text-[#8B93A1]">Your personal identity across workspaces</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7C5CFF] to-[#A78BFA] text-white flex items-center justify-center font-display font-bold text-xl">
                  AD
                </div>
                <div>
                  <button className="px-3 py-1.5 rounded-lg bg-[#151A22] border border-[#252B35] text-xs font-medium text-white hover:bg-[#1A212D]">
                    Change Avatar
                  </button>
                  <p className="text-[10px] text-[#8B93A1] mt-1">Recommended 256x256 PNG or SVG</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-[11px] font-mono text-[#8B93A1] block mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0B0D10] border border-[#252B35] rounded-xl text-white focus:outline-none focus:border-[#7C5CFF]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-[#8B93A1] block mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0B0D10] border border-[#252B35] rounded-xl text-white focus:outline-none focus:border-[#7C5CFF]"
                  />
                </div>
              </div>

              <button
                onClick={() => handleSave('Profile')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#6035FF] text-xs font-medium text-white shadow"
              >
                Save Profile
              </button>
            </div>
          )}

          {/* WORKSPACE TAB */}
          {activeTab === 'workspace' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-semibold text-lg text-white">Workspace Configuration</h3>
                <p className="text-xs text-[#8B93A1]">Organization branding and custom subdomains</p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-[11px] font-mono text-[#8B93A1] block mb-1.5">Organization Legal Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0B0D10] border border-[#252B35] rounded-xl text-white focus:outline-none focus:border-[#7C5CFF]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#8B93A1] block mb-1.5">Custom Root Domain</label>
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0B0D10] border border-[#252B35] rounded-xl text-white focus:outline-none focus:border-[#7C5CFF]"
                  />
                </div>

                <div className="p-4 rounded-xl bg-[#0B0D10] border border-[#252B35]">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">Data Residency Region</div>
                      <div className="text-[11px] text-[#8B93A1]">AWS us-east-1 (N. Virginia, encrypted at rest)</div>
                    </div>
                    <span className="text-[10px] font-mono text-[#20D9A6] bg-[#20D9A6]/10 px-2 py-0.5 rounded border border-[#20D9A6]/20">
                      Active
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleSave('Workspace')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#6035FF] text-xs font-medium text-white shadow"
              >
                Save Workspace
              </button>
            </div>
          )}

          {/* BILLING TAB */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-semibold text-lg text-white">Billing & Active Plan</h3>
                <p className="text-xs text-[#8B93A1]">Manage payments, invoicing contacts, and tax IDs</p>
              </div>

              <div className="p-4 rounded-xl bg-[#0B0D10] border border-[#252B35] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-white text-base">Enterprise Cloud Plan</span>
                    <span className="text-[10px] font-mono text-[#20D9A6] bg-[#20D9A6]/10 px-2 py-0.5 rounded border border-[#20D9A6]/20">
                      Annual Contract
                    </span>
                  </div>
                  <p className="text-xs text-[#8B93A1] mt-1">$2,400/month · Renews on November 01, 2026</p>
                </div>
                <button 
                  onClick={() => alert('Plan upgrade dialog opened')}
                  className="px-3.5 py-1.5 rounded-lg bg-[#151A22] border border-[#252B35] text-xs font-medium text-white hover:bg-[#1A212D]"
                >
                  Manage Contract
                </button>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-mono text-[#8B93A1] uppercase tracking-wider">Payment Method</span>
                <div className="p-4 rounded-xl bg-[#0B0D10] border border-[#252B35] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-[#20D9A6]" />
                    <div>
                      <div className="text-white font-medium">Mastercard ending in 4242</div>
                      <div className="text-[10px] text-[#8B93A1]">Expires 12/2028 · Default method</div>
                    </div>
                  </div>
                  <button className="text-[#8B93A1] hover:text-white transition-colors">Edit</button>
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-semibold text-lg text-white">Notification Preferences</h3>
                <p className="text-xs text-[#8B93A1]">Configure automated alerts and Slack webhooks</p>
              </div>

              <div className="space-y-3 text-xs">
                {[
                  { title: 'Weekly Revenue Digest', desc: 'Summary of MRR, net inflow, and ARR milestones every Monday.' },
                  { title: 'Customer Churn Warning', desc: 'Immediate notification when high-value accounts show dormancy.' },
                  { title: 'Failed Charge Dispatches', desc: 'Alert when customer credit card charges bounce or require 3DS.' },
                  { title: 'New Customer Signups', desc: 'Real-time alert when an enterprise or business tier account activates.' }
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#0B0D10] border border-[#252B35] flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">{item.title}</div>
                      <div className="text-[11px] text-[#8B93A1] mt-0.5">{item.desc}</div>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#7C5CFF] cursor-pointer" />
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleSave('Notification')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#6035FF] text-xs font-medium text-white shadow"
              >
                Save Notifications
              </button>
            </div>
          )}

          {/* SECURITY TAB */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-semibold text-lg text-white">Security & Access Control</h3>
                <p className="text-xs text-[#8B93A1]">Enforce two-factor authentication and token invalidation</p>
              </div>

              <div className="p-4 rounded-xl bg-[#0B0D10] border border-[#252B35] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#20D9A6]" />
                    <span className="text-white font-medium text-xs">Two-Factor Authentication (2FA)</span>
                  </div>
                  <p className="text-[11px] text-[#8B93A1] mt-1">Requires TOTP authenticator app verification on sign-in.</p>
                </div>
                <button
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    twoFactorEnabled ? 'bg-[#20D9A6]/20 text-[#20D9A6] border border-[#20D9A6]/30' : 'bg-[#151A22] text-[#8B93A1]'
                  }`}
                >
                  {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#0B0D10] border border-[#252B35] space-y-2">
                <span className="text-xs font-medium text-white block">Active Browser Sessions</span>
                <div className="text-xs text-[#8B93A1] flex justify-between items-center pt-1">
                  <span>Chrome 128 on macOS (San Francisco, Current Session)</span>
                  <span className="text-[#20D9A6] font-mono text-[10px]">Active Now</span>
                </div>
              </div>
            </div>
          )}

          {/* INTEGRATIONS TAB */}
          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-semibold text-lg text-white">API Keys & External Integrations</h3>
                <p className="text-xs text-[#8B93A1]">Connect Stripe, Segment, GitHub, and custom webhooks</p>
              </div>

              {/* API Key Box */}
              <div className="p-4 rounded-xl bg-[#0B0D10] border border-[#252B35] space-y-2">
                <label className="text-xs font-medium text-white flex items-center gap-2">
                  <Key className="w-3.5 h-3.5 text-[#7C5CFF]" />
                  <span>Production API Secret Key</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="password"
                    readOnly
                    value={apiKey}
                    className="flex-1 px-3 py-2 bg-[#11151B] border border-[#252B35] rounded-xl text-xs font-mono text-white select-all"
                  />
                  <button
                    onClick={handleCopyKey}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#151A22] border border-[#252B35] text-xs font-medium text-white hover:bg-[#1A212D]"
                  >
                    {copiedKey ? <Check className="w-3.5 h-3.5 text-[#20D9A6]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Integrations Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  { name: 'Stripe Payments', status: 'Connected', desc: 'Sync customer subscriptions and webhook charges.' },
                  { name: 'Slack Alerts', status: 'Connected', desc: 'Broadcast churn warnings and ARR milestones to #nova-live.' },
                  { name: 'Segment CDP', status: 'Connected', desc: 'Stream telemetry events to data warehouse.' },
                  { name: 'GitHub Sync', status: 'Available', desc: 'Deploy release tags and track commit impact on conversion.' },
                ].map((integ) => (
                  <div key={integ.name} className="p-3.5 rounded-xl bg-[#0B0D10] border border-[#252B35] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-white">{integ.name}</span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                          integ.status === 'Connected' ? 'bg-[#20D9A6]/10 text-[#20D9A6] border-[#20D9A6]/20' : 'bg-[#151A22] text-[#8B93A1] border-[#252B35]'
                        }`}>
                          {integ.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#8B93A1]">{integ.desc}</p>
                    </div>
                    <button 
                      onClick={() => alert(`Configuring ${integ.name}...`)}
                      className="mt-3 text-[11px] text-[#7C5CFF] hover:underline text-left"
                    >
                      Configure settings →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
