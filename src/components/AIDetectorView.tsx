import React, { useState } from 'react';
import { 
  ScanEye, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  BarChart2, 
  HelpCircle 
} from 'lucide-react';

export const AIDetectorView: React.FC = () => {
  const [text, setText] = useState(
    "El auge de la inteligencia artificial ha transformado radicalmente el ámbito educativo. Es importante destacar que los estudiantes pueden utilizar estas herramientas para mejorar sus investigaciones de manera eficiente y rapida."
  );
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any | null>(null);

  const handleRunDetector = async () => {
    if (!text.trim()) return;
    setAnalyzing(true);

    try {
      const response = await fetch('/api/ai/analyze-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, mode: 'detector' })
      });

      const data = await response.json();
      if (data.success && data.data) {
        setAnalysis(data.data);
      }
    } catch (err) {
      console.error('Error in AI Detector:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="p-3 sm:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6 text-slate-100 animate-in fade-in duration-200">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-extrabold tracking-tight flex items-center space-x-2 text-white">
            <ScanEye className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>Detector de IA & Autoría Humana</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Calcula la probabilidad de que un texto haya sido generado por Inteligencia Artificial.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Text Box */}
        <div className="bg-[#101726] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Texto a Escanear</span>
            <span className="text-[10px] text-slate-500">{text.length} caracteres</span>
          </div>

          <textarea
            rows={8}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ingresa aquí el texto a verificar..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />

          <div className="flex justify-end">
            <button
              onClick={handleRunDetector}
              disabled={analyzing || !text.trim()}
              className="px-5 py-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg flex items-center space-x-2 transition-all"
            >
              <Sparkles className={`w-4 h-4 ${analyzing ? 'animate-spin' : ''}`} />
              <span>{analyzing ? 'Analizando Sintaxis...' : 'Escanear Probabilidad de IA'}</span>
            </button>
          </div>
        </div>

        {/* Detector Meter & Report */}
        {analysis ? (
          <div className="bg-[#101726] border border-slate-800 rounded-2xl p-5 space-y-5 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center space-x-2 border-b border-slate-800 pb-2">
              <BarChart2 className="w-4 h-4" />
              <span>Resultado del Análisis de Probabilidad</span>
            </h3>

            {/* Meter Gauges */}
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
                <p className="text-3xl font-black text-emerald-400">{analysis.humanProbability || 88}%</p>
                <p className="text-[11px] font-semibold text-slate-400 uppercase">Autoría Humana</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
                <p className="text-3xl font-black text-amber-400">{analysis.aiProbability || 12}%</p>
                <p className="text-[11px] font-semibold text-slate-400 uppercase">Probabilidad IA</p>
              </div>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
              <p className="font-bold text-slate-200">Veredicto Final:</p>
              <p className="text-cyan-300 font-semibold">{analysis.verdict}</p>
              <p className="text-slate-400 text-[11px] leading-relaxed mt-1">{analysis.explanation}</p>
            </div>

            {analysis.suggestions && (
              <div className="space-y-1.5 text-xs">
                <p className="font-bold text-slate-300">Recomendaciones para Incrementar la Autenticidad:</p>
                <ul className="list-disc pl-4 space-y-1 text-slate-400 text-[11px]">
                  {analysis.suggestions.map((sug: string, idx: number) => (
                    <li key={idx}>{sug}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="p-12 text-center bg-[#101726] border border-slate-800 rounded-2xl space-y-3 flex flex-col justify-center items-center">
            <ScanEye className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-xs text-slate-400">Pega el fragmento a verificar y presiona "Escanear Probabilidad de IA".</p>
          </div>
        )}
      </div>
    </div>
  );
};
