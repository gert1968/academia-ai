import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  FileText, 
  Sparkles, 
  TrendingUp, 
  AlertCircle, 
  Calendar, 
  ArrowRight,
  BookOpen,
  Award,
  Layers,
  ChevronRight
} from 'lucide-react';
import { ResearchProject } from '../types';

interface DashboardViewProps {
  project: ResearchProject;
  onNavigateToModule: (moduleId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ project, onNavigateToModule }) => {
  const completedChapters = project.chapters.filter(c => c.isCompleted).length;
  const totalChapters = project.chapters.length || 5;
  const progressPercent = project.overallProgress;

  const totalWords = project.chapters.reduce(
    (acc, chap) => acc + chap.sections.reduce((sAcc, sec) => sAcc + sec.wordCount, 0),
    0
  );

  return (
    <div className="p-3 sm:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6 text-slate-100 animate-in fade-in duration-200">
      {/* Top Banner / Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 p-4 sm:p-6 shadow-2xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-indigo-500/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                {project.type.replace('_', ' ').toUpperCase()}
              </span>
              <span className="text-xs text-slate-400">Norma: <strong className="text-slate-200">{project.metadata.citationStyle}</strong></span>
            </div>
            <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight text-white leading-snug">
              {project.title}
            </h1>
            <p className="text-xs text-slate-400 line-clamp-2">
              {project.metadata.problemStatement}
            </p>
          </div>

          {/* Progress Circular Widget */}
          <div className="flex flex-row sm:flex-row items-center justify-between sm:justify-start space-x-4 sm:space-x-6 bg-slate-900/80 p-3.5 sm:p-4 rounded-xl border border-slate-800 shrink-0">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-cyan-400 tracking-tight">{progressPercent}%</div>
              <p className="text-[10px] sm:text-[11px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">Avance Global</p>
            </div>
            <div className="h-10 w-[1px] bg-slate-800" />
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs space-x-4">
                <span className="text-slate-400">Capítulos:</span>
                <span className="font-bold text-slate-200">{completedChapters} / {totalChapters}</span>
              </div>
              <div className="flex items-center justify-between text-xs space-x-4">
                <span className="text-slate-400">Palabras escritas:</span>
                <span className="font-bold text-cyan-300">{totalWords.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#101726] border border-slate-800/80 rounded-xl p-4 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Metas e Hitos</span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white">
            {project.schedule.filter(s => !s.completed).length} <span className="text-xs text-slate-400 font-normal">pendientes</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${(project.schedule.filter(s => s.completed).length / (project.schedule.length || 1)) * 100}%` }} />
          </div>
        </div>

        <div className="bg-[#101726] border border-slate-800/80 rounded-xl p-4 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Literatura Referenciada</span>
            <BookOpen className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">
            {project.literature.length} <span className="text-xs text-slate-400 font-normal">artículos en matriz</span>
          </div>
          <p className="text-[11px] text-emerald-400 font-medium">DOIs e Índices Scopus/SciELO validados</p>
        </div>

        <div className="bg-[#101726] border border-slate-800/80 rounded-xl p-4 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Observaciones Asesor</span>
            <AlertCircle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white">
            {project.advisorComments.filter(c => !c.resolved).length} <span className="text-xs text-slate-400 font-normal">por corregir</span>
          </div>
          <p className="text-[11px] text-amber-300 font-medium">{project.metadata.advisorName}</p>
        </div>

        <div className="bg-[#101726] border border-slate-800/80 rounded-xl p-4 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Consistencia Metodológica</span>
            <Award className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-purple-300">94 / 100</div>
          <p className="text-[11px] text-slate-400">Diagnóstico por Tutor IA</p>
        </div>
      </div>

      {/* Main Grid: Chapters Breakdown & Action Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans): Chapters Progress & Status */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Estructura de Capítulo & Avance</span>
            </h2>
            <button
              onClick={() => onNavigateToModule('thesis_builder')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center space-x-1"
            >
              <span>Generar con IA</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {project.chapters.map((chap) => (
              <div
                key={chap.id}
                className="bg-[#101726] border border-slate-800/80 rounded-xl p-4 hover:border-slate-700/80 transition-all shadow-md group"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className={`w-2 h-2 rounded-full ${chap.isCompleted ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                      <h3 className="font-bold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors">
                        {chap.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 pl-4">{chap.description}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                    chap.isCompleted 
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60'
                      : 'bg-amber-950 text-amber-300 border border-amber-800/60'
                  }`}>
                    {chap.isCompleted ? 'Aprobado' : 'En Redacción'}
                  </span>
                </div>

                {/* Subsections list preview */}
                <div className="mt-3 pt-3 border-t border-slate-800/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {chap.sections.map((sec) => (
                    <div key={sec.id} className="flex items-center justify-between bg-slate-900/60 px-2.5 py-1.5 rounded-lg text-slate-300">
                      <span className="font-mono text-cyan-400 text-[11px] mr-1.5">{sec.code}</span>
                      <span className="truncate flex-1">{sec.title}</span>
                      <span className="text-[10px] text-slate-500 ml-2">{sec.wordCount} w</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (1 span): Quick Tools Shortcuts & Calendar */}
        <div className="space-y-6">
          {/* Quick AI Workflow Launcher */}
          <div className="bg-gradient-to-br from-cyan-950/40 via-[#101726] to-indigo-950/40 border border-cyan-800/40 rounded-xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-sm text-white">Herramientas Clave de IA</h3>
            </div>
            
            <div className="space-y-2">
              <button
                onClick={() => onNavigateToModule('defense_simulator')}
                className="w-full text-left p-3 rounded-lg bg-slate-900/80 hover:bg-cyan-950/60 border border-slate-800 hover:border-cyan-700/50 transition-all flex items-center justify-between group"
              >
                <div>
                  <p className="font-semibold text-xs text-slate-200 group-hover:text-cyan-300">Simulador de Sustentación</p>
                  <p className="text-[10px] text-slate-400">Preguntas de jurado y rúbrica viva</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400" />
              </button>

              <button
                onClick={() => onNavigateToModule('ai_detector')}
                className="w-full text-left p-3 rounded-lg bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 transition-all flex items-center justify-between group"
              >
                <div>
                  <p className="font-semibold text-xs text-slate-200 group-hover:text-emerald-300">Detector de IA & Humano</p>
                  <p className="text-[10px] text-slate-400">Verificar probabilidad sintáctica</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
              </button>

              <button
                onClick={() => onNavigateToModule('matrices')}
                className="w-full text-left p-3 rounded-lg bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 transition-all flex items-center justify-between group"
              >
                <div>
                  <p className="font-semibold text-xs text-slate-200 group-hover:text-purple-300">Matriz de Operacionalización</p>
                  <p className="text-[10px] text-slate-400">Variables, dimensiones e indicadores</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
              </button>
            </div>
          </div>

          {/* Upcoming Schedule list */}
          <div className="bg-[#101726] border border-slate-800/80 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>Próximas Entregas</span>
              </h3>
              <button onClick={() => onNavigateToModule('schedule')} className="text-[11px] text-cyan-400 hover:underline">Ver Todo</button>
            </div>

            <div className="space-y-2">
              {project.schedule.map((ev) => (
                <div key={ev.id} className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/60 flex items-start space-x-3 text-xs">
                  <div className="p-1.5 bg-cyan-950 text-cyan-400 rounded shrink-0">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-200">{ev.title}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Fecha límite: <strong className="text-cyan-300">{ev.date}</strong></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
