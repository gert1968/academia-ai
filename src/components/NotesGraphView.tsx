import React, { useState } from 'react';
import { 
  Network, 
  Plus, 
  Tag, 
  Link2, 
  FileText, 
  Sparkles, 
  Search, 
  Share2 
} from 'lucide-react';
import { ResearchProject, NoteItem } from '../types';

interface NotesGraphViewProps {
  project: ResearchProject;
  onUpdateProject: (updated: ResearchProject) => void;
}

export const NotesGraphView: React.FC<NotesGraphViewProps> = ({ project, onUpdateProject }) => {
  const [selectedNoteId, setSelectedNoteId] = useState<string>(project.notes[0]?.id || '');
  const [filterTag, setFilterTag] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'editor' | 'graph'>('editor');

  const selectedNote = project.notes.find(n => n.id === selectedNoteId) || project.notes[0];

  const handleCreateNote = () => {
    const newNote: NoteItem = {
      id: `note-${Date.now()}`,
      title: 'Nueva Nota de Investigación Atómica',
      content: 'Escribe aquí la idea o concepto con relaciones [[NombreDeOtraNota]]...',
      tags: ['Investigación'],
      backlinks: [],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      folder: 'General'
    };

    onUpdateProject({
      ...project,
      notes: [newNote, ...project.notes]
    });
    setSelectedNoteId(newNote.id);
  };

  const handleUpdateNoteContent = (content: string) => {
    if (!selectedNote) return;
    const updatedNotes = project.notes.map(n => n.id === selectedNote.id ? { ...n, content, updatedAt: new Date().toISOString().split('T')[0] } : n);
    onUpdateProject({ ...project, notes: updatedNotes });
  };

  return (
    <div className="p-3 sm:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6 text-slate-100 animate-in fade-in duration-200">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-extrabold tracking-tight flex items-center space-x-2 text-white">
            <Network className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>Notas Zettelkasten & Grafo</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Red de conocimiento interconectado con relaciones [[Backlinks]] y mapa conceptual.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode(viewMode === 'editor' ? 'graph' : 'editor')}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-xl font-semibold flex items-center space-x-1.5"
          >
            <Share2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>{viewMode === 'editor' ? 'Ver Red de Grafo' : 'Ver Editor de Notas'}</span>
          </button>

          <button
            onClick={handleCreateNote}
            className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs rounded-xl shadow-lg flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Nota</span>
          </button>
        </div>
      </div>

      {viewMode === 'editor' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Notes List Sidebar */}
          <div className="bg-[#101726] border border-slate-800 rounded-2xl p-4 space-y-3 shadow-xl">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar nota o etiqueta..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
              {project.notes
                .filter(n => n.title.toLowerCase().includes(search.toLowerCase()))
                .map((n) => (
                  <button
                    key={n.id}
                    onClick={() => setSelectedNoteId(n.id)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all space-y-1 ${
                      n.id === selectedNote?.id
                        ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200 font-semibold'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <p className="font-bold text-slate-200 truncate">{n.title}</p>
                    <p className="text-[10px] text-slate-500 line-clamp-1">{n.content}</p>
                  </button>
                ))}
            </div>
          </div>

          {/* Active Note Editor & Backlinks */}
          <div className="md:col-span-2 space-y-4">
            {selectedNote ? (
              <div className="bg-[#101726] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
                <input
                  type="text"
                  value={selectedNote.title}
                  onChange={(e) => {
                    const updated = project.notes.map(n => n.id === selectedNote.id ? { ...n, title: e.target.value } : n);
                    onUpdateProject({ ...project, notes: updated });
                  }}
                  className="w-full bg-transparent border-b border-slate-800 pb-2 text-base font-extrabold text-white focus:outline-none focus:border-cyan-500"
                />

                <textarea
                  rows={10}
                  value={selectedNote.content}
                  onChange={(e) => handleUpdateNoteContent(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3.5 text-xs text-slate-100 leading-relaxed font-mono focus:outline-none focus:border-cyan-500"
                />

                <div className="border-t border-slate-800 pt-3 flex flex-wrap items-center justify-between text-xs gap-2">
                  <div className="flex items-center space-x-2">
                    <Tag className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-slate-400">Etiquetas:</span>
                    {selectedNote.tags.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-slate-900 text-cyan-300 border border-slate-800">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-1.5 text-slate-400 text-[11px]">
                    <Link2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>Relaciones Backlinks: {selectedNote.backlinks.length} notas vinculadas</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center bg-[#101726] border border-slate-800 rounded-2xl">
                <FileText className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-xs text-slate-400">Selecciona o crea una nota para comenzar a vincular conceptos.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Visual Graph Representation */
        <div className="bg-[#101726] border border-slate-800 rounded-2xl p-8 space-y-6 text-center shadow-2xl">
          <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider flex items-center justify-center space-x-2">
            <Network className="w-5 h-5 text-cyan-400" />
            <span>Red de Grafo Interconectado de Conceptos</span>
          </h3>

          <div className="relative w-full h-80 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden">
            {/* Visual nodes interactive simulation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full p-8 flex items-center justify-around">
                {project.notes.map((n, idx) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      setSelectedNoteId(n.id);
                      setViewMode('editor');
                    }}
                    className="p-3 bg-cyan-950/90 border border-cyan-500 rounded-2xl shadow-xl hover:scale-110 transition-all cursor-pointer text-xs font-bold text-cyan-200"
                  >
                    <p className="truncate max-w-[120px]">{n.title}</p>
                    <span className="text-[10px] text-cyan-400 font-mono">#{n.tags[0] || 'General'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
