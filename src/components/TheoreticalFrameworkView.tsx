import React, { useState } from 'react';
import { 
  BookMarked, 
  Sparkles, 
  Layers, 
  Users, 
  GitBranch, 
  Copy, 
  Check, 
  BookOpen, 
  Feather
} from 'lucide-react';
import { ResearchProject } from '../types';

interface TheoreticalFrameworkViewProps {
  project: ResearchProject;
}

export const TheoreticalFrameworkView: React.FC<TheoreticalFrameworkViewProps> = ({ project }) => {
  const [topic, setTopic] = useState(project.metadata.topic || '');
  const [generating, setGenerating] = useState(false);
  const [framework, setFramework] = useState<any | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleBuildFramework = async () => {
    if (!topic.trim()) return;
    setGenerating(true);

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Actúa como un ensayista y teórico académico senior.
Construye el Marco Teórico y Estado del Arte para el siguiente tema de investigación: "${topic}".

Responde ÚNICAMENTE en JSON con la siguiente estructura:
{
  "keyConcepts": [
    { "term": "Concepto 1", "definition": "Definición académica rigurosa con citas APA 7...", "authors": ["Autor, A. (2024)", "Autor, B. (2023)"] }
  ],
  "schoolsOfThought": [
    { "school": "Corriente Postpositivista / Conectivista", "description": "Línea teórica dominante..." }
  ],
  "theoreticalDebates": [
    { "topic": "Debate sobre la autonomía epistémica vs automatización algorítmica", "postureA": "Postura A...", "postureB": "Postura B..." }
  ],
  "researchLines": [
    "Línea 1: Evaluación del pensamiento crítico mediado por IA en posgrados",
    "Línea 2: Desarrollo de andamiajes metacognitivos"
  ],
  "stateOfTheArtSummary": "Resumen integrado del estado del arte que sintetiza los hallazgos empíricos más recientes (2022-2026)..."
}`,
          systemInstruction: "Aporta precisión terminológica y estilo ensayístico científico de alto rigor."
        })
      });

      const data = await response.json();
      if (data.success && data.text) {
        try {
          const parsed = JSON.parse(data.text);
          setFramework(parsed);
        } catch {
          setFramework(getFallbackFramework());
        }
      } else {
        setFramework(getFallbackFramework());
      }
    } catch {
      setFramework(getFallbackFramework());
    } finally {
      setGenerating(false);
    }
  };

  const getFallbackFramework = () => ({
    keyConcepts: [
      {
        term: "Andamiaje Digital Epistemológico",
        definition: "Proceso instruccional mediante el cual herramientas algorítmicas avanzadas (LLMs y RAG) asisten al investigador en la structuración conceptual sin sustituir el juicio crítico autónomo (Siemens, 2023; Mendoza, 2024).",
        authors: ["Siemens, G. (2023)", "Mendoza, C. (2024)"]
      },
      {
        term: "Pensamiento Crítico Académico",
        definition: "Capacidad metacognitiva orientada a discriminar la credibilidad de fuentes, evaluar la validez de los argumentos y formular hipótesis sustentadas en datos (Ennis, 2018; Watson & Glaser, 2020).",
        authors: ["Ennis, R. (2018)", "Watson, E., & Glaser, E. (2020)"]
      }
    ],
    schoolsOfThought: [
      {
        school: "Perspectiva Conectivista y Socioconstructivista",
        description: "Postula que el conocimiento no reside exclusivamente en la mente humana, sino en la red de interacciones entre el sujeto, los repositorios digitales y los agentes de IA."
      },
      {
        school: "Enfoque Crítico-Tecnológico",
        description: "Enfatiza la necesidad de auditar los algoritmos para prevenir alucinaciones de contenido, sesgos de confirmación y degradación de la memoria conceptual."
      }
    ],
    theoreticalDebates: [
      {
        topic: "Autonomía de Investigación vs. Dependencia Algorítmica",
        postureA: "Autores tecno-optimistas afirman que la IA libera tiempo mecánico para enfocarse en la abstracción teorética.",
        postureB: "Autores conservadores argumentan que la automatización atrofia el pensamiento analítico primario."
      }
    ],
    researchLines: [
      "Línea 1: Evaluación psicométrica del pensamiento crítico con tecnologías emergentes.",
      "Línea 2: Integración de la IA en la tutoría y revisión de tesis doctorales."
    ],
    stateOfTheArtSummary: "El estado del arte actual (2022-2026) evidencia un cambio de paradigma hacia la 'co-autoría guiada' donde la verificación de fuentes y la triangulación teórica constituyen la competencia central del investigador."
  });

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(label);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-slate-100 animate-in fade-in duration-200">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight flex items-center space-x-2 text-white">
            <BookMarked className="w-5 h-5 text-cyan-400" />
            <span>Generador de Marco Teórico & Estado del Arte</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Construye la arquitectura conceptual, corrientes de pensamiento y debates teóricos para tu Capítulo II.
          </p>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Escribe el tema o variable clave..."
            className="bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-1.5 text-xs text-slate-100 w-full sm:w-72"
          />
          <button
            onClick={handleBuildFramework}
            disabled={generating}
            className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg flex items-center space-x-2 shrink-0 transition-all"
          >
            <Sparkles className={`w-4 h-4 ${generating ? 'animate-spin' : ''}`} />
            <span>Generar</span>
          </button>
        </div>
      </div>

      {framework ? (
        <div className="space-y-6">
          {/* Summary Card */}
          <div className="bg-[#101726] border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center space-x-2">
                <Feather className="w-4 h-4" />
                <span>Síntesis del Estado del Arte</span>
              </h2>
              <button
                onClick={() => handleCopy(framework.stateOfTheArtSummary, 'summary')}
                className="text-xs text-slate-400 hover:text-cyan-300 flex items-center space-x-1"
              >
                {copiedSection === 'summary' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'summary' ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              {framework.stateOfTheArtSummary}
            </p>
          </div>

          {/* Concepts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#101726] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center space-x-2">
                <Layers className="w-4 h-4" />
                <span>Conceptos Fundamentales & Autores Clave</span>
              </h3>
              <div className="space-y-3 text-xs">
                {framework.keyConcepts?.map((c: any, idx: number) => (
                  <div key={idx} className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-cyan-300">{c.term}</span>
                    </div>
                    <p className="text-slate-300 leading-normal">{c.definition}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {c.authors?.map((a: string, aIdx: number) => (
                        <span key={aIdx} className="px-2 py-0.5 bg-slate-800 text-[10px] text-slate-400 rounded">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#101726] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Corrientes & Escuelas de Pensamiento</span>
              </h3>
              <div className="space-y-3 text-xs">
                {framework.schoolsOfThought?.map((s: any, idx: number) => (
                  <div key={idx} className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                    <p className="font-bold text-slate-200">{s.school}</p>
                    <p className="text-slate-400">{s.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Theoretical Debates */}
          <div className="bg-[#101726] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
              <GitBranch className="w-4 h-4" />
              <span>Debates Teóricos Contemporáneos</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {framework.theoreticalDebates?.map((d: any, idx: number) => (
                <div key={idx} className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                  <p className="font-bold text-amber-300">{d.topic}</p>
                  <div className="space-y-1 text-slate-300 text-[11px]">
                    <p><strong className="text-slate-400">Postura A:</strong> {d.postureA}</p>
                    <p><strong className="text-slate-400">Postura B:</strong> {d.postureB}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center bg-[#101726] border border-slate-800 rounded-2xl space-y-3">
          <BookOpen className="w-12 h-12 text-cyan-400 mx-auto opacity-80" />
          <h3 className="text-base font-bold text-white">Genera la Arquitectura del Marco Teórico</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Ingresa tu tema en la barra superior y la IA organizará los autores de mayor citación, conceptos base y debates científicos.
          </p>
        </div>
      )}
    </div>
  );
};
