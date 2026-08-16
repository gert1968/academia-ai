import React, { useState } from 'react';
import { 
  Plus, 
  FolderKanban, 
  BookOpen, 
  Award, 
  Layers, 
  Calendar, 
  User, 
  Trash2, 
  Copy, 
  ExternalLink,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { ResearchProject, ResearchType, CitationStyle } from '../types';

interface ProjectManagerViewProps {
  projects: ResearchProject[];
  activeProjectId: string;
  onSelectProject: (id: string) => void;
  onCreateProject: (newProj: ResearchProject) => void;
  onDeleteProject: (id: string) => void;
}

const researchTypesList: { type: ResearchType; label: string; desc: string }[] = [
  { type: 'tesis_maestria', label: 'Tesis de Maestría', desc: 'Investigación académica de posgrado con rigor metodológico e hipótesis comprobables.' },
  { type: 'articulo_cientifico', label: 'Artículo Científico (Paper)', desc: 'Estructura IMRaD (Introducción, Métodos, Resultados y Discusión) para revistas Scopus/WoS.' },
  { type: 'proyecto_investigacion', label: 'Proyecto de Investigación (Proposal)', desc: 'Anteproyecto formal para convocatorias de financiamiento B2B o fondos públicos.' },
  { type: 'proyecto_doctoral', label: 'Proyecto Doctoral (Tesis PhD)', desc: 'Aporte original de alto impacto con marco epistemológico robusto.' },
  { type: 'libro_academico', label: 'Libro / Monografía Académica', desc: 'Publicación compilatoria o monográfica de múltiples capítulos teóricos.' },
  { type: 'ponencia', label: 'Ponencia / Congreso', desc: 'Resumen ejecutivo y manuscrito estructurado para eventos científicos.' },
  { type: 'trabajo_grado', label: 'Trabajo de Grado (Pregrado)', desc: 'Proyecto final universitario guiado por norma institucional.' },
  { type: 'semillero', label: 'Semillero de Investigación', desc: 'Proyecto colaborativo de iniciación científica para grupos de estudio.' },
];

export const ProjectManagerView: React.FC<ProjectManagerViewProps> = ({
  projects,
  activeProjectId,
  onSelectProject,
  onCreateProject,
  onDeleteProject,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedType, setSelectedType] = useState<ResearchType>('tesis_maestria');
  const [university, setUniversity] = useState('Universidad Nacional');
  const [career, setCareer] = useState('Ciencias de la Educación');
  const [citationStyle, setCitationStyle] = useState<CitationStyle>('APA 7');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newProject: ResearchProject = {
      id: `proj-${Date.now()}`,
      title: title.trim(),
      type: selectedType,
      overallProgress: 10,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      version: '1.0.0',
      metadata: {
        university,
        career,
        degreeLevel: 'Posgrado',
        topic: title.trim(),
        problemStatement: 'Defina el problema de investigación en el módulo 3 o en el constructor inteligente.',
        generalObjective: 'Determinar el efecto o relación entre las variables planteadas.',
        specificObjectives: ['Analizar el marco teórico', 'Aplicar instrumento de medición'],
        hypotheses: ['H1: Existe relación directa entre las variables.'],
        variables: [{ name: 'Variable Principal', type: 'independiente', description: 'Variable objeto de estudio.' }],
        approach: 'mixto',
        researchType: 'correlacional',
        citationStyle,
        advisorName: 'Dr. Asesor Institucional'
      },
      chapters: [
        {
          id: `c-1-${Date.now()}`,
          number: 1,
          title: 'Capítulo I: El Problema y Objetivos',
          description: 'Planteamiento, formulación, objetivos e hipótesis.',
          isCompleted: false,
          sections: [
            { id: `s-1-1-${Date.now()}`, code: '1.1', title: 'Planteamiento del Problema', content: '', wordCount: 0, status: 'pendiente' }
          ]
        },
        {
          id: `c-2-${Date.now()}`,
          number: 2,
          title: 'Capítulo II: Marco Teórico',
          description: 'Antecedentes, bases teóricas y estado del arte.',
          isCompleted: false,
          sections: [
            { id: `s-2-1-${Date.now()}`, code: '2.1', title: 'Antecedentes', content: '', wordCount: 0, status: 'pendiente' }
          ]
        }
      ],
      literature: [],
      notes: [],
      matrix: [],
      schedule: [],
      advisorComments: [],
      collaborators: []
    };

    onCreateProject(newProject);
    setShowModal(false);
    setTitle('');
  };

  return (
    <div className="p-3 sm:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-6 text-slate-100 animate-in fade-in duration-200">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-lg sm:text-xl font-extrabold tracking-tight flex items-center space-x-2 text-white">
            <FolderKanban className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>Gestor de Proyectos de Investigación</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Administra múltiples tesis, artículos científicos, ponencias y monografías.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-cyan-950/50 flex items-center justify-center space-x-2 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Investigación</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => {
          const isActive = proj.id === activeProjectId;
          return (
            <div
              key={proj.id}
              className={`bg-[#101726] border rounded-2xl p-5 space-y-4 shadow-xl transition-all relative flex flex-col justify-between ${
                isActive ? 'border-cyan-500/80 ring-1 ring-cyan-500/30' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-cyan-300 border border-slate-700/80">
                    {proj.type.replace('_', ' ')}
                  </span>
                  <span className="text-[10px] text-slate-400">Norma: {proj.metadata.citationStyle}</span>
                </div>

                <h3 className="font-bold text-base text-slate-100 leading-snug line-clamp-2">
                  {proj.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2">
                  {proj.metadata.problemStatement}
                </p>

                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Avance:</span>
                    <span className="font-bold text-cyan-400">{proj.overallProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${proj.overallProgress}%` }} />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px]">{proj.metadata.university}</span>
                <div className="flex items-center space-x-2">
                  {projects.length > 1 && (
                    <button
                      onClick={() => onDeleteProject(proj.id)}
                      className="p-1.5 rounded hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 transition-colors"
                      title="Eliminar proyecto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => onSelectProject(proj.id)}
                    className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-all flex items-center space-x-1 ${
                      isActive
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/60'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    }`}
                  >
                    {isActive ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Activo</span>
                      </>
                    ) : (
                      <span>Seleccionar</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Create Project */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#101726] border border-slate-700/80 rounded-2xl w-full max-w-2xl p-6 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Plus className="w-5 h-5 text-cyan-400" />
                <span>Crear Nueva Investigación Académica</span>
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white text-xs">Cerrar ✕</button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Título de la Investigación *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: Análisis del impacto de la realidad aumentada en la enseñanza de la anatomía humana..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tipo de Investigación / Publicación *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                  {researchTypesList.map((item) => (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() => setSelectedType(item.type)}
                      className={`text-left p-2.5 rounded-xl border text-xs transition-all ${
                        selectedType === item.type
                          ? 'bg-cyan-950/70 border-cyan-500 text-cyan-200 font-semibold'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <p className="font-bold text-slate-200">{item.label}</p>
                      <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Universidad / Institución</label>
                  <input
                    type="text"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Carrera / Posgrado</label>
                  <input
                    type="text"
                    value={career}
                    onChange={(e) => setCareer(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Estilo de Cita</label>
                  <select
                    value={citationStyle}
                    onChange={(e) => setCitationStyle(e.target.value as CitationStyle)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-100"
                  >
                    <option value="APA 7">APA 7ma Edición</option>
                    <option value="Vancouver">Vancouver (Medicina)</option>
                    <option value="IEEE">IEEE (Ingenierías)</option>
                    <option value="ICONTEC">ICONTEC (Norma Técnica)</option>
                    <option value="MLA">MLA (Humanidades)</option>
                    <option value="Chicago">Chicago</option>
                    <option value="Harvard">Harvard</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-lg shadow-cyan-950/50"
                >
                  Crear Proyecto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
