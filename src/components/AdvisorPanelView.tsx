import React, { useState } from 'react';
import { UserCheck, MessageSquare, CheckCircle2, XCircle, Clock, ShieldCheck, Award } from 'lucide-react';
import { ResearchProject } from '../types';

interface AdvisorPanelViewProps {
  project: ResearchProject;
  onUpdateProject: (proj: ResearchProject) => void;
}

export const AdvisorPanelView: React.FC<AdvisorPanelViewProps> = ({ project, onUpdateProject }) => {
  const [rubricScore, setRubricScore] = useState<number>(94);
  const [comment, setComment] = useState('');
  const [chapterStatus, setChapterStatus] = useState<Record<string, 'approved' | 'review' | 'rejected'>>({
    'Capítulo I: Planteamiento del Problema': 'approved',
    'Capítulo II: Marco Teórico & Estado del Arte': 'review',
    'Capítulo III: Marco Metodológico': 'review'
  });

  const handleStatusChange = (chap: string, status: 'approved' | 'review' | 'rejected') => {
    setChapterStatus(prev => ({ ...prev, [chap]: status }));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-slate-100 animate-in fade-in duration-200">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight flex items-center space-x-2 text-white">
            <UserCheck className="w-5 h-5 text-cyan-400" />
            <span>Panel del Asesor & Evaluación Metodológica (B2B Institucional)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Revisión en tiempo real por parte del director o tutor de tesis con rúbrica cuali-cuantitativa y marcas marginales.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chapters Approval List */}
        <div className="lg:col-span-2 bg-[#101726] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 border-b border-slate-800 pb-2">
            Estado de Aprobación por Capítulos
          </h3>

          <div className="space-y-3">
            {Object.entries(chapterStatus).map(([chap, status]) => (
              <div key={chap} className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="font-bold text-xs text-slate-200">{chap}</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleStatusChange(chap, 'approved')}
                    className={`px-3 py-1 rounded-lg text-[11px] font-bold flex items-center space-x-1 ${
                      status === 'approved' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-950 text-slate-500'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Aprobado</span>
                  </button>

                  <button
                    onClick={() => handleStatusChange(chap, 'review')}
                    className={`px-3 py-1 rounded-lg text-[11px] font-bold flex items-center space-x-1 ${
                      status === 'review' ? 'bg-amber-950 text-amber-300 border border-amber-800' : 'bg-slate-950 text-slate-500'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>En Revisión</span>
                  </button>

                  <button
                    onClick={() => handleStatusChange(chap, 'rejected')}
                    className={`px-3 py-1 rounded-lg text-[11px] font-bold flex items-center space-x-1 ${
                      status === 'rejected' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-slate-950 text-slate-500'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Observado</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rubric Scorecard */}
        <div className="bg-[#101726] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
            <Award className="w-4 h-4" />
            <span>Rúbrica Institucional de Evaluación</span>
          </h3>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-center space-y-1">
            <p className="text-3xl font-black text-cyan-400">{rubricScore} / 100</p>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Calificación Rúbrica Scopus/WoS</p>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300">Añadir Comentario Marginal de Director:</label>
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Escribe observaciones para el tesista..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
            />
            <button className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs rounded-xl shadow-md">
              Emitir Dictamen de Revisión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
