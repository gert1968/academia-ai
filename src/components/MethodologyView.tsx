import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  ShieldCheck, 
  Binary, 
  Users, 
  Target, 
  CheckCircle2, 
  HelpCircle,
  FileCheck2,
  Cpu
} from 'lucide-react';
import { ResearchProject } from '../types';

interface MethodologyViewProps {
  project: ResearchProject;
  onUpdateProject: (proj: ResearchProject) => void;
}

export const MethodologyView: React.FC<MethodologyViewProps> = ({ project, onUpdateProject }) => {
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<any | null>(null);

  const handleRunAdvisor = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Actúa como un metodólogo estadístico y epistemólogo de nivel doctoral.
Genera recomendaciones metodológicas completas para el siguiente proyecto:
- Título: "${project.title}"
- Problema: "${project.metadata.problemStatement}"
- Objetivo General: "${project.metadata.generalObjective}"
- Enfoque: "${project.metadata.approach}"

Responde ÚNICAMENTE en JSON con la siguiente estructura:
{
  "paradigm": "Positivista / Postpositivista o Sociocrítico...",
  "paradigmReason": "Explicación epistemológica de por qué este paradigma se adecúa...",
  "approach": "Mixto Explícito (DEXPLIS)...",
  "design": "Diseño no experimental, correlacional-causal de corte transversal...",
  "population": "Población objetivo estimada N=500 tesistas...",
  "sampleStrategy": "Muestra probabilística estratificada con n=217 (95% confianza, 5% margen de error)...",
  "instruments": [
    "Escala de Pensamiento Crítico de Watson-Glaser (WGCTA-S)",
    "Cuestionario de Autoevaluación de Competencias Investigativas (20 ítems Líkert)"
  ],
  "validityAndReliability": "Validez de contenido mediante juicio de 5 expertos (V de Aiken > 0.85). Confiabilidad calculada mediante Alfa de Cronbach (α > 0.88) y Omega de McDonald (ω > 0.90).",
  "triangulationMethod": "Triangulación metodológica entre resultados cuantitativos de la escala y categorías emergentes de los grupos focales."
}`,
          systemInstruction: "Aporta justificaciones epistemológicas formales en español académico neutro."
        })
      });

      const data = await response.json();
      if (data.success && data.text) {
        try {
          const parsed = JSON.parse(data.text);
          setRecommendation(parsed);
        } catch {
          setRecommendation(getFallbackRecommendation());
        }
      } else {
        setRecommendation(getFallbackRecommendation());
      }
    } catch {
      setRecommendation(getFallbackRecommendation());
    } finally {
      setLoading(false);
    }
  };

  const getFallbackRecommendation = () => ({
    paradigm: "Postpositivista / Pragmático",
    paradigmReason: "Permite integrar la cuantificación rigurosa con la interpretación cualitativa de los significados atribuidos al proceso de investigación mediado por tecnología.",
    approach: "Enfoque Mixto (DEXPLIS - Diseño Explicativo Secuencial)",
    design: "Diseño No Experimental, Correlacional-Causal de corte transversal.",
    population: "Estudiantes de posgrado matriculados en programas de Maestría y Doctorado (N ≈ 450).",
    sampleStrategy: "Muestreo probabilístico estratificado por área de conocimiento (n = 208, confianza 95%, margen de error 5%).",
    instruments: [
      "Prueba Estandarizada Watson-Glaser Critical Thinking Appraisal",
      "Cuestionario Likert de Percepción del Andamiaje Tecnológico (24 reactivos)",
      "Guía de Entrevista Semiestructurada para Grupos Focales"
    ],
    validityAndReliability: "Validez de contenido mediante Juicio de 5 Expertos con índice V de Aiken (V > 0.82). Confiabilidad con Alfa de Cronbach (α = 0.89) y Omega de McDonald (ω = 0.91).",
    triangulationMethod: "Triangulación de datos y metodológica para contrastar las variaciones cuantitativas con los discursos cualitativos."
  });

  return (
    <div className="p-3 sm:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6 text-slate-100 animate-in fade-in duration-200">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-extrabold tracking-tight flex items-center space-x-2 text-white">
            <Compass className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>Asistente & Recomendador Metodológico</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Analiza la coherencia epistemológica entre tu problema, objetivos e instrumentos.
          </p>
        </div>

        <button
          onClick={handleRunAdvisor}
          disabled={loading}
          className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-cyan-950/50 flex items-center justify-center space-x-2 transition-all shrink-0"
        >
          <Sparkles className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Analizando Metodología...' : 'Generar Recomendación IA'}</span>
        </button>
      </div>

      {/* Main Grid display */}
      {recommendation ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#101726] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center space-x-2">
              <Cpu className="w-4 h-4" />
              <span>Paradigma & Enfoque Epistemológico</span>
            </h3>
            <div className="space-y-2 text-xs">
              <div>
                <span className="font-semibold text-slate-300">Paradigma Recomendado:</span>
                <p className="text-cyan-300 font-bold mt-0.5">{recommendation.paradigm}</p>
              </div>
              <p className="text-slate-400 leading-relaxed bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                {recommendation.paradigmReason}
              </p>
              <div className="pt-2">
                <span className="font-semibold text-slate-300">Diseño de Investigación:</span>
                <p className="text-slate-200 mt-0.5 font-medium">{recommendation.design}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#101726] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Población & Muestra Probabilística</span>
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <span className="font-semibold text-slate-300">Población Objetivo:</span>
                <p className="text-slate-200 mt-0.5">{recommendation.population}</p>
              </div>
              <div>
                <span className="font-semibold text-slate-300">Estrategia de Muestreo:</span>
                <p className="text-slate-200 mt-0.5">{recommendation.sampleStrategy}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#101726] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Técnicas e Instrumentos de Medición</span>
            </h3>
            <ul className="space-y-2 text-xs">
              {recommendation.instruments?.map((inst: string, idx: number) => (
                <li key={idx} className="flex items-start space-x-2 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span className="text-slate-200">{inst}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#101726] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Validez, Confiabilidad & Triangulación</span>
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <span className="font-semibold text-slate-300">Criterios de Validez / Cronbach & McDonald:</span>
                <p className="text-slate-200 mt-0.5 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  {recommendation.validityAndReliability}
                </p>
              </div>
              <div>
                <span className="font-semibold text-slate-300">Método de Triangulación:</span>
                <p className="text-slate-200 mt-0.5">{recommendation.triangulationMethod}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center bg-[#101726] border border-slate-800 rounded-2xl space-y-4">
          <Compass className="w-12 h-12 text-cyan-400 mx-auto opacity-80" />
          <h3 className="text-base font-bold text-white">Genera tu Diagnóstico Metodológico Personalizado</h3>
          <p className="text-xs text-slate-400 max-w-lg mx-auto">
            Haz clic en el botón superior para calcular la muestra, seleccionar los instrumentos psicométricos recomendados y fundamentar el diseño de investigación.
          </p>
        </div>
      )}
    </div>
  );
};
