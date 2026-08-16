import React, { useState } from 'react';
import { GraduationCap, Sparkles, Send, Lightbulb, MessageSquare } from 'lucide-react';
import { ResearchProject } from '../types';

interface TutorIAViewProps {
  project: ResearchProject;
}

export const TutorIAView: React.FC<TutorIAViewProps> = ({ project }) => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: `Hola. Soy tu Tutor Epistemológico y Metodológico Socrático 24/7. Mi objetivo es guiarte mediante preguntas reflexivas para que fortalezcas la coherencia teórica y metodológica de tu tesis.`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userText }]);
    setLoading(true);

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Actúa como un metodólogo socrático y tutor metodológico doctoral.
El tesista investiga sobre: "${project.title}".
Pregunta/Duda del tesista: "${userText}".
Aporta orientación metodológica clara en español neutro, planteando 1 pregunta de reflexión socrática.`,
          systemInstruction: "Adopta un tono mentor, riguroso y estimulante."
        })
      });

      const data = await response.json();
      if (data.success && data.text) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: "Para garantizar la coherencia metodológica, considera si tu instrumento de medición se alinea con la definición operacional de cada dimensión." }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Error de conexión con el Tutor IA." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 sm:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6 text-slate-100 animate-in fade-in duration-200">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-extrabold tracking-tight flex items-center space-x-2 text-white">
            <GraduationCap className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>Tutor Metodológico Socrático 24/7</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Asesoría personalizada para resolver dudas epistémicas, estadísticas o de redacción.
          </p>
        </div>
      </div>

      <div className="bg-[#101726] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl h-[450px] flex flex-col justify-between">
        <div className="space-y-4 overflow-y-auto pr-2 flex-1">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-2xl p-3.5 rounded-2xl text-xs leading-relaxed ${
                m.role === 'user'
                  ? 'bg-cyan-600 text-white rounded-br-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none font-serif'
              }`}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-xs text-slate-400 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
                <span>Tutor IA analizando...</span>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="flex items-center space-x-2 border-t border-slate-800 pt-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pregunta a tu Tutor (Ej: ¿Cómo justifico el uso de la V de Aiken?)."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl shadow-lg shrink-0 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
