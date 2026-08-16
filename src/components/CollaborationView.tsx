import React, { useState } from 'react';
import { Users, UserPlus, Shield, Activity, Lock, CheckCircle2 } from 'lucide-react';
import { ResearchProject } from '../types';

interface CollaborationViewProps {
  project: ResearchProject;
  onUpdateProject: (proj: ResearchProject) => void;
}

export const CollaborationView: React.FC<CollaborationViewProps> = ({ project, onUpdateProject }) => {
  const [inviteEmail, setInviteEmail] = useState('');
  const [role, setRole] = useState<'coauthor' | 'advisor' | 'peer_reviewer'>('coauthor');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    const newCollab = {
      id: `usr-${Date.now()}`,
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      activeStatus: 'invited' as const
    };

    onUpdateProject({
      ...project,
      collaborators: [...project.collaborators, newCollab]
    });
    setInviteEmail('');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-slate-100 animate-in fade-in duration-200">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight flex items-center space-x-2 text-white">
            <Users className="w-5 h-5 text-cyan-400" />
            <span>Co-autoría & Colaboración Multi-Investigador</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Gestiona permisos de co-autores, asesores y pares revisores externos con control de cambios tipo Git/Google Docs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Invite Form */}
        <form onSubmit={handleInvite} className="bg-[#101726] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
            <UserPlus className="w-4 h-4 text-cyan-400" />
            <span>Invitar Colaborador</span>
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Correo Institucional</label>
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="investigador@universidad.edu"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Rol y Permisos</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200"
              >
                <option value="coauthor">Co-Autor (Edición Completa)</option>
                <option value="advisor">Asesor / Director (Sugerencias y Aprobación)</option>
                <option value="peer_reviewer">Par Revisor (Solo Lectura y Comentarios)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs rounded-xl shadow-lg transition-all"
            >
              Enviar Invitación
            </button>
          </div>
        </form>

        {/* Collaborators Active List */}
        <div className="lg:col-span-2 bg-[#101726] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 border-b border-slate-800 pb-2">
            Investigadores en este Proyecto ({project.collaborators.length})
          </h3>

          <div className="space-y-3">
            {project.collaborators.map((collab) => (
              <div key={collab.id} className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={collab.avatar} alt={collab.name} className="w-8 h-8 rounded-full border border-cyan-500/50" />
                  <div>
                    <p className="font-bold text-xs text-slate-200">{collab.name}</p>
                    <p className="text-[10px] text-slate-400">{collab.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-cyan-300 border border-slate-700">
                    {collab.role}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${collab.activeStatus === 'online' ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
