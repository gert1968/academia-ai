import React, { useState } from 'react';
import { 
  Presentation, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Sparkles, 
  Maximize2, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';
import { ResearchProject } from '../types';

interface PresentationBuilderViewProps {
  project: ResearchProject;
}

export const PresentationBuilderView: React.FC<PresentationBuilderViewProps> = ({ project }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  const slides = [
    {
      title: project.title,
      subtitle: `Sustentación de ${project.type.replace('_', ' ').toUpperCase()} - ${project.metadata.university}`,
      presenter: "Autores: Dra. (c) Valentina Morales",
      advisor: `Asesor: ${project.metadata.advisorName}`,
      bullets: [
        `Norma de estilo: ${project.metadata.citationStyle}`,
        `Facultad: ${project.metadata.career}`
      ],
      speakerNotes: "Inicie la presentación saludando respetuosamente al tribunal evaluador. Indique la relevancia social del tema."
    },
    {
      title: "1. Planteamiento del Problema & Justificación",
      bullets: [
        project.metadata.problemStatement,
        "Vacío de conocimiento identificado en la literatura internacional.",
        "Justificación práctica y valor social en educación superior."
      ],
      speakerNotes: "Resalte la brecha de conocimiento identificada en Scopus (2022-2026). Dedique máximo 2 minutos a este slide."
    },
    {
      title: "2. Objetivos e Hipótesis de Investigación",
      bullets: [
        `Objetivo General: ${project.metadata.generalObjective}`,
        `Hipótesis Principal: ${project.metadata.hypotheses[0] || 'Relación significativa entre variables.'}`
      ],
      speakerNotes: "Muestre la alineación lógica directa entre el problema y el objetivo general."
    },
    {
      title: "3. Marco Metodológico & Diseño",
      bullets: [
        `Enfoque: ${project.metadata.approach.toUpperCase()}`,
        `Diseño: ${project.metadata.researchType}`,
        "Población y Muestra Probabilística Estratificada (N=450, n=208).",
        "Instrumentos: Prueba Watson-Glaser y Cuestionario CUTI (α = 0.89)."
      ],
      speakerNotes: "Mencione la validez de contenido por juicio de 5 expertos y la confiabilidad calculada con Alfa de Cronbach y Omega."
    },
    {
      title: "4. Hallazgos Principales & Discusión de Resultados",
      bullets: [
        "Aumento significativo en las subescalas de deducción e inferencia (p < 0.001).",
        "Triangulación cualitativa confirma mayor autonomía epistémica.",
        "Contraste con la teoría del andamiaje de Vygotsky y el Conectivismo de Siemens."
      ],
      speakerNotes: "Este es el núcleo de la evaluación del jurado. Apóyese en datos cuantitativos concretos."
    },
    {
      title: "5. Conclusiones & Recomendaciones",
      bullets: [
        "Se acepta la hipótesis alternativa H1 con un nivel de confianza del 95%.",
        "Recomendaciones para políticas institucionales de adopción ética de IA en posgrados."
      ],
      speakerNotes: "Finalice sintetizando el aporte original de su investigación a la comunidad científica."
    }
  ];

  React.useEffect(() => {
    let interval: any = null;
    if (timerActive) {
      interval = setInterval(() => setTimerSeconds(s => s + 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  const slide = slides[currentSlide];

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainder = sec % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div className="p-3 sm:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6 text-slate-100 animate-in fade-in duration-200">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-extrabold tracking-tight flex items-center space-x-2 text-white">
            <Presentation className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>Diapositivas para Sustentación</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Diapositivas profesionales para la defensa de tu tesis con notas de orador y temporizador.
          </p>
        </div>

        {/* Timer Control */}
        <div className="flex items-center space-x-3 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span className="font-mono text-sm font-bold text-cyan-300">{formatTimer(timerSeconds)}</span>
          <button
            onClick={() => setTimerActive(!timerActive)}
            className="px-2.5 py-1 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg text-[11px]"
          >
            {timerActive ? 'Pausar' : 'Iniciar Ensayos'}
          </button>
        </div>
      </div>

      {/* Main Slide Canvas Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans): Slide Canvas */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative bg-gradient-to-br from-[#0c121e] via-[#111827] to-[#0c121e] border border-slate-700/80 rounded-2xl p-8 min-h-[380px] shadow-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                <span>{project.metadata.university}</span>
                <span>Diapositiva {currentSlide + 1} de {slides.length}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {slide.title}
              </h2>

              {slide.subtitle && (
                <p className="text-xs text-cyan-300 font-semibold">{slide.subtitle}</p>
              )}

              <ul className="space-y-2 pt-2">
                {slide.bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>{slide.presenter || project.metadata.career}</span>
              <span>{slide.advisor}</span>
            </div>
          </div>

          {/* Slide Controls */}
          <div className="flex items-center justify-between bg-[#101726] border border-slate-800 p-3 rounded-xl">
            <button
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              disabled={currentSlide === 0}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs rounded-lg disabled:opacity-40 flex items-center space-x-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <span className="text-xs font-semibold text-slate-400">
              Slide {currentSlide + 1} / {slides.length}
            </span>

            <button
              onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
              disabled={currentSlide === slides.length - 1}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs rounded-lg disabled:opacity-40 flex items-center space-x-1"
            >
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column (1 span): Speaker Notes */}
        <div className="bg-[#101726] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
            <Sparkles className="w-4 h-4" />
            <span>Notas del Orador & Guía de Sustentación</span>
          </h3>

          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed font-serif">
            {slide.speakerNotes}
          </div>

          <div className="space-y-2 text-xs pt-2">
            <span className="font-semibold text-slate-300">Recomendaciones del Jurado IA:</span>
            <ul className="list-disc pl-4 text-slate-400 text-[11px] space-y-1">
              <li>Mantén contacto visual con el tribunal evaluador.</li>
              <li>Evita leer textualmente las diapositivas.</li>
              <li>Enfatiza la metodología y el cálculo de confiabilidad (Alfa/Omega).</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
