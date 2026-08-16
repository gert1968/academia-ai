import React, { useState } from 'react';
import { Workflow, Sparkles, Plus, Layers, RefreshCw } from 'lucide-react';
import { ResearchProject } from '../types';

interface MindMapViewProps {
  project: ResearchProject;
}

export const MindMapView: React.FC<MindMapViewProps> = ({ project }) => {
  const [topic, setTopic] = useState(project.metadata.topic || 'Educación Superior e Inteligencia Artificial');
  const [generating, setGenerating] = useState(false);
  const [nodes, setNodes] = useState<any[]>([
    { id: '1', label: topic, level: 0 },
    { id: '2', label: 'Marco Metodológico (DEXPLIS)', level: 1 },
    { id: '3', label: 'Fase Cuantitativa (Watson-Glaser)', level: 2 },
    { id: '4', label: 'Fase Cualitativa (Grupos Focales)', level: 2 },
    { id: '5', label: 'Andamiaje Algorítmico y ZDP', level: 1 },
    { id: '6', label: 'Autonomía Epistémica de Tesistas', level: 1 }
  ]);

  const handleGenerateMindMap = async () => {
    setGenerating(true);
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Genera un mapa conceptual interactivo para el tema de tesis: "${topic}".
Responde ÚNICAMENTE en JSON con un arreglo de nodos:
[
  { "id": "1", "label": "Nodo Central", "level": 0 },
  { "id": "2", "label": "Subconcepto 1", "level": 1 },
  { "id": "3", "label": "Detalle A", "level": 2 }
]`
        })
      });

      const data = await response.json();
      if (data.success && data.text) {
        try {
          const parsed = JSON.parse(data.text);
          setNodes(parsed);
        } catch {
          // keep existing
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="p-3 sm:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6 text-slate-100 animate-in fade-in duration-200">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-extrabold tracking-tight flex items-center space-x-2 text-white">
            <Workflow className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>Mapas Conceptuales & Diagramas IA</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Genera automáticamente diagramas de flujo, árboles de decisión y mapas mentales jerárquicos.
          </p>
        </div>

        <button
          onClick={handleGenerateMindMap}
          disabled={generating}
          className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg flex items-center space-x-2 transition-all shrink-0"
        >
          <Sparkles className={`w-4 h-4 ${generating ? 'animate-spin' : ''}`} />
          <span>Generar Mapa Conceptual IA</span>
        </button>
      </div>

      {/* Mind Map Canvas Node Renderer */}
      <div className="bg-[#101726] border border-slate-800 rounded-2xl p-8 space-y-6 shadow-2xl overflow-x-auto min-h-[400px] flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl space-y-6">
          {/* Level 0 Central Node */}
          <div className="text-center">
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-extrabold text-sm rounded-2xl shadow-xl border border-cyan-400/40">
              {nodes.find(n => n.level === 0)?.label || topic}
            </div>
          </div>

          <div className="h-6 w-0.5 bg-slate-700 mx-auto" />

          {/* Level 1 Nodes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {nodes.filter(n => n.level === 1).map((node, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-700/80 p-3.5 rounded-xl space-y-2 shadow-lg">
                <p className="font-bold text-xs text-cyan-300">{node.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
