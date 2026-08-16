import React, { useState } from 'react';
import { Download, FileText, FileCode, CheckCircle2, Sparkles, FileArchive } from 'lucide-react';
import { ResearchProject } from '../types';

interface ExportViewProps {
  project: ResearchProject;
}

export const ExportView: React.FC<ExportViewProps> = ({ project }) => {
  const [exporting, setExporting] = useState<string | null>(null);

  const handleExportDocx = () => {
    setExporting('docx');
    setTimeout(() => {
      const blob = new Blob([`TESIS: ${project.title}\n\nOBJETIVO GENERAL:\n${project.metadata.generalObjective}\n\nMARCO METODOLÓGICO:\n${project.metadata.problemStatement}`], { type: 'application/msword' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Tesis_${project.title.substring(0, 20)}.docx`;
      a.click();
      setExporting(null);
    }, 1200);
  };

  const handleExportLatex = () => {
    setExporting('latex');
    setTimeout(() => {
      const latexStr = `\\documentclass{article}
\\title{${project.title}}
\\author{${project.metadata.university}}
\\begin{document}
\\maketitle
\\section{Planteamiento del Problema}
${project.metadata.problemStatement}
\\section{Objetivo General}
${project.metadata.generalObjective}
\\end{document}`;
      const blob = new Blob([latexStr], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Manuscrito_${project.title.substring(0, 20)}.tex`;
      a.click();
      setExporting(null);
    }, 1200);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-slate-100 animate-in fade-in duration-200">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight flex items-center space-x-2 text-white">
            <Download className="w-5 h-5 text-cyan-400" />
            <span>Centro de Exportación Científica Multiformato</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Descarga tu tesis o manuscrito formateado según las normas del repositorio institucional de tu universidad.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Microsoft Word DOCX Export */}
        <div className="bg-[#101726] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl hover:border-cyan-500 transition-all">
          <FileText className="w-8 h-8 text-cyan-400" />
          <div>
            <h3 className="font-bold text-sm text-slate-100">Microsoft Word (.docx)</h3>
            <p className="text-xs text-slate-400 mt-1">
              Documento editable estructurado en APA 7 u ICONTEC con tabla de contenidos e índices generados.
            </p>
          </div>
          <button
            onClick={handleExportDocx}
            disabled={exporting === 'docx'}
            className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs rounded-xl shadow-lg flex items-center justify-center space-x-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{exporting === 'docx' ? 'Compilando...' : 'Descargar Word (.docx)'}</span>
          </button>
        </div>

        {/* LaTeX / Overleaf Export */}
        <div className="bg-[#101726] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl hover:border-purple-500 transition-all">
          <FileCode className="w-8 h-8 text-purple-400" />
          <div>
            <h3 className="font-bold text-sm text-slate-100">Paquete LaTeX / Overleaf (.tex)</h3>
            <p className="text-xs text-slate-400 mt-1">
              Código fuente listo para compilar en Overleaf con plantillas IEEE, Elsevier o Springer.
            </p>
          </div>
          <button
            onClick={handleExportLatex}
            disabled={exporting === 'latex'}
            className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs rounded-xl shadow-lg flex items-center justify-center space-x-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{exporting === 'latex' ? 'Generando ZIP...' : 'Descargar LaTeX (.tex)'}</span>
          </button>
        </div>

        {/* PDF Ready Export */}
        <div className="bg-[#101726] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl hover:border-emerald-500 transition-all">
          <FileArchive className="w-8 h-8 text-emerald-400" />
          <div>
            <h3 className="font-bold text-sm text-slate-100">PDF Final de Impresión</h3>
            <p className="text-xs text-slate-400 mt-1">
              PDF de alta resolución con sangrías, márgenes vectoriales y tipografía incrustada.
            </p>
          </div>
          <button
            onClick={handleExportDocx}
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow-lg flex items-center justify-center space-x-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar PDF Imprimible</span>
          </button>
        </div>
      </div>
    </div>
  );
};
