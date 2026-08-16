import React, { useState } from 'react';
import { 
  TableProperties, 
  Plus, 
  Sparkles, 
  FileSpreadsheet, 
  Layers, 
  CheckCircle2, 
  DollarSign, 
  Clock 
} from 'lucide-react';
import { ResearchProject, MatrixRow } from '../types';

interface MatricesViewProps {
  project: ResearchProject;
  onUpdateProject: (proj: ResearchProject) => void;
}

export const MatricesView: React.FC<MatricesViewProps> = ({ project, onUpdateProject }) => {
  const [activeTab, setActiveTab] = useState<'operacionalizacion' | 'consistencia' | 'dofa' | 'presupuesto'>('operacionalizacion');

  const handleAddRow = () => {
    const newRow: MatrixRow = {
      id: `mat-${Date.now()}`,
      variable: 'Nueva Variable',
      definition: 'Definición conceptual...',
      dimensions: 'Dimensión 1, Dimensión 2',
      indicators: 'Indicador A, Indicador B',
      instruments: 'Cuestionario Líkert 15 ítems',
      items: '1 - 15'
    };

    onUpdateProject({
      ...project,
      matrix: [...project.matrix, newRow]
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-slate-100 animate-in fade-in duration-200">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight flex items-center space-x-2 text-white">
            <TableProperties className="w-5 h-5 text-cyan-400" />
            <span>Constructor de Tablas, Matrices & Operacionalización</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Diseña la Matriz de Consistencia, Operacionalización de Variables, Marco Lógico, Presupuesto y DOFA.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl text-xs overflow-x-auto max-w-full custom-scrollbar">
          <button
            onClick={() => setActiveTab('operacionalizacion')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
              activeTab === 'operacionalizacion' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Operacionalización Variables
          </button>
          <button
            onClick={() => setActiveTab('consistencia')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
              activeTab === 'consistencia' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Matriz de Consistencia
          </button>
          <button
            onClick={() => setActiveTab('dofa')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
              activeTab === 'dofa' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Matriz DOFA / FODA
          </button>
        </div>
      </div>

      {activeTab === 'operacionalizacion' && (
        <div className="bg-[#101726] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl overflow-x-auto text-xs">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="font-bold text-slate-200 flex items-center space-x-2">
              <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
              <span>Matriz de Operacionalización de Variables</span>
            </h3>
            <button
              onClick={handleAddRow}
              className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs rounded-lg flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Añadir Variable</span>
            </button>
          </div>

          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-800 text-cyan-400 text-[11px] font-bold uppercase">
                <th className="p-2.5">Variable</th>
                <th className="p-2.5">Definición Operativa</th>
                <th className="p-2.5">Dimensiones</th>
                <th className="p-2.5">Indicadores</th>
                <th className="p-2.5">Instrumento</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {project.matrix.map((row) => (
                <tr key={row.id} className="hover:bg-slate-900/50">
                  <td className="p-2.5 font-bold text-slate-100">{row.variable}</td>
                  <td className="p-2.5 text-slate-300 max-w-xs">{row.definition}</td>
                  <td className="p-2.5 text-slate-300">{row.dimensions}</td>
                  <td className="p-2.5 text-slate-300">{row.indicators}</td>
                  <td className="p-2.5 text-cyan-300 font-medium">{row.instruments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'consistencia' && (
        <div className="bg-[#101726] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl overflow-x-auto text-xs">
          <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">
            Matriz de Consistencia Metodológica Completa
          </h3>
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-800 text-cyan-400 font-bold uppercase text-[11px]">
                <th className="p-3">Problema General</th>
                <th className="p-3">Objetivo General</th>
                <th className="p-3">Hipótesis General</th>
                <th className="p-3">Variables</th>
                <th className="p-3">Metodología</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr>
                <td className="p-3 text-slate-300">{project.metadata.problemStatement}</td>
                <td className="p-3 text-slate-300">{project.metadata.generalObjective}</td>
                <td className="p-3 text-slate-300">{project.metadata.hypotheses[0] || 'N/A'}</td>
                <td className="p-3 text-cyan-300">{project.metadata.variables.map(v => v.name).join(', ')}</td>
                <td className="p-3 text-slate-300">{project.metadata.approach.toUpperCase()} - {project.metadata.researchType}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'dofa' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-[#101726] border border-emerald-800/60 rounded-2xl p-5 space-y-2 shadow-lg">
            <h4 className="font-bold text-emerald-400 uppercase">Fortalezas (F)</h4>
            <p className="text-slate-300">• Acceso a repositorios Scopus y WoS indexados.</p>
            <p className="text-slate-300">• Muestra probabilística calculada con margen de error 5%.</p>
          </div>

          <div className="bg-[#101726] border border-cyan-800/60 rounded-2xl p-5 space-y-2 shadow-lg">
            <h4 className="font-bold text-cyan-400 uppercase">Oportunidades (O)</h4>
            <p className="text-slate-300">• Integración de andamiajes pedagógicos con IA en posgrados.</p>
            <p className="text-slate-300">• Financiamiento disponible en convocatorias B2B.</p>
          </div>

          <div className="bg-[#101726] border border-amber-800/60 rounded-2xl p-5 space-y-2 shadow-lg">
            <h4 className="font-bold text-amber-400 uppercase">Debilidades (D)</h4>
            <p className="text-slate-300">• Carga lectiva alta en maestrandos participantes.</p>
          </div>

          <div className="bg-[#101726] border border-rose-800/60 rounded-2xl p-5 space-y-2 shadow-lg">
            <h4 className="font-bold text-rose-400 uppercase">Amenazas (A)</h4>
            <p className="text-slate-300">• Cambios normativos en regulaciones éticas de IA universitaria.</p>
          </div>
        </div>
      )}
    </div>
  );
};
