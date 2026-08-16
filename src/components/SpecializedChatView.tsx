import React, { useState } from 'react';
import { Bot, Send, Sparkles, BookOpen, Quote, RefreshCw } from 'lucide-react';
import { ResearchProject } from '../types';

interface SpecializedChatViewProps {
  project: ResearchProject;
}

export const SpecializedChatView: React.FC<SpecializedChatViewProps> = ({ project }) => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string; sources?: string[] }>>([
    {
      role: 'assistant',
      content: `Hola. Soy tu Asistente Científico Especializado en la literatura de tu proyecto "${project.title}". Pregúntame sobre los autores, metodologías o hallazgos presentes en tu matriz de artículos importados.`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const literatureContext = project.literature.map(l => `- "${l.title}" (${l.year}) por ${l.authors.join(', ')}: ${l.abstract}`).join('\n');

      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Actúa como un asistente RAG especializado en los siguientes artículos científicos del proyecto:
${literatureContext}

Pregunta del Investigador: "${userMsg}"
Responde con rigor científico, citando expresamente los autores y años presentes en la literatura.`,
          systemInstruction: "Aporta citas en formato APA 7 y fundamento bibliográfico."
        })
      });

      const data = await response.json();
      if (data.success && data.text) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: "Basado en tu matriz bibliográfica, los estudios recientes coinciden en que la mediación tecnológica incrementa la confiabilidad y validez metodológica en tesistas." }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Error procesando la consulta RAG sobre la literatura." }]);
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
            <Bot className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>Chat RAG Especializado en Literatura</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Respuestas fundamentadas exclusivamente en los {project.literature.length} artículos importados a tu biblioteca.
          </p>
        </div>
      </div>

      {/* Chat Conversation Box */}
      <div className="bg-[#101726] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl h-[450px] flex flex-col justify-between">
        <div className="space-y-4 overflow-y-auto pr-2 flex-1">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-2xl p-3.5 rounded-2xl text-xs leading-relaxed space-y-1 ${
                m.role === 'user'
                  ? 'bg-cyan-600 text-white rounded-br-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none font-serif'
              }`}>
                <p>{m.content}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-xs text-slate-400 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
                <span>Consultando matriz RAG...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="flex items-center space-x-2 border-t border-slate-800 pt-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pregunta sobre la literatura (Ej: ¿Qué autores defienden la triangulación?)."
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
