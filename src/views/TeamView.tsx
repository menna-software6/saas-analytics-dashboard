import React, { useState } from 'react';
import { UserCheck, UserPlus, Mail, Shield, MoreVertical, Check, Trash2 } from 'lucide-react';

export const TeamView: React.FC = () => {
  const [members, setMembers] = useState([
    { id: 1, name: 'Alexandre Dev', email: 'alexandre@nova-intel.com', role: 'Owner / Founder', status: 'Active', avatar: 'AD' },
    { id: 2, name: 'Sarah Chen', email: 'sarah.c@stripeflow.io', role: 'Lead Architect', status: 'Active', avatar: 'SC' },
    { id: 3, name: 'Michael Reed', email: 'm.reed@zenithscale.io', role: 'Staff Data Engineer', status: 'Active', avatar: 'MR' },
    { id: 4, name: 'Elena Rostova', email: 'elena@solardata.ai', role: 'Head of Growth', status: 'Active', avatar: 'ER' },
    { id: 5, name: 'David Kalu', email: 'david@vertexmesh.org', role: 'DevOps Lead', status: 'Invited', avatar: 'DK' },
  ]);

  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteNotice, setInviteNotice] = useState<string | null>(null);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    setMembers(prev => [
      ...prev,
      {
        id: Date.now(),
        name: inviteEmail.split('@')[0],
        email: inviteEmail,
        role: 'Analytics Member',
        status: 'Invited',
        avatar: inviteEmail.slice(0, 2).toUpperCase(),
      }
    ]);
    setInviteNotice(`Invitation sent to ${inviteEmail}`);
    setInviteEmail('');
    setTimeout(() => setInviteNotice(null), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#252B35]/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono tracking-widest text-[#20D9A6] font-semibold uppercase">
              ORGANIZATION
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold text-white tracking-tight">
            Team Members & Access Roles
          </h1>
          <p className="text-xs text-[#8B93A1] mt-1">
            Manage teammate privileges, SAML SSO assignments, and workspace seat allocations.
          </p>
        </div>

        <span className="text-xs font-mono text-[#8B93A1]">
          Seats used: <span className="text-white font-semibold">{members.length} of 25</span>
        </span>
      </div>

      {inviteNotice && (
        <div className="p-3 rounded-xl bg-[#20D9A6]/10 border border-[#20D9A6]/30 text-xs text-[#20D9A6] flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{inviteNotice}</span>
        </div>
      )}

      {/* Invite Form */}
      <form onSubmit={handleInvite} className="p-4 rounded-2xl bg-[#11151B] border border-[#252B35] flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Mail className="w-4 h-4 text-[#8B93A1] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="email"
            placeholder="colleague@company.com"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#0B0D10] border border-[#252B35] rounded-xl text-xs text-white placeholder-[#8B93A1] focus:outline-none focus:border-[#7C5CFF]"
          />
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#6035FF] text-xs font-semibold text-white shadow flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Send Invitation</span>
        </button>
      </form>

      {/* Team Table */}
      <div className="p-6 rounded-2xl bg-[#11151B] border border-[#252B35]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="border-b border-[#252B35] font-mono text-[11px] text-[#8B93A1] uppercase tracking-wider">
                <th className="pb-3 font-medium">Teammate</th>
                <th className="pb-3 font-medium">Permission Role</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#252B35]/50">
              {members.map((m) => (
                <tr key={m.id} className="hover:bg-[#151A22]/50 transition-colors">
                  <td className="py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C5CFF]/30 to-[#20D9A6]/30 border border-[#252B35] text-white flex items-center justify-center font-display font-semibold text-xs">
                        {m.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-white">{m.name}</div>
                        <div className="text-[11px] text-[#8B93A1] font-mono">{m.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 font-mono text-[#A78BFA]">{m.role}</td>
                  <td className="py-3.5">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                      m.status === 'Active' ? 'bg-[#20D9A6]/10 text-[#20D9A6] border-[#20D9A6]/20' : 'bg-amber-400/10 text-amber-300 border-amber-400/20'
                    }`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button 
                      onClick={() => setMembers(prev => prev.filter(x => x.id !== m.id))}
                      className="p-1.5 rounded text-[#8B93A1] hover:text-rose-400 hover:bg-[#151A22] transition-colors"
                      title="Remove Member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
