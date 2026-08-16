import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  ExternalLink, 
  Plus, 
  Check, 
  Filter, 
  Sparkles, 
  Globe2, 
  Quote, 
  Tag, 
  CheckCircle2 
} from 'lucide-react';
import { ResearchProject, LiteratureArticle } from '../types';

interface LiteratureSearchViewProps {
  project: ResearchProject;
  onUpdateProject: (updated: ResearchProject) => void;
}

export const LiteratureSearchView: React.FC<LiteratureSearchViewProps> = ({ project, onUpdateProject }) => {
  const [query, setQuery] = useState(project.metadata.topic || '');
  const [database, setDatabase] = useState('all');
  const [yearMin, setYearMin] = useState('2022');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<LiteratureArticle[]>([]);
  const [importedMap, setImportedMap] = useState<Record<string, boolean>>({});

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/literature/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, database, yearMin })
      });

      const data = await response.json();
      if (data.success && data.articles) {
        setResults(data.articles);
      }
    } catch (err) {
      console.error('Error searching literature:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleImportArticle = (art: LiteratureArticle) => {
    const exists = project.literature.some(l => l.doi === art.doi || l.title === art.title);
    if (exists) return;

    const updatedLiterature = [...project.literature, { ...art, importedToProject: true }];
    onUpdateProject({
      ...project,
      literature: updatedLiterature,
      updatedAt: new Date().toISOString().split('T')[0]
    });

    setImportedMap(prev => ({ ...prev, [art.id]: true }));
  };

  return (
    <div className="p-3 sm:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6 text-slate-100 animate-in fade-in duration-200">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-extrabold tracking-tight flex items-center space-x-2 text-white">
            <Globe2 className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>Buscador Académico Multi-Base de Datos</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Explora millones de artículos verificados con DOIs válidos (Scopus, PubMed, SciELO, arXiv).
          </p>
        </div>
      </div>

      {/* Search Bar & Filters */}
      <form onSubmit={handleSearch} className="bg-[#101726] border border-slate-800 rounded-2xl p-4 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ej: Generative AI in Postgraduate Thesis Writing or Critical Thinking..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-cyan-950/50 flex items-center justify-center space-x-2 shrink-0 transition-all"
          >
            <Sparkles className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Buscando...' : 'Buscar Literatura'}</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs pt-2 border-t border-slate-800/80">
          <div className="flex items-center space-x-2">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold text-slate-300">Base de Datos:</span>
            <select
              value={database}
              onChange={(e) => setDatabase(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 text-[11px]"
            >
              <option value="all">Todas (Crossref / OpenAlex / Semantic Scholar)</option>
              <option value="scielo">SciELO / Redalyc (Latinoamérica)</option>
              <option value="pubmed">PubMed / Medical Literature</option>
              <option value="arxiv">arXiv (Preprints / Computer Science)</option>
              <option value="doaj">DOAJ (Open Access Journals)</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-300">Año Mínimo:</span>
            <select
              value={yearMin}
              onChange={(e) => setYearMin(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 text-[11px]"
            >
              <option value="2024">2024 - Presente</option>
              <option value="2022">2022 (Últimos 4 años)</option>
              <option value="2019">2019 (Últimos 7 años)</option>
              <option value="2015">2015+</option>
            </select>
          </div>
        </div>
      </form>

      {/* Results List */}
      <div className="space-y-4">
        {results.map((art) => {
          const isImported = importedMap[art.id] || project.literature.some(l => l.doi === art.doi);
          return (
            <div key={art.id} className="bg-[#101726] border border-slate-800/90 rounded-2xl p-5 space-y-3 shadow-lg hover:border-slate-700 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-900 text-cyan-300 border border-slate-800">
                      {art.database}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">{art.journal} ({art.year})</span>
                    {art.isOpenAccess && (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                        Open Access
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-100 hover:text-cyan-300 transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Autores: <strong className="text-slate-300">{art.authors.join(', ')}</strong>
                  </p>
                </div>

                <button
                  onClick={() => handleImportArticle(art)}
                  disabled={isImported}
                  className={`px-3.5 py-1.5 rounded-xl font-semibold text-xs transition-all flex items-center space-x-1.5 shrink-0 ${
                    isImported
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 cursor-default'
                      : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md'
                  }`}
                >
                  {isImported ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Importado</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Importar a Proyecto</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
                {art.abstract}
              </p>

              <div className="flex flex-wrap items-center justify-between text-xs pt-2 text-slate-400 gap-2">
                <div className="flex items-center space-x-3">
                  <span>Citaciones: <strong className="text-cyan-400">{art.citations}</strong></span>
                  <span>DOI: <a href={art.url} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">{art.doi}</a></span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {art.keywords?.map((kw, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-slate-900 text-slate-400">
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {results.length === 0 && !loading && (
          <div className="p-12 text-center bg-[#101726] border border-slate-800 rounded-2xl space-y-3">
            <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-xs text-slate-400">Haz clic en "Buscar Literatura" para explorar la producción científica relevante para tu tesis.</p>
          </div>
        )}
      </div>
    </div>
  );
};
