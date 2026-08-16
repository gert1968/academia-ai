import React, { useState } from 'react';
import { 
  BookmarkCheck, 
  Copy, 
  Check, 
  Download, 
  Plus, 
  FileCode2, 
  BookOpen, 
  Trash2, 
  Sparkles 
} from 'lucide-react';
import { ResearchProject, CitationStyle, LiteratureArticle } from '../types';

interface BibliographyViewProps {
  project: ResearchProject;
  onUpdateProject: (proj: ResearchProject) => void;
}

export const BibliographyView: React.FC<BibliographyViewProps> = ({ project, onUpdateProject }) => {
  const [style, setStyle] = useState<CitationStyle>(project.metadata.citationStyle || 'APA 7');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const formatCitation = (art: LiteratureArticle, currentStyle: CitationStyle): string => {
    const authorsFormatted = art.authors.join(', ');
    switch (currentStyle) {
      case 'APA 7':
        return `${authorsFormatted} (${art.year}). ${art.title}. ${art.journal}, https://doi.org/${art.doi}`;
      case 'IEEE':
        return `[1] ${authorsFormatted}, "${art.title}," ${art.journal}, vol. ${art.year}, doi: ${art.doi}.`;
      case 'Vancouver':
        return `${authorsFormatted}. ${art.title}. ${art.journal}. ${art.year}; DOI: ${art.doi}.`;
      case 'MLA':
        return `${authorsFormatted}. "${art.title}." ${art.journal}, ${art.year}, doi:${art.doi}.`;
      case 'Chicago':
        return `${authorsFormatted}. "${art.title}." ${art.journal} (${art.year}). https://doi.org/${art.doi}.`;
      case 'ICONTEC':
        return `${authorsFormatted.toUpperCase()}. ${art.title}. En: ${art.journal}. ${art.year}. DOI: ${art.doi}.`;
      default:
        return `${authorsFormatted} (${art.year}). ${art.title}. ${art.journal}.`;
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportBibTeX = () => {
    const bibtexStr = project.literature.map((art, idx) => `@article{art${idx + 1},
  author = {${art.authors.join(' and ')}},
  title = {${art.title}},
  journal = {${art.journal}},
  year = {${art.year}},
  doi = {${art.doi}}
}`).join('\n\n');

    const blob = new Blob([bibtexStr], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `referencias_${project.title.substring(0, 20)}.bib`;
    a.click();
  };

  const handleRemove = (id: string) => {
    const updated = project.literature.filter(l => l.id !== id);
    onUpdateProject({ ...project, literature: updated });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-slate-100 animate-in fade-in duration-200">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight flex items-center space-x-2 text-white">
            <BookmarkCheck className="w-5 h-5 text-cyan-400" />
            <span>Gestor Bibliográfico & Formateador Automático</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Genera automáticamente la lista final de referencias en APA 7, Vancouver, IEEE, ICONTEC, MLA o Chicago.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value as CitationStyle)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 font-semibold"
          >
            <option value="APA 7">APA 7ma Edición</option>
            <option value="Vancouver">Vancouver (Ciencias Médicas)</option>
            <option value="IEEE">IEEE (Ingeniería)</option>
            <option value="ICONTEC">ICONTEC</option>
            <option value="MLA">MLA</option>
            <option value="Chicago">Chicago</option>
          </select>

          <button
            onClick={handleExportBibTeX}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-xl font-semibold flex items-center space-x-1.5 transition-all"
          >
            <FileCode2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Exportar BibTeX / RIS</span>
          </button>
        </div>
      </div>

      {/* Literature Items */}
      <div className="space-y-4">
        {project.literature.map((art) => {
          const formatted = formatCitation(art, style);
          return (
            <div key={art.id} className="bg-[#101726] border border-slate-800 rounded-2xl p-5 space-y-3 shadow-lg">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-mono text-cyan-400 font-semibold">Formato {style}:</p>
                  <p className="text-sm font-medium text-slate-100 leading-relaxed font-serif">{formatted}</p>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => handleCopy(formatted, art.id)}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-medium text-slate-300 flex items-center space-x-1 transition-all"
                  >
                    {copiedId === art.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === art.id ? 'Copiado' : 'Copiar'}</span>
                  </button>
                  <button
                    onClick={() => handleRemove(art.id)}
                    className="p-1.5 rounded-xl hover:bg-rose-950 text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {art.notes && (
                <p className="text-xs text-slate-400 italic bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                  Nota del investigador: {art.notes}
                </p>
              )}
            </div>
          );
        })}

        {project.literature.length === 0 && (
          <div className="p-12 text-center bg-[#101726] border border-slate-800 rounded-2xl space-y-3">
            <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-xs text-slate-400">No hay referencias importadas aún. Utiliza el módulo 6 "Buscador de Literatura" para importar artículos.</p>
          </div>
        )}
      </div>
    </div>
  );
};
