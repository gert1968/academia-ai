import React, { useState } from 'react';
import { 
  Wand2, 
  Sparkles, 
  Copy, 
  Check, 
  Maximize2, 
  Minimize2, 
  BookOpen, 
  FileText 
} from 'lucide-react';

export const AcademicRewriterView: React.FC = () => {
  const [text, setText] = useState(
    "Queremos investigar por qué los alumnos no leen libros impresos y prefieren usar las pantallas en las clases universitarias."
  );
  const [styleMode, setStyleMode] = useState<string>('mas_academico');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);

  const styleOptions = [
    { id: 'mas_academico', label: 'Más Académico', desc: 'Rigor formal y léxico universitario' },
    { id: 'mas_tecnico', label: 'Más Técnico', desc: 'Sustantivos de especialidad' },
    { id: 'mas_claro', label: 'Más Claro', desc: 'Sintaxis concisa y fluida' },
    { id: 'mas_corto', label: 'Más Conciso', desc: 'Elimina redundancias' },
    { id: 'mas_largo', label: 'Más Extenso / Profundo', desc: 'Sustentación teorética ampliada' },
    { id: 'mas_cientifico', label: 'Más Científico (IMRaD)', desc: 'Estilo de revista Scopus/WoS' },
  ];

  const handleRewrite = async () => {
    if (!text.trim()) return;
    setLoading(true);

    try {
      const response = await fetch('/api/ai/analyze-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, mode: 'rewrite', style: styleMode })
      });

      const data = await response.json();
      if (data.success && data.data) {
        setResult(data.data);
      }
    } catch (err) {
      console.error('Error rewriting:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result?.rewrittenText) return;
    navigator.clipboard.writeText(result.rewrittenText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-3 sm:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6 text-slate-100 animate-in fade-in duration-200">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-extrabold tracking-tight flex items-center space-x-2 text-white">
            <Wand2 className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>Reescritor & Transformador Científico</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Reescribe tus párrafos adaptándolos a registros de alta densidad científica o claridad.
          </p>
        </div>
      </div>

      {/* Style Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {styleOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setStyleMode(opt.id)}
            className={`p-3 rounded-xl border text-left text-xs transition-all ${
              styleMode === opt.id
                ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200 font-bold shadow-md shadow-cyan-950/50'
                : 'bg-[#101726] border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <p className="font-semibold text-slate-200">{opt.label}</p>
            <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{opt.desc}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Text Box */}
        <div className="bg-[#101726] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Texto Original</span>
            <span className="text-[10px] text-slate-500">{text.length} caracteres</span>
          </div>

          <textarea
            rows={8}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribe el párrafo a transformar..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />

          <div className="flex justify-end">
            <button
              onClick={handleRewrite}
              disabled={loading || !text.trim()}
              className="px-5 py-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg flex items-center space-x-2 transition-all"
            >
              <Sparkles className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Reescribiendo...' : 'Transformar Texto'}</span>
            </button>
          </div>
        </div>

        {/* Output Text Box */}
        {result ? (
          <div className="bg-[#101726] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Resultado Transmutado ({styleMode})</span>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs font-medium text-slate-300 flex items-center space-x-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copiado' : 'Copiar'}</span>
                </button>
              </div>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 text-xs text-slate-100 font-serif leading-relaxed">
                {result.rewrittenText}
              </div>

              {result.changesMade && (
                <div className="space-y-1 text-xs">
                  <p className="font-bold text-slate-400 text-[11px]">Cambios Principales Aplicados:</p>
                  <ul className="list-disc pl-4 text-slate-400 text-[11px] space-y-0.5">
                    {result.changesMade.map((c: string, idx: number) => (
                      <li key={idx}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-12 text-center bg-[#101726] border border-slate-800 rounded-2xl space-y-3 flex flex-col justify-center items-center">
            <Wand2 className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-xs text-slate-400">Selecciona el modo deseado arriba y pulsa "Transformar Texto".</p>
          </div>
        )}
      </div>
    </div>
  );
};
