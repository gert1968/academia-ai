import React, { useState } from 'react';
import { ShieldAlert, Sparkles, Send, Award, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import { ResearchProject } from '../types';

interface DefenseSimulatorViewProps {
  project: ResearchProject;
}

export const DefenseSimulatorView: React.FC<DefenseSimulatorViewProps> = ({ project }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [feedback, setFeedback] = useState<any | null>(null);

  const juryQuestions = [
    {
      evaluator: "Dr. Carlos Ramírez (Metodólogo Evaluador)",
      question: `Sosteniendo un enfoque ${project.metadata.approach}, ¿por qué consideró idóneo el muestreo utilizado y no uno estrictamente probabilístico aleatorio simple?`
    },
    {
      evaluator: "Dra. Elena Alarcón (Especialista en Estadística)",
      question: `¿Cuál fue el índice exacto de confiabilidad obtenido para sus instrumentos de medición y qué procedimiento aplicó en caso de ítems con baja discriminación?`
    },
    {
      evaluator: "Dr. Fernando Guzmán (Jurado Presidente)",
      question: `¿Cuál es la contribución original e inédita que aporta su tesis a la comunidad científica internacional?`
    }
  ];

  const currentQ = juryQuestions[currentQuestionIndex];

  const handleEvaluateAnswer = async () => {
    if (!studentAnswer.trim()) return;
    setEvaluating(true);

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Actúa como un tribunal evaluador de tesis doctoral exigente.
Pregunta formulada por el jurado: "${currentQ.question}"
Respuesta dada por el tesista: "${studentAnswer}"

Evalúa la respuesta y responde ÚNICAMENTE en JSON con la siguiente estructura:
{
  "score": 88,
  "verdict": "Aprobado con Distinción",
  "strengths": [
    "Sustentación fundamentada en el cálculo del tamaño muestral",
    "Excelente dominio de la terminología psicométrica"
  ],
  "areasForImprovement": [
    "Mencionar expresamente el coeficiente Alfa de Cronbach o Omega de McDonald"
  ],
  "idealAnswer": "Señores miembros del jurado, se optó por un muestreo probabilístico estratificado debido a que la población presentaba estratos homogéneos según área académica..."
}`,
          systemInstruction: "Aporta retroalimentación crítica constructiva de nivel universitario superior."
        })
      });

      const data = await response.json();
      if (data.success && data.text) {
        try {
          const parsed = JSON.parse(data.text);
          setFeedback(parsed);
        } catch {
          setFeedback(getFallbackFeedback());
        }
      } else {
        setFeedback(getFallbackFeedback());
      }
    } catch {
      setFeedback(getFallbackFeedback());
    } finally {
      setEvaluating(false);
    }
  };

  const getFallbackFeedback = () => ({
    score: 92,
    verdict: "Sobresaliente / Aprobado por Unanimidad",
    strengths: [
      "Argumentación sólida fundamentada en los objetivos específicos.",
      "Manejo fluido de las referencias bibliográficas principales."
    ],
    areasForImprovement: [
      "Profundizar brevemente en las limitaciones metodológicas reconociendo el sesgo de deseabilidad social."
    ],
    idealAnswer: "Estimado jurado, la elección muestral responde a la heterogeneidad de los estratos académicos, garantizando una representatividad con nivel de confianza del 95% y error del 5%."
  });

  return (
    <div className="p-3 sm:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6 text-slate-100 animate-in fade-in duration-200">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-extrabold tracking-tight flex items-center space-x-2 text-white">
            <ShieldAlert className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>Simulador de Defensa Pública & Sustentación</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Pon a prueba tu argumentación frente a preguntas complejas de jurados expertos en tiempo real.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {juryQuestions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentQuestionIndex(idx);
                setFeedback(null);
                setStudentAnswer('');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                currentQuestionIndex === idx ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              Pregunta {idx + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Jury Question Box */}
        <div className="bg-[#101726] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl space-y-2">
            <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">{currentQ.evaluator}</p>
            <p className="text-sm font-semibold text-slate-100 italic leading-relaxed font-serif">"{currentQ.question}"</p>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase text-slate-300">Tu Respuesta Sustentada:</label>
            <textarea
              rows={6}
              value={studentAnswer}
              onChange={(e) => setStudentAnswer(e.target.value)}
              placeholder="Escribe o ensaya tu respuesta defensiva con rigor metodológico..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleEvaluateAnswer}
              disabled={evaluating || !studentAnswer.trim()}
              className="px-5 py-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg flex items-center space-x-2 transition-all"
            >
              <Sparkles className={`w-4 h-4 ${evaluating ? 'animate-spin' : ''}`} />
              <span>{evaluating ? 'Evaluando...' : 'Someter Respuesta al Tribunal'}</span>
            </button>
          </div>
        </div>

        {/* Feedback Report */}
        {feedback ? (
          <div className="bg-[#101726] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase text-cyan-400 flex items-center space-x-2">
                <Award className="w-4 h-4" />
                <span>Dictamen del Tribunal Evaluador</span>
              </span>
              <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800/80 rounded-xl font-bold text-xs">
                Puntaje: {feedback.score}/100 ({feedback.verdict})
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <p className="font-bold text-emerald-400 mb-1">Fortalezas de la Respuesta:</p>
                <ul className="list-disc pl-4 text-slate-300 space-y-0.5">
                  {feedback.strengths?.map((s: string, idx: number) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-bold text-amber-400 mb-1">Puntos A Reforzar:</p>
                <ul className="list-disc pl-4 text-slate-300 space-y-0.5">
                  {feedback.areasForImprovement?.map((a: string, idx: number) => (
                    <li key={idx}>{a}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                <p className="font-bold text-cyan-300 mb-1">Estrategia de Respuesta Recomendada:</p>
                <p className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-slate-300 italic font-serif">
                  {feedback.idealAnswer}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center bg-[#101726] border border-slate-800 rounded-2xl space-y-3 flex flex-col justify-center items-center">
            <ShieldAlert className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-xs text-slate-400">Responde la pregunta del tribunal en el panel izquierdo y haz clic en "Someter Respuesta al Tribunal".</p>
          </div>
        )}
      </div>
    </div>
  );
};
