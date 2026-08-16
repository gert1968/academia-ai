import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle2, AlertCircle, Plus, Flag } from 'lucide-react';
import { ResearchProject, ScheduleItem } from '../types';

interface ScheduleViewProps {
  project: ResearchProject;
  onUpdateProject: (proj: ResearchProject) => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({ project, onUpdateProject }) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const handleToggleComplete = (id: string) => {
    const updated = project.schedule.map(s => s.id === id ? { ...s, completed: !s.completed } : s);
    onUpdateProject({ ...project, schedule: updated });
  };

  return (
    <div className="p-3 sm:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6 text-slate-100 animate-in fade-in duration-200">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-extrabold tracking-tight flex items-center space-x-2 text-white">
            <CalendarIcon className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>Cronograma de Investigación (Gantt)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Garantiza entregas a tiempo para aprobación, trabajo de campo y sustentación.
          </p>
        </div>
      </div>

      {/* Gantt Timeline List */}
      <div className="bg-[#101726] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Hitos de la Investigación</h3>
          <span className="text-xs text-cyan-400 font-semibold">
            {project.schedule.filter(s => s.completed).length} de {project.schedule.length} completados
          </span>
        </div>

        <div className="space-y-3">
          {project.schedule.map((item) => (
            <div
              key={item.id}
              onClick={() => handleToggleComplete(item.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                item.completed
                  ? 'bg-slate-900/60 border-slate-800 opacity-70'
                  : 'bg-slate-900 border-slate-700/80 hover:border-cyan-500 shadow-md'
              }`}
            >
              <div className="flex items-start space-x-3">
                <button className="mt-0.5">
                  <CheckCircle2 className={`w-5 h-5 ${item.completed ? 'text-emerald-400' : 'text-slate-600'}`} />
                </button>
                <div className="space-y-1">
                  <p className={`text-xs font-bold ${item.completed ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                    {item.task}
                  </p>
                  <div className="flex items-center space-x-3 text-[11px] text-slate-400">
                    <span>Inicio: {item.startDate}</span>
                    <span>•</span>
                    <span>Entrega: <strong className="text-cyan-300">{item.endDate}</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                  item.phase === 'fase_1' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'bg-purple-950 text-purple-300 border border-purple-800'
                }`}>
                  {item.phase.replace('_', ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
