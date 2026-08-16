import React, { useState } from 'react';
import { 
  Sparkles, 
  Wand2, 
  Layers, 
  Check, 
  RefreshCw, 
  BookOpen, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle2,
  ListTree
} from 'lucide-react';
import { ResearchProject, ThesisMetadata, CitationStyle } from '../types';

interface ThesisBuilderViewProps {
  project: ResearchProject;
  onUpdateProject: (updated: ResearchProject) => void;
}

export const ThesisBuilderView: React.FC<ThesisBuilderViewProps> = ({ project, onUpdateProject }) => {
  const [form, setForm] = useState<ThesisMetadata>({
    ...project.metadata
  });

  const [generating, setGenerating] = useState(false);
  const [generatedStructure, setGeneratedStructure] = useState<any[] | null>(null);
  const [activeStep, setActiveStep] = useState<number>(1);

  const handleGenerateStructure = async () => {
    setGenerating(true);
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Eres un metodólogo de investigación senior.
Construye la estructura completa de capítulos y subsecciones detalladas para una tesis de posgrado con la siguiente información:
- Carrera/Posgrado: ${form.career}
- Universidad: ${form.university}
- Norma de Cita: ${form.citationStyle}
- Tema: ${form.topic}
- Problema: ${form.problemStatement}
- Objetivos: ${form.generalObjective}
- Enfoque: ${form.approach}
- Tipo: ${form.researchType}

Responde ÚNICAMENTE en JSON con un arreglo de 5 capítulos.
Estructura esperada por capítulo:
[
  {
    "number": 1,
    "title": "Capítulo I: Planteamiento del Problema",
    "description": "Descripción del capítulo...",
    "sections": [
      { "code": "1.1", "title": "Planteamiento del Problema", "contentGuide": "Pautas de redacción..." },
      { "code": "1.2", "title": "Formulación de Preguntas", "contentGuide": "Pautas..." }
    ]
  }
]`,
          systemInstruction: "Genera estructuras de tesis rigurosas para universidades de alto nivel en Latinoamérica y España."
        })
      });

      const data = await response.json();
      if (data.success && data.text) {
        try {
          const parsed = JSON.parse(data.text);
          setGeneratedStructure(parsed);
        } catch {
          // fallback default structured wizard chapters
          setGeneratedStructure(getFallbackStructure());
        }
      } else {
        setGeneratedStructure(getFallbackStructure());
      }
    } catch {
      setGeneratedStructure(getFallbackStructure());
    } finally {
      setGenerating(false);
    }
  };

  const getFallbackStructure = () => [
    {
      number: 1,
      title: "Capítulo I: El Problema de Investigación",
      description: "Delimitación del problema, preguntas de investigación, objetivos e hipótesis.",
      sections: [
        { code: "1.1", title: "Planteamiento y Justificación del Problema", contentGuide: "Contexto macro, meso y micro del problema." },
        { code: "1.2", title: "Preguntas de Investigación", contentGuide: "Pregunta general y subpreguntas específicas." },
        { code: "1.3", title: "Objetivos General y Específicos", contentGuide: "Verbos de la taxonomía de Bloom adaptados al tipo de estudio." },
        { code: "1.4", title: "Formulación de Hipótesis y Matriz de Variables", contentGuide: "Relación de causalidad o correlación." }
      ]
    },
    {
      number: 2,
      title: "Capítulo II: Marco Teórico y Referencial",
      description: "Antecedentes de investigación, bases teóricas y marco conceptual.",
      sections: [
        { code: "2.1", title: "Antecedentes Internacionales y Nacionales", contentGuide: "Revisión de artículos en Scopus y SciELO." },
        { code: "2.2", title: "Bases Teórico-Epistemológicas", contentGuide: "Desarrollo del marco de referencia analítico." },
        { code: "2.3", title: "Definición de Términos Básicos", contentGuide: "Glosario conceptual fundamentado." }
      ]
    },
    {
      number: 3,
      title: "Capítulo III: Marco Metodológico",
      description: "Enfoque, diseño, población, muestra e instrumentos.",
      sections: [
        { code: "3.1", title: "Enfoque y Diseños de Investigación", contentGuide: "Explicación del diseño cuantitativo/cualitativo." },
        { code: "3.2", title: "Población y Muestra", contentGuide: "Cálculo muestral con intervalo de confianza." },
        { code: "3.3", title: "Técnicas e Instrumentos de Recolección", contentGuide: "Validez por juicio de expertos y prueba piloto." }
      ]
    },
    {
      number: 4,
      title: "Capítulo IV: Resultados y Discusión",
      description: "Análisis descriptivo e inferencial de los datos recolectados.",
      sections: [
        { code: "4.1", title: "Análisis Descriptivo de Variables", contentGuide: "Tablas de frecuencia y gráficos estandarizados." },
        { code: "4.2", title: "Prueba de Hipótesis", contentGuide: "Estadísticos t-Student, Chi-cuadrado o Regresión." },
        { code: "4.3", title: "Triangulación y Discusión", contentGuide: "Contraste de hallazgos con el marco teórico." }
      ]
    },
    {
      number: 5,
      title: "Capítulo V: Conclusiones y Recomendaciones",
      description: "Síntesis de aportes, implicaciones y propuesta de intervención.",
      sections: [
        { code: "5.1", title: "Conclusiones por Objetivo", contentGuide: "Respuestas sintéticas a cada objetivo específico." },
        { code: "5.2", title: "Recomendaciones e Implicaciones", contentGuide: "Líneas futuras de investigación." }
      ]
    }
  ];

  const handleApplyToProject = () => {
    if (!generatedStructure) return;

    const newChapters = generatedStructure.map((ch: any, idx: number) => ({
      id: `ch-${idx + 1}-${Date.now()}`,
      number: ch.number || idx + 1,
      title: ch.title,
      description: ch.description,
      isCompleted: false,
      sections: (ch.sections || []).map((sec: any, sIdx: number) => ({
        id: `sec-${idx + 1}-${sIdx + 1}-${Date.now()}`,
        code: sec.code || `${idx + 1}.${sIdx + 1}`,
        title: sec.title,
        content: `[Sección autogenerada por Constructor IA. Pautas: ${sec.contentGuide || ''}]`,
        wordCount: 0,
        status: 'pendiente' as const
      }))
    }));

    onUpdateProject({
      ...project,
      metadata: form,
      chapters: newChapters,
      updatedAt: new Date().toISOString().split('T')[0]
    });

    alert('¡Estructura de Tesis generada e integrada exitosamente en el proyecto!');
  };

  return (
    <div className="p-3 sm:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6 text-slate-100 animate-in fade-in duration-200">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-extrabold tracking-tight flex items-center space-x-2 text-white">
            <Sparkles className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>Constructor Inteligente de Tesis</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configura los parámetros clave de tu investigación y la IA organizará la estructura capitular óptima.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs overflow-x-auto max-w-full custom-scrollbar shrink-0">
          <button
            onClick={() => setActiveStep(1)}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
              activeStep === 1 ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            1. Parámetros
          </button>
          <button
            onClick={() => setActiveStep(2)}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
              activeStep === 2 ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            2. Estructura IA
          </button>
        </div>
      </div>

      {activeStep === 1 ? (
        /* STEP 1: Metadata Questionnaire */
        <div className="bg-[#101726] border border-slate-800/80 rounded-2xl p-4 sm:p-6 space-y-5 sm:space-y-6 shadow-2xl">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>Información Institucional & Metodológica de la Tesis</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Universidad / Institución *</label>
              <input
                type="text"
                value={form.university}
                onChange={(e) => setForm({ ...form, university: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Carrera / Posgrado / Facultad *</label>
              <input
                type="text"
                value={form.career}
                onChange={(e) => setForm({ ...form, career: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Norma de Cita & Formato *</label>
              <select
                value={form.citationStyle}
                onChange={(e) => setForm({ ...form, citationStyle: e.target.value as CitationStyle })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100"
              >
                <option value="APA 7">APA 7ma Edición</option>
                <option value="Vancouver">Vancouver (Ciencias Médicas)</option>
                <option value="IEEE">IEEE (Ingeniería y Sistemas)</option>
                <option value="ICONTEC">ICONTEC</option>
                <option value="MLA">MLA</option>
                <option value="Chicago">Chicago</option>
                <option value="Harvard">Harvard</option>
              </select>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Tema Principal de Investigación *</label>
              <input
                type="text"
                value={form.topic}
                onChange={(e) => setForm({ ...form, topic: e.target.value })}
                placeholder="Ej: Transformación digital del proceso de enseñanza-aprendizaje en odontología..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Planteamiento Sintético del Problema *</label>
              <textarea
                rows={3}
                value={form.problemStatement}
                onChange={(e) => setForm({ ...form, problemStatement: e.target.value })}
                placeholder="Describe brevemente la brecha de conocimiento o contradicción empírica observada..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Enfoque de Investigación *</label>
                <select
                  value={form.approach}
                  onChange={(e) => setForm({ ...form, approach: e.target.value as any })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100"
                >
                  <option value="mixto">Mixto (Cuali-Cuantitativo / DEXPLIS)</option>
                  <option value="cuantitativo">Cuantitativo (Estadístico / Positivista)</option>
                  <option value="cualitativo">Cualitativo (Hermenéutico / Fenomenológico)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tipo de Investigación *</label>
                <select
                  value={form.researchType}
                  onChange={(e) => setForm({ ...form, researchType: e.target.value as any })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100"
                >
                  <option value="correlacional">Correlacional / Causal</option>
                  <option value="descriptivo">Descriptivo Explícito</option>
                  <option value="explicativo">Explicativo / Experimental</option>
                  <option value="exploratorio">Exploratorio Inicial</option>
                  <option value="fenomenologico">Fenomenológico / Estudio de Caso</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => {
                handleGenerateStructure();
                setActiveStep(2);
              }}
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-cyan-950/50 flex items-center space-x-2 transition-all"
            >
              <Wand2 className="w-4 h-4" />
              <span>Generar Estructura Capitular con IA</span>
            </button>
          </div>
        </div>
      ) : (
        /* STEP 2: Generated Structure & Apply */
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center space-x-2">
                <ListTree className="w-4 h-4 text-cyan-400" />
                <span>Estructura de Tesis Recomendada por IA</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Adaptada a norma {form.citationStyle} para {form.university}.</p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleGenerateStructure}
                disabled={generating}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg flex items-center space-x-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${generating ? 'animate-spin text-cyan-400' : ''}`} />
                <span>Regenerar</span>
              </button>
              <button
                onClick={handleApplyToProject}
                className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs rounded-lg shadow-md flex items-center space-x-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Aplicar a Proyecto Activo</span>
              </button>
            </div>
          </div>

          {generating ? (
            <div className="p-12 text-center bg-[#101726] border border-slate-800 rounded-2xl space-y-3">
              <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
              <p className="text-sm font-semibold text-slate-200">Sintetizando estructura capitular con Gemini 3.6 Flash...</p>
              <p className="text-xs text-slate-400">Consultando taxonomías académicas y estándares institucionales.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {(generatedStructure || getFallbackStructure()).map((chap: any, idx: number) => (
                <div key={idx} className="bg-[#101726] border border-slate-800 rounded-xl p-5 space-y-3 shadow-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-cyan-300">
                      {chap.title}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-500">Capítulo {chap.number || idx + 1}</span>
                  </div>
                  <p className="text-xs text-slate-400">{chap.description}</p>

                  <div className="mt-2 space-y-2 pl-2 border-l-2 border-slate-800">
                    {(chap.sections || []).map((sec: any, sIdx: number) => (
                      <div key={sIdx} className="bg-slate-900/80 p-3 rounded-lg border border-slate-800/80 text-xs space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-cyan-400 font-bold">{sec.code}</span>
                          <span className="font-semibold text-slate-200">{sec.title}</span>
                        </div>
                        {sec.contentGuide && (
                          <p className="text-[11px] text-slate-400 italic">Pauta: {sec.contentGuide}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
