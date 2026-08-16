import React, { useState } from 'react';
import { Quote, Copy, Check, Sparkles, BookOpen } from 'lucide-react';
import { ResearchProject } from '../types';

interface CitationGeneratorViewProps {
  project: ResearchProject;
}

export const CitationGeneratorView: React.FC<CitationGeneratorViewProps> = ({ project }) => {
  const [author, setAuthor] = useState('Mendoza');
  const [year, setYear] = useState('2024');
  const [page, setPage] = useState('45');
  const [quoteText, setQuoteText] = useState('La IA actúa como una zona de desarrollo próximo en entornos posgraduales.');
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const narrativeDirect = `${author} (${year}) afirma que "${quoteText}" (p. ${page}).`;
  const parentheticalDirect = `"${quoteText}" (${author}, ${year}, p. ${page}).`;
  const indirectParenthetical = `Diversos estudios enfatizan que la mediación algorítmica optimiza la zona de desarrollo próximo en estudiantes de posgrado (${author}, ${year}).`;
  const indirectNarrative = `Como sostiene ${author} (${year}), los entornos posgraduales se benefician de la mediación tecnológica.`;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="p-3 sm:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6 text-slate-100 animate-in fade-in duration-200">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-extrabold tracking-tight flex items-center space-x-2 text-white">
            <Quote className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>Generador de Citas In-Text</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Genera automáticamente la sintaxis de citas según la norma {project.metadata.citationStyle}.
          </p>
        </div>
      </div>

      <div className="bg-[#101726] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Datos de la Fuente</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Apellido del Autor</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-100"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Año de Publicación</label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-100"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Página (p. / pp.)</label>
            <input
              type="text"
              value={page}
              onChange={(e) => setPage(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-100"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">Texto de la Cita / Idea Principal</label>
          <input
            type="text"
            value={quoteText}
            onChange={(e) => setQuoteText(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-100"
          />
        </div>
      </div>

      {/* Citation Options List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#101726] border border-slate-800 rounded-2xl p-4 space-y-2 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-cyan-300 uppercase">Cita Citas Directa Narrativa</span>
            <button onClick={() => handleCopy(narrativeDirect, 'nd')} className="text-xs text-slate-400 hover:text-white flex items-center space-x-1">
              {copiedType === 'nd' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedType === 'nd' ? 'Copiado' : 'Copiar'}</span>
            </button>
          </div>
          <p className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs text-slate-200 font-serif">{narrativeDirect}</p>
        </div>

        <div className="bg-[#101726] border border-slate-800 rounded-2xl p-4 space-y-2 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-purple-300 uppercase">Cita Directa Parentética</span>
            <button onClick={() => handleCopy(parentheticalDirect, 'pd')} className="text-xs text-slate-400 hover:text-white flex items-center space-x-1">
              {copiedType === 'pd' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedType === 'pd' ? 'Copiado' : 'Copiar'}</span>
            </button>
          </div>
          <p className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs text-slate-200 font-serif">{parentheticalDirect}</p>
        </div>

        <div className="bg-[#101726] border border-slate-800 rounded-2xl p-4 space-y-2 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-emerald-300 uppercase">Cita Indirecta Parentética (Paráfrasis)</span>
            <button onClick={() => handleCopy(indirectParenthetical, 'ip')} className="text-xs text-slate-400 hover:text-white flex items-center space-x-1">
              {copiedType === 'ip' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedType === 'ip' ? 'Copiado' : 'Copiar'}</span>
            </button>
          </div>
          <p className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs text-slate-200 font-serif">{indirectParenthetical}</p>
        </div>

        <div className="bg-[#101726] border border-slate-800 rounded-2xl p-4 space-y-2 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-amber-300 uppercase">Cita Indirecta Narrativa</span>
            <button onClick={() => handleCopy(indirectNarrative, 'in')} className="text-xs text-slate-400 hover:text-white flex items-center space-x-1">
              {copiedType === 'in' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedType === 'in' ? 'Copiado' : 'Copiar'}</span>
            </button>
          </div>
          <p className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs text-slate-200 font-serif">{indirectNarrative}</p>
        </div>
      </div>
    </div>
  );
};
